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
  coorganizers: Organizer[];
  starts_at: string;
  ends_at: string;
  images: CalendarImage[];
  background_images: CalendarImage[];
  web_site: string;
  location: string;
  timing: Timing[];
  installation_date: string;
  dismantling_date: string;
  event_topic: string;
}

export interface CalendarImage {
  id: number;
  disk_name: string;
  file_name: string;
  path: string;
  extension: Extension;
}

export enum Extension {
  ExtensionJPG = 'JPG',
  Jpg = 'jpg',
  PNG = 'png',
}

export interface Organizer {
  id: number;
  name: string;
  address: string;
  phones: PhoneElement[];
  fax: string;
  email: string;
  web_site: string;
}

export interface PhoneElement {
  phone: PhoneEnum;
}

export enum PhoneEnum {
  The99312398881 = '(+99312) 39 88 81',
  The99312398981 = '(+99312) 39 89 81',
  The99362006200 = '+993 62 006200',
}

export interface Timing {
  date: null;
  time: null;
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
