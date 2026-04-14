import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { mockWorks, Work, STATUS_LABELS, TYPE_LABELS } from '../data';
import { ChevronLeft, Edit3, Star, Clock, Tag } from 'lucide-react';

export function WorkDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [work, setWork] = useState<Work | null>(null);

  useEffect(() => {
    const foundWork = mockWorks.find(w => w.id === id);
    if (foundWork) {
      setWork(foundWork);
    }
  }, [id]);

  if (!work) {
    return (
      <div className="flex justify-center py-32 text-[var(--color-ink-light)]">
        寻找的藏品不知所踪...
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forwards max-w-[800px] mx-auto pb-24">
      {/* Top Breadcrumb/Back */}
      <div className="mb-10 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors text-sm font-medium gap-1 group bg-transparent border-none cursor-pointer"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          返回书房
        </button>
        
        <Link 
          to={`/works/edit/${work.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 transition-colors shadow-sm font-medium"
        >
          <Edit3 size={14} />
          编辑作品
        </Link>
      </div>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row gap-8 md:gap-12 mb-16 relative">
        <div className="w-full max-w-[220px] shrink-0 mx-auto md:mx-0">
          <div className="relative aspect-[3/4] rounded-md overflow-hidden shadow-[0_20px_40px_-12px_rgba(44,45,40,0.15)] ring-1 ring-black/5">
            <img src={work.cover} alt={work.title} className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="flex flex-col justify-center space-y-5">
          <div>
            <h1 className="text-3xl md:text-[2.5rem] leading-tight font-serif font-bold text-[var(--color-ink)] mb-2">
              {work.title}
            </h1>
            {work.originalTitle && (
              <h2 className="text-lg md:text-xl font-serif text-[var(--color-ink-light)] italic">
                {work.originalTitle}
              </h2>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div className="flex text-[var(--color-ink-light)]">
              <span className="w-20 font-medium">类型：</span>
              <span className="text-[var(--color-ink)]">{TYPE_LABELS[work.type]}</span>
            </div>
            <div className="flex text-[var(--color-ink-light)]">
              <span className="w-20 font-medium">状态：</span>
              <span className="text-[var(--color-ink)]">{STATUS_LABELS[work.status]}</span>
            </div>
            <div className="flex text-[var(--color-ink-light)]">
              <span className="w-20 font-medium">导演/作者：</span>
              <span className="text-[var(--color-ink)]">{work.creator}</span>
            </div>
            <div className="flex text-[var(--color-ink-light)]">
              <span className="w-20 font-medium">发行年份：</span>
              <span className="text-[var(--color-ink)]">{work.year}</span>
            </div>
            <div className="flex text-[var(--color-ink-light)] col-span-2">
              <span className="w-20 font-medium">评分：</span>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < Math.floor(work.rating) ? "fill-[var(--color-gold)] text-[var(--color-gold)]" : "text-[var(--color-border)]"} 
                    />
                  ))}
                </div>
                <span className="text-[var(--color-ink)] font-medium leading-none">{work.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {work.tags.length > 0 && (
            <div className="flex text-[var(--color-ink-light)] text-sm pt-2">
              <span className="w-20 font-medium shrink-0 pt-1">标签：</span>
              <div className="flex flex-wrap items-center gap-2">
                {work.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-sm text-xs font-medium bg-[var(--color-surface)] text-[var(--color-ink-light)] border border-[var(--color-border)]">
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs text-[var(--color-ink-light)]">
            <div className="flex items-center gap-1.5">
              <Clock size={12} />
              <span>创建时间：{work.dateAdded}</span>
            </div>
            {work.dateUpdated && (
              <div className="flex items-center gap-1.5">
                <Edit3 size={12} />
                <span>最后更新：{work.dateUpdated}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="relative bg-[var(--color-surface)] p-8 rounded-md border border-[var(--color-border)]/50 shadow-sm mt-8">
        <h3 className="text-lg font-serif font-bold text-[var(--color-ink)] mb-6 flex items-center gap-3">
          <span className="w-1.5 h-6 bg-[var(--color-primary)] inline-block rounded-sm"></span>
          观后感/笔记
        </h3>
        <div className="prose prose-neutral max-w-none prose-p:leading-[1.8] prose-p:text-[1.05rem] prose-p:text-[var(--color-ink)] prose-p:mb-6">
          {work.review ? work.review.split('\n').map((paragraph, idx) => (
            <p key={idx} className="font-serif tracking-wide text-[var(--color-ink)]/90 text-[16px]">
              {paragraph}
            </p>
          )) : (
            <p className="text-[var(--color-ink-light)] italic text-sm">暂无观后感</p>
          )}
        </div>
      </section>

      {/* Bottom Back Button matching screenshots functionality */}
      <div className="mt-12 text-center">
        <button 
          onClick={() => navigate(-1)}
          className="px-6 py-2 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors rounded-md text-sm font-medium shadow-sm"
        >
          返回
        </button>
      </div>
    </div>
  );
}
