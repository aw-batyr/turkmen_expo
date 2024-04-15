export interface NewsData {
  data: Datum[];
  links: Links;
  meta: Meta;
}

export interface Datum {
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

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
