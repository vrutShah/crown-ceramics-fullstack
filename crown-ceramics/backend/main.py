from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import init_db
from routers import products, inquiry, admin, brochure

app = FastAPI(title="Crown Ceramics API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.on_event("startup")
async def startup():
    init_db()

app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(inquiry.router, prefix="/api/inquiry", tags=["Inquiry"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])
app.include_router(brochure.router, prefix="/api/brochure", tags=["Brochure"])

@app.get("/")
def root():
    return {"message": "Crown Ceramics API is running"}
