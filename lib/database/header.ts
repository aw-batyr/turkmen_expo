export const burgerMenu = [
  {
    title: "Календарь мероприятий",
    link: "/calendar",
  },
  {
    partic: true,
    drop: true,
    title: "Участникам",
    link: "/members",
    dropDown: [
      {
        title: "Информация для участников",
        titleEn: "Information for participants",
        link: "/members",
      },
      {
        titleEn: "Application for participation",
        title: "Онлайн заявка для участников",
        link: "/members/bid",
      },
    ],
  },
  {
    title: "Посетителям",
    link: "",
  },
  {
    title: "Организаторам",
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
    link: "/company/aboutus",
    drop: true,
    dropDown: [
      {
        title: "О нас",
        link: "/company/aboutus",
      },
    ],
  },
  {
    title: "Новости",
    link: "/news",
  },
  {
    title: "FAQ",
    link: "/faq",
  },
  {
    title: "Контакты",
    link: "/contacts",
  },
];
