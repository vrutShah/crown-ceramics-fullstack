import sqlite3
import hashlib

DB_PATH = "crown_ceramics.db"

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    c = conn.cursor()

    c.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT,
            tag TEXT,
            image_url TEXT,
            slug TEXT UNIQUE
        )
    """)

    c.execute("""
        CREATE TABLE IF NOT EXISTS inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            company TEXT,
            product_interest TEXT,
            message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'new'
        )
    """)

    c.execute("""
        CREATE TABLE IF NOT EXISTS admin_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        )
    """)

    # Seed products
    c.execute("SELECT COUNT(*) FROM products")
    if c.fetchone()[0] == 0:
        products = [
            ("High Alumina Bricks", "Bricks", "High-performance refractory bricks for industrial furnaces. Available in various alumina percentages.", "Industrial Furnace Grade", None, "high-alumina-bricks"),
            ("Acid Proof Bricks", "Bricks", "Chemical-resistant bricks ideal for acid treatment plants, chemical industries and storage tanks.", "Chemical Resistant", None, "acid-proof-bricks"),
            ("Alumina Dense Castable A 90%", "Castables", "High-alumina dense castable with 90% alumina content for extreme temperature applications.", "A 90%", None, "castable-a90"),
            ("Alumina Dense Castable K 60%", "Castables", "Dense castable with 60% alumina content, ideal for moderate heat industrial applications.", "K 60%", None, "castable-k60"),
            ("Alumina Castable Firecrete 70%", "Castables", "Firecrete castable with 70% alumina, offering excellent resistance to thermal shock.", "FC 70%", None, "castable-fc70"),
            ("Mortar / Ramming Mass", "Cement Binders", "High-temperature mortar and ramming mass for joining and bedding refractory bricks.", "Cement Binders", None, "mortar"),
            ("Calundum", "Cement Binders", "Specialty calcium aluminate cement binder for high-temperature bonding applications.", "Cement Binders", None, "calundum"),
            ("Shoulder and Hanger Bricks", "Bricks", "Specially shaped refractory bricks for supporting arch and suspended roof constructions.", "Structural Grade", None, "shoulder-hanger-bricks"),
            ("Bottom Pouring Sets", "Steel Plant", "Complete sets for bottom pouring in steel foundries. Meets the highest steel industry standards.", "Steel Plant Grade", None, "bottom-pouring-sets"),
            ("Magnesite Bricks", "Bricks", "Basic refractory bricks made from magnesium oxide, ideal for steel furnaces and cement kilns.", "Basic Refractory", None, "magnesite-bricks"),
            ("Insulation Bricks", "Insulation", "Lightweight insulation bricks for heat conservation and energy efficiency in furnaces.", "Thermal Management", None, "insulation-bricks"),
            ("Ceramic Fiber Blankets", "Insulation", "High-temperature ceramic fiber blankets for furnace lining, backup insulation and pipe wrapping.", "High Temp Insulation", None, "ceramic-fiber-blankets"),
        ]
        c.executemany(
            "INSERT INTO products (name, category, description, tag, image_url, slug) VALUES (?,?,?,?,?,?)",
            products
        )

    # Seed admin user (username: admin, password: admin123)
    c.execute("SELECT COUNT(*) FROM admin_users")
    if c.fetchone()[0] == 0:
        pw_hash = hashlib.sha256("admin123".encode()).hexdigest()
        c.execute("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)", ("admin", pw_hash))

    conn.commit()
    conn.close()
    print("Database initialized.")
