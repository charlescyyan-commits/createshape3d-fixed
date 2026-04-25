import { useState } from 'react';
import { Link } from 'react-router';
import { Package, FolderOpen, MessageSquare, TrendingUp, Eye, AlertCircle, BarChart3, ArrowRight, Clock } from 'lucide-react';
import { trpc } from '@/providers/trpc';

export default function AdminDashboard() {
  const { data: stats, isLoading } = trpc.dashboard.stats.useQuery();
  const { data: recentInquiries } = trpc.dashboard.recentInquiries.useQuery();
  const { data: recentProducts } = trpc.dashboard.recentProducts.useQuery();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-xl border border-neutral-200 p-6 animate-pulse">
              <div className="h-8 bg-neutral-100 rounded w-16 mb-2"></div>
              <div className="h-4 bg-neutral-100 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Products',
      value: stats?.products.total ?? 0,
      active: stats?.products.active ?? 0,
      inactive: stats?.products.inactive ?? 0,
      icon: Package,
      href: '/admin/products',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Categories',
      value: stats?.categories.total ?? 0,
      icon: FolderOpen,
      href: '/admin/categories',
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Unread Inquiries',
      value: stats?.inquiries.unread ?? 0,
      total: stats?.inquiries.total ?? 0,
      icon: MessageSquare,
      href: '/admin/inquiries',
      color: 'bg-orange-50 text-orange-600',
    },
    {
      label: 'Active Banners',
      value: stats?.banners.active ?? 0,
      total: stats?.banners.total ?? 0,
      icon: BarChart3,
      href: '/admin/banners',
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-neutral-500">{new Date().toLocaleDateString()}</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(card => (
          <Link key={card.label} to={card.href} className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              {card.total !== undefined && (
                <span className="text-xs text-neutral-400">of {card.total}</span>
              )}
            </div>
            <p className="text-2xl font-bold">{card.value}</p>
            <p className="text-sm text-neutral-500">{card.label}</p>
            {(card.active !== undefined || card.inactive !== undefined) && (
              <div className="flex gap-2 mt-2 text-xs">
                {card.active !== undefined && (
                  <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    <Eye className="w-3 h-3" /> {card.active} active
                  </span>
                )}
                {card.inactive !== undefined && card.inactive > 0 && (
                  <span className="inline-flex items-center gap-1 text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                    <AlertCircle className="w-3 h-3" /> {card.inactive} inactive
                  </span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2"><Clock className="w-4 h-4" /> Recent Inquiries</h2>
            <Link to="/admin/inquiries" className="text-sm text-blue-600 hover:underline flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
          </div>
          {recentInquiries && recentInquiries.length > 0 ? (
            <div className="space-y-3">
              {recentInquiries.map(i => (
                <div key={i.id} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{i.name} <span className="text-neutral-400 font-normal">— {i.type}</span></p>
                    <p className="text-xs text-neutral-400">{i.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!i.isRead && <span className="w-2 h-2 bg-orange-400 rounded-full"></span>}
                    <span className="text-xs text-neutral-400">{new Date(i.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-400 py-4">No inquiries yet</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link to="/admin/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors text-sm">
              <Package className="w-4 h-4 text-blue-500" /> Manage Products
            </Link>
            <Link to="/admin/banners" className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors text-sm">
              <TrendingUp className="w-4 h-4 text-purple-500" /> Edit Banners
            </Link>
            <Link to="/admin/pages" className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors text-sm">
              <Eye className="w-4 h-4 text-green-500" /> CMS Pages
            </Link>
            <Link to="/admin/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors text-sm">
              <BarChart3 className="w-4 h-4 text-orange-500" /> Site Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
