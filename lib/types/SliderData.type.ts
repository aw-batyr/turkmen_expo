export interface SliderTypes {
  data: Data;
}

export interface Data {
  code: string;
  banner_items: BannerItem[];
}

export interface BannerItem {
  title: string;
  text: string;
  image: string;
  link: string;
}
