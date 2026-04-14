import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Save, Star, X, Plus } from 'lucide-react';
import { mockWorks, Work, STATUS_LABELS, TYPE_LABELS } from '../data';

export function WorkForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState<Partial<Work>>({
    title: '',
    originalTitle: '',
    creator: '',
    year: '',
    rating: 0,
    review: '',
    tags: [],
    type: 'movie',
    status: 'completed',
    cover: ''
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (isEditing) {
      const work = mockWorks.find(w => w.id === id);
      if (work) setFormData(work);
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...(prev.tags || []), tagInput.trim()] }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags?.filter(t => t !== tagToRemove) }));
  };

  const handleRatingChange = (newRating: number) => {
    setFormData(prev => ({ ...prev, rating: newRating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.review) {
      alert("请填写必填项");
      return;
    }
    // Simulate save
    navigate('/works');
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-700 ease-out max-w-[800px] mx-auto pb-32">
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors text-sm font-medium gap-1 group bg-transparent border-none cursor-pointer"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          返回列表
        </button>
      </div>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-8 md:p-10 shadow-sm">
        <h1 className="text-[1.5rem] font-serif font-bold text-[var(--color-ink)] mb-8 flex items-center gap-4">
          <span className="w-1.5 h-6 bg-[var(--color-primary)] inline-block rounded-sm"></span>
          {isEditing ? '编辑作品' : '新增作品'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Title and Original Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--color-ink)]">
                <span className="text-red-500 mr-1">*</span>标题
              </label>
              <input 
                type="text" 
                name="title"
                value={formData.title} 
                onChange={handleChange}
                placeholder="请输入作品标题" 
                required
                className="w-full text-sm bg-[var(--color-paper)] border border-[var(--color-border)] py-2.5 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all text-[var(--color-ink)] placeholder:text-[var(--color-ink-light)]/50 shadow-sm"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--color-ink)] ml-2">原名</label>
              <input 
                type="text" 
                name="originalTitle"
                value={formData.originalTitle} 
                onChange={handleChange}
                placeholder="请输入作品原名" 
                className="w-full text-sm bg-[var(--color-paper)] border border-[var(--color-border)] py-2.5 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all text-[var(--color-ink)] placeholder:text-[var(--color-ink-light)]/50 shadow-sm"
              />
            </div>
          </div>

          {/* Row 2: Type, Creator, Year */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--color-ink)] ml-2">类型</label>
              <div className="relative">
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange}
                  className="w-full text-sm bg-[var(--color-paper)] border border-[var(--color-border)] py-2.5 pl-3 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] text-[var(--color-ink)] appearance-none cursor-pointer shadow-sm"
                >
                  {Object.entries(TYPE_LABELS).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-[var(--color-ink-light)]">▼</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--color-ink)] ml-2">导演/作者</label>
              <input 
                type="text" 
                name="creator"
                value={formData.creator} 
                onChange={handleChange}
                placeholder="请输入导演/作者" 
                className="w-full text-sm bg-[var(--color-paper)] border border-[var(--color-border)] py-2.5 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all text-[var(--color-ink)] placeholder:text-[var(--color-ink-light)]/50 shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--color-ink)] ml-2">发行年份</label>
              <input 
                type="text" 
                name="year"
                value={formData.year} 
                onChange={handleChange}
                placeholder="例如: 2024" 
                className="w-full text-sm bg-[var(--color-paper)] border border-[var(--color-border)] py-2.5 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all text-[var(--color-ink)] placeholder:text-[var(--color-ink-light)]/50 shadow-sm"
              />
            </div>
          </div>

          {/* Row 3: Cover Link */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--color-ink)] ml-2">封面链接</label>
            <input 
              type="url" 
              name="cover"
              value={formData.cover} 
              onChange={handleChange}
              placeholder="请输入图片 URL" 
              className="w-full text-sm bg-[var(--color-paper)] border border-[var(--color-border)] py-2.5 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all text-[var(--color-ink)] placeholder:text-[var(--color-ink-light)]/50 shadow-sm font-mono"
            />
          </div>

          {/* Row 4: Rating and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--color-ink)] ml-2">评分</label>
              <div className="flex items-center gap-2 h-10 px-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className="focus:outline-none p-1 hover:scale-110 transition-transform"
                  >
                    <Star 
                      size={24} 
                      className={`${(formData.rating || 0) >= star ? 'fill-[var(--color-gold)] text-[var(--color-gold)]' : 'text-[var(--color-border)]'} transition-colors cursor-pointer`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-[var(--color-ink-light)]">
                  {formData.rating ? `${formData.rating.toFixed(1)}` : '暂无'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--color-ink)] ml-2">状态</label>
              <div className="relative">
                <select 
                  name="status" 
                  value={formData.status} 
                  onChange={handleChange}
                  className="w-full text-sm bg-[var(--color-paper)] border border-[var(--color-border)] py-2.5 pl-3 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] text-[var(--color-ink)] appearance-none cursor-pointer shadow-sm"
                >
                  {Object.entries(STATUS_LABELS).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-[var(--color-ink-light)]">▼</span>
              </div>
            </div>
          </div>

          {/* Row 5: Tags */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--color-ink)] ml-2">标签</label>
            <div className="bg-[var(--color-paper)] border border-[var(--color-border)] p-2.5 rounded-md min-h-[46px] shadow-sm flex flex-wrap gap-2 focus-within:ring-1 focus-within:ring-[var(--color-primary)] focus-within:border-[var(--color-primary)] transition-all">
              {formData.tags?.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-1 rounded text-xs text-[var(--color-ink)] font-medium">
                  {tag}
                  <button type="button" onClick={() => handleTagRemove(tag)} className="text-[var(--color-ink-light)] hover:text-red-500 hover:bg-red-50 rounded-sm p-0.5 transition-colors">
                    <X size={12} />
                  </button>
                </span>
              ))}
              <div className="flex items-center flex-1 min-w-[120px]">
                <input 
                  type="text" 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleTagAdd(e); } }}
                  placeholder="输入标签后按回车或点击添加..."
                  className="w-full text-sm bg-transparent outline-none text-[var(--color-ink)] placeholder:text-[var(--color-ink-light)]/50 py-0.5 px-1"
                />
                {tagInput && (
                  <button type="button" onClick={handleTagAdd} className="shrink-0 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 p-1 rounded-sm transition-colors text-xs font-medium border border-[var(--color-primary)]/30 ml-2 shadow-sm">
                    添加
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Row 6: Review / Notes */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--color-ink)]">
              <span className="text-red-500 mr-1">*</span>观后感/笔记
            </label>
            <div className="relative shadow-sm">
              <textarea
                name="review"
                value={formData.review}
                onChange={handleChange}
                placeholder="落笔写下此刻的心得..."
                required
                className="w-full min-h-[240px] bg-[var(--color-paper)] p-4 text-[14px] leading-[1.8] text-[var(--color-ink)] border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all resize-y placeholder:text-[var(--color-ink-light)]/40 shadow-sm"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-8 border-t border-[var(--color-border)]/50 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 text-sm font-medium border border-[var(--color-border)] text-[var(--color-ink)] bg-white hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors rounded-md shadow-sm"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 text-sm font-medium bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 transition-colors rounded-md flex items-center gap-2 shadow-sm"
            >
              确定
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
