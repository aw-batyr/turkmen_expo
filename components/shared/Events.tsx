import { getEvents } from "@/services/home";
import { EventsMobile } from "./events-mobile";

const events = [
  {
    video:
      "https://editor.turkmenexpo.com/storage/app/media/video/KidsExpo%202024_%20Turkmenistan.mp4",
    logo: "https://kids.turkmenexpo.com/logo.svg",
  },
  {
    video:
      "https://turkmentextile.turkmenexpo.com/app/storage/app/media/video/Textile2025.mp4",
    logo: "/assets/icons/turkmen-textile.png",
  },
  {
    video:
      "https://itse.turkmenexpo.com/app/storage/app/media/video/itse2025.mp4",
    logo: "https://itse.turkmenexpo.com/logo.svg",
  },
];

export const Events = async ({ lang }: { lang: string }) => {
  const data = await getEvents(lang);

  const btnText =
    lang === "en" ? "Show more" : lang === "ru" ? "Показать еще" : "Show more";

  const title = lang === "en" ? "Exhibitions" : "Выставки";

  const linkText = lang === "en" ? "Go to website" : "Перейти на сайт";

  return (
    <section>
      <div className="container md:block">
        <div className="sm:mb-10">
          <h2 className="text-center font-semibold text-3xl mb-8">
            {title} <span className="text-PRIMARY">Turkmen</span>
            <span className="text-red">Expo</span>
          </h2>
          {/* <Title
            text={
              lang === "en"
                ? "Upcoming exhibitions and events"
                : lang === "ru"
                ? "Ближайшие выставки и мероприятия"
                : "Upcoming exhibitions and events"
            }
          /> */}
        </div>
        {/* <div className="w-full flex flex-col items-center gap-8"> */}
        <div className="w-full flex flex-col items-center gap-8 lg:flex-row">
          {/* {data.data.slice(0, 2).map((item, i) => (
            <EventCard
              coorganizers={item.coorganizers}
              dark
              key={i}
              {...item}
            />
          ))}
          <LinkButton href="/calendar">{btnText}</LinkButton> */}
          {events.map((item, i) => (
            <article
              key={i}
              className="w-full h-auto bg-white drop-shadow-sm rounded-sm"
            >
              <div className="w-full h-full">
                <video
                  src={item.video}
                  className="size-full object-cover"
                  autoPlay
                  muted
                  loop
                />
              </div>
              <div className="flex items-center justify-between p-4">
                <img
                  height={80}
                  width={100}
                  src={item.logo}
                  alt="logo"
                  className="h-10 w-auto object-cover"
                />
                <a
                  href={events[0].logo.slice(0, -8)}
                  target="_blank"
                  className="text-PRIMARY underline"
                >
                  {linkText}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* <EventsMobile data={data.data.slice(0, 5)} /> */}
    </section>
  );
};
