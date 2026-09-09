import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, Database, FileText, PlusCircle, ArrowLeft, Gamepad2, PenTool, ShieldCheck } from 'lucide-react';

export const AdminSidebar = () => {
  const { adminTab, setAdminTab, navigateTo, products, blogs, guestSubmissions } = useApp();

  const navItems = [
    { id: 'overview', label: 'OVERVIEW STATS', icon: LayoutDashboard },
    { id: 'products', label: 'PRODUCTS CATALOG', icon: Database, badge: products.length },
    { id: 'blogs', label: 'BLOGS & GUIDES', icon: FileText, badge: blogs.length },
    { id: 'submissions', label: 'WRITE FOR US LEADS', icon: PenTool, badge: (guestSubmissions || []).length },
    { id: 'new-product', label: 'ADD PRODUCT / DEALS', icon: PlusCircle },
    { id: 'new-blog', label: 'WRITE BLOG POST', icon: PlusCircle }
  ];

  return (
    <aside className="w-full lg:w-64 bg-[#0B132B] border-r border-slate-800 p-5 flex flex-col justify-between shrink-0 text-white min-h-screen">
      <div>
        {/* ROC Admin Dashboard Logo */}
        <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-base tracking-tight text-white">ROC ADMIN SUITE</h2>
            <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
              RUN ON CONSOLE
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-1.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = adminTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setAdminTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  isActive 
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white text-emerald-700' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Return to Public Website */}
      <div className="pt-6 border-t border-slate-800">
        <button
          onClick={() => navigateTo('home')}
          className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>VIEW PUBLIC SITE</span>
        </button>
      </div>
    </aside>
  );
};
