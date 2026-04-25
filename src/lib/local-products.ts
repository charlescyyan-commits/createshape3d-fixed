export type LocalProduct = {
  slug: string;
  name: string;
  subtitle?: string;
  heroDescription?: string;
  priceText?: string;
  currencyCode?: string;
  images?: string[];
  categoryLabel?: string;
  shortDescription?: string;
  descriptionHtml?: string;
  specs?: Record<string, string>;
  highlights?: string[];
  features?: Array<{
    label: string;
    title: string;
    desc: string;
    checks: string[];
    image: string;
    reverse?: boolean;
    dark?: boolean;
  }>;
  printSpecs?: Array<[string, string]>;
  hwSpecs?: Array<[string, string]>;
  ctaTitle?: string;
  ctaSubtitle?: string;
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
    subtitle: '4K MONOCHROME LCD 3D PRINTER',
    heroDescription: '0.03mm XY resolution | 405nm light source | Stable Z-axis for consistent layer accuracy',
    priceText: '$299.99',
    currencyCode: 'USD',
    images: [
      '/products/print-sample-1.jpg',
      '/products/print-sample-2.jpg',
      '/products/print-sample-3.jpg',
      '/products/printer-main.jpg',
      '/products/industrial-printer.jpg',
      '/products/wash-cure.jpg',
    ],
    categoryLabel: 'Industrial 3D Printer',
    shortDescription: 'Compact high-detail LCD printer for prototyping and production.',
    highlights: [
      '16K ultra-high resolution for dental-grade precision',
      '24-hour continuous automated production',
      '0.03mm XY accuracy for crown & bridge models',
      'Compatible with all standard 405nm dental resins',
      'WiFi connectivity for remote print management',
      'Industrial-grade LCD with 20,000 hour lifespan',
    ],
    specs: {
      xy_resolution: '0.03 mm',
      build_volume: '192 × 120 × 200 mm',
      light_source: 'COB vertical light source (405nm)',
      print_speed: 'Up to 220 mm/h',
      layer_height: '0.01–0.20 mm',
      z_axis: 'Dual linear rails',
      screen: '4K monochrome LCD',
      machine_size: 'Approx. 280 × 280 × 460 mm',
      net_weight: 'Approx. 10 kg',
    },
    printSpecs: [
      ['Printing Technology', 'LCD Stereolithography (MSLA)'],
      ['Light Source', '405nm COB Vertical Point Light Source'],
      ['XY Resolution', '0.03mm'],
      ['Layer Thickness', '0.01 – 0.20mm'],
      ['Max Printing Speed', 'Up to 220mm/h'],
      ['Build Volume', '192 × 120 × 200mm (L×W×H)'],
      ['Screen', '4K Monochrome LCD'],
      ['Light Source Lifespan', '20,000 hours (rated)'],
    ],
    hwSpecs: [
      ['Machine Dimensions', '355 × 274 × 546mm'],
      ['Net Weight', '18.6 kg'],
      ['Touchscreen', '3.5-inch Color LCD'],
      ['Connectivity', 'USB, Wi-Fi (optional)'],
      ['Supported Formats', 'STL, OBJ'],
      ['Slicer Software', 'CHITUBOX / Lychee Slicer'],
      ['Operating Systems', 'Windows / macOS'],
      ['Certifications', 'CE / FCC / ISO13485'],
    ],
    features: [
      {
        label: 'Precision',
        title: 'For Perfection in Details',
        desc: 'The print size of 153×78×180mm makes it a desktop classic. Whether delicate dental crowns or intricate jewelry patterns, every layer is placed with micron-level accuracy.',
        checks: [
          '18μm XY resolution for smooth surface finish',
          '6.8-inch monochrome LCD for longer screen life',
          'Press-type convenient platform for easy model removal',
        ],
        image: '/products/print-sample-1.jpg',
        reverse: false,
        dark: false,
      },
      {
        label: 'Speed',
        title: 'High-Speed Printing, Doubles Efficiency',
        desc: 'Uses advanced TSP release technology, which significantly reduces the peel force between each layer. Combined with our high-power COB light source, achieve up to 80mm/h printing speed.',
        checks: [
          'Advanced TSP release technology',
          '80mm/h max print speed',
          '20,000H light source lifespan',
        ],
        image: '/products/print-sample-2.jpg',
        reverse: true,
        dark: false,
      },
      {
        label: 'Integration',
        title: 'Post-Printing Curing Built Right In',
        desc: 'The device contains post-curing, which meets the function and is perfectly hidden in the body. No separate curing station needed — print, wash, and cure in one seamless workflow.',
        checks: [
          'Integrated UV curing chamber',
          'Saves workspace and equipment cost',
          'Streamlined chairside workflow',
        ],
        image: '/products/print-sample-3.jpg',
        reverse: false,
        dark: false,
      },
      {
        label: 'Light Source',
        title: 'COB Vertical Point Light Source',
        desc: 'The COB (Chip on Board) vertical point light source delivers uniform, high-intensity 405nm UV illumination across the entire build area. This eliminates edge light decay and ensures consistent curing from center to corner — critical for dental applications where accuracy cannot be compromised.',
        checks: [
          'Uniform light intensity across full LCD',
          '405nm wavelength optimized for dental resins',
          '20,000H rated lifespan for low cost of ownership',
          'No light decay at screen edges',
        ],
        image: '/products/printer-main.jpg',
        reverse: true,
        dark: true,
      },
    ],
    ctaTitle: 'Ready to Upgrade Your Workflow?',
    ctaSubtitle: 'Get the ProLite M4K today and start producing high-detail parts with confidence.',
    descriptionHtml:
      '<p>The CS3D ProLite M4K is built for consistent, high-detail resin printing. Designed for fast workflows and dependable accuracy, it’s a solid choice for prototyping and small-batch production.</p><ul><li>High-detail output with stable Z motion</li><li>Optimized for speed and surface quality</li><li>Compatible with common 405nm resins</li></ul>',
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

