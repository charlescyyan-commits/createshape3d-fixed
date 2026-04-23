const mysql = require('mysql2/promise');

async function seed() {
  const conn = await mysql.createConnection({ uri: process.env.DATABASE_URL });

  const [rows] = await conn.query('SELECT id FROM products LIMIT 1');
  if (rows.length > 0) { console.log("Already seeded"); await conn.end(); return; }

  await conn.query(`INSERT INTO categories (name, slug, description, sort_order) VALUES
    ('3D Printer', '3d-printer', 'Professional LCD/DLP 3D printers', 1),
    ('Resin', 'resin', 'Premium photopolymer resins', 2),
    ('Accessories', 'accessories', 'Printer parts and tools', 3)`);

  const [cats] = await conn.query('SELECT id, slug FROM categories');
  const catMap = {};
  for (const c of cats) catMap[c.slug] = c.id;

  const highlights = JSON.stringify([{icon:"droplet",text:"Water-Washable"},{icon:"shield",text:"High Toughness"},{icon:"zap",text:"Low Shrinkage"},{icon:"wind",text:"Low Odor"},{icon:"target",text:"±0.15mm Accuracy"}]);
  const features = JSON.stringify([{icon:"droplet",title:"Water-Washable & Eco-Friendly",desc:"Our hydrophilic formula eliminates the need for IPA."},{icon:"shield",title:"High Toughness — Won't Crack",desc:"Up to 22% elongation at break gives models real-world durability."},{icon:"target",title:"Ultra-Low Shrinkage",desc:"Volume shrinkage as low as 2.2% means prints come out true to dimensions."},{icon:"zap",title:"Low Odor — Print Anywhere",desc:"A noticeably cleaner experience with minimal chemical odor."},{icon:"thermometer",title:"Cold-Weather Performance",desc:"Maintains low viscosity down to 15°C."},{icon:"sun",title:"Long-Term Color Stability",desc:"Minimized moisture absorption keeps colors vivid."}]);
  const stats = JSON.stringify([{value:"16–22%",label:"Elongation at Break"},{value:"±0.15mm",label:"Print Accuracy"},{value:"2.2–5.5%",label:"Volume Shrinkage"},{value:"12+",label:"Color Options"}]);
  const specs = JSON.stringify([{title:"Physical Properties",rows:[["Material Type","Hydrophilic Modified Photopolymer"],["UV Wavelength","365 – 405 nm"],["Viscosity @ 25°C","190 – 230 mPa·s"],["Density","1.07 – 1.09 g/cm³"]]},{title:"Mechanical Properties",rows:[["Shore Hardness","82 – 85 HD"],["Tensile Strength","38 – 43 MPa"],["Elongation at Break","16 – 22 %"],["Flexural Modulus","48 – 60 MPa"],["Impact Strength (Izod)","133 J/m"],["Volume Shrinkage","2.2 – 5.5 %"]]},{title:"Print Parameters",rows:[["Print Environment","20 – 40°C"],["Bottom Exposure","25 – 40 s"],["Normal Exposure","2 – 2.5 s"],["Layer Thickness","0.05 mm"]]},{title:"Post-Processing",rows:[["Wash Method","Water ≥ 5 min / IPA ≥ 95%"],["UV Cure Time","3 minutes"],["Cure Wavelength","405 nm"],["Cure Temperature","18 – 30°C"]]}]);
  const applications = JSON.stringify([{title:"Miniatures & Figures",desc:"Designed for tabletop figures and decorative models.",gradient:"linear-gradient(135deg, #06b6d4, #3b82f6)"},{title:"Dental & Jewelry",desc:"Suitable for dental models and jewelry master patterns.",gradient:"linear-gradient(135deg, #8b5cf6, #ec4899)"},{title:"Engineering Prototypes",desc:"Ideal for functional prototypes and design validation.",gradient:"linear-gradient(135deg, #f59e0b, #ef4444)"}]);
  const faqs = JSON.stringify([{q:"Is this resin compatible with my 405nm LCD printer?",a:"Yes. This resin is formulated for all standard 405nm LCD and DLP 3D printers."},{q:"Do I really need zero IPA to clean prints?",a:"That's correct. Our hydrophilic formula allows you to wash prints with plain tap water."},{q:"How do I dispose of wash water?",a:"Do not pour wash water down the drain. Expose it to direct sunlight until resin solids fully cure."},{q:"What's the recommended exposure time?",a:"We recommend 25–40 seconds for bottom layers and 2–2.5 seconds for normal layers."},{q:"Can I use this resin at low temperatures?",a:"Yes. This resin maintains workable viscosity down to 15°C."},{q:"Do you offer custom colors or bulk pricing?",a:"Yes. For distributor, OEM, and bulk orders, custom colors and packaging options are available."}]);
  const compat = JSON.stringify(["Anycubic Photon Series","Elegoo Mars / Saturn","Phrozen Sonic Series","Creality Halot Series","Bambu Lab Photon","Longer Orange Series","Any 405nm LCD/DLP Printer"]);
  const oemPerks = JSON.stringify(["Custom resin formulations & colors","Private label & custom packaging","MOQ as low as 100 units","Fast sampling within 7 business days","Dedicated account manager"]);

  await conn.query(`INSERT INTO products SET
    name='Washable Resin Premium',slug='washable-resin-premium',tagline='WATER-WASHABLE RESIN',
    subtitle='Professional-grade water-washable resin for 405nm LCD/DLP 3D printers. No IPA needed — just wash with water.',
    description='Our hydrophilic formula eliminates the need for IPA. Simply rinse with plain tap water — saving money and reducing chemical waste.',
    short_desc='No IPA needed — just wash with water. High toughness, low shrinkage.',
    category_id=?,badge='BESTSELLER',brand='CreateShape3D',sku='CS3D-WR',
    base_price=25.99,compare_at_price=35.99,currency='USD',
    main_image='/products/resin-washable-1kg.jpg',
    highlights_json=?,features_json=?,stats_json=?,specs_json=?,
    applications_json=?,faqs_json=?,compat_tags_json=?,
    oem_title='OEM / ODM & Bulk Orders',
    oem_desc='Looking for custom formulations, private labeling, or large-volume orders? We support OEM, ODM, and wholesale partnerships worldwide.',
    oem_perks_json=?,cta_title='Ready to Print Smarter?',cta_desc='Professional results with every pour. 12+ colors · Multiple sizes · Free shipping on select orders.',
    cta_btn='Shop Washable Resin',sort_order=1,is_active=1`,
    [catMap['resin'], highlights, features, stats, specs, applications, faqs, compat, oemPerks]);

  const [prod] = await conn.query('SELECT id FROM products WHERE slug=?', ['washable-resin-premium']);
  const resinId = prod[0].id;

  await conn.query(`INSERT INTO product_images (product_id,url,alt,is_primary,sort_order) VALUES
    (?,'/products/resin-washable-1kg.jpg','Washable Resin 1KG',1,0),
    (?,'/products/print-sample-1.jpg','Printed miniature',0,1),
    (?,'/products/print-sample-2.jpg','Dental model',0,2),
    (?,'/products/print-sample-3.jpg','Jewelry casting',0,3)`,
    [resinId,resinId,resinId,resinId]);

  await conn.query(`INSERT INTO variant_attribute_options (product_id,attribute_type,value,display_name,hex_code,sort_order) VALUES
    (?,'size','1kg','1 KG',NULL,1),(?,'size','2kg','2 KG',NULL,2),(?,'size','3kg','3 KG',NULL,3),
    (?,'color','black','Black','#212721',1),(?,'color','white','White','#EFF0F1',2),(?,'color','grey','Grey','#7E93A7',3),
    (?,'color','pink','Cherry Blossom Pink','#F5DADF',4),(?,'color','translucent-blue','Translucent Blue','rgba(7,124,171,.7)',5),
    (?,'color','translucent-green','Translucent Green','rgba(0,154,23,.7)',6),(?,'color','translucent-red','Translucent Red','rgba(210,38,48,.7)',7),
    (?,'color','clear','Clear','rgba(255,255,255,.15)',8)`,
    [resinId,resinId,resinId,resinId,resinId,resinId,resinId,resinId,resinId,resinId,resinId]);

  const [opts] = await conn.query('SELECT id,value FROM variant_attribute_options WHERE product_id=?', [resinId]);
  const optMap = {};
  for (const o of opts) optMap[o.value] = o.id;

  await conn.query(`INSERT INTO product_variants (product_id,sku,size_option_id,color_option_id,price,compare_at_price,weight,stock_quantity,is_active) VALUES
    (?,?,?,?,25.99,35.99,'1.1kg',100,1),(?,?,?,?,49.99,65.99,'2.2kg',80,1),(?,?,?,?,69.99,89.99,'3.3kg',50,1),
    (?,?,?,?,25.99,35.99,'1.1kg',90,1),(?,?,?,?,49.99,65.99,'2.2kg',75,1),(?,?,?,?,25.99,35.99,'1.1kg',85,1),
    (?,?,?,?,27.99,37.99,'1.1kg',60,1),(?,?,?,?,27.99,37.99,'1.1kg',70,1),(?,?,?,?,27.99,37.99,'1.1kg',0,1),
    (?,?,?,?,27.99,37.99,'1.1kg',65,1),(?,?,?,?,29.99,39.99,'1.1kg',55,1)`,
    [resinId,'WR-BLK-1KG',optMap['1kg'],optMap['black'],resinId,'WR-BLK-2KG',optMap['2kg'],optMap['black'],
     resinId,'WR-BLK-3KG',optMap['3kg'],optMap['black'],resinId,'WR-WHT-1KG',optMap['1kg'],optMap['white'],
     resinId,'WR-WHT-2KG',optMap['2kg'],optMap['white'],resinId,'WR-GRY-1KG',optMap['1kg'],optMap['grey'],
     resinId,'WR-PNK-1KG',optMap['1kg'],optMap['pink'],resinId,'WR-TBL-1KG',optMap['1kg'],optMap['translucent-blue'],
     resinId,'WR-TGR-1KG',optMap['1kg'],optMap['translucent-green'],resinId,'WR-TRD-1KG',optMap['1kg'],optMap['translucent-red'],
     resinId,'WR-CLR-1KG',optMap['1kg'],optMap['clear']]);

  await conn.query(`INSERT INTO products SET
    name='CS3D ProLite M4K',slug='prolite-m4k',tagline='4K MONOCHROME LCD',
    subtitle='Desktop LCD resin 3D printer with 4K monochrome screen.',
    description='High precision LCD 3D printer with 4K monochrome screen, XY resolution of 0.05mm.',
    short_desc='4K Mono LCD · 0.05mm XY Precision · 50mm/h Speed',
    category_id=?,badge='POPULAR',brand='CreateShape3D',sku='CS3D-M4K',
    base_price=299.99,compare_at_price=399.99,currency='USD',
    main_image='/products/printer-main.jpg',sort_order=1,is_active=1`,
    [catMap['3d-printer']]);

  const [printer] = await conn.query('SELECT id FROM products WHERE slug=?', ['prolite-m4k']);
  const printerId = printer[0].id;

  await conn.query(`INSERT INTO product_images (product_id,url,alt,is_primary,sort_order) VALUES
    (?,'/products/printer-main.jpg','ProLite M4K',1,0),
    (?,'/products/print-sample-1.jpg','Sample 1',0,1),
    (?,'/products/print-sample-4.jpg','Sample 2',0,2)`,
    [printerId,printerId,printerId]);

  await conn.query(`INSERT INTO variant_attribute_options (product_id,attribute_type,value,display_name,sort_order) VALUES (?, 'size', 'standard', 'Standard', 1)`, [printerId]);
  const [pOpt] = await conn.query('SELECT id FROM variant_attribute_options WHERE product_id=?', [printerId]);
  await conn.query(`INSERT INTO product_variants (product_id,sku,size_option_id,price,compare_at_price,weight,stock_quantity,is_active) VALUES (?, ?, ?, 299.99, 399.99, '9.5kg', 25, 1)`, [printerId, 'M4K-STD', pOpt[0].id]);

  await conn.query(`INSERT INTO site_settings (key,value,label,group_name) VALUES
    ('phone','+86 400-888-3D88','Phone','general'),
    ('email','sales@createshape3d.com','Email','general'),
    ('address','Shenzhen, China','Address','general'),
    ('site_name','CreateShape3D','Site Name','general'),
    ('currency','USD','Currency','general'),
    ('free_shipping_threshold','99','Free Shipping','general')`);

  console.log('Seed complete!');
  await conn.end();
}

seed().catch(e => { console.error(e.message); process.exit(1); });
