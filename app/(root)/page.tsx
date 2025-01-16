import { Events } from '@/components/home/events';
import { News } from '@/components/home/news';
import { Partners } from '@/components/home/partners';
import { Slider } from '@/components/home/slider';
import { Video } from '@/components/home/video';
import Loader from '@/components/ui/loader';
import { Suspense } from 'react';

export default async function HomePage({ searchParams }: { searchParams: { lang: string } }) {
  const lang = searchParams.lang;

  return (
    <div className="bg-blueBg flex flex-col gap-[60px] md:gap-[80px] xl:gap-[120px] pb-[120px]">
      <Slider lang={lang} />

      <Suspense fallback={<Loader />}>
        <Events lang={lang} />
      </Suspense>
      <News />
      <Video />
      <Partners />
    </div>
  );
}
