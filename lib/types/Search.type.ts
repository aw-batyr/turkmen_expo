export interface SearchTypes {
  status_code: number;
  message: string;
  data: Data;
}

export interface Data {
  expo_events: ExpoEvent[];
  posts: Post[];
}

export interface ExpoEvent {
  id: number;
  title: string;
  description: string;
  category: string;
  organizer: Organizer;
  starts_at: Date;
  ends_at: Date;
  images: Image[];
  background_images: Image[];
  web_site: string;
  location: string;
  timing: Timing[];
  event_topic: string;
}

export interface Image {
  id: number;
  disk_name: string;
  file_name: string;
  path: string;
  extension: string;
}

export interface Organizer {
  name: string;
  address: string;
  phones: Phone[];
  fax: string;
  email: string;
  web_site: string;
}

export interface Phone {
  phone: string;
}

export interface Timing {
  date: string;
  time: string;
}

export interface Post {
  id: number;
  title: string;
  published_at: string;
  featured_images: Image[];
  content_html: string;
}
