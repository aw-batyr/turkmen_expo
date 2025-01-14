import { LayoutWithSidebar } from '@/components/page/LayoutWithSidebar';
import { baseAPI } from '@/lib/API';
import { ServicesType } from '@/lib/types/Services.data';

export default async function MeetingsPage({ searchParams }: { searchParams: { lang: string } }) {
  const lang = searchParams.lang;

  const res = await fetch(`${baseAPI}services`, {
    next: { revalidate: 1800 },
    headers: {
      'Accept-Language': searchParams.lang || 'ru',
    },
  });

  if (!res.ok) throw new Error('Ошибка при загрузке данных');

  const data: ServicesType = await res.json();

  return (
    <LayoutWithSidebar
      title={data?.data ? data.data[9].title : ''}
      second={lang === 'en' ? 'Services' : 'Сервисы'}
      third={data?.data ? data.data[9].title : ''}>
      <div
        className="select-inner"
        dangerouslySetInnerHTML={{
          __html: data ? data.data[9].content : '',
        }}
      />
    </LayoutWithSidebar>
  );
}
