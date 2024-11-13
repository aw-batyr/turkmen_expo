import { Events } from '@/components/home/Events';
import { News } from '@/components/home/News';
import { Services } from '@/components/home/Services';
import { Partners } from '@/components/home/Partners';
import { Slider } from '@/components/home/Slider';
import { Video } from '@/components/home/Video';
import Image from 'next/image';

const Home = () => {
  return (
    <div className="bg-blueBg flex flex-col gap-[60px] md:gap-[80px] xl:gap-[120px]">
      <Slider />
      <Events />
      <News />
      <Video />
      <Services />
      <Partners />

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
