export interface EventPageType {
  data: Data;
}

export interface Data {
  id: number;
  title: string;
  description: string;
  category: string;
  organizers: Organizer[];
  coorganizers: any[];
  starts_at: Date;
  ends_at: Date;
  date: string;
  images: Image[];
  background_images: any[];
  web_site: string;
  location: string;
  timing: Timing[];
  installation_date: string;
  dismantling_date: string;
  event_topic: string;
  url_registration: string;
  url_web: string;
  url_detailed: string;
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
  id: number;
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
  date: null;
  time: null;
}
