export type LocalProduct = {
  slug: string;
  name: string;
  priceText?: string;
  images?: string[];
  categoryLabel?: string;
  shortDescription?: string;
  descriptionHtml?: string;
};

const LOCAL_PRODUCTS: Record<string, LocalProduct> = {
  // 3D printers (used across header/category/cards)
  'dental-printer': {
    slug: 'dental-printer',
    name: 'Dental Stellar D100',
    priceText: '$1,299.99',
    images: ['/products/dental-printer.jpg'],
    categoryLabel: 'Dental 3D Printer',
    shortDescription: 'High-precision dental printer designed for reliable chairside and lab workflows.',
  },
  'prolite-m4k': {
    slug: 'prolite-m4k',
    name: 'CS3D ProLite M4K',
    priceText: '$299.99',
    images: ['/products/printer-main.jpg'],
    categoryLabel: 'Industrial 3D Printer',
    shortDescription: 'Compact high-detail LCD printer for prototyping and production.',
  },
  'industrial-nova-x1': {
    slug: 'industrial-nova-x1',
    name: 'Industrial Nova X1',
    priceText: '$2,499.99',
    images: ['/products/industrial-printer.jpg'],
    categoryLabel: 'Industrial 3D Printer',
    shortDescription: 'Large-format precision printer built for continuous production.',
  },
  'jewelry-craft-g2': {
    slug: 'jewelry-craft-g2',
    name: 'Jewelry Craft G2',
    priceText: '$599.99',
    images: ['/products/jewelry-printer.jpg'],
    categoryLabel: 'Jewelry 3D Printer',
    shortDescription: 'Ultra-detailed printer tuned for jewelry design and casting workflows.',
  },
  'shoe-sole-printer': {
    slug: 'shoe-sole-printer',
    name: 'Shoe Sole Printer S3',
    priceText: '$899.99',
    images: ['/products/shoe-printer.jpg'],
    categoryLabel: 'Shoe 3D Printer',
    shortDescription: 'Specialized printer for footwear prototypes, molds, and patterns.',
  },
  'wash-cure-station': {
    slug: 'wash-cure-station',
    name: 'Wash & Cure Station',
    priceText: '$149.99',
    images: ['/products/wash-cure.jpg'],
    categoryLabel: 'Wash & Cure Machine',
    shortDescription: 'Post-processing station for washing and curing resin prints.',
  },

  // Resins
  'casting-resin': {
    slug: 'casting-resin',
    name: 'Casting Resin Gold',
    priceText: '$32.99',
    images: ['/products/casting-resin.jpg'],
    categoryLabel: 'Casting Resin Series',
    shortDescription: 'Low-ash casting resin for clean burnout and smooth casting results.',
  },
  'casting-resin-gold': {
    slug: 'casting-resin-gold',
    name: 'Casting Resin Gold',
    priceText: '$32.99',
    images: ['/products/casting-resin.jpg'],
    categoryLabel: 'Casting Resin Series',
    shortDescription: 'Low-ash casting resin for clean burnout and smooth casting results.',
  },
  'dental-resin-clear': {
    slug: 'dental-resin-clear',
    name: 'Dental Resin Clear',
    priceText: '$45.99',
    images: ['/products/dental-resin.jpg'],
    categoryLabel: 'Dental Resin Series',
    shortDescription: 'Clear dental resin for models and high-clarity prints.',
  },
  'washable-resin-premium': {
    slug: 'washable-resin-premium',
    name: 'Washable Resin Premium',
    priceText: '$25.99',
    images: ['/products/resin-washable-1kg.jpg'],
    categoryLabel: 'Engineering Resin Series',
    shortDescription: 'Water-washable resin for fast cleanup with dependable print quality.',
  },
  'rigid-resin-black': {
    slug: 'rigid-resin-black',
    name: 'Rigid Resin Black',
    priceText: '$28.99',
    images: ['/products/rigid-resin.jpg'],
    categoryLabel: 'Rigid Resin Series',
    shortDescription: 'Stiff, durable resin for functional prototypes and engineering parts.',
  },
  'dental-model-resin': {
    slug: 'dental-model-resin',
    name: 'Dental Model Resin',
    priceText: '$45.99',
    images: ['/products/dental-resin.jpg'],
    categoryLabel: 'Dental Resin Series',
    shortDescription: 'Dental model resin for accurate fit and smooth surface finishes.',
  },

  // Accessories
  'mono-lcd-screen': {
    slug: 'mono-lcd-screen',
    name: 'Mono LCD Screen 6.6" 4K',
    priceText: '$89.99',
    images: ['/products/lcd-screen.jpg'],
    categoryLabel: '3D Printer Mono LCD',
    shortDescription: 'Replacement monochrome LCD screen for compatible resin printers.',
  },
  'mono-lcd-screen-6inch': {
    slug: 'mono-lcd-screen-6inch',
    name: 'Mono LCD Screen 6"',
    priceText: '$89.99',
    images: ['/products/lcd-screen.jpg'],
    categoryLabel: '3D Printer Mono LCD',
    shortDescription: 'Replacement monochrome LCD screen for compatible resin printers.',
  },
  'acf-film-pack': {
    slug: 'acf-film-pack',
    name: 'ACF/PFA Film Pack',
    priceText: '$19.99',
    images: ['/products/fep-film.jpg'],
    categoryLabel: 'ACF/PFA Films',
    shortDescription: 'High-quality release films for consistent peel performance and longer life.',
  },
};

export function getLocalProductBySlug(slug: string | undefined | null) {
  if (!slug) return null;
  return LOCAL_PRODUCTS[slug] ?? null;
}

export function getAllLocalProductSlugs() {
  return Object.keys(LOCAL_PRODUCTS);
}

