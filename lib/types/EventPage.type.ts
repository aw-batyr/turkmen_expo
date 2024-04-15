export interface EventType {
  data: Data;
}

export interface Data {
  id: number;
  title: string;
  description: string;
  category: string;
  organizer: Organizer;
  starts_at: Date;
  ends_at: Date;
  images: Image[];
  web_site: null;
  location: null;
  timing: any[];
  event_topic: null;
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
  address: null;
  phones: null;
  fax: null;
  email: null;
  web_site: null;
}
