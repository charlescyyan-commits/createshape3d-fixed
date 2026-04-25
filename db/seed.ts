import { db } from "../api/queries/connection";
import { categories, products, productImages, productVariants, variantAttributeOptions, siteSettings } from "./schema";

async function seed() {
  // Check if already seeded
  const existing = await db.query.products.findMany({ limit: 1 });
  if (existing.length > 0) {
    console.log("Already seeded, skipping.");
    return;
  }

  // Categories
  const [catPrinter] = await db.insert(categories).values({ name: "3D Printer", slug: "3d-printer", description: "Professional LCD/DLP 3D printers", sortOrder: 1 }).$returningId();
  const [catResin] = await db.insert(categories).values({ name: "Resin", slug: "resin", description: "Premium photopolymer resins", sortOrder: 2 }).$returningId();
  const [catAccessories] = await db.insert(categories).values({ name: "Accessories", slug: "accessories", description: "Printer parts and tools", sortOrder: 3 }).$returningId();

  // Product 1: Washable Resin
  const [resin1] = await db.insert(products).values({
    name: "Washable Resin Premium",
    slug: "washable-resin-premium",
    tagline: "WATER-WASHABLE RESIN",
    subtitle: "Professional-grade water-washable resin for 405nm LCD/DLP 3D printers. No IPA needed — just wash with water.",
    description: "Our hydrophilic formula eliminates the need for IPA. Simply rinse with plain tap water — saving money and reducing chemical waste.",
    shortDesc: "No IPA needed — just wash with water. High toughness, low shrinkage.",
    categoryId: catResin.id,
    badge: "BESTSELLER",
    brand: "CreateShape3D",
    sku: "CS3D-WR",
    basePrice: "25.99",
    compareAtPrice: "35.99",
    currency: "USD",
    mainImage: "/products/resin-washable-1kg.jpg",
    highlightsJson: JSON.stringify([
      { icon: "droplet", text: "Water-Washable" },
      { icon: "shield", text: "High Toughness" },
      { icon: "zap", text: "Low Shrinkage" },
      { icon: "wind", text: "Low Odor" },
      { icon: "target", text: "±0.15mm Accuracy" },
    ]),
    featuresJson: JSON.stringify([
      { icon: "droplet", title: "Water-Washable & Eco-Friendly", desc: "Our hydrophilic formula eliminates the need for IPA. Simply rinse with plain tap water — saving money and reducing chemical waste." },
      { icon: "shield", title: "High Toughness — Won't Crack", desc: "Up to 22% elongation at break gives models real-world durability. They resist impact and flex under pressure." },
      { icon: "target", title: "Ultra-Low Shrinkage", desc: "Volume shrinkage as low as 2.2% means prints come out true to dimensions. Capture hair strands and micro-textures." },
      { icon: "zap", title: "Low Odor — Print Anywhere", desc: "A noticeably cleaner experience with minimal chemical odor. Suitable for home offices and shared workspaces." },
      { icon: "thermometer", title: "Cold-Weather Performance", desc: "Maintains low viscosity down to 15°C, ensuring smooth resin flow and reliable layer adhesion in winter." },
      { icon: "sun", title: "Long-Term Color Stability", desc: "Minimized moisture absorption keeps colors vivid and structures solid even after months on display." },
    ]),
    statsJson: JSON.stringify([
      { value: "16–22%", label: "Elongation at Break" },
      { value: "±0.15mm", label: "Print Accuracy" },
      { value: "2.2–5.5%", label: "Volume Shrinkage" },
      { value: "12+", label: "Color Options" },
    ]),
    specsJson: JSON.stringify([
      { title: "Physical Properties", rows: [
        ["Material Type", "Hydrophilic Modified Photopolymer"],
        ["UV Wavelength", "365 – 405 nm"],
        ["Viscosity @ 25°C", "190 – 230 mPa·s"],
        ["Density", "1.07 – 1.09 g/cm³"],
      ]},
      { title: "Mechanical Properties", rows: [
        ["Shore Hardness", "82 – 85 HD"],
        ["Tensile Strength", "38 – 43 MPa"],
        ["Elongation at Break", "16 – 22 %"],
        ["Flexural Modulus", "48 – 60 MPa"],
        ["Impact Strength (Izod)", "133 J/m"],
        ["Volume Shrinkage", "2.2 – 5.5 %"],
      ]},
      { title: "Print Parameters", rows: [
        ["Print Environment", "20 – 40°C (Rec. 20–35°C)"],
        ["Bottom Exposure", "25 – 40 s"],
        ["Normal Exposure", "2 – 2.5 s"],
        ["Layer Thickness", "0.05 mm"],
      ]},
      { title: "Post-Processing", rows: [
        ["Wash Method", "Water ≥ 5 min / IPA ≥ 95%"],
        ["UV Cure Time", "3 minutes"],
        ["Cure Wavelength", "405 nm"],
        ["Cure Temperature", "18 – 30°C"],
      ]},
    ]),
    applicationsJson: JSON.stringify([
      { title: "Miniatures & Figures", desc: "Designed for tabletop figures, decorative models, and parts requiring fine surface texture.", gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)" },
      { title: "Dental & Jewelry", desc: "Suitable for dental demonstration models, jewelry master patterns, and precision casting.", gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)" },
      { title: "Engineering Prototypes", desc: "Ideal for functional prototypes, design validation, and short-run development parts.", gradient: "linear-gradient(135deg, #f59e0b, #ef4444)" },
    ]),
    faqsJson: JSON.stringify([
      { q: "Is this resin compatible with my 405nm LCD printer?", a: "Yes. This resin is formulated for all standard 405nm LCD and DLP 3D printers, including Anycubic, Elegoo, Phrozen, Creality, and more." },
      { q: "Do I really need zero IPA to clean prints?", a: "That's correct. Our hydrophilic formula allows you to wash prints with plain tap water. Simply rinse under running water for 5+ minutes." },
      { q: "How do I dispose of wash water?", a: "Do not pour wash water down the drain. Expose it to direct sunlight or a UV curing station until the resin solids fully cure and become solid plastic." },
      { q: "What's the recommended exposure time?", a: "We recommend 25–40 seconds for bottom layers and 2–2.5 seconds for normal layers at 0.05mm layer thickness." },
      { q: "Can I use this resin at low temperatures?", a: "Yes. This resin maintains workable viscosity down to 15°C. For best results, keep your printing environment between 20–35°C." },
      { q: "Do you offer custom colors or bulk pricing?", a: "Yes. For distributor, OEM, and bulk orders, custom colors and packaging options are available. Please use the form below." },
    ]),
    compatTagsJson: JSON.stringify([
      "Anycubic Photon Series",
      "Elegoo Mars / Saturn",
      "Phrozen Sonic Series",
      "Creality Halot Series",
      "Bambu Lab Photon",
      "Longer Orange Series",
      "Any 405nm LCD/DLP Printer",
    ]),
    oemTitle: "OEM / ODM & Bulk Orders",
    oemDesc: "Looking for custom formulations, private labeling, or large-volume orders? We support OEM, ODM, and wholesale partnerships worldwide.",
    oemPerksJson: JSON.stringify([
      "Custom resin formulations & colors",
      "Private label & custom packaging",
      "MOQ as low as 100 units",
      "Fast sampling within 7 business days",
      "Dedicated account manager",
    ]),
    ctaTitle: "Ready to Print Smarter?",
    ctaDesc: "Professional results with every pour. 12+ colors · Multiple sizes · Free shipping on select orders.",
    ctaBtn: "Shop Washable Resin",
    sortOrder: 1,
  }).$returningId();

  // Product Images
  await db.insert(productImages).values([
    { productId: resin1.id, url: "/products/resin-washable-1kg.jpg", alt: "Washable Resin 1KG", isPrimary: true, sortOrder: 0 },
    { productId: resin1.id, url: "/products/print-sample-1.jpg", alt: "Printed miniature", sortOrder: 1 },
    { productId: resin1.id, url: "/products/print-sample-2.jpg", alt: "Dental model", sortOrder: 2 },
    { productId: resin1.id, url: "/products/print-sample-3.jpg", alt: "Jewelry casting", sortOrder: 3 },
  ]);

  // Variant attribute options for Washable Resin
  const [opt1kg] = await db.insert(variantAttributeOptions).values({ productId: resin1.id, attributeType: "size", value: "1kg", displayName: "1 KG", sortOrder: 1 }).$returningId();
  const [opt2kg] = await db.insert(variantAttributeOptions).values({ productId: resin1.id, attributeType: "size", value: "2kg", displayName: "2 KG", sortOrder: 2 }).$returningId();
  const [opt3kg] = await db.insert(variantAttributeOptions).values({ productId: resin1.id, attributeType: "size", value: "3kg", displayName: "3 KG", sortOrder: 3 }).$returningId();

  const [optBlack] = await db.insert(variantAttributeOptions).values({ productId: resin1.id, attributeType: "color", value: "black", displayName: "Black", hexCode: "#212721", sortOrder: 1 }).$returningId();
  const [optWhite] = await db.insert(variantAttributeOptions).values({ productId: resin1.id, attributeType: "color", value: "white", displayName: "White", hexCode: "#EFF0F1", sortOrder: 2 }).$returningId();
  const [optGrey] = await db.insert(variantAttributeOptions).values({ productId: resin1.id, attributeType: "color", value: "grey", displayName: "Grey", hexCode: "#7E93A7", sortOrder: 3 }).$returningId();
  const [optPink] = await db.insert(variantAttributeOptions).values({ productId: resin1.id, attributeType: "color", value: "pink", displayName: "Cherry Blossom Pink", hexCode: "#F5DADF", sortOrder: 4 }).$returningId();
  const [optBlue] = await db.insert(variantAttributeOptions).values({ productId: resin1.id, attributeType: "color", value: "translucent-blue", displayName: "Translucent Blue", hexCode: "rgba(7,124,171,.7)", sortOrder: 5 }).$returningId();
  const [optGreen] = await db.insert(variantAttributeOptions).values({ productId: resin1.id, attributeType: "color", value: "translucent-green", displayName: "Translucent Green", hexCode: "rgba(0,154,23,.7)", sortOrder: 6 }).$returningId();
  const [optRed] = await db.insert(variantAttributeOptions).values({ productId: resin1.id, attributeType: "color", value: "translucent-red", displayName: "Translucent Red", hexCode: "rgba(210,38,48,.7)", sortOrder: 7 }).$returningId();
  const [optClear] = await db.insert(variantAttributeOptions).values({ productId: resin1.id, attributeType: "color", value: "clear", displayName: "Clear", hexCode: "rgba(255,255,255,.15)", sortOrder: 8 }).$returningId();

  // Product variants
  await db.insert(productVariants).values([
    { productId: resin1.id, sku: "WR-BLK-1KG", sizeOptionId: opt1kg.id, colorOptionId: optBlack.id, price: "25.99", compareAtPrice: "35.99", weight: "1.1kg", stockQuantity: 100 },
    { productId: resin1.id, sku: "WR-BLK-2KG", sizeOptionId: opt2kg.id, colorOptionId: optBlack.id, price: "49.99", compareAtPrice: "65.99", weight: "2.2kg", stockQuantity: 80 },
    { productId: resin1.id, sku: "WR-BLK-3KG", sizeOptionId: opt3kg.id, colorOptionId: optBlack.id, price: "69.99", compareAtPrice: "89.99", weight: "3.3kg", stockQuantity: 50 },
    { productId: resin1.id, sku: "WR-WHT-1KG", sizeOptionId: opt1kg.id, colorOptionId: optWhite.id, price: "25.99", compareAtPrice: "35.99", weight: "1.1kg", stockQuantity: 90 },
    { productId: resin1.id, sku: "WR-WHT-2KG", sizeOptionId: opt2kg.id, colorOptionId: optWhite.id, price: "49.99", compareAtPrice: "65.99", weight: "2.2kg", stockQuantity: 75 },
    { productId: resin1.id, sku: "WR-GRY-1KG", sizeOptionId: opt1kg.id, colorOptionId: optGrey.id, price: "25.99", compareAtPrice: "35.99", weight: "1.1kg", stockQuantity: 85 },
    { productId: resin1.id, sku: "WR-PNK-1KG", sizeOptionId: opt1kg.id, colorOptionId: optPink.id, price: "27.99", compareAtPrice: "37.99", weight: "1.1kg", stockQuantity: 60 },
    { productId: resin1.id, sku: "WR-TBL-1KG", sizeOptionId: opt1kg.id, colorOptionId: optBlue.id, price: "27.99", compareAtPrice: "37.99", weight: "1.1kg", stockQuantity: 70 },
    { productId: resin1.id, sku: "WR-TGR-1KG", sizeOptionId: opt1kg.id, colorOptionId: optGreen.id, price: "27.99", compareAtPrice: "37.99", weight: "1.1kg", stockQuantity: 0 },
    { productId: resin1.id, sku: "WR-TRD-1KG", sizeOptionId: opt1kg.id, colorOptionId: optRed.id, price: "27.99", compareAtPrice: "37.99", weight: "1.1kg", stockQuantity: 65 },
    { productId: resin1.id, sku: "WR-CLR-1KG", sizeOptionId: opt1kg.id, colorOptionId: optClear.id, price: "29.99", compareAtPrice: "39.99", weight: "1.1kg", stockQuantity: 55 },
  ]);

  // Product 2: LCD Printer
  const [printer1] = await db.insert(products).values({
    name: "CS3D ProLite M4K",
    slug: "prolite-m4k",
    tagline: "4K MONOCHROME LCD",
    subtitle: "Desktop LCD resin 3D printer with 4K monochrome screen. Perfect for beginners and small studios.",
    description: "High precision LCD 3D printer with 4K monochrome screen, XY resolution of 0.05mm, and print speed up to 50mm/h.",
    shortDesc: "4K Mono LCD · 0.05mm XY Precision · 50mm/h Speed",
    categoryId: catPrinter.id,
    badge: "POPULAR",
    brand: "CreateShape3D",
    sku: "CS3D-M4K",
    basePrice: "299.99",
    compareAtPrice: "399.99",
    currency: "USD",
    mainImage: "/products/printer-main.jpg",
    highlightsJson: JSON.stringify([
      { icon: "monitor", text: "4K Mono LCD" },
      { icon: "crosshair", text: "0.05mm Precision" },
      { icon: "zap", text: "50mm/h Speed" },
      { icon: "shield", text: "2-Year Warranty" },
    ]),
    featuresJson: JSON.stringify([
      { icon: "monitor", title: "4K Monochrome LCD", desc: "3840×2400 resolution screen with 2000+ hour lifespan. 4x faster exposure than RGB screens." },
      { icon: "crosshair", title: "0.05mm XY Precision", desc: "Capture ultra-fine details with 50-micron pixel size. Perfect for jewelry, dental, and miniatures." },
      { icon: "zap", title: "50mm/h Print Speed", desc: "Lightning-fast layer exposure. Print a full plate in under 3 hours." },
      { icon: "shield", title: "2-Year Warranty", desc: "Industry-leading warranty covers screen, mainboard, and mechanical parts." },
    ]),
    statsJson: JSON.stringify([
      { value: "3840×2400", label: "Resolution" },
      { value: "0.05mm", label: "XY Precision" },
      { value: "50mm/h", label: "Print Speed" },
      { value: "135×75×150", label: "Build Volume mm" },
    ]),
    specsJson: JSON.stringify([
      { title: "General", rows: [
        ["Technology", "LCD Stereo Lithography"],
        ["Light Source", "Matrix UV LED"],
        ["Wavelength", "405nm"],
        ["XY Resolution", "0.05mm (3840×2400)"],
        ["Z Axis Resolution", "0.01mm"],
      ]},
      { title: "Hardware", rows: [
        ["Build Volume", "135 × 75 × 150 mm"],
        ["Screen Size", "6.08 inch"],
        ["Screen Type", "Monochrome LCD"],
        ["Touch Screen", "3.5 inch Color TFT"],
        ["Connectivity", "USB / WiFi"],
      ]},
    ]),
    applicationsJson: JSON.stringify([
      { title: "Jewelry Design", desc: "Create high-precision wax-like prints for investment casting.", gradient: "linear-gradient(135deg, #f59e0b, #ef4444)" },
      { title: "Miniatures", desc: "Print stunningly detailed tabletop miniatures and figures.", gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)" },
      { title: "Dental", desc: "Produce accurate dental models, aligners, and surgical guides.", gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)" },
    ]),
    faqsJson: JSON.stringify([
      { q: "What resins are compatible?", a: "All standard 405nm UV-curing resins are compatible, including our full CreateShape3D resin lineup." },
      { q: "What's the print speed?", a: "Up to 50mm/h with normal layers at 2s exposure." },
    ]),
    compatTagsJson: JSON.stringify(["CS3D Resins", "Standard 405nm Resins", "Water-Washable", "ABS-Like"]),
    oemTitle: "Reseller & OEM Program",
    oemDesc: "Join our global reseller network. Competitive pricing, marketing support, and exclusive territories available.",
    oemPerksJson: JSON.stringify(["Wholesale pricing", "Marketing materials", "Technical support", "Exclusive territories"]),
    ctaTitle: "Start Printing Today",
    ctaDesc: "Professional-grade 3D printing at an affordable price.",
    ctaBtn: "Shop ProLite M4K",
    sortOrder: 1,
  }).$returningId();

  await db.insert(productImages).values([
    { productId: printer1.id, url: "/products/printer-main.jpg", alt: "ProLite M4K Printer", isPrimary: true, sortOrder: 0 },
    { productId: printer1.id, url: "/products/print-sample-1.jpg", alt: "Sample print 1", sortOrder: 1 },
    { productId: printer1.id, url: "/products/print-sample-4.jpg", alt: "Sample print 2", sortOrder: 2 },
  ]);

  // Printer has no size/color variants - just one option
  const [optPrinter] = await db.insert(variantAttributeOptions).values({ productId: printer1.id, attributeType: "size", value: "standard", displayName: "Standard", sortOrder: 1 }).$returningId();
  await db.insert(productVariants).values([
    { productId: printer1.id, sku: "M4K-STD", sizeOptionId: optPrinter.id, price: "299.99", compareAtPrice: "399.99", weight: "9.5kg", stockQuantity: 25 },
  ]);

  // Site settings
  await db.insert(siteSettings).values([
    { key: "phone", value: "+86 400-888-3D88", label: "Phone" },
    { key: "email", value: "sales@createshape3d.com", label: "Email" },
    { key: "address", value: "Shenzhen, China", label: "Address" },
    { key: "site_name", value: "CreateShape3D", label: "Site Name" },
    { key: "site_logo", value: "CreateShape3D", label: "Logo Text" },
    { key: "currency", value: "USD", label: "Currency" },
    { key: "free_shipping_threshold", value: "99", label: "Free Shipping Threshold (USD)" },
  ]);

  console.log("Seed complete!");
}

seed().catch(console.error);
