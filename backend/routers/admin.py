from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from database import get_connection
import hashlib, jwt, datetime, os

router = APIRouter()
security = HTTPBearer()

SECRET_KEY = os.getenv("JWT_SECRET", "crown-ceramics-secret-2024")

class LoginRequest(BaseModel):
    username: str
    password: str

class ProductUpdate(BaseModel):
    name: str
    category: str
    description: str
    tag: str

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/login")
def login(data: LoginRequest):
    conn = get_connection()
    pw_hash = hashlib.sha256(data.password.encode()).hexdigest()
    user = conn.execute(
        "SELECT * FROM admin_users WHERE username=? AND password_hash=?",
        (data.username, pw_hash)
    ).fetchone()
    conn.close()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = jwt.encode(
        {"sub": data.username, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=8)},
        SECRET_KEY, algorithm="HS256"
    )
    return {"token": token, "username": data.username}

@router.get("/inquiries")
def admin_inquiries(payload=Depends(verify_token)):
    conn = get_connection()
    rows = conn.execute("SELECT * FROM inquiries ORDER BY created_at DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

@router.patch("/inquiries/{id}/status")
def update_status(id: int, status: str, payload=Depends(verify_token)):
    conn = get_connection()
    conn.execute("UPDATE inquiries SET status=? WHERE id=?", (status, id))
    conn.commit()
    conn.close()
    return {"success": True}

@router.delete("/inquiries/{id}")
def delete_inquiry(id: int, payload=Depends(verify_token)):
    conn = get_connection()
    conn.execute("DELETE FROM inquiries WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return {"success": True}

@router.get("/products")
def admin_products(payload=Depends(verify_token)):
    conn = get_connection()
    rows = conn.execute("SELECT * FROM products").fetchall()
    conn.close()
    return [dict(r) for r in rows]

@router.put("/products/{id}")
def update_product(id: int, data: ProductUpdate, payload=Depends(verify_token)):
    conn = get_connection()
    conn.execute(
        "UPDATE products SET name=?, category=?, description=?, tag=? WHERE id=?",
        (data.name, data.category, data.description, data.tag, id)
    )
    conn.commit()
    conn.close()
    return {"success": True}

@router.get("/stats")
def admin_stats(payload=Depends(verify_token)):
    conn = get_connection()
    total_inquiries = conn.execute("SELECT COUNT(*) FROM inquiries").fetchone()[0]
    new_inquiries   = conn.execute("SELECT COUNT(*) FROM inquiries WHERE status='new'").fetchone()[0]
    total_products  = conn.execute("SELECT COUNT(*) FROM products").fetchone()[0]
    conn.close()
    return {
        "total_inquiries": total_inquiries,
        "new_inquiries": new_inquiries,
        "total_products": total_products,
    }
