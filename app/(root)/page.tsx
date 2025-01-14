import { Events } from '@/components/home/events';
import { News } from '@/components/home/news';
import { Partners } from '@/components/home/partners';
import { Slider } from '@/components/home/Slider';
import { Video } from '@/components/home/Video';
import Loader from '@/components/ui/Loader';
import { Suspense } from 'react';

export default async function HomePage({ searchParams }: { searchParams: { lang: string } }) {
  const lang = searchParams.lang;

  return (
    <main className="bg-blueBg flex flex-col gap-[60px] md:gap-[80px] xl:gap-[120px] pb-[120px]">
      <Suspense fallback={<Loader />}>
        <Slider />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Events lang={lang} />
      </Suspense>
      <News />
      <Video />
      <Partners />
    </main>
  );
}
