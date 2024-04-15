import { StaticImageData } from "next/image";

export type EventCardProps = {
  dark?: boolean;
  img: StaticImageData;
  title: string;
  text: string;
  suptitle: string;
  footerText: string;
  organizer: string;
  date: string;
  calendar: string;
  id: number;
};

export type NewsCardProps = {
  img: StaticImageData;
  date: string;
  text: string;
  id: number;
};

export type RoadCardProps = {
  icon: any;
  text: string;
};
