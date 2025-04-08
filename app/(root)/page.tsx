import { Events } from "@/components/shared/Events";
import { News } from "@/components/shared/News";
import { Partners } from "@/components/shared/Partners";
import { Slider } from "@/components/shared/Slider";
import { Video } from "@/components/shared/Video";
import Loader from "@/components/ui/Loader";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function HomePage() {
  const lang = cookies().get("lang")?.value ?? "ru";

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
