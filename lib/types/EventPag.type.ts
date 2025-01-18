export interface EventPageType {
  data: Data;
}

export interface Data {
  id: number;
  title: string;
  description: string;
  category: string;
  organizers: Organizer[];
  coorganizers: Organizer[];
  starts_at: string;
  ends_at: string;
  images: Image[];
  background_images: {
    path: string;
  }[];
  web_site: string;
  location: string;
  timing: Timing[];
  event_topic: string;
  installation_date: string;
  dismantling_date: string;
  url_registration?: string;
  url_web?: string;
  url_detailed?: string;
  our: number;
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
