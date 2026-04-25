import { db } from "../api/queries/connection";
import { bannerSlides } from "./schema";

async function seedBanners() {
  const existing = await db.select().from(bannerSlides).limit(1);
  if (existing.length > 0) {
    console.log("Banners already seeded, skipping.");
    return;
  }

  await db.insert(bannerSlides).values([
    {
      title: "CreateShape3D Washable Resin",
      subtitle: "2025 NEW LAUNCH",
      description: "Professional-grade water-washable resin for 405nm LCD/DLP 3D printers. No IPA needed — just wash with water.",
      image: "/products/resin-washable-1kg.jpg",
      buttonText: "Shop Now",
      buttonLink: "/product/washable-resin-premium",
      sortOrder: 1,
      isActive: true,
    },
    {
      title: "CS3D ProLite M4K Printer",
      subtitle: "4K MONOCHROME LCD",
      description: "Desktop LCD resin 3D printer with 4K monochrome screen. XY resolution of 0.05mm, print speed up to 50mm/h.",
      image: "/products/printer-main.jpg",
      buttonText: "Learn More",
      buttonLink: "/product/prolite-m4k",
      sortOrder: 2,
      isActive: true,
    },
    {
      title: "OEM & Bulk Orders",
      subtitle: "CUSTOM SOLUTIONS",
      description: "Private labeling, custom formulations, and wholesale partnerships for distributors worldwide.",
      image: "/products/print-sample-1.jpg",
      buttonText: "Get in Touch",
      buttonLink: "/inquiry",
      sortOrder: 3,
      isActive: true,
    },
  ]);

  console.log("Banner seed complete!");
}

seedBanners().catch(console.error);
