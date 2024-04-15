export interface NewsPageType {
  data: Data;
}

export interface Data {
  id: number;
  title: string;
  published_at: string;
  featured_images: FeaturedImage[];
  content_html: string;
}

export interface FeaturedImage {
  id: number;
  disk_name: string;
  file_name: string;
  path: string;
  extension: string;
}
