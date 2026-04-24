import { useState } from 'react';
import { Link } from 'react-router';
import { Search, ChevronDown, Mail, MessageCircle, Truck, Package, RotateCcw, CreditCard, HelpCircle } from 'lucide-react';

const faqs = [
  {
    category: 'Ordering & Payment',
    icon: CreditCard,
    questions: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank wire transfers for bulk orders. All transactions are secured with SSL encryption.' },
      { q: 'How do I track my order?', a: 'Once your order ships, you will receive an email with a tracking number. You can also track your order in real-time through the "Track Your Order" page using your order number and email.' },
      { q: 'Can I cancel or modify my order?', a: 'Orders can be modified or cancelled within 2 hours of placement. After that, the order enters our fulfillment process and cannot be changed. Please contact our support team immediately if you need assistance.' },
      { q: 'Do you offer wholesale pricing?', a: 'Yes! We offer competitive wholesale pricing for orders of 10+ units. Please contact our sales team at sales@createshape3d.com for a custom quote.' },
    ],
  },
  {
    category: 'Shipping & Delivery',
    icon: Truck,
    questions: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 7-15 business days worldwide. Express shipping (3-7 business days) is available for select countries. Free shipping on orders over $99.' },
      { q: 'Which countries do you ship to?', a: 'We ship to over 50 countries worldwide, including the US, UK, EU, Australia, Canada, and most Asian countries. Contact us if your country is not listed at checkout.' },
      { q: 'Will I need to pay customs duties?', a: 'Customs duties and import taxes vary by country and are the responsibility of the buyer. We declare the actual product value on all shipments.' },
      { q: 'What if my package is damaged during shipping?', a: 'All shipments are fully insured. If your package arrives damaged, please take photos and contact us within 48 hours. We will arrange a replacement or full refund.' },
    ],
  },
  {
    category: 'Returns & Warranty',
    icon: RotateCcw,
    questions: [
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery for unused products in original packaging. Resin bottles must be unopened. Return shipping costs are the responsibility of the buyer unless the item is defective.' },
      { q: 'What warranty do you offer?', a: 'All 3D printers come with a 1-year manufacturer warranty. LCD screens are covered for 6 months. Resins have a satisfaction guarantee. Extended warranties are available for purchase.' },
      { q: 'How do I file a warranty claim?', a: 'Contact our support team with your order number and a description of the issue. We may request photos or videos. Once approved, we will send a replacement or arrange repair.' },
    ],
  },
  {
    category: 'Products & Compatibility',
    icon: Package,
    questions: [
      { q: 'Are your resins compatible with my printer?', a: 'Our resins are compatible with all 405nm LCD, MSLA, and DLP 3D printers. This includes popular brands like Elegoo, Anycubic, Phrozen, Creality, and more.' },
      { q: 'What is the shelf life of your resins?', a: 'Unopened resin bottles have a shelf life of 12 months when stored at 10-35°C away from direct sunlight. Once opened, we recommend using within 3 months for best results.' },
      { q: 'Do you provide SDS (Safety Data Sheets)?', a: 'Yes, SDS documents for all our resin formulations are available upon request. Please email support@createshape3d.com with the specific product name.' },
      { q: 'Can I get a sample before bulk ordering?', a: 'Absolutely! We offer 100g sample bottles for $5.99 (shipping included). Contact our sales team to request samples of specific resin types.' },
    ],
  },
];

export default function SupportPage() {
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = searchQuery
    ? faqs.map(cat => ({
        ...cat,
        questions: cat.questions.filter(q =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(cat => cat.questions.length > 0)
    : faqs;

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0a1628] py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">How Can We Help?</h1>
          <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">Find answers to common questions or reach out to our support team.</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 lg:px-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-neutral-900 mb-1">Email Support</h3>
              <p className="text-sm text-neutral-500 mb-2">Response within 24 hours</p>
              <a href="mailto:support@createshape3d.com" className="text-sm text-blue-600 font-medium hover:underline">support@createshape3d.com</a>
            </div>
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-neutral-900 mb-1">Live Chat</h3>
              <p className="text-sm text-neutral-500 mb-2">Mon-Fri 9AM-6PM CST</p>
              <Link to="/inquiry" className="text-sm text-blue-600 font-medium hover:underline">Start a conversation</Link>
            </div>
            <div className="bg-neutral-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-neutral-900 mb-1">Technical Support</h3>
              <p className="text-sm text-neutral-500 mb-2">For printer & software issues</p>
              <a href="mailto:tech@createshape3d.com" className="text-sm text-blue-600 font-medium hover:underline">tech@createshape3d.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 lg:py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-center mb-10">Frequently Asked Questions</h2>

          {filteredFaqs.map((cat, catIdx) => (
            <div key={cat.category} className="mb-6">
              <button
                onClick={() => setOpenCategory(openCategory === catIdx ? null : catIdx)}
                className="flex items-center gap-3 w-full text-left mb-3"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <cat.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 flex-1">{cat.category}</h3>
                <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform ${openCategory === catIdx ? 'rotate-180' : ''}`} />
              </button>

              {openCategory === catIdx && (
                <div className="space-y-2 ml-13">
                  {cat.questions.map((q, qIdx) => (
                    <div key={qIdx} className="bg-white rounded-xl border border-neutral-100 overflow-hidden">
                      <button
                        onClick={() => setOpenQuestion(openQuestion === `${catIdx}-${qIdx}` ? null : `${catIdx}-${qIdx}`)}
                        className="flex items-center justify-between w-full px-5 py-4 text-left hover:bg-neutral-50 transition-colors"
                      >
                        <span className="font-medium text-neutral-800 text-sm">{q.q}</span>
                        <ChevronDown className={`w-4 h-4 text-neutral-400 flex-shrink-0 ml-3 transition-transform ${openQuestion === `${catIdx}-${qIdx}` ? 'rotate-180' : ''}`} />
                      </button>
                      {openQuestion === `${catIdx}-${qIdx}` && (
                        <div className="px-5 pb-4 text-sm text-neutral-500 leading-relaxed border-t border-neutral-50 pt-3">
                          {q.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 text-neutral-500">
              <p>No results found for &quot;{searchQuery}&quot;. Try different keywords or <Link to="/inquiry" className="text-blue-600 hover:underline">contact us</Link>.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0a1628] py-12 lg:py-16 text-center">
        <div className="max-w-xl mx-auto px-4 lg:px-6">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-3">Still Have Questions?</h2>
          <p className="text-white/50 mb-6">Our team is here to help. Reach out and we will get back to you within 24 hours.</p>
          <Link
            to="/inquiry"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
}
