const mysql = require('mysql2/promise');
async function init() {
  const conn = await mysql.createConnection({ uri: process.env.DATABASE_URL });
  
  const [existing] = await conn.query('SELECT slug FROM pages');
  const existingSlugs = new Set(existing.map(r => r.slug));
  
  const pagesToAdd = [
    {
      slug: 'faq',
      title: 'FAQs',
      content: '<h2>Frequently Asked Questions</h2><p><strong>Q: What is your return policy?</strong></p><p>A: We offer a 30-day return policy for all unused products in original packaging.</p><p><strong>Q: Do you ship internationally?</strong></p><p>A: Yes, we ship worldwide. Shipping times vary by location.</p><p><strong>Q: What payment methods do you accept?</strong></p><p>A: We accept credit cards, PayPal, and bank transfers.</p>',
      metaDescription: 'Find answers to frequently asked questions about our 3D printers, resins, shipping, and support.',
      isActive: 1,
      sortOrder: 3,
    },
    {
      slug: 'terms-of-service',
      title: 'Terms of Service',
      content: '<h2>Terms of Service</h2><p>By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.</p><h3>1. Use License</h3><p>Permission is granted to temporarily download one copy of the materials for personal, non-commercial transitory viewing only.</p><h3>2. Disclaimer</h3><p>The materials on this website are provided on an \'as is\' basis. We make no warranties, expressed or implied.</p>',
      metaDescription: 'Read our Terms of Service governing the use of CreateShape3D website and products.',
      isActive: 1,
      sortOrder: 4,
    },
    {
      slug: 'blog',
      title: 'Blog',
      content: '<h2>Latest News & Articles</h2><p>Welcome to the CreateShape3D blog. Here you will find the latest updates, tutorials, and industry insights about 3D printing technology.</p>',
      metaDescription: 'Stay updated with the latest 3D printing news, tutorials, and product updates from CreateShape3D.',
      isActive: 1,
      sortOrder: 5,
    },
    {
      slug: 'contact',
      title: 'Contact Us',
      content: '<h2>Contact Us</h2><p>We would love to hear from you. Reach out to us through any of the channels below:</p><p><strong>Email:</strong> sales@createshape3d.com</p><p><strong>Phone:</strong> +86 400-888-3D88</p><p><strong>Address:</strong> Shenzhen, China</p><p>For inquiries, please visit our <a href="/inquiry">Inquiry Page</a>.</p>',
      metaDescription: 'Get in touch with CreateShape3D. Find our email, phone number, and address here.',
      isActive: 1,
      sortOrder: 6,
    },
  ];
  
  for (const p of pagesToAdd) {
    if (!existingSlugs.has(p.slug)) {
      await conn.query('INSERT INTO pages (title, slug, content, meta_description, is_active, sort_order) VALUES (?, ?, ?, ?, ?, ?)', 
        [p.title, p.slug, p.content, p.metaDescription, p.isActive, p.sortOrder]);
      console.log('Added page:', p.slug);
    }
  }
  
  console.log('CMS pages initialized!');
  await conn.end();
}
init().catch(e => { console.error(e); process.exit(1); });
