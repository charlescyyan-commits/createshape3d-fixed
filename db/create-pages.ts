import { db } from "../api/queries/connection";

async function createPagesTable() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS pages (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        content TEXT,
        meta_description TEXT,
        is_active TINYINT(1) DEFAULT 1,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    console.log("Pages table created or already exists.");
    
    await db.execute(`
      INSERT IGNORE INTO pages (title, slug, content, meta_description, sort_order) VALUES
      ('About Us', 'about-us', '<p>CreateShape3D is a leading manufacturer of professional LCD 3D printers and premium resins. With over 10 years of experience, we serve customers in 50+ countries worldwide.</p><p>Our mission is to make high-precision 3D printing accessible to dental practices, jewelry workshops, and industrial manufacturers.</p>', 'Learn about CreateShape3D - professional 3D printing solutions.', 1),
      ('Privacy Policy', 'privacy-policy', '<p>At CreateShape3D, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.</p><h2>Information Collection</h2><p>We collect information you provide when placing orders, contacting support, or subscribing to our newsletter.</p>', 'CreateShape3D Privacy Policy', 2)
    `);
    console.log("Default pages inserted.");
  } catch (e: any) {
    console.error("Error:", e.message);
  }
}

createPagesTable();
