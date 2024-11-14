export const burgerMenu = [
  {
    title: "Календарь мероприятий",
    titleEn: "Calendar of events",
    link: "/calendar",
  },
  {
    title: "О компании",
    titleEn: "Calendar of events",
    link: "/company/aboutus",
  },
  {
    title: "Новости",
    titleEn: "News",
    link: "/news",
  },
  {
    title: "Контакты",
    titleEn: "Contacts",
    link: "/contacts",
  },
  {
    services: true,
    title: "Услуги",
    drop: true,
    titleEn: "Services",
    link: "/services/organization",

    dropDown: [
      {
        title: "Организация выставок",
        titleEn: "Organization of exhibitions",
        link: "/services/organization",
      },
      {
        title: "Рекламная деятельность",
        titleEn: "Advertising activity",
        link: "/services/advertising",
      },
      {
        title: "Организация гибридных мероприятий",
        titleEn: "Organization of hybrid events",
        link: "/services/hybrid-organizations",
      },
      {
        title: "Сертификация",
        titleEn: "Certification",
        link: "/services/certification",
      },
      {
        title: "Экспедирование грузов и таможенное оформление",
        titleEn: "Freight forwarding and customs clearance",
        link: "/services/forwarding",
      },
      {
        title: "Аутсорсинг бух.учета и аудита",
        titleEn: "Outsourcing of accounting and auditing",
        link: "/services/outsourcing",
      },
      {
        title: "Обучения персонала",
        titleEn: "Personnel-training",
        link: "/services/personnel-training",
      },
      {
        title: "Бизнес - туры",
        titleEn: "Business - tours",
        link: "/services/business-tours",
      },
    ],
  },

  //   { en: true, title: "Exhibition", link: "/exhibition-about" },
  //   { en: true, title: "Participants", link: "/participants-info" },
  //   { en: true, title: "For visitors", link: "/visitors-info" },
];

export const burgerMenu2 = [
  {
    company: true,
    title: "О компании",

    titleEn: "About company",
    link: "/company/aboutus",
    drop: true,
    dropDown: [
      {
        title: "О нас",
        titleEn: "About us",
        link: "/company/aboutus",
      },
    ],
  },
  {
    title: "Новости",

    titleEn: "News",
    link: "/news",
  },
  {
    title: "FAQ",

    titleEn: "FAQ",
    link: "/faq",
  },
  {
    title: "Контакты",

    titleEn: "Контакты",
    link: "/contacts",
  },
];
