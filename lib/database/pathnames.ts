interface MenuType {
  pathname: string;
  company?: boolean;
  members?: boolean;
  news?: boolean;
  info: {
    title: string;
    link: string;
  }[];
}

export const sidebarData: MenuType[] = [
  {
    company: true,
    pathname: 'О компании',
    info: [
      { title: 'Коротко о нас', link: '/company/aboutus' },
      // { title: 'Выставочная деятельность', link: '' },
      // { title: 'История и награды', link: '' },
      // { title: 'Партнеры', link: '' },
      // { title: 'Работы в компании', link: '' },
      // { title: 'Наши издания', link: '' },
    ],
  },
  {
    members: true,
    pathname: 'Участникам',
    info: [
      { title: 'Информация для участников', link: '/members' },
      { title: 'Онлайн заявка для участников', link: '/members/bid' },
    ],
  },
  {
    news: true,
    pathname: 'Новости',
    info: [
      { title: 'Новости', link: '/news' },
      // { title: 'Пресс-релизы', link: '' },
    ],
  },
];

interface BurgerDataTypes {
  pathname: string;
  company?: boolean;
  members?: boolean;
  calendar?: boolean;
  faq?: boolean;
  news?: boolean;
  only?: boolean;
  services?: boolean;
  visitors?: boolean;
  contacts?: boolean;
  first?: boolean;
  title: string;
  drop?: string;
  info?: {
    title: string;
    link: string;
  }[];
}

export const burgerMenuData: BurgerDataTypes[] = [
  {
    pathname: '/calendar',
    calendar: true,
    only: true,
    title: 'Календарь мероприятий',
    first: true,
  },
  {
    members: true,
    title: 'Участникам',
    pathname: '/members',
    drop: 'members',
    first: true,
    info: [
      { title: 'Информация для участников', link: '/members' },
      { title: 'Онлайн заявка для участников', link: '/members/bid' },
    ],
  },
  {
    pathname: '',
    visitors: true,
    only: true,
    title: 'Посетителям',
    first: true,
  },
  {
    pathname: '',
    services: true,
    only: true,
    title: 'Услуги',
    first: true,
  },

  {
    pathname: '/faq',
    faq: true,
    only: true,
    title: 'FAQ',
  },
  {
    pathname: '/contacts',
    contacts: true,
    only: true,
    title: 'Контакты',
  },
  {
    company: true,
    title: 'О компании',
    pathname: '/company/aboutus',
    drop: 'company',
    info: [
      { title: 'Коротко о нас', link: '/company/aboutus' },
      // { title: "Выставочная деятельность", link: "" },
      // { title: "История и награды", link: "" },
      // { title: "Партнеры", link: "" },
      // { title: "Работы в компании", link: "" },
      // { title: "Наши издания", link: "" },
    ],
  },
  {
    news: true,
    title: 'Новости',
    pathname: '/news',
    drop: 'news',
    info: [
      { title: 'Новости', link: '/news' },
      // { title: "Пресс-релизы", link: "/news" },
    ],
  },
];

interface HeaderType {
  title: string;
  link: string;
  id: number;
  one?: boolean;
}

export const headerMenu: HeaderType[] = [
  { title: 'О компании', link: '/company/aboutus', id: 1 },
  { title: 'Новости', link: '/news', id: 2 },
  { title: 'FAQ', link: '/faq', id: 3 },
  { title: 'Контакты', link: '/contacts', id: 4 },
];

export const headerMenu2: HeaderType[] = [
  { title: 'Календарь мероприятий', link: '/calendar', id: 1, one: true },
  { title: 'Участникам', link: '/members', id: 2 },
  { title: 'Посетителям', link: '', id: 3 },
  { title: 'Услуги', link: '', id: 4 },
];

interface FooterType {
  title: string;
  link: string;
}

export const footerMenu = [
  { title: 'Календарь мероприятий', link: '/calendar', one: true },
  { title: 'Участникам', link: '/members' },
  { title: 'Посетителям', link: '' },
  { title: 'Организаторам', link: '' },
];

export const footerMenu2: FooterType[] = [
  { title: 'Территория комплекса', link: '' },
  { title: 'О компании', link: '/company/aboutus' },
  { title: 'Пресс-центр', link: '' },
  { title: 'FAQ', link: '/faq' },
  { title: 'Контакты', link: '/contacts' },
  { title: 'Справочный центр', link: '' },
];

export const footerInfo: string[] = [
  'Адрес: 744000, г. Ашхабад, просп. Битарап Туркменистан, 183',
  'Тел.: +99362006200',
  'E-mail: info@turkmenexpo.com',
];

export const topMenu = [
  {
    path: 'about',
    links: [{ active: 'Главная', default: '/ О компании / Коротко нас' }],
  },
  {
    path: 'members',
    links: [
      {
        active: 'Главная',
        active2: ' / Участникам',
        default: ' / Информация для участников',
      },
    ],
  },
  {
    path: 'members/bid',
    links: [
      {
        active: 'Главная',
        default: ' / Участникам / Онлайн заявка для участников',
      },
    ],
  },
  {
    path: 'events',
    links: [
      {
        active: 'Главная ',
        default: '/ Календарь мероприятий',
      },
    ],
  },
  {
    path: 'faq',
    links: [
      {
        active: 'Главная',
        default: ' / FAQ',
      },
    ],
  },
  {
    path: 'contacts',
    links: [
      {
        active: 'Главная',
        default: ' / Контакты',
      },
    ],
  },
  {
    path: 'calendar',
    links: [
      {
        active: 'Главная',
        default: ' / Календарь мероприятий',
      },
    ],
  },
  {
    path: 'news',
    links: [
      {
        active: 'Главная',
        default: ' / Новости',
      },
    ],
  },
];

export const burgerLinks = [
  {
    title: 'О компании',
    about: true,
    links: [
      { name: 'Коротко о нас', link: '/about/company' },
      { name: 'Выставочная деятельность', link: '/about/company' },
      { name: 'История и награды', link: '/about/company' },
      { name: 'Партнеры', link: '/about/company' },
      { name: 'Работа в компании', link: '/about/company' },
      { name: 'Наши издания', link: '/about/company' },
    ],
  },
  {
    title: 'Новости',
    news: true,
    links: [
      { name: 'Новости', link: '/news' },
      { name: 'Пресс центр', link: '/news' },
    ],
  },
  {
    title: 'Участникам',
    members: true,
    links: [
      { name: 'Участникам', link: '/members' },
      { name: 'Онлайн заявка', link: '/members/bid' },
    ],
  },
  {
    title: 'Контакты',
    contacts: true,
    links: [
      { name: 'Новости', link: '/news' },
      { name: 'Пресс центр', link: '/news' },
    ],
  },
  {
    title: 'FAQ',
    faq: true,
    links: [
      { name: 'faq', link: '/news' },
      { name: 'Пресс центр', link: '/news' },
    ],
  },
  {
    news: true,
    links: [
      { name: 'Новости', link: '/news' },
      { name: 'Пресс центр', link: '/news' },
    ],
  },
];
