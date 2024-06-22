import car from '@/public/assets/icons/service/car.svg';
import bus from '@/public/assets/icons/service/bus.svg';
import track from '@/public/assets/icons/service/track.svg';

import { RoadCardProps } from '../types';

export const roadCardData: RoadCardProps[] = [
  {
    icon: car,
    text: 'На машине',

    enText: 'Car',
  },
  {
    icon: bus,
    text: 'На автобусе',

    enText: 'Public transport',
  },
  {
    icon: track,
    text: 'Freight transport',

    enText: 'Car',
  },
];

import call from '@/public/assets/icons/service/call.svg';
import megaphone from '@/public/assets/icons/service/megaphone.svg';
import bag from '@/public/assets/icons/service/bag.svg';

export const contactCardData: RoadCardProps[] = [
  {
    icon: call,
    text: 'Справочный центр',

    enText: 'Call centre',
  },
  {
    icon: bag,
    text: 'Услуги',

    enText: 'Servise bureau',
  },
  {
    icon: megaphone,
    text: 'Реклама',

    enText: 'Advertising',
  },
];

import partner from '@/public/assets/icons/home/partner.svg';
import { StaticImageData } from 'next/image';

export const partnersData: StaticImageData[] = [partner, partner, partner, partner, partner];
