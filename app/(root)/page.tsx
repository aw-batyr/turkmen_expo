import { Events } from "@/components/home/Events";
import { News } from "@/components/home/News";
import { Services } from "@/components/home/Services";
import { Partners } from "@/components/home/Partners";
import { Slider } from "@/components/home/Slider";
import { Video } from "@/components/home/Video";
import Image from "next/image";

const Home = () => {
  return (
    <div className="bg-blueBg">
      <section className="h-full mx-auto section-mb">
        <Slider />
      </section>

      <section className="mb-[60px] section-mb w-full">
        <Events />
      </section>

      <section className="lg:mb-[113px] md:mb-[100px] mb-[60px]">
        <News />
      </section>

      <section className="section-mb ">
        <Video />
      </section>

      <section className="section-mb ">
        <Services />
      </section>

      <section className="section-mb">
        <Partners />
      </section>

      <section className="section-mb container">
        <div className="bg-white flex justify-center">
          <a className="" href="https://exposale.net/ru" target="_blank">
            <Image
              alt="banner"
              width={728}
              height={90}
              src="https://exposale.net/template-admin/assets/elFinder/files/banners/728x90rus.png"
              title="Найди свою выставку на EXPOSALE.net "
            />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
