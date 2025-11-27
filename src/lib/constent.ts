export interface BlogPost {
  id: string;
  title: string;
  author: string;
  status: "published" | "draft";
  category: Category[];
  tags: string[];
  read_time: string;
  createdAt: string;
  views: number;
  thumbnail?: string;
  featured: boolean;
  summary: string;
  content: string;
  coverImage:string
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
}

export interface ClientReview {
  id: string;
  client_name: string;
  review_text: string;
  rating: number;
  avatar_url?: string;
}
