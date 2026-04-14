export interface Work {
  id: string;
  title: string;
  originalTitle?: string;
  type: 'movie' | 'book' | 'game';
  cover: string;
  creator: string;
  year: string;
  rating: number; // 0-5
  status: 'planned' | 'in_progress' | 'completed' | 'dropped' | 'backlogged';
  tags: string[];
  review: string;
  dateAdded: string;
  dateUpdated?: string;
}

export const mockWorks: Work[] = [
  {
    id: '1',
    title: '海边的卡夫卡',
    originalTitle: '海辺のカフカ',
    type: 'book',
    cover: 'https://images.unsplash.com/photo-1763768861268-cb6b54173dbf?q=80&w=1080&auto=format&fit=crop',
    creator: '村上春树',
    year: '2002',
    rating: 4.5,
    status: 'completed',
    tags: ['魔幻现实', '小说', '日本文学'],
    review: '十五岁的少年田村卡夫卡，为了逃避父亲的诅咒，离家出走来到四国高松。在这个带有神秘色彩的图书馆里，现实与隐喻交织。这是关于成长、失落和孤独的宏大隐喻。书中的两个平行世界最终交汇，让人感受到命运那不可言说的力量。',
    dateAdded: '2023-11-12 10:20:00',
    dateUpdated: '2023-11-12 10:20:00',
  },
  {
    id: '2',
    title: '星际穿越',
    originalTitle: 'Interstellar',
    type: 'movie',
    cover: 'https://images.unsplash.com/photo-1775198015031-fdf263839a01?q=80&w=1080&auto=format&fit=crop',
    creator: '克里斯托弗·诺兰',
    year: '2014',
    rating: 5,
    status: 'completed',
    tags: ['科幻', '太空', '剧情'],
    review: '爱是唯一能够超越时间与空间维度的事物。即便是在荒芜寒冷的宇宙深处，人类的情感依然是最强大的引力。季默那震撼人心的管风琴配乐，以及对黑洞“卡冈图雅”的视觉呈现，构成了现代科幻电影的巅峰体验。',
    dateAdded: '2024-03-20 15:30:00',
    dateUpdated: '2024-03-20 15:30:00',
  },
  {
    id: '3',
    title: '荒野大镖客：救赎2',
    originalTitle: 'Red Dead Redemption 2',
    type: 'game',
    cover: 'https://images.unsplash.com/photo-1774658554382-5b1216bdacb3?q=80&w=1080&auto=format&fit=crop',
    creator: 'Rockstar Games',
    year: '2018',
    rating: 5,
    status: 'backlogged',
    tags: ['开放世界', '西部', '剧情'],
    review: '这不仅仅是一款游戏，更像是一部可以游玩的西部史诗电影。亚瑟·摩根的故事令人心碎。游戏对细节的打磨到了令人发指的地步，每一处营地互动、每一片雪原的脚印都在讲述那个时代的终结。',
    dateAdded: '2024-01-20 09:15:00',
    dateUpdated: '2024-01-22 14:00:00',
  },
  {
    id: '4',
    title: '降临',
    originalTitle: 'Arrival',
    type: 'movie',
    cover: 'https://images.unsplash.com/photo-1636954935820-4554642e6fa7?q=80&w=1080&auto=format&fit=crop',
    creator: '丹尼斯·维伦纽瓦',
    year: '2016',
    rating: 4.5,
    status: 'completed',
    tags: ['科幻', '语言学', '命运'],
    review: '语言决定了我们的思维方式。当你掌握了七肢桶的语言，你也就掌握了非线性的时间观。“我预见了所有悲伤，但我依然愿意前往。”对原著《你一生的故事》极为出色且克制的影像化改编。',
    dateAdded: '2023-12-08 20:45:00',
    dateUpdated: '2023-12-08 20:45:00',
  }
];

export const STATUS_LABELS: Record<Work['status'], string> = {
  planned: '想看',
  in_progress: '在看',
  completed: '看过',
  dropped: '弃坑',
  backlogged: '补标'
};

export const TYPE_LABELS: Record<Work['type'], string> = {
  movie: '电影',
  book: '书籍',
  game: '游戏'
};
