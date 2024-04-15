export interface PartnersType {
  data: Datum[];
}

export interface Datum {
  images: Image[];
}

export interface Image {
  id: number;
  disk_name: string;
  file_name: string;
  path: string;
  extension: string;
}
