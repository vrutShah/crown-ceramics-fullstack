from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from database import get_connection
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

router = APIRouter()

# ── Email config ─────────────────────────────────────────────────────────────
# Set these in a .env file or as environment variables
SMTP_HOST     = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT     = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER     = os.getenv("SMTP_USER", "your_email@gmail.com")
SMTP_PASS     = os.getenv("SMTP_PASS", "your_app_password")
NOTIFY_EMAIL  = os.getenv("NOTIFY_EMAIL", "info@crownceramics.in")

class InquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str = ""
    company: str = ""
    product_interest: str = ""
    message: str

def send_email(to: str, subject: str, body: str):
    """Send email via SMTP. Silently skip if credentials are not configured."""
    if "your_email" in SMTP_USER:
        print(f"[Email skipped — configure SMTP_USER/SMTP_PASS in .env]\nTo: {to}\nSubject: {subject}")
        return
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = SMTP_USER
        msg["To"] = to
        msg.attach(MIMEText(body, "html"))
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, to, msg.as_string())
    except Exception as e:
        print(f"Email error: {e}")

@router.post("/")
def submit_inquiry(data: InquiryCreate):
    conn = get_connection()
    conn.execute(
        """INSERT INTO inquiries (name, email, phone, company, product_interest, message)
           VALUES (?, ?, ?, ?, ?, ?)""",
        (data.name, data.email, data.phone, data.company, data.product_interest, data.message)
    )
    conn.commit()
    conn.close()

    # Notify Crown Ceramics team
    send_email(
        NOTIFY_EMAIL,
        f"New Inquiry from {data.name}",
        f"""<h2>New Website Inquiry</h2>
        <p><b>Name:</b> {data.name}</p>
        <p><b>Email:</b> {data.email}</p>
        <p><b>Phone:</b> {data.phone}</p>
        <p><b>Company:</b> {data.company}</p>
        <p><b>Product Interest:</b> {data.product_interest}</p>
        <p><b>Message:</b> {data.message}</p>"""
    )

    # Auto-reply to customer
    send_email(
    data.email,
    "Thank you for contacting Crown Ceramics",
    f"""<h2>Thank you, {data.name}!</h2>
    <p>We have received your inquiry and our team will get back to you within 24 hours.</p>
    <p><b>Your message:</b> {data.message}</p>
    <br>
    <p>Crown Ceramics | Since 1979</p>
    <p>
        Anand Parekh: (+91) 997 4666 341<br>
        Vishal Shah: (+91) 982 5258 303
    </p>"""
)

    return {"success": True, "message": "Inquiry submitted successfully"}

@router.get("/")
def get_inquiries():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM inquiries ORDER BY created_at DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]
