import React from 'react';
import { Link } from 'react-router';
import { Star, Book, Film, Gamepad2, Eye, Edit2, Trash2 } from 'lucide-react';
import { Work, STATUS_LABELS, TYPE_LABELS } from '../data';

interface WorkCardProps {
  work: Work;
  onDelete: (id: string) => void;
}

export function WorkCard({ work, onDelete }: WorkCardProps) {
  const Icon = work.type === 'book' ? Book : work.type === 'movie' ? Film : Gamepad2;

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm(`确定要删除《${work.title}》吗？`)) {
      onDelete(work.id);
    }
  };

  return (
    <article className="group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-md">
      <Link to={`/works/${work.id}`} className="flex flex-col h-full bg-[var(--color-surface)] rounded-[6px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-6px_rgba(44,45,40,0.08)] ring-1 ring-[var(--color-border)]/50 group-hover:ring-[var(--color-border)] relative">
        
        {/* Cover Image Area */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-paper)]">
          <img 
            src={work.cover} 
            alt={work.title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
            <span className="bg-black/40 backdrop-blur-md px-2 py-1 rounded-sm text-[10px] text-white/90 font-medium tracking-wide">
              {TYPE_LABELS[work.type]}
            </span>
            <span className="bg-black/40 backdrop-blur-md px-2 py-1 rounded-sm text-[10px] text-white/90 font-medium tracking-wide border-l border-white/20">
              {STATUS_LABELS[work.status]}
            </span>
          </div>
          <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md rounded-full p-1.5 text-white/90 shadow-sm z-10">
            <Icon size={14} />
          </div>
        </div>

        {/* Info Area */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h2 className="font-serif text-[1.125rem] leading-snug font-semibold text-[var(--color-ink)] line-clamp-2" title={work.title}>
              {work.title}
            </h2>
            <div className="flex items-center gap-1 shrink-0 mt-0.5">
              <Star className="fill-[var(--color-gold)] text-[var(--color-gold)]" size={14} />
              <span className="text-sm font-medium text-[var(--color-ink)]">{work.rating}</span>
            </div>
          </div>
          
          <div className="text-xs text-[var(--color-ink-light)] mb-3 flex items-center gap-1">
            <span className="truncate">{work.creator}</span>
            <span className="opacity-50 flex-shrink-0">·</span>
            <span className="flex-shrink-0">{work.year}</span>
          </div>
          
          <div className="mt-auto pt-3 border-t border-[var(--color-border)]/30 text-[10px] text-[var(--color-ink-light)] tracking-wide font-sans uppercase">
            {work.dateAdded.split(' ')[0]}
          </div>
        </div>
      </Link>

      {/* Hover Actions Bar */}
      <div className="absolute top-2 right-2 z-20 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
        <Link 
          to={`/works/${work.id}`}
          className="w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[var(--color-ink)] hover:text-[var(--color-primary)] hover:bg-white transition-colors shadow-sm"
          title="查看"
        >
          <Eye size={12} />
        </Link>
        <Link 
          to={`/works/edit/${work.id}`}
          className="w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[var(--color-ink)] hover:text-[var(--color-primary)] hover:bg-white transition-colors shadow-sm"
          title="编辑"
        >
          <Edit2 size={12} />
        </Link>
        <button 
          onClick={handleDelete}
          className="w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-white transition-colors shadow-sm"
          title="删除"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </article>
  );
}
