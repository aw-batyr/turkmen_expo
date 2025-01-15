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
  starts_at: Date;
  ends_at: Date;
  images: Image[];
  background_images: any[];
  web_site: string;
  location: string;
  timing: Timing[];
  installation_date: string;
  dismantling_date: string;
  event_topic: string;
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

export interface Image {
  id: number;
  disk_name: string;
  file_name: string;
  path: string;
  extension: string;
}

export interface Timing {
  date: null;
  time: null;
}
