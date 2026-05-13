from fastapi import APIRouter, HTTPException
from database import get_connection

router = APIRouter()

@router.get("/")
def get_all_products():
    conn = get_connection()
    products = conn.execute("SELECT * FROM products").fetchall()
    conn.close()
    return [dict(p) for p in products]

@router.get("/categories")
def get_categories():
    conn = get_connection()
    rows = conn.execute("SELECT DISTINCT category FROM products").fetchall()
    conn.close()
    return [r["category"] for r in rows]

@router.get("/{slug}")
def get_product(slug: str):
    conn = get_connection()
    product = conn.execute("SELECT * FROM products WHERE slug = ?", (slug,)).fetchone()
    conn.close()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return dict(product)
