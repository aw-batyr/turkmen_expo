export interface ContactsDataType {
  data: Datum[];
}

export interface Datum {
  header: string;
  services: Service[];
}

export interface Service {
  title: string;
  phone: string;
  email: string;
  web_site: string;
}
