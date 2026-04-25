-- Backup 2026-04-25T03:18:19.918Z

--- Table: banner_slides ---
CREATE TABLE `banner_slides` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `button_text` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `button_link` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=60001;

INSERT INTO banner_slides (id,title,subtitle,description,image,button_text,button_link,sort_order,is_active) VALUES (30001,'CS3D ProLite M4K','4K MONOCHROME LCD 3D PRINTER','Experience ultra-high precision with 0.05mm XY resolution. Print speed up to 50mm/h with 2000+ hour screen lifespan.','/slides/hero-1.jpg','Shop Now','/product/prolite-m4k',1,1);
INSERT INTO banner_slides (id,title,subtitle,description,image,button_text,button_link,sort_order,is_active) VALUES (30002,'Washable Resin Premium','WATER-WASHABLE 405NM RESIN','No IPA needed — just wash with water. 12+ colors available. High toughness with low shrinkage.','/slides/hero-2.jpg','Shop Now','/product/washable-resin-premium',2,1);
INSERT INTO banner_slides (id,title,subtitle,description,image,button_text,button_link,sort_order,is_active) VALUES (30003,'Explore Our Collection','PREMIUM 3D PRINTING MATERIALS','From dental to engineering resins, casting to rigid — find the perfect material for your next project.','/slides/hero-3.jpg','Explore All','/products',3,1);
INSERT INTO banner_slides (id,title,subtitle,description,image,button_text,button_link,sort_order,is_active) VALUES (30004,'Next Level Adventure','EXPLORE 3D PRINTING','Discover our range of professional 3D printers designed for precision and reliability.','/products/printer-main.jpg','Shop Now','/product/prolite-m4k',10,1);
INSERT INTO banner_slides (id,title,subtitle,description,image,button_text,button_link,sort_order,is_active) VALUES (30005,'Premium Resin Collection','12+ COLORS AVAILABLE','From water-washable to engineering grade — find the perfect resin for your project.','/products/resin-washable-1kg.jpg','Shop Now','/product/washable-resin-premium',11,1);
INSERT INTO banner_slides (id,title,subtitle,description,image,button_text,button_link,sort_order,is_active) VALUES (30006,'Precision Dental Solutions','DENTAL GRADE RESINS','Biocompatible materials for crowns, bridges and orthodontic applications.','/products/dental-resin.jpg','Explore','/product/dental-model-resin',12,1);

--- Table: cart_items ---
CREATE TABLE `cart_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `session_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` int NOT NULL,
  `variant_id` int DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--- Table: categories ---
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `categories_slug_unique` (`slug`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=287644;

INSERT INTO categories (id,name,slug,description,image,sort_order,is_active,created_at,parent_id) VALUES (60001,'3D Printer','3d-printer','Professional LCD/DLP 3D printers for various industries',NULL,1,1,Fri Apr 24 2026 14:33:58 GMT+0800 (China Standard Time),NULL);
INSERT INTO categories (id,name,slug,description,image,sort_order,is_active,created_at,parent_id) VALUES (60002,'Resin','resin','Premium photopolymer resins for 405nm printers',NULL,2,1,Fri Apr 24 2026 14:33:58 GMT+0800 (China Standard Time),NULL);
INSERT INTO categories (id,name,slug,description,image,sort_order,is_active,created_at,parent_id) VALUES (60003,'Accessories','accessories','Printer parts, films, and tools',NULL,3,1,Fri Apr 24 2026 14:33:58 GMT+0800 (China Standard Time),NULL);
INSERT INTO categories (id,name,slug,description,image,sort_order,is_active,created_at,parent_id) VALUES (60004,'Dental 3d Printer','dental-3d-printer','High precision dental 3D printers',NULL,1,1,Fri Apr 24 2026 14:33:59 GMT+0800 (China Standard Time),60001);
INSERT INTO categories (id,name,slug,description,image,sort_order,is_active,created_at,parent_id) VALUES (60005,'Industrial 3d Printer','industrial-3d-printer','Large format industrial printers',NULL,2,1,Fri Apr 24 2026 14:33:59 GMT+0800 (China Standard Time),60001);
INSERT INTO categories (id,name,slug,description,image,sort_order,is_active,created_at,parent_id) VALUES (60006,'Jewelry 3d Printer','jewelry-3d-printer','Precision jewelry casting printers',NULL,3,1,Fri Apr 24 2026 14:33:59 GMT+0800 (China Standard Time),60001);
INSERT INTO categories (id,name,slug,description,image,sort_order,is_active,created_at,parent_id) VALUES (60007,'Shoe 3d Printer','shoe-3d-printer','Shoe mold 3D printers',NULL,4,1,Fri Apr 24 2026 14:33:59 GMT+0800 (China Standard Time),60001);
INSERT INTO categories (id,name,slug,description,image,sort_order,is_active,created_at,parent_id) VALUES (60008,'Wash & Cure Machine','wash-cure-machine','Post-processing wash and cure stations',NULL,5,1,Fri Apr 24 2026 14:33:59 GMT+0800 (China Standard Time),60001);
INSERT INTO categories (id,name,slug,description,image,sort_order,is_active,created_at,parent_id) VALUES (60009,'Casting Resin Series','casting-resin-series','Casting resin for jewelry and metal',NULL,1,1,Fri Apr 24 2026 14:33:59 GMT+0800 (China Standard Time),60002);
INSERT INTO categories (id,name,slug,description,image,sort_order,is_active,created_at,parent_id) VALUES (60010,'Dental Resin Series','dental-resin-series','Biocompatible dental model resins',NULL,2,1,Fri Apr 24 2026 14:33:59 GMT+0800 (China Standard Time),60002);
INSERT INTO categories (id,name,slug,description,image,sort_order,is_active,created_at,parent_id) VALUES (60011,'Engineering Resin Series','engineering-resin-series','ABS-like tough resins',NULL,3,1,Fri Apr 24 2026 14:33:59 GMT+0800 (China Standard Time),60002);
INSERT INTO categories (id,name,slug,description,image,sort_order,is_active,created_at,parent_id) VALUES (60012,'Rigid Resin Series','rigid-resin-series','High stiffness rigid resins',NULL,4,1,Fri Apr 24 2026 14:33:59 GMT+0800 (China Standard Time),60002);
INSERT INTO categories (id,name,slug,description,image,sort_order,is_active,created_at,parent_id) VALUES (60013,'Other Resin Series','other-resin-series','Specialty resins',NULL,5,1,Fri Apr 24 2026 14:33:59 GMT+0800 (China Standard Time),60002);
INSERT INTO categories (id,name,slug,description,image,sort_order,is_active,created_at,parent_id) VALUES (60014,'3d Printer Mono LCD','3d-printer-mono-lcd','Replacement LCD screens',NULL,1,1,Fri Apr 24 2026 14:33:59 GMT+0800 (China Standard Time),60003);
INSERT INTO categories (id,name,slug,description,image,sort_order,is_active,created_at,parent_id) VALUES (60015,'ACF/PFA Films','acf-pfa-films','Release films and FEP sheets',NULL,2,1,Fri Apr 24 2026 14:33:59 GMT+0800 (China Standard Time),60003);

--- Table: inquiries ---
CREATE TABLE `inquiries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_ids` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--- Table: pages ---
CREATE TABLE `pages` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=2030001;

INSERT INTO pages (id,title,slug,content,meta_description,is_active,sort_order,created_at,updated_at) VALUES (1,'About Us','about-us','<p>CreateShape3D is a leading manufacturer of professional LCD 3D printers and premium resins. With over 10 years of experience, we serve customers in 50+ countries worldwide.</p><p>Our mission is to make high-precision 3D printing accessible to dental practices, jewelry workshops, and industrial manufacturers.</p>','Learn about CreateShape3D - professional 3D printing solutions.',1,1,Fri Apr 24 2026 03:06:08 GMT+0800 (China Standard Time),Fri Apr 24 2026 03:06:08 GMT+0800 (China Standard Time));
INSERT INTO pages (id,title,slug,content,meta_description,is_active,sort_order,created_at,updated_at) VALUES (2,'Privacy Policy','privacy-policy','<p>At CreateShape3D, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.</p><h2>Information Collection</h2><p>We collect information you provide when placing orders, contacting support, or subscribing to our newsletter.</p>','CreateShape3D Privacy Policy',1,2,Fri Apr 24 2026 03:06:08 GMT+0800 (China Standard Time),Fri Apr 24 2026 03:06:08 GMT+0800 (China Standard Time));
INSERT INTO pages (id,title,slug,content,meta_description,is_active,sort_order,created_at,updated_at) VALUES (2000001,'FAQs','faq','<h2>Frequently Asked Questions</h2><p><strong>Q: What is your return policy?</strong></p><p>A: We offer a 30-day return policy for all unused products in original packaging.</p><p><strong>Q: Do you ship internationally?</strong></p><p>A: Yes, we ship worldwide. Shipping times vary by location.</p><p><strong>Q: What payment methods do you accept?</strong></p><p>A: We accept credit cards, PayPal, and bank transfers.</p>','Find answers to frequently asked questions about our 3D printers, resins, shipping, and support.',1,3,Fri Apr 24 2026 14:49:46 GMT+0800 (China Standard Time),Fri Apr 24 2026 14:49:46 GMT+0800 (China Standard Time));
INSERT INTO pages (id,title,slug,content,meta_description,is_active,sort_order,created_at,updated_at) VALUES (2000002,'Terms of Service','terms-of-service','<h2>Terms of Service</h2><p>By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.</p><h3>1. Use License</h3><p>Permission is granted to temporarily download one copy of the materials for personal, non-commercial transitory viewing only.</p><h3>2. Disclaimer</h3><p>The materials on this website are provided on an ''as is'' basis. We make no warranties, expressed or implied.</p>','Read our Terms of Service governing the use of CreateShape3D website and products.',1,4,Fri Apr 24 2026 14:49:46 GMT+0800 (China Standard Time),Fri Apr 24 2026 14:49:46 GMT+0800 (China Standard Time));
INSERT INTO pages (id,title,slug,content,meta_description,is_active,sort_order,created_at,updated_at) VALUES (2000003,'Blog','blog','<h2>Latest News & Articles</h2><p>Welcome to the CreateShape3D blog. Here you will find the latest updates, tutorials, and industry insights about 3D printing technology.</p>','Stay updated with the latest 3D printing news, tutorials, and product updates from CreateShape3D.',1,5,Fri Apr 24 2026 14:49:46 GMT+0800 (China Standard Time),Fri Apr 24 2026 14:49:46 GMT+0800 (China Standard Time));
INSERT INTO pages (id,title,slug,content,meta_description,is_active,sort_order,created_at,updated_at) VALUES (2000004,'Contact Us','contact','<h2>Contact Us</h2><p>We would love to hear from you. Reach out to us through any of the channels below:</p><p><strong>Email:</strong> sales@createshape3d.com</p><p><strong>Phone:</strong> +86 400-888-3D88</p><p><strong>Address:</strong> Shenzhen, China</p><p>For inquiries, please visit our <a href="/inquiry">Inquiry Page</a>.</p>','Get in touch with CreateShape3D. Find our email, phone number, and address here.',1,6,Fri Apr 24 2026 14:49:46 GMT+0800 (China Standard Time),Fri Apr 24 2026 14:49:46 GMT+0800 (China Standard Time));

--- Table: product_images ---
CREATE TABLE `product_images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT '0',
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=194709;

INSERT INTO product_images (id,product_id,url,alt,is_primary,sort_order,created_at) VALUES (90001,90001,'/products/printer-main.jpg','ProLite M4K',1,0,Fri Apr 24 2026 14:34:00 GMT+0800 (China Standard Time));
INSERT INTO product_images (id,product_id,url,alt,is_primary,sort_order,created_at) VALUES (90002,90001,'/products/print-sample-1.jpg','Sample 1',0,1,Fri Apr 24 2026 14:34:00 GMT+0800 (China Standard Time));
INSERT INTO product_images (id,product_id,url,alt,is_primary,sort_order,created_at) VALUES (90003,90001,'/products/print-sample-4.jpg','Sample 2',0,2,Fri Apr 24 2026 14:34:00 GMT+0800 (China Standard Time));
INSERT INTO product_images (id,product_id,url,alt,is_primary,sort_order,created_at) VALUES (90004,90002,'/products/resin-washable-1kg.jpg','Washable Resin',1,0,Fri Apr 24 2026 14:34:00 GMT+0800 (China Standard Time));
INSERT INTO product_images (id,product_id,url,alt,is_primary,sort_order,created_at) VALUES (90005,90002,'/products/print-sample-1.jpg','Miniature',0,1,Fri Apr 24 2026 14:34:00 GMT+0800 (China Standard Time));
INSERT INTO product_images (id,product_id,url,alt,is_primary,sort_order,created_at) VALUES (90006,90002,'/products/print-sample-2.jpg','Dental',0,2,Fri Apr 24 2026 14:34:00 GMT+0800 (China Standard Time));
INSERT INTO product_images (id,product_id,url,alt,is_primary,sort_order,created_at) VALUES (90007,90002,'/products/print-sample-3.jpg','Jewelry',0,3,Fri Apr 24 2026 14:34:00 GMT+0800 (China Standard Time));
INSERT INTO product_images (id,product_id,url,alt,is_primary,sort_order,created_at) VALUES (90008,90003,'/products/dental-printer.jpg','Dental Pro',1,0,Fri Apr 24 2026 14:34:02 GMT+0800 (China Standard Time));
INSERT INTO product_images (id,product_id,url,alt,is_primary,sort_order,created_at) VALUES (90009,90004,'/products/jewelry-printer.jpg','Jewelry Pro',1,0,Fri Apr 24 2026 14:34:02 GMT+0800 (China Standard Time));
INSERT INTO product_images (id,product_id,url,alt,is_primary,sort_order,created_at) VALUES (90010,90005,'/products/dental-resin.jpg','Dental Resin',1,0,Fri Apr 24 2026 14:34:03 GMT+0800 (China Standard Time));
INSERT INTO product_images (id,product_id,url,alt,is_primary,sort_order,created_at) VALUES (90011,90006,'/products/casting-resin.jpg','Casting Resin',1,0,Fri Apr 24 2026 14:34:03 GMT+0800 (China Standard Time));
INSERT INTO product_images (id,product_id,url,alt,is_primary,sort_order,created_at) VALUES (90012,90007,'/products/rigid-resin.jpg','Rigid Resin',1,0,Fri Apr 24 2026 14:34:03 GMT+0800 (China Standard Time));
INSERT INTO product_images (id,product_id,url,alt,is_primary,sort_order,created_at) VALUES (90013,90008,'/products/wash-cure.jpg','Wash & Cure',1,0,Fri Apr 24 2026 14:34:03 GMT+0800 (China Standard Time));
INSERT INTO product_images (id,product_id,url,alt,is_primary,sort_order,created_at) VALUES (90014,90009,'/products/fep-film.jpg','FEP Film',1,0,Fri Apr 24 2026 14:34:04 GMT+0800 (China Standard Time));
INSERT INTO product_images (id,product_id,url,alt,is_primary,sort_order,created_at) VALUES (90015,90010,'/products/shoe-printer.jpg','Shoe Printer',1,0,Fri Apr 24 2026 14:34:04 GMT+0800 (China Standard Time));

--- Table: product_variants ---
CREATE TABLE `product_variants` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size_option_id` int DEFAULT NULL,
  `color_option_id` int DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `compare_at_price` decimal(10,2) DEFAULT NULL,
  `weight` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stock_quantity` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=188477;

INSERT INTO product_variants (id,product_id,sku,size_option_id,color_option_id,price,compare_at_price,weight,stock_quantity,is_active,created_at) VALUES (90001,90001,'M4K-STD',90001,NULL,'299.99','399.99','9.5kg',25,1,Fri Apr 24 2026 14:34:00 GMT+0800 (China Standard Time));
INSERT INTO product_variants (id,product_id,sku,size_option_id,color_option_id,price,compare_at_price,weight,stock_quantity,is_active,created_at) VALUES (90002,90002,'WR-BLK-1KG',90002,90005,'25.99','35.99','1.1kg',100,1,Fri Apr 24 2026 14:34:01 GMT+0800 (China Standard Time));
INSERT INTO product_variants (id,product_id,sku,size_option_id,color_option_id,price,compare_at_price,weight,stock_quantity,is_active,created_at) VALUES (90003,90002,'WR-BLK-2KG',90003,90005,'49.99','65.99','2.2kg',80,1,Fri Apr 24 2026 14:34:01 GMT+0800 (China Standard Time));
INSERT INTO product_variants (id,product_id,sku,size_option_id,color_option_id,price,compare_at_price,weight,stock_quantity,is_active,created_at) VALUES (90004,90002,'WR-WHT-1KG',90002,90006,'25.99','35.99','1.1kg',90,1,Fri Apr 24 2026 14:34:01 GMT+0800 (China Standard Time));
INSERT INTO product_variants (id,product_id,sku,size_option_id,color_option_id,price,compare_at_price,weight,stock_quantity,is_active,created_at) VALUES (90005,90002,'WR-WHT-2KG',90003,90006,'49.99','65.99','2.2kg',75,1,Fri Apr 24 2026 14:34:02 GMT+0800 (China Standard Time));
INSERT INTO product_variants (id,product_id,sku,size_option_id,color_option_id,price,compare_at_price,weight,stock_quantity,is_active,created_at) VALUES (90006,90002,'WR-GRY-1KG',90002,90007,'25.99','35.99','1.1kg',85,1,Fri Apr 24 2026 14:34:02 GMT+0800 (China Standard Time));
INSERT INTO product_variants (id,product_id,sku,size_option_id,color_option_id,price,compare_at_price,weight,stock_quantity,is_active,created_at) VALUES (90007,90002,'WR-PNK-1KG',90002,90008,'27.99','37.99','1.1kg',60,1,Fri Apr 24 2026 14:34:02 GMT+0800 (China Standard Time));
INSERT INTO product_variants (id,product_id,sku,size_option_id,color_option_id,price,compare_at_price,weight,stock_quantity,is_active,created_at) VALUES (90008,90002,'WR-TBL-1KG',90002,90009,'27.99','37.99','1.1kg',70,1,Fri Apr 24 2026 14:34:02 GMT+0800 (China Standard Time));
INSERT INTO product_variants (id,product_id,sku,size_option_id,color_option_id,price,compare_at_price,weight,stock_quantity,is_active,created_at) VALUES (90009,90002,'WR-CLR-1KG',90002,90012,'29.99','39.99','1.1kg',55,1,Fri Apr 24 2026 14:34:02 GMT+0800 (China Standard Time));

--- Table: products ---
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_desc` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tagline` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `badge` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brand` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'CreateShape3D',
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `base_price` decimal(10,2) DEFAULT NULL,
  `compare_at_price` decimal(10,2) DEFAULT NULL,
  `currency` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT 'USD',
  `main_image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `highlights_json` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `features_json` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stats_json` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `specs_json` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applications_json` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `faqs_json` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `compat_tags_json` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `oem_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `oem_desc` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `oem_perks_json` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta_desc` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta_btn` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_featured` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `products_slug_unique` (`slug`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=201517;

INSERT INTO products (id,name,slug,subtitle,description,short_desc,tagline,category_id,badge,brand,sku,base_price,compare_at_price,currency,main_image,highlights_json,features_json,stats_json,specs_json,applications_json,faqs_json,compat_tags_json,oem_title,oem_desc,oem_perks_json,cta_title,cta_desc,cta_btn,sort_order,is_active,created_at,updated_at,is_featured) VALUES (90001,'CS3D ProLite M4K','prolite-m4k','Desktop LCD resin 3D printer with 4K monochrome screen. Perfect for beginners and small studios.','High precision LCD 3D printer with 4K monochrome screen, XY resolution of 0.05mm, and print speed up to 50mm/h.','4K Mono LCD · 0.05mm XY Precision · 50mm/h Speed','4K MONOCHROME LCD',60005,'POPULAR','CreateShape3D','CS3D-M4K','299.99','399.99','USD','/products/printer-main.jpg','[{"icon":"monitor","text":"4K Mono LCD"},{"icon":"crosshair","text":"0.05mm Precision"},{"icon":"zap","text":"50mm/h Speed"},{"icon":"shield","text":"2-Year Warranty"}]','[{"icon":"monitor","title":"4K Monochrome LCD","desc":"3840x2400 resolution with 2000+ hour lifespan."},{"icon":"crosshair","title":"0.05mm XY Precision","desc":"50-micron pixel size for ultra-fine details."},{"icon":"zap","title":"50mm/h Print Speed","desc":"Lightning-fast layer exposure."},{"icon":"shield","title":"2-Year Warranty","desc":"Covers screen, mainboard, and mechanical parts."}]','[{"value":"3840x2400","label":"Resolution"},{"value":"0.05mm","label":"XY Precision"},{"value":"50mm/h","label":"Print Speed"},{"value":"135x75x150","label":"Build Volume"}]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,Fri Apr 24 2026 14:34:00 GMT+0800 (China Standard Time),Fri Apr 24 2026 14:34:00 GMT+0800 (China Standard Time),1);
INSERT INTO products (id,name,slug,subtitle,description,short_desc,tagline,category_id,badge,brand,sku,base_price,compare_at_price,currency,main_image,highlights_json,features_json,stats_json,specs_json,applications_json,faqs_json,compat_tags_json,oem_title,oem_desc,oem_perks_json,cta_title,cta_desc,cta_btn,sort_order,is_active,created_at,updated_at,is_featured) VALUES (90002,'Washable Resin Premium','washable-resin-premium','Professional-grade water-washable resin for 405nm LCD/DLP 3D printers. No IPA needed.','Our hydrophilic formula eliminates the need for IPA. Simply rinse with plain tap water.','No IPA needed — just wash with water. 12+ colors available.','WATER-WASHABLE RESIN',60013,'BESTSELLER','CreateShape3D','CS3D-WR','25.99','35.99','USD','/products/resin-washable-1kg.jpg','[{"icon":"droplet","text":"Water-Washable"},{"icon":"shield","text":"High Toughness"},{"icon":"zap","text":"Low Shrinkage"},{"icon":"target","text":"±0.15mm Accuracy"}]',NULL,'[{"value":"16–22%","label":"Elongation"},{"value":"±0.15mm","label":"Accuracy"},{"value":"2.2–5.5%","label":"Shrinkage"},{"value":"12+","label":"Colors"}]',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,1,Fri Apr 24 2026 14:34:00 GMT+0800 (China Standard Time),Fri Apr 24 2026 14:34:00 GMT+0800 (China Standard Time),1);
INSERT INTO products (id,name,slug,subtitle,description,short_desc,tagline,category_id,badge,brand,sku,base_price,compare_at_price,currency,main_image,highlights_json,features_json,stats_json,specs_json,applications_json,faqs_json,compat_tags_json,oem_title,oem_desc,oem_perks_json,cta_title,cta_desc,cta_btn,sort_order,is_active,created_at,updated_at,is_featured) VALUES (90003,'CS3D Dental Pro D6K','dental-pro-d6k','High precision dental 3D printer for crowns, bridges, aligners and surgical guides.','Professional dental 3D printer with integrated software for dental workflows. Compatible with all dental resins.','Dental Grade · 0.03mm Precision · Biocompatible','DENTAL 3D PRINTER',60004,'NEW','CreateShape3D','CS3D-D6K','599.99','799.99','USD','/products/dental-printer.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,1,Fri Apr 24 2026 14:34:02 GMT+0800 (China Standard Time),Fri Apr 24 2026 14:34:02 GMT+0800 (China Standard Time),1);
INSERT INTO products (id,name,slug,subtitle,description,short_desc,tagline,category_id,badge,brand,sku,base_price,compare_at_price,currency,main_image,highlights_json,features_json,stats_json,specs_json,applications_json,faqs_json,compat_tags_json,oem_title,oem_desc,oem_perks_json,cta_title,cta_desc,cta_btn,sort_order,is_active,created_at,updated_at,is_featured) VALUES (90004,'CS3D Jewelry Pro J4K','jewelry-pro-j4k','Precision jewelry 3D printer for master pattern and casting. Capture the finest details.','Specialized jewelry 3D printer with 4K resolution for intricate ring, pendant, and earring designs.','4K Detail · Casting Ready · Smooth Surface','JEWELRY 3D PRINTER',60006,NULL,'CreateShape3D','CS3D-J4K','499.99','649.99','USD','/products/jewelry-printer.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,1,Fri Apr 24 2026 14:34:02 GMT+0800 (China Standard Time),Fri Apr 24 2026 14:34:02 GMT+0800 (China Standard Time),1);
INSERT INTO products (id,name,slug,subtitle,description,short_desc,tagline,category_id,badge,brand,sku,base_price,compare_at_price,currency,main_image,highlights_json,features_json,stats_json,specs_json,applications_json,faqs_json,compat_tags_json,oem_title,oem_desc,oem_perks_json,cta_title,cta_desc,cta_btn,sort_order,is_active,created_at,updated_at,is_featured) VALUES (90005,'Dental Model Resin','dental-model-resin','Biocompatible dental model resin for crowns, bridges and orthodontic models.','FDA-compliant dental resin with high accuracy and smooth surface finish. Ideal for dental labs.','Biocompatible · High Accuracy · Smooth Finish','DENTAL RESIN SERIES',60010,'NEW','CreateShape3D','CS3D-DMR','45.99','59.99','USD','/products/dental-resin.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,1,Fri Apr 24 2026 14:34:02 GMT+0800 (China Standard Time),Fri Apr 24 2026 14:34:02 GMT+0800 (China Standard Time),1);
INSERT INTO products (id,name,slug,subtitle,description,short_desc,tagline,category_id,badge,brand,sku,base_price,compare_at_price,currency,main_image,highlights_json,features_json,stats_json,specs_json,applications_json,faqs_json,compat_tags_json,oem_title,oem_desc,oem_perks_json,cta_title,cta_desc,cta_btn,sort_order,is_active,created_at,updated_at,is_featured) VALUES (90006,'Casting Resin Premium','casting-resin-premium','Ash-free casting resin for jewelry and metal casting applications.','Premium casting resin with zero ash residue. Perfect for investment casting of gold, silver and platinum jewelry.','Zero Ash · High Detail · Perfect for Gold/Silver','CASTING RESIN SERIES',60009,NULL,'CreateShape3D','CS3D-CR','39.99','49.99','USD','/products/casting-resin.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,1,Fri Apr 24 2026 14:34:03 GMT+0800 (China Standard Time),Fri Apr 24 2026 14:34:03 GMT+0800 (China Standard Time),0);
INSERT INTO products (id,name,slug,subtitle,description,short_desc,tagline,category_id,badge,brand,sku,base_price,compare_at_price,currency,main_image,highlights_json,features_json,stats_json,specs_json,applications_json,faqs_json,compat_tags_json,oem_title,oem_desc,oem_perks_json,cta_title,cta_desc,cta_btn,sort_order,is_active,created_at,updated_at,is_featured) VALUES (90007,'Rigid Engineering Resin','rigid-engineering-resin','High stiffness ABS-like resin for functional prototypes and engineering parts.','Engineering-grade rigid resin with Shore 85D hardness. Perfect for jigs, fixtures, and functional testing.','Shore 85D · ABS-Like · Functional Parts','RIGID RESIN SERIES',60012,NULL,'CreateShape3D','CS3D-RER','32.99','42.99','USD','/products/rigid-resin.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,1,Fri Apr 24 2026 14:34:03 GMT+0800 (China Standard Time),Fri Apr 24 2026 14:34:03 GMT+0800 (China Standard Time),0);
INSERT INTO products (id,name,slug,subtitle,description,short_desc,tagline,category_id,badge,brand,sku,base_price,compare_at_price,currency,main_image,highlights_json,features_json,stats_json,specs_json,applications_json,faqs_json,compat_tags_json,oem_title,oem_desc,oem_perks_json,cta_title,cta_desc,cta_btn,sort_order,is_active,created_at,updated_at,is_featured) VALUES (90008,'Wash & Cure Station Plus','wash-cure-station','2-in-1 wash and UV cure station for resin 3D prints.','Automated washing and curing station. Removes uncured resin and cures prints for maximum strength.','2-in-1 · Auto Wash · UV Cure','WASH & CURE',60008,NULL,'CreateShape3D','CS3D-WCS','129.99','169.99','USD','/products/wash-cure.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,8,1,Fri Apr 24 2026 14:34:03 GMT+0800 (China Standard Time),Fri Apr 24 2026 14:34:03 GMT+0800 (China Standard Time),0);
INSERT INTO products (id,name,slug,subtitle,description,short_desc,tagline,category_id,badge,brand,sku,base_price,compare_at_price,currency,main_image,highlights_json,features_json,stats_json,specs_json,applications_json,faqs_json,compat_tags_json,oem_title,oem_desc,oem_perks_json,cta_title,cta_desc,cta_btn,sort_order,is_active,created_at,updated_at,is_featured) VALUES (90009,'Premium FEP Film Set','premium-fep-film','High-release FEP and nFEP films for LCD resin printers.','Premium grade FEP release films with excellent optical clarity and long service life. Pack of 5 sheets.','Optical Grade · Long Life · Pack of 5','ACF/PFA FILMS',60015,NULL,'CreateShape3D','CS3D-FEP','15.99','22.99','USD','/products/fep-film.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,9,1,Fri Apr 24 2026 14:34:03 GMT+0800 (China Standard Time),Fri Apr 24 2026 14:34:03 GMT+0800 (China Standard Time),0);
INSERT INTO products (id,name,slug,subtitle,description,short_desc,tagline,category_id,badge,brand,sku,base_price,compare_at_price,currency,main_image,highlights_json,features_json,stats_json,specs_json,applications_json,faqs_json,compat_tags_json,oem_title,oem_desc,oem_perks_json,cta_title,cta_desc,cta_btn,sort_order,is_active,created_at,updated_at,is_featured) VALUES (90010,'CS3D Shoe Mold S8K','shoe-mold-s8k','Large format 3D printer for shoe sole molds and prototypes.','Specialized shoe mold 3D printer with large build volume for full-size shoe sole printing.','Large Volume · Shoe Ready · Fast Print','SHOE 3D PRINTER',60007,NULL,'CreateShape3D','CS3D-S8K','899.99','1199.99','USD','/products/shoe-printer.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10,1,Fri Apr 24 2026 14:34:04 GMT+0800 (China Standard Time),Fri Apr 24 2026 14:34:04 GMT+0800 (China Standard Time),0);

--- Table: site_settings ---
CREATE TABLE `site_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'general',
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `site_settings_key_unique` (`key`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=30001;

INSERT INTO site_settings (id,key,value,label,group_name) VALUES (1,'phone','+86 400-888-3D88','Phone','general');
INSERT INTO site_settings (id,key,value,label,group_name) VALUES (2,'email','sales@createshape3d.com','Email','general');
INSERT INTO site_settings (id,key,value,label,group_name) VALUES (3,'address','Shenzhen, China','Address','general');
INSERT INTO site_settings (id,key,value,label,group_name) VALUES (4,'site_name','CreateShape3D','Site Name','general');
INSERT INTO site_settings (id,key,value,label,group_name) VALUES (5,'site_logo','CreateShape3D','Logo Text','general');
INSERT INTO site_settings (id,key,value,label,group_name) VALUES (6,'currency','USD','Currency','general');
INSERT INTO site_settings (id,key,value,label,group_name) VALUES (7,'free_shipping_threshold','99','Free Shipping Threshold (USD)','general');

--- Table: users ---
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--- Table: variant_attribute_options ---
CREATE TABLE `variant_attribute_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `attribute_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hex_code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=191483;

INSERT INTO variant_attribute_options (id,product_id,attribute_type,value,display_name,hex_code,sort_order,created_at) VALUES (90001,90001,'size','standard','Standard',NULL,1,Fri Apr 24 2026 14:34:00 GMT+0800 (China Standard Time));
INSERT INTO variant_attribute_options (id,product_id,attribute_type,value,display_name,hex_code,sort_order,created_at) VALUES (90002,90002,'size','1kg','1 KG',NULL,1,Fri Apr 24 2026 14:34:00 GMT+0800 (China Standard Time));
INSERT INTO variant_attribute_options (id,product_id,attribute_type,value,display_name,hex_code,sort_order,created_at) VALUES (90003,90002,'size','2kg','2 KG',NULL,2,Fri Apr 24 2026 14:34:00 GMT+0800 (China Standard Time));
INSERT INTO variant_attribute_options (id,product_id,attribute_type,value,display_name,hex_code,sort_order,created_at) VALUES (90004,90002,'size','3kg','3 KG',NULL,3,Fri Apr 24 2026 14:34:01 GMT+0800 (China Standard Time));
INSERT INTO variant_attribute_options (id,product_id,attribute_type,value,display_name,hex_code,sort_order,created_at) VALUES (90005,90002,'color','black','Black','#212721',1,Fri Apr 24 2026 14:34:01 GMT+0800 (China Standard Time));
INSERT INTO variant_attribute_options (id,product_id,attribute_type,value,display_name,hex_code,sort_order,created_at) VALUES (90006,90002,'color','white','White','#EFF0F1',2,Fri Apr 24 2026 14:34:01 GMT+0800 (China Standard Time));
INSERT INTO variant_attribute_options (id,product_id,attribute_type,value,display_name,hex_code,sort_order,created_at) VALUES (90007,90002,'color','grey','Grey','#7E93A7',3,Fri Apr 24 2026 14:34:01 GMT+0800 (China Standard Time));
INSERT INTO variant_attribute_options (id,product_id,attribute_type,value,display_name,hex_code,sort_order,created_at) VALUES (90008,90002,'color','pink','Cherry Blossom Pink','#F5DADF',4,Fri Apr 24 2026 14:34:01 GMT+0800 (China Standard Time));
INSERT INTO variant_attribute_options (id,product_id,attribute_type,value,display_name,hex_code,sort_order,created_at) VALUES (90009,90002,'color','translucent-blue','Translucent Blue','rgba(7,124,171,.7)',5,Fri Apr 24 2026 14:34:01 GMT+0800 (China Standard Time));
INSERT INTO variant_attribute_options (id,product_id,attribute_type,value,display_name,hex_code,sort_order,created_at) VALUES (90010,90002,'color','translucent-green','Translucent Green','rgba(0,154,23,.7)',6,Fri Apr 24 2026 14:34:01 GMT+0800 (China Standard Time));
INSERT INTO variant_attribute_options (id,product_id,attribute_type,value,display_name,hex_code,sort_order,created_at) VALUES (90011,90002,'color','translucent-red','Translucent Red','rgba(210,38,48,.7)',7,Fri Apr 24 2026 14:34:01 GMT+0800 (China Standard Time));
INSERT INTO variant_attribute_options (id,product_id,attribute_type,value,display_name,hex_code,sort_order,created_at) VALUES (90012,90002,'color','clear','Clear','rgba(255,255,255,.15)',8,Fri Apr 24 2026 14:34:01 GMT+0800 (China Standard Time));

