import { EventCard } from "@/components/cards/event-card";
import { BreadCrumbs } from "@/components/ui/bread-crumbs";
import { Title } from "@/components/ui/Title";
import { getCalendar } from "@/services/calendar";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "TurkmenExpo | calendar",
};

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: { lang: string };
}) {
  const lang = searchParams.lang;

  const data = await getCalendar(lang);

  const title = lang === "en" ? "Calendar of events" : "Календарь мероприятий";
  return (
    <div className="section-mb">
      <div className="container flex flex-col items-start pt-[20px] gap-10 md:gap-12">
        <div>
          <div className="mb-[24px]">
            <BreadCrumbs second={title} />
          </div>
          <Title text={title} />
        </div>
        <div className="flex flex-col gap-6 w-full">
          {data.data.map((item, i) => (
            <EventCard dark={true} key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
