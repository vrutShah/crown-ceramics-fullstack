from fastapi import APIRouter
from fastapi.responses import FileResponse
import os

router = APIRouter()

BROCHURE_PATH = os.path.join("static", "brochure.pdf")

@router.get("/download")
def download_brochure():
    if not os.path.exists(BROCHURE_PATH):
        # Return a placeholder response if brochure.pdf is not yet placed
        from fastapi import HTTPException
        raise HTTPException(
            status_code=404,
            detail="Brochure not found. Place brochure.pdf in backend/static/ folder."
        )
    return FileResponse(
        BROCHURE_PATH,
        media_type="application/pdf",
        filename="Crown_Ceramics_Brochure.pdf"
    )
