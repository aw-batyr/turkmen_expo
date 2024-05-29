export interface PartnersType {
  data: Datum[];
}

export interface Datum {
  images: Image[];
  link: string;
}

export interface Image {
  id: number;
  disk_name: string;
  file_name: string;
  path: string;
  extension: string;
}
