export interface Image {
  id: number;
  disk_name: string;
  file_name: string;
  file_size: number;
  content_type: string;
  title: string | null;
  description: string | null;
  field: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  path: string;
  extension: string;
}

// Тип для элемента отзыва
export interface Review {
  id: number;
  name: string;
  job_title: string;
  text: string;
  created_at: string;
  updated_at: string;
  image: Image | null;
}

// Основной тип ответа API
export interface ReviewsType {
  status: "success" | "error";
  data: Review[] | null;
}
