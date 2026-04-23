import { useState } from 'react';
import { Link } from 'react-router';
import { Send, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/providers/trpc';

export default function Inquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', orderType: '', message: '' });

  const createInquiry = trpc.inquiry.create.useMutation({
    onSuccess: () => { setSubmitted(true); toast.success('Inquiry submitted!'); },
    onError: (e) => toast.error(e.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error('Name and email are required'); return; }
    createInquiry.mutate({ type: 'oem', ...form });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      {submitted ? (
        <div className="text-center py-16">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-neutral-500 mb-6">We've received your inquiry and will respond within 1 business day.</p>
          <Link to="/products" className="px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2">Contact Us / OEM Inquiry</h1>
          <p className="text-neutral-500 mb-8">Looking for custom formulations, private labeling, or bulk orders? Get in touch with our team.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Name *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-neutral-900" required />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email *</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-neutral-900" required />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Company</label>
                <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Phone</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Inquiry Type</label>
              <select value={form.orderType} onChange={e => setForm({ ...form, orderType: e.target.value })} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-neutral-900">
                <option value="">Select...</option>
                <option value="oem">OEM / Private Label</option>
                <option value="odm">ODM / Custom Formula</option>
                <option value="bulk">Bulk / Wholesale</option>
                <option value="support">Technical Support</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-neutral-900 resize-none" placeholder="Tell us about your project, required volume, target price, timeline..." />
            </div>
            <button type="submit" disabled={createInquiry.isPending} className="w-full py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> {createInquiry.isPending ? 'Sending...' : 'Submit Inquiry'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
