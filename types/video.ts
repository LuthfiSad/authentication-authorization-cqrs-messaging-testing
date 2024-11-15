export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: string;
  uploader: string;
  views: number;
  likes: number;
  uploadDate: Date;
}
