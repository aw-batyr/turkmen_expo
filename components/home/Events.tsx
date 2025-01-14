import { EventCard } from '../cards/EventCard';

import { Title } from './Title';
import { getEvents } from '@/services/home';
import { EventsMobile } from './events-mobile';
import { LinkButton } from '../ui/link-button';

export const Events = async ({ lang }: { lang: string }) => {
  const data = await getEvents(lang);

  console.log(data);

  const btnText = lang === 'en' ? 'Show more' : lang === 'ru' ? 'Показать еще' : 'Show more';

  return (
    <section>
      <div className="container hidden md:block">
        <div className="mb-10">
          <Title
            text={
              lang === 'en'
                ? 'Upcoming exhibitions and events'
                : lang === 'ru'
                ? 'Ближайшие выставки и мероприятия'
                : 'Upcoming exhibitions and events'
            }
          />
        </div>
        <div className="mb-[158px] w-full flex flex-col items-center gap-8">
          {data.data.slice(0, 2).map((item, i) => (
            <EventCard dark key={i} {...item} />
          ))}
          <LinkButton href="/calendar">{btnText}</LinkButton>
        </div>
      </div>

      <EventsMobile data={data.data.slice(0, 5)} />
    </section>
  );
};
