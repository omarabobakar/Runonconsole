import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminSidebar } from './AdminSidebar';
import { AdminOverview } from './AdminOverview';
import { AdminProductList } from './AdminProductList';
import { AdminReviewForm } from './AdminReviewForm';
import { AdminBlogList } from './AdminBlogList';
import { AdminBlogForm } from './AdminBlogForm';
import { AdminSubmissionsList } from './AdminSubmissionsList';
import { 
  CheckCircle, ShieldAlert, Lock, User, KeyRound, 
  ArrowRight, ArrowLeft, Gamepad2, Eye, EyeOff, Sparkles 
} from 'lucide-react';
import { CyberMatrixHoloBackground } from '../CyberMatrixHoloBackground';
import { BouncyText } from '../BouncyText';

export const AdminLayout = () => {
  const { 
    currentUser, loginUser, logoutUser, navigateTo,
    adminTab, setAdminTab, adminNotification 
  } = useApp();

  const [editingProduct, setEditingProduct] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

  // Admin Login State
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if current user is an authorized Master Admin
  const isAuthorizedAdmin = currentUser && (
    currentUser.role === 'Head Administrator' ||
    currentUser.username === 'ROC' ||
    currentUser.email === 'admin@runonconsole.com'
  );

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);

    try {
      const res = await loginUser(adminUsername, adminPassword);
      if (res && res.success) {
        if (res.user.role === 'Head Administrator' || res.user.username === 'ROC' || res.user.email === 'admin@runonconsole.com') {
          // Success! Admin unlocked
          setAuthError('');
        } else {
          setAuthError('ACCESS DENIED: Your account does not possess Head Administrator privileges.');
        }
      } else {
        setAuthError(res?.error || 'ACCESS DENIED: Invalid Master Admin credentials.');
      }
    } catch (err) {
      setAuthError('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1. LOCKED ADMIN GATE SCREEN (Rendered if not authenticated as Admin)
  if (!isAuthorizedAdmin) {
    return (
      <div className="min-h-screen bg-[#070D1E] text-white flex items-center justify-center p-4 sm:p-6 font-body relative overflow-hidden">
        <CyberMatrixHoloBackground />

        {/* Ambient Glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-[#0F172A]/90 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6 animate-page-in">
          
          {/* Lock Icon & Brand Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-emerald-500/30 border-2 border-emerald-400/40 animate-pulse">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40 inline-block mb-1.5">
                RESTRICTED SYSTEM AREA
              </span>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                <BouncyText text="ROC ADMIN CONSOLE" />
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Authorized Personnel Only. Please authenticate with ROC Master Admin credentials.
              </p>
            </div>
          </div>

          {/* Error Alert */}
          {authError && (
            <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-semibold flex items-center gap-2.5 animate-bounce">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Admin Login Form */}
          <form onSubmit={handleAdminLoginSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[11px] tracking-wider">
                ADMIN IDENTIFIER (Username / Email)
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  required
                  placeholder="e.g. ROC"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-10 pr-3 py-3 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[11px] tracking-wider">
                MASTER ADMIN PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-10 pr-10 py-3 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-display font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-emerald-200" />
                  <span>Authenticate & Enter Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Help & Back to Site */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="hover:text-emerald-400 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Run On Console
            </button>
            <span className="font-mono text-[10px] text-slate-500">v2.6 Secure Gate</span>
          </div>

        </div>
      </div>
    );
  }

  // 2. UNLOCKED ADMIN CONTROL REGION
  const handleEditProduct = (item) => {
    setEditingProduct(item);
    setAdminTab('edit-product');
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setAdminTab('edit-blog');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col lg:flex-row font-body">
      
      {/* ROC Admin Sidebar */}
      <AdminSidebar />

      {/* Main Admin Dashboard Region */}
      <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
        
        {/* Toast Notification */}
        {adminNotification && (
          <div className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 text-xs font-semibold ${
            adminNotification.type === 'warning'
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}>
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>{adminNotification.msg}</span>
          </div>
        )}

        {/* Tab Router */}
        {adminTab === 'overview' && <AdminOverview />}
        {adminTab === 'products' && <AdminProductList onEdit={handleEditProduct} />}
        {adminTab === 'blogs' && <AdminBlogList onEdit={handleEditBlog} />}
        {adminTab === 'submissions' && <AdminSubmissionsList />}
        {adminTab === 'new-product' && <AdminReviewForm onDone={() => setAdminTab('products')} />}
        {adminTab === 'edit-product' && <AdminReviewForm initialData={editingProduct} onDone={() => { setEditingProduct(null); setAdminTab('products'); }} />}
        {adminTab === 'new-blog' && <AdminBlogForm onDone={() => setAdminTab('blogs')} />}
        {adminTab === 'edit-blog' && <AdminBlogForm initialData={editingBlog} onDone={() => { setEditingBlog(null); setAdminTab('blogs'); }} />}

      </main>

    </div>
  );
};
