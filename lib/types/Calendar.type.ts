export interface CalendarType {
  data: Datum[];
  links: Links;
  meta: Meta;
}

export interface Datum {
  id: number;
  title: string;
  description: string;
  category: string;
  organizers: Organizer[];
  starts_at: string;
  ends_at: string;
  images: Image[];
  web_site: null | string;
  location: null | string;
  timing: Timing[];
  event_topic: null | string;
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
