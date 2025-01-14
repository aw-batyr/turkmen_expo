import { Events } from "@/components/home/Events";
import { News } from "@/components/home/News";
import { Partners } from "@/components/home/Partners";
import { Slider } from "@/components/home/Slider";
import { SliderClient } from "@/components/home/SliderClient";
import { Video } from "@/components/home/Video";
import Loader from "@/components/ui/Loader";
import { Suspense } from "react";

export default function HomePage({
  searchParams,
}: {
  searchParams: { lang: string };
}) {
  const defaultBannerType = "main-surat";

  return (
    <main className="bg-blueBg flex flex-col gap-[60px] md:gap-[80px] xl:gap-[120px] pb-[120px]">
      <Suspense fallback={<Loader />}>
        <Slider defaultBannerType={defaultBannerType} />
        <SliderClient defaultBannerType={defaultBannerType} />
      </Suspense>

      <Events />
      <News />
      <Video />
      <Partners />
    </main>
  );
}
