'use client';

import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { useAppSelector } from '@/redux/hooks';

import { Radio } from '../ui/Radio';
import { Title } from '../home/Title';
import { baseAPI } from '@/lib/API';
import { selectHeader } from '@/redux/slices/headerSlice';
import { FaqDataType, RadioDataType } from '@/lib/types/FaqData.type';
import { Select } from './Select';
import { BreadCrumbs } from '../ui/BreadCrumbs';
import { AnimatePresence } from 'framer-motion';

export const radio = [
  { name: 'Все', id: 'all' },
  { name: 'Посетителям', id: 'visitors' },
  { name: 'Участникам', id: 'members' },
];

export const FaqSec = () => {
  const data = [
    {
      title: 'Аренда площади на собственных выставках',
      content:
        '<h3>Стоимость аренды</h3><p>Стоимость аренды площади разработана с учетом статуса каждой выставки, конфигурации и расположения стендов в павильонах. Стоимость аренды выставочных площадей можно узнать после заполнения <a href="https://www.expocentr.ru/ru/exhibitors/application/">онлайн-заявки на участие</a>.</p><h3>Пакет участника</h3><p>В пакет участника собственной выставки входят:</p><ul><li>электроосвещение стенда в пределах 100 Вт установленной мощности напряжением 220 В на 1 кв. м арендованной площади;</li><li>пропуска для монтажников и проезда автотранспорта на период монтажа / демонтажа (только для проведения погрузочно-разгрузочных работ);</li><li>удостоверения участника выставки;<br><u>Примечание</u><table style="width: 100%;"><tbody><tr><td style="width: 100.0000%;"><em>Предоставляются из расчета: при площади стенда до 90 кв. м включительно – одно удостоверение на 3 кв. м площади; при площади стенда свыше 90 кв. м – 30 удостоверений плюс по одному удостоверению на каждые 6 кв. м площади, превышающей 90 кв. м.</em></td></tr><tr><td style="width: 100.0000%;"><em>«Удостоверение участника выставки» даёт право многократного прохода на территорию ЦВК «Экспоцентр», как в период работы выставки, так и в период монтажа/демонтажа с 8.00 до 20.00.</em></td></tr></tbody></table></li><li>бесплатные приглашения для гостей экспонентов;<br><u>Примечание</u><table style="width: 100%;"><tbody><tr><td style="width: 100.0000%;"><em>Выдаются в Дирекции выставки (строго при 100% оплате аренды).</em></td></tr></tbody></table></li><li>публикация информации об экспоненте в Официальном каталоге выставки;</li><li>использование онлайн-системы назначения деловых встреч (MatсhMaking);</li><li>возможность рассылки электронных билетов на выставку для клиентов и партнеров;</li><li>участие в семинаре <a href="https://www.expocentr.ru/ru/exhibitors/additional-features/seminars/">«Эффективное участие в выставках»</a><br><u>Примечание</u><table style="width: 100%;"><tbody><tr><td style="width: 100.0000%;"><em>Для экспонентов собственных выставок посещение семинара входит в стоимость участия в выставке!</em></td></tr><tr><td style="width: 100.0000%;"><em>Для организаций, не являющихся экспонентами собственных выставок «Экспоцентра», участие в семинаре оплачивается на платной основе.</em></td></tr><tr><td><em>В зависимости от количества участников предоставляются особые условия.</em></td></tr></tbody></table></li></ul><h3>Оплата</h3><p>Компании, полностью не погасившие задолженность за площадь, оборудование или дополнительно заказанные услуги, не допускаются на монтаж экспозиции.</p><h3>Закрывающие документы</h3><p>Закрывающие документы по выставке выдаются в последний день работы выставки в Дирекции. В течение первых двух недель документы хранятся у менеджеров Дирекции, после чего передаются в Экономический отдел. По каждой выставке работает определенный экономист (см.&nbsp;<strong>«Руководство участника выставки»</strong> на сайте выставки).</p><p>Для получения закрывающих документов по выставке (счет-фактура, акт сдачи-приемки оказанных услуг и выставочных площадей, договор) представителю фирмы необходимо в период монтажа подписать акт сдачи-приемки оказанных услуг и выставочных площадей в Дирекции выставки. При себе необходимо иметь доверенность (<strong><a href="https://www.expocentr.ru/upload/docs/D01.doc" target="_blank">D.01</a></strong>) на право подписи акта, два оригинала договора и инженерную схему в двух экземплярах (если по каким-либо причинам они не были предоставлены ранее).</p><p>В случае если доверенность&nbsp;<strong><a href="https://www.expocentr.ru/upload/docs/D01.doc" target="_blank">D.01</a></strong> не оформляется, то представителям компании передаются акты для подписания руководством, и после их получения Дирекцией выставки выдаются закрывающие финансовые документы по выставке.</p><p><br></p><p><br></p><p><br></p><p>&nbsp;</p>',
    },
    {
      title: 'Официальный каталог',
      content:
        '<p>К открытию выставки АО «Экспоцентр» издает Официальный каталог (в виде печатного издания и/или на электронном носителе) и/или размещает (на официальном сайте выставки), в который вносится следующая информация:</p><ul><li>название фирмы на русском языке и в латинской транскрипции, страна, почтовый и электронный адреса, сайт;</li><li>номера телефонов и факсов;</li><li>павильон, зал и номер стенда;</li><li>а также краткие сведения о деятельности фирмы объемом до 4 строк (в строке 50 знаков, включая пробелы).</li></ul><p><br></p><h3>Условия размещения рекламно-информационных материалов в официальном каталоге и путеводителе выставки</h3><ol><li>В соответствии с «Общими условиями участия в выставках в ЦВК «Экспоцентр» каждый зарегистрировавшийся участник выставки обязан:<br>- предоставить для публикации в Официальном каталоге следующую информацию: название организации (на русском и английском языках), адрес, телефон, факс, e-mail, адрес в интернете, сведения о деятельности фирмы объемом 200 знаков, включая пробелы и знаки препинания;<br>- выбрать рубрики (количество бесплатных рубрик зависит от выставки) в рубрикаторе каталога для размещения краткой информации: название фирмы на русском языке и латинской транскрипции, страна, павильон, зал и номер стенда.</li><li>Вся печатная информация (кроме логотипа и рекламы) из алфавитного списка и рубрикатора Официального каталога дублируется в интернет-каталоге на сайте выставки в течение года.</li><li>По желанию экспонента в Официальном каталоге и путеводителе выставки может быть размещена дополнительная рекламная информация согласно действующим тарифам, указанным в заявках.</li><li>В случае непредоставления Участником выставки текста о деятельности компании на английском языке Издатель самостоятельно делает перевод. В этом случае претензии по переводу не принимаются.</li><li>Заявку следует заполнить и прислать обязательно в текстовом редакторе Microsoft Word. В случае заказа платных услуг – также в отсканированном виде с печатью и подписью ответственного лица.</li><li>Издатель оставляет за собой право вносить редакторскую правку в текст согласно нормам русского и английского языков.</li><li>В случае если заявка отправлена после указанного в заявке срока Издатель не гарантирует размещение информации в печатной версии каталога.</li><li>Экспонент несет полную ответственность за содержание и достоверность любой информации и сведений, предоставляемых Издателю для размещения, независимо от способа их предоставления Издателю;</li><li>Любое переиздание или воспроизведение, даже частичное, допускается лишь с особого разрешения Издателя.</li></ol><p><br></p><p><strong>Дополнительные возможности размещения:</strong></p><ul><li>размещение логотипа в алфавитном списке каталога;</li><li>размещение логотипа в интернет-каталоге.</li></ul><p><br></p><p><u>Реклама в каталоге</u></p><table border="0" style="width: 100%;"><tbody><tr><td style="width: 100.0000%;"><ul><li><em>2-4-я стр. обложки</em></li></ul></td></tr><tr><td style="width: 100.0000%;"><ul><li><em>Разделительная страница (в каталоге возможно размещение до 8 разделительных страниц на плотной бумаге)</em></li></ul></td></tr><tr><td style="width: 100.0000%;"><ul><li><em>Размещение рекламы компании на нижнем колонтитуле страницы</em></li></ul></td></tr><tr><td style="width: 100.0000%;"><ul><li><em>Разворот (2 полосы)</em></li></ul></td></tr></tbody></table><p><u>Реклама в путеводителе</u>&nbsp;</p><table style="width: 100%;"><tbody><tr><td style="width: 100.0000%;"><ul><li><em>2-4-я стр. обложки</em></li></ul></td></tr><tr><td style="width: 100.0000%;"><ul><li><em>Рекламная полоса в путеводителе</em></li></ul></td></tr><tr><td style="width: 100.0000%;"><ul><li><em>½ рекламной полосы в путеводителе</em></li></ul></td></tr><tr><td style="width: 100.0000%;"><ul><li><em>Колонтитул в путеводителе</em></li></ul></td></tr></tbody></table><p><br></p>',
    },
  ];

  const [faqData, setFaqData] = useState<FaqDataType>();

  const [currentRadio, setCurrentRadio] = useState(0);
  const [radioData, setRadioData] = useState<RadioDataType>();
  const { activeLang } = useAppSelector(selectHeader);

  const fetchFaqRadio = async () => {
    try {
      const res = await fetch(
        `${baseAPI}faq-user-groups?X-Localization=${activeLang.localization}&`,
      );

      const data = await res.json();

      setRadioData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFaq = async () => {
    try {
      const res = await fetch(
        `${baseAPI}${currentRadio === 2 && 'participants-page-items'}?X-Localization=${
          activeLang.localization
        }`,
      );

      if (!res.ok) {
        throw new Error('Error');
      }

      const data: FaqDataType = await res.json();

      setFaqData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFaq();
    fetchFaqRadio();
  }, [currentRadio, activeLang.localization]);

  const changeRadio = (id: number) => {
    setCurrentRadio(id);
  };

  console.log(currentRadio);

  return (
    <div className="container flex flex-col items-start pt-[20px] section-mb">
      <BreadCrumbs second="FAQ" />
      <Title text="«Вопросы-ответы»" />
      <div className="flex items-center sm:mt-6 mt-10 sm:gap-[20px] gap-10 mb-[48px]">
        <Radio
          nofilter
          id={currentRadio}
          changeRadio={changeRadio}
          active={currentRadio === 0}
          text={'Все'}
        />
        {radioData
          ? radioData.data.map((item) => (
              <div key={v4()}>
                <Radio
                  id={item.id}
                  active={currentRadio === item.id}
                  changeRadio={changeRadio}
                  text={item.name}
                />
              </div>
            ))
          : null}
      </div>
      {faqData ? faqData.data.map((obj) => <Select {...obj} key={v4()} />) : null}
    </div>
  );
};

// faqItems={obj.faq_items} header={obj.header}
