import { Events } from "@/components/home/Events";
import { News } from "@/components/home/News";
import { Partners } from "@/components/home/Partners";
import { Slider } from "@/components/home/Slider";
import { Video } from "@/components/home/Video";
import Loader from "@/components/ui/Loader";
import { Suspense } from "react";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { lang: string };
}) {
  const lang = searchParams.lang;

  return (
    <div className="bg-blueBg flex flex-col gap-[60px] md:gap-[80px] pb-[80px]">
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
