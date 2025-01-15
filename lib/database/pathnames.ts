interface MenuType {
  pathname: string;
  pathnameEn: string;
  company?: boolean;
  members?: boolean;
  visitors?: boolean;
  news?: boolean;
  services?: boolean;
  info: {
    titleEn: string;
    title: string;
    link: string;
  }[];
}

export const sidebarData: MenuType[] = [
  {
    company: true,
    pathname: 'О компании',
    pathnameEn: 'About company',
    info: [
      { title: 'Коротко о нас', titleEn: 'About us', link: '/company/aboutus' },
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
    pathnameEn: 'Participants',

    info: [
      {
        title: 'Информация для участников',
        titleEn: 'Information for participants',
        link: '/members',
      },
      {
        title: 'Онлайн заявка для участников',
        titleEn: 'Online application',
        link: '/members/bid',
      },
      {
        title: 'Правила для участников',
        titleEn: 'Rules for participants',
        link: '/members/members-rules',
      },
    ],
  },
  {
    news: true,
    pathname: 'Новости',
    pathnameEn: 'News',

    info: [
      { title: 'Новости', titleEn: 'News', link: '/news' },
      // { title: 'Пресс-релизы', link: '' },
    ],
  },
  {
    visitors: true,
    pathname: 'Посетителям',
    pathnameEn: 'Visitors',

    info: [
      {
        title: 'Информация для посетителей',
        titleEn: 'Information for visitors',
        link: '/visitors',
      },
      {
        title: 'Порядок регистрации посетителей',
        titleEn: 'Entrance rules',
        link: '/visitors/rules-for-visitors',
      },
    ],
  },
  {
    services: true,
    pathname: 'Услуги',
    pathnameEn: 'Services',

    info: [
      {
        title: 'Организация выставок',
        titleEn: 'Organization of exhibitions',
        link: '/services/organization',
      },
      {
        title: 'B2B Встречи и Матчмейкинг',
        titleEn: 'B2B Meetings & Business Matchmaking',
        link: '/services/meetings',
      },
      {
        title: 'Бизнес-Миссии',
        titleEn: 'Business Missions',
        link: '/services/missions',
      },
      {
        title: 'Маркетинговые услуги',
        titleEn: 'Advertising activity',
        link: '/services/advertising',
      },
      {
        title: 'Организация гибридных мероприятий',
        titleEn: 'Organization of hybrid events',
        link: '/services/hybrid-organizations',
      },
      {
        title: 'Сертификация',
        titleEn: 'Certification',
        link: '/services/certification',
      },
      {
        title: 'Организация перевозки и таможенное оформление',
        titleEn: 'Freight forwarding and customs clearance',
        link: '/services/forwarding',
      },
      {
        title: 'Аутсорсинг бухгалтерского учета и аудита',
        titleEn: 'Outsourcing of accounting and auditing',
        link: '/services/outsourcing',
      },
      {
        title: 'Тренинг для персонала',
        titleEn: 'Personnel-training',
        link: '/services/personnel-training',
      },
      {
        title: 'Бизнес - туры',
        titleEn: 'Business - tours',
        link: '/services/business-tours',
      },
      {
        title: 'Дополнительные услуги',
        titleEn: 'Additional servies',
        link: '/services/additional',
      },
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
    pathname: '/visitors',
    visitors: true,
    only: true,
    title: 'Посетителям',
    first: true,
  },
  {
    pathname: '/services',
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
  en?: boolean;
}

export const headerMenu: HeaderType[] = [
  { title: 'О компании', link: '/company/aboutus', id: 1 },
  { title: 'Новости', link: '/news', id: 2 },
  { title: 'FAQ', link: '/faq', id: 3 },
  { title: 'Контакты', link: '/contacts', id: 4 },

  { en: true, title: 'About company', link: '/company/aboutus', id: 1 },
  { en: true, title: 'News', link: '/news', id: 2 },
  { en: true, title: 'FAQ', link: '/faq', id: 3 },
  { en: true, title: 'Contacts', link: '/contacts', id: 4 },
];

export const headerMenu2: HeaderType[] = [
  { title: 'Календарь мероприятий', link: '/calendar', id: 1 },
  { title: 'Услуги', link: '/services/organization', id: 2 },
  { title: 'О компании', link: '/company/aboutus', id: 3 },
  { title: 'Новости', link: '/news', id: 4 },
  { title: 'Контакты', link: '/contacts', id: 5 },

  // { title: 'Участникам', link: '/members', id: 2 },
  // { title: 'Посетителям', link: '/visitors', id: 3 },

  { en: true, title: 'Calendar of events', link: '/calendar', id: 1 },
  { en: true, title: 'Services', link: '/services/organization', id: 2 },
  { en: true, title: 'About company', link: '/company/aboutus', id: 3 },
  { en: true, title: 'News', link: '/news', id: 4 },
  { en: true, title: 'Contacts', link: '/contacts', id: 5 },

  // { en: true, title: 'Participants', link: '/members', id: 2 },
  // { en: true, title: 'Visitors', link: '/visitors', id: 3 },
];

interface FooterType {
  title: string;
  link: string;
}

export const footerMenu = [
  { title: 'Календарь мероприятий', link: '/calendar', one: true },
  { title: 'Участникам', link: '/members' },
  { title: 'Посетителям', link: '' },
  { title: 'Услуги', link: '/services/organization' },
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
  '+99312454111',
  'E-mail: contact@turkmenexpo.com',
  'Address: Ashgabat, 183 Bitarap Turkmenistan',
  'ave.,744000',
  'E-mail: contact@turkmenexpo.com',
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
