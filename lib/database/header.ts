export const burgerMenu = [
  {
    title: "Календарь мероприятий",
    titleEn: "Calendar of events",
    link: "/calendar",
  },
  {
    partic: true,
    drop: true,
    title: "Участникам",
    titleEn: "Participants",
    link: "/members",
    dropDown: [
      {
        title: "Информация для участников",
        titleEn: "Information for participants",
        link: "/members",
      },
      {
        title: "Онлайн заявка для участников",
        titleEn: "Application for participation",
        link: "/members/bid",
      },
    ],
  },
  {
    title: "Посетителям",

    titleEn: "Visitors",
    link: "/visitors",
  },
  {
    title: "Организаторам",

    titleEn: "Services",
    link: "",
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
