import React from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { Plus, UserCircle2 } from 'lucide-react';

export function Layout() {
  const location = useLocation();
  const getBreadcrumb = () => {
    if (location.pathname.includes('/works/create')) return '新增作品';
    if (location.pathname.includes('/works/edit')) return '编辑作品';
    if (location.pathname === '/works') return '作品管理';
    if (location.pathname.startsWith('/works/')) return '作品详情';
    return '';
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] font-sans">
      {/* Top Navigation replacing Sidebar */}
      <nav className="sticky top-0 z-50 bg-[var(--color-paper)]/80 backdrop-blur-md border-b border-[var(--color-border)] transition-all">
        <div className="max-w-[1440px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/works" className="flex items-center space-x-2 no-underline pr-6 border-r border-[var(--color-border)]">
              <span className="font-serif text-xl tracking-wider text-[var(--color-ink)] font-bold">
                阅微 <span className="text-[var(--color-ink-light)] text-sm font-sans tracking-normal ml-2">我的个人记录</span>
              </span>
            </Link>
            
            <div className="hidden sm:flex items-center gap-2 text-sm text-[var(--color-ink-light)]">
              <Link to="/" className="hover:text-[var(--color-ink)] transition-colors">首页</Link>
              <span className="opacity-50">/</span>
              <span className="text-[var(--color-ink)] font-medium">{getBreadcrumb()}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <Link 
              to="/works/create" 
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 transition-colors shadow-sm"
            >
              <Plus size={16} />
              <span>新增作品</span>
            </Link>
            
            <div className="flex items-center gap-2 pl-5 border-l border-[var(--color-border)] text-sm text-[var(--color-ink)]">
              <UserCircle2 size={24} className="text-[var(--color-ink-light)]" />
              <span className="font-medium hidden sm:inline">管理员</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
