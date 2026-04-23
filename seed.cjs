const mysql = require('mysql2/promise');

async function seed() {
  const conn = await mysql.createConnection({ uri: process.env.DATABASE_URL });

  // Clear old data
  await conn.query('DELETE FROM product_variants');
  await conn.query('DELETE FROM variant_attribute_options');
  await conn.query('DELETE FROM product_images');
  await conn.query('DELETE FROM products');
  await conn.query('DELETE FROM categories');
  await conn.query('DELETE FROM banner_slides');

  // Root Categories
  const [cPrinter] = await conn.query("INSERT INTO categories (name, slug, description, sort_order, is_active) VALUES ('3D Printer', '3d-printer', 'Professional LCD/DLP 3D printers for various industries', 1, 1)");
  const printerId = cPrinter.insertId;
  const [cResin] = await conn.query("INSERT INTO categories (name, slug, description, sort_order, is_active) VALUES ('Resin', 'resin', 'Premium photopolymer resins for 405nm printers', 2, 1)");
  const resinId = cResin.insertId;
  const [cAccessories] = await conn.query("INSERT INTO categories (name, slug, description, sort_order, is_active) VALUES ('Accessories', 'accessories', 'Printer parts, films, and tools', 3, 1)");
  const accessoriesId = cAccessories.insertId;

  // Sub-categories
  const subs = [
    ['Dental 3d Printer', 'dental-3d-printer', 'High precision dental 3D printers', printerId, 1],
    ['Industrial 3d Printer', 'industrial-3d-printer', 'Large format industrial printers', printerId, 2],
    ['Jewelry 3d Printer', 'jewelry-3d-printer', 'Precision jewelry casting printers', printerId, 3],
    ['Shoe 3d Printer', 'shoe-3d-printer', 'Shoe mold 3D printers', printerId, 4],
    ['Wash & Cure Machine', 'wash-cure-machine', 'Post-processing wash and cure stations', printerId, 5],
    ['Casting Resin Series', 'casting-resin-series', 'Casting resin for jewelry and metal', resinId, 1],
    ['Dental Resin Series', 'dental-resin-series', 'Biocompatible dental model resins', resinId, 2],
    ['Engineering Resin Series', 'engineering-resin-series', 'ABS-like tough resins', resinId, 3],
    ['Rigid Resin Series', 'rigid-resin-series', 'High stiffness rigid resins', resinId, 4],
    ['Other Resin Series', 'other-resin-series', 'Specialty resins', resinId, 5],
    ['3d Printer Mono LCD', '3d-printer-mono-lcd', 'Replacement LCD screens', accessoriesId, 1],
    ['ACF/PFA Films', 'acf-pfa-films', 'Release films and FEP sheets', accessoriesId, 2],
  ];
  const subIds = {};
  for (const [name, slug, desc, pid, so] of subs) {
    const [r] = await conn.query('INSERT INTO categories (name, slug, description, parent_id, sort_order, is_active) VALUES (?, ?, ?, ?, ?, 1)', [name, slug, desc, pid, so]);
    subIds[slug] = r.insertId;
  }

  // Banner Slides (3 hero slides)
  await conn.query(`INSERT INTO banner_slides (title, subtitle, description, image, button_text, button_link, sort_order, is_active) VALUES
    ('CS3D ProLite M4K', '4K MONOCHROME LCD 3D PRINTER', 'Experience ultra-high precision with 0.05mm XY resolution. Print speed up to 50mm/h with 2000+ hour screen lifespan.', '/slides/hero-1.jpg', 'Shop Now', '/product/prolite-m4k', 1, 1),
    ('Washable Resin Premium', 'WATER-WASHABLE 405NM RESIN', 'No IPA needed — just wash with water. 12+ colors available. High toughness with low shrinkage.', '/slides/hero-2.jpg', 'Shop Now', '/product/washable-resin-premium', 2, 1),
    ('Explore Our Collection', 'PREMIUM 3D PRINTING MATERIALS', 'From dental to engineering resins, casting to rigid — find the perfect material for your next project.', '/slides/hero-3.jpg', 'Explore All', '/products', 3, 1)`);

  // Product 1: ProLite M4K
  const highlights1 = JSON.stringify([{icon:"monitor",text:"4K Mono LCD"},{icon:"crosshair",text:"0.05mm Precision"},{icon:"zap",text:"50mm/h Speed"},{icon:"shield",text:"2-Year Warranty"}]);
  const stats1 = JSON.stringify([{value:"3840x2400",label:"Resolution"},{value:"0.05mm",label:"XY Precision"},{value:"50mm/h",label:"Print Speed"},{value:"135x75x150",label:"Build Volume"}]);
  const feats1 = JSON.stringify([{icon:"monitor",title:"4K Monochrome LCD",desc:"3840x2400 resolution with 2000+ hour lifespan."},{icon:"crosshair",title:"0.05mm XY Precision",desc:"50-micron pixel size for ultra-fine details."},{icon:"zap",title:"50mm/h Print Speed",desc:"Lightning-fast layer exposure."},{icon:"shield",title:"2-Year Warranty",desc:"Covers screen, mainboard, and mechanical parts."}]);

  await conn.query(`INSERT INTO products SET
    name='CS3D ProLite M4K',slug='prolite-m4k',tagline='4K MONOCHROME LCD',
    subtitle='Desktop LCD resin 3D printer with 4K monochrome screen. Perfect for beginners and small studios.',
    description='High precision LCD 3D printer with 4K monochrome screen, XY resolution of 0.05mm, and print speed up to 50mm/h.',
    short_desc='4K Mono LCD · 0.05mm XY Precision · 50mm/h Speed',
    category_id=?,badge='POPULAR',brand='CreateShape3D',sku='CS3D-M4K',
    base_price=299.99,compare_at_price=399.99,currency='USD',
    main_image='/products/printer-main.jpg',
    highlights_json=?,stats_json=?,features_json=?,
    sort_order=1,is_featured=1,is_active=1`,
    [subIds['industrial-3d-printer'] || printerId, highlights1, stats1, feats1]);
  const [p1] = await conn.query('SELECT id FROM products WHERE slug=?', ['prolite-m4k']);
  await conn.query('INSERT INTO product_images (product_id,url,alt,is_primary,sort_order) VALUES (?,?,?,1,0),(?,?,?,0,1),(?,?,?,0,2)', [p1[0].id,'/products/printer-main.jpg','ProLite M4K',p1[0].id,'/products/print-sample-1.jpg','Sample 1',p1[0].id,'/products/print-sample-4.jpg','Sample 2']);
  const [optStd] = await conn.query('INSERT INTO variant_attribute_options (product_id,attribute_type,value,display_name,sort_order) VALUES (?,\'size\',\'standard\',\'Standard\',1)', [p1[0].id]);
  await conn.query('INSERT INTO product_variants (product_id,sku,size_option_id,price,compare_at_price,weight,stock_quantity,is_active) VALUES (?,?,?,299.99,399.99,\'9.5kg\',25,1)', [p1[0].id, 'M4K-STD', optStd.insertId]);

  // Product 2: Washable Resin
  const highlights2 = JSON.stringify([{icon:"droplet",text:"Water-Washable"},{icon:"shield",text:"High Toughness"},{icon:"zap",text:"Low Shrinkage"},{icon:"target",text:"±0.15mm Accuracy"}]);
  const stats2 = JSON.stringify([{value:"16–22%",label:"Elongation"},{value:"±0.15mm",label:"Accuracy"},{value:"2.2–5.5%",label:"Shrinkage"},{value:"12+",label:"Colors"}]);

  await conn.query(`INSERT INTO products SET
    name='Washable Resin Premium',slug='washable-resin-premium',tagline='WATER-WASHABLE RESIN',
    subtitle='Professional-grade water-washable resin for 405nm LCD/DLP 3D printers. No IPA needed.',
    description='Our hydrophilic formula eliminates the need for IPA. Simply rinse with plain tap water.',
    short_desc='No IPA needed — just wash with water. 12+ colors available.',
    category_id=?,badge='BESTSELLER',brand='CreateShape3D',sku='CS3D-WR',
    base_price=25.99,compare_at_price=35.99,currency='USD',
    main_image='/products/resin-washable-1kg.jpg',
    highlights_json=?,stats_json=?,
    sort_order=2,is_featured=1,is_active=1`,
    [subIds['other-resin-series'] || resinId, highlights2, stats2]);
  const [p2] = await conn.query('SELECT id FROM products WHERE slug=?', ['washable-resin-premium']);
  await conn.query('INSERT INTO product_images (product_id,url,alt,is_primary,sort_order) VALUES (?,?,?,1,0),(?,?,?,0,1),(?,?,?,0,2),(?,?,?,0,3)', [p2[0].id,'/products/resin-washable-1kg.jpg','Washable Resin',p2[0].id,'/products/print-sample-1.jpg','Miniature',p2[0].id,'/products/print-sample-2.jpg','Dental',p2[0].id,'/products/print-sample-3.jpg','Jewelry']);

  // Variants for resin
  const [o1kg] = await conn.query('INSERT INTO variant_attribute_options (product_id,attribute_type,value,display_name,sort_order) VALUES (?,\'size\',\'1kg\',\'1 KG\',1)', [p2[0].id]);
  const [o2kg] = await conn.query('INSERT INTO variant_attribute_options (product_id,attribute_type,value,display_name,sort_order) VALUES (?,\'size\',\'2kg\',\'2 KG\',2)', [p2[0].id]);
  const [o3kg] = await conn.query('INSERT INTO variant_attribute_options (product_id,attribute_type,value,display_name,sort_order) VALUES (?,\'size\',\'3kg\',\'3 KG\',3)', [p2[0].id]);
  const colors = [
    ['black','Black','#212721',1],['white','White','#EFF0F1',2],['grey','Grey','#7E93A7',3],
    ['pink','Cherry Blossom Pink','#F5DADF',4],['translucent-blue','Translucent Blue','rgba(7,124,171,.7)',5],
    ['translucent-green','Translucent Green','rgba(0,154,23,.7)',6],['translucent-red','Translucent Red','rgba(210,38,48,.7)',7],
    ['clear','Clear','rgba(255,255,255,.15)',8],
  ];
  const colorOptIds = {};
  for (const [val,name,hex,so] of colors) {
    const [o] = await conn.query('INSERT INTO variant_attribute_options (product_id,attribute_type,value,display_name,hex_code,sort_order) VALUES (?,\'color\',?,?,?,?)', [p2[0].id, val, name, hex, so]);
    colorOptIds[val] = o.insertId;
  }
  const variants = [
    ['WR-BLK-1KG',o1kg.insertId,colorOptIds['black'],25.99,35.99,'1.1kg',100],
    ['WR-BLK-2KG',o2kg.insertId,colorOptIds['black'],49.99,65.99,'2.2kg',80],
    ['WR-WHT-1KG',o1kg.insertId,colorOptIds['white'],25.99,35.99,'1.1kg',90],
    ['WR-WHT-2KG',o2kg.insertId,colorOptIds['white'],49.99,65.99,'2.2kg',75],
    ['WR-GRY-1KG',o1kg.insertId,colorOptIds['grey'],25.99,35.99,'1.1kg',85],
    ['WR-PNK-1KG',o1kg.insertId,colorOptIds['pink'],27.99,37.99,'1.1kg',60],
    ['WR-TBL-1KG',o1kg.insertId,colorOptIds['translucent-blue'],27.99,37.99,'1.1kg',70],
    ['WR-CLR-1KG',o1kg.insertId,colorOptIds['clear'],29.99,39.99,'1.1kg',55],
  ];
  for (const [sku,szId,clId,price,cPrice,weight,stock] of variants) {
    await conn.query('INSERT INTO product_variants (product_id,sku,size_option_id,color_option_id,price,compare_at_price,weight,stock_quantity,is_active) VALUES (?,?,?,?,?,?,?,?,1)', [p2[0].id,sku,szId,clId,price,cPrice,weight,stock]);
  }

  // Product 3: Dental Printer
  await conn.query(`INSERT INTO products SET
    name='CS3D Dental Pro D6K',slug='dental-pro-d6k',tagline='DENTAL 3D PRINTER',
    subtitle='High precision dental 3D printer for crowns, bridges, aligners and surgical guides.',
    description='Professional dental 3D printer with integrated software for dental workflows. Compatible with all dental resins.',
    short_desc='Dental Grade · 0.03mm Precision · Biocompatible',
    category_id=?,badge='NEW',brand='CreateShape3D',sku='CS3D-D6K',
    base_price=599.99,compare_at_price=799.99,currency='USD',
    main_image='/products/dental-printer.jpg',
    sort_order=3,is_featured=1,is_active=1`, [subIds['dental-3d-printer'] || printerId]);
  const [p3] = await conn.query('SELECT id FROM products WHERE slug=?', ['dental-pro-d6k']);
  await conn.query('INSERT INTO product_images (product_id,url,alt,is_primary,sort_order) VALUES (?,?,?,1,0)', [p3[0].id, '/products/dental-printer.jpg', 'Dental Pro']);

  // Product 4: Jewelry Printer
  await conn.query(`INSERT INTO products SET
    name='CS3D Jewelry Pro J4K',slug='jewelry-pro-j4k',tagline='JEWELRY 3D PRINTER',
    subtitle='Precision jewelry 3D printer for master pattern and casting. Capture the finest details.',
    description='Specialized jewelry 3D printer with 4K resolution for intricate ring, pendant, and earring designs.',
    short_desc='4K Detail · Casting Ready · Smooth Surface',
    category_id=?,brand='CreateShape3D',sku='CS3D-J4K',
    base_price=499.99,compare_at_price=649.99,currency='USD',
    main_image='/products/jewelry-printer.jpg',
    sort_order=4,is_featured=1,is_active=1`, [subIds['jewelry-3d-printer'] || printerId]);
  const [p4] = await conn.query('SELECT id FROM products WHERE slug=?', ['jewelry-pro-j4k']);
  await conn.query('INSERT INTO product_images (product_id,url,alt,is_primary,sort_order) VALUES (?,?,?,1,0)', [p4[0].id, '/products/jewelry-printer.jpg', 'Jewelry Pro']);

  // Product 5: Dental Resin
  await conn.query(`INSERT INTO products SET
    name='Dental Model Resin',slug='dental-model-resin',tagline='DENTAL RESIN SERIES',
    subtitle='Biocompatible dental model resin for crowns, bridges and orthodontic models.',
    description='FDA-compliant dental resin with high accuracy and smooth surface finish. Ideal for dental labs.',
    short_desc='Biocompatible · High Accuracy · Smooth Finish',
    category_id=?,badge='NEW',brand='CreateShape3D',sku='CS3D-DMR',
    base_price=45.99,compare_at_price=59.99,currency='USD',
    main_image='/products/dental-resin.jpg',
    sort_order=5,is_featured=1,is_active=1`, [subIds['dental-resin-series'] || resinId]);
  const [p5] = await conn.query('SELECT id FROM products WHERE slug=?', ['dental-model-resin']);
  await conn.query('INSERT INTO product_images (product_id,url,alt,is_primary,sort_order) VALUES (?,?,?,1,0)', [p5[0].id, '/products/dental-resin.jpg', 'Dental Resin']);

  // Product 6: Casting Resin
  await conn.query(`INSERT INTO products SET
    name='Casting Resin Premium',slug='casting-resin-premium',tagline='CASTING RESIN SERIES',
    subtitle='Ash-free casting resin for jewelry and metal casting applications.',
    description='Premium casting resin with zero ash residue. Perfect for investment casting of gold, silver and platinum jewelry.',
    short_desc='Zero Ash · High Detail · Perfect for Gold/Silver',
    category_id=?,brand='CreateShape3D',sku='CS3D-CR',
    base_price=39.99,compare_at_price=49.99,currency='USD',
    main_image='/products/casting-resin.jpg',
    sort_order=6,is_active=1`, [subIds['casting-resin-series'] || resinId]);
  const [p6] = await conn.query('SELECT id FROM products WHERE slug=?', ['casting-resin-premium']);
  await conn.query('INSERT INTO product_images (product_id,url,alt,is_primary,sort_order) VALUES (?,?,?,1,0)', [p6[0].id, '/products/casting-resin.jpg', 'Casting Resin']);

  // Product 7: Rigid Resin
  await conn.query(`INSERT INTO products SET
    name='Rigid Engineering Resin',slug='rigid-engineering-resin',tagline='RIGID RESIN SERIES',
    subtitle='High stiffness ABS-like resin for functional prototypes and engineering parts.',
    description='Engineering-grade rigid resin with Shore 85D hardness. Perfect for jigs, fixtures, and functional testing.',
    short_desc='Shore 85D · ABS-Like · Functional Parts',
    category_id=?,brand='CreateShape3D',sku='CS3D-RER',
    base_price=32.99,compare_at_price=42.99,currency='USD',
    main_image='/products/rigid-resin.jpg',
    sort_order=7,is_active=1`, [subIds['rigid-resin-series'] || resinId]);
  const [p7] = await conn.query('SELECT id FROM products WHERE slug=?', ['rigid-engineering-resin']);
  await conn.query('INSERT INTO product_images (product_id,url,alt,is_primary,sort_order) VALUES (?,?,?,1,0)', [p7[0].id, '/products/rigid-resin.jpg', 'Rigid Resin']);

  // Product 8: Wash & Cure
  await conn.query(`INSERT INTO products SET
    name='Wash & Cure Station Plus',slug='wash-cure-station',tagline='WASH & CURE',
    subtitle='2-in-1 wash and UV cure station for resin 3D prints.',
    description='Automated washing and curing station. Removes uncured resin and cures prints for maximum strength.',
    short_desc='2-in-1 · Auto Wash · UV Cure',
    category_id=?,brand='CreateShape3D',sku='CS3D-WCS',
    base_price=129.99,compare_at_price=169.99,currency='USD',
    main_image='/products/wash-cure.jpg',
    sort_order=8,is_active=1`, [subIds['wash-cure-machine'] || printerId]);
  const [p8] = await conn.query('SELECT id FROM products WHERE slug=?', ['wash-cure-station']);
  await conn.query('INSERT INTO product_images (product_id,url,alt,is_primary,sort_order) VALUES (?,?,?,1,0)', [p8[0].id, '/products/wash-cure.jpg', 'Wash & Cure']);

  // Product 9: FEP Film
  await conn.query(`INSERT INTO products SET
    name='Premium FEP Film Set',slug='premium-fep-film',tagline='ACF/PFA FILMS',
    subtitle='High-release FEP and nFEP films for LCD resin printers.',
    description='Premium grade FEP release films with excellent optical clarity and long service life. Pack of 5 sheets.',
    short_desc='Optical Grade · Long Life · Pack of 5',
    category_id=?,brand='CreateShape3D',sku='CS3D-FEP',
    base_price=15.99,compare_at_price=22.99,currency='USD',
    main_image='/products/fep-film.jpg',
    sort_order=9,is_active=1`, [subIds['acf-pfa-films'] || accessoriesId]);
  const [p9] = await conn.query('SELECT id FROM products WHERE slug=?', ['premium-fep-film']);
  await conn.query('INSERT INTO product_images (product_id,url,alt,is_primary,sort_order) VALUES (?,?,?,1,0)', [p9[0].id, '/products/fep-film.jpg', 'FEP Film']);

  // Product 10: Shoe Printer
  await conn.query(`INSERT INTO products SET
    name='CS3D Shoe Mold S8K',slug='shoe-mold-s8k',tagline='SHOE 3D PRINTER',
    subtitle='Large format 3D printer for shoe sole molds and prototypes.',
    description='Specialized shoe mold 3D printer with large build volume for full-size shoe sole printing.',
    short_desc='Large Volume · Shoe Ready · Fast Print',
    category_id=?,brand='CreateShape3D',sku='CS3D-S8K',
    base_price=899.99,compare_at_price=1199.99,currency='USD',
    main_image='/products/shoe-printer.jpg',
    sort_order=10,is_active=1`, [subIds['shoe-3d-printer'] || printerId]);
  const [p10] = await conn.query('SELECT id FROM products WHERE slug=?', ['shoe-mold-s8k']);
  await conn.query('INSERT INTO product_images (product_id,url,alt,is_primary,sort_order) VALUES (?,?,?,1,0)', [p10[0].id, '/products/shoe-printer.jpg', 'Shoe Printer']);

  // Banner slides for 3-col carousel
  await conn.query(`INSERT INTO banner_slides (title, subtitle, description, image, button_text, button_link, sort_order, is_active) VALUES
    ('Next Level Adventure', 'EXPLORE 3D PRINTING', 'Discover our range of professional 3D printers designed for precision and reliability.', '/products/printer-main.jpg', 'Shop Now', '/product/prolite-m4k', 10, 1),
    ('Premium Resin Collection', '12+ COLORS AVAILABLE', 'From water-washable to engineering grade — find the perfect resin for your project.', '/products/resin-washable-1kg.jpg', 'Shop Now', '/product/washable-resin-premium', 11, 1),
    ('Precision Dental Solutions', 'DENTAL GRADE RESINS', 'Biocompatible materials for crowns, bridges and orthodontic applications.', '/products/dental-resin.jpg', 'Explore', '/product/dental-model-resin', 12, 1)`);

  console.log('Seed complete!');
  await conn.end();
}

seed().catch(e => { console.error(e.message); process.exit(1); });
