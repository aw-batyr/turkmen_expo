import { EventCard } from "../cards/event-card";

import { getEvents } from "@/services/home";
import { EventsMobile } from "./events-mobile";
import { LinkButton } from "../ui/link-button";
import { Title } from "../ui/title";

export const Events = async ({ lang }: { lang: string }) => {
  const data = await getEvents(lang);

  const btnText =
    lang === "en" ? "Show more" : lang === "ru" ? "Показать еще" : "Show more";

  return (
    <section>
      <div className="container hidden md:block">
        <div className="mb-10">
          <Title
            text={
              lang === "en"
                ? "Upcoming exhibitions and events"
                : lang === "ru"
                ? "Ближайшие выставки и мероприятия"
                : "Upcoming exhibitions and events"
            }
          />
        </div>
        <div className="w-full flex flex-col items-center gap-8">
          {data.data.slice(0, 2).map((item, i) => (
            <EventCard
              coorganizers={item.coorganizers}
              dark
              key={i}
              {...item}
            />
          ))}
          <LinkButton href="/calendar">{btnText}</LinkButton>
        </div>
      </div>

      <EventsMobile data={data.data.slice(0, 5)} />
    </section>
  );
};
