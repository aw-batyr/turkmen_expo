import { LayoutWithSidebar } from '@/components/page/LayoutWithSidebar';
import { getServices } from '@/services/services';

export default async function MissionsPage({ searchParams }: { searchParams: { lang: string } }) {
  const data = await getServices(searchParams.lang);

  return (
    <LayoutWithSidebar
      title={data?.data ? data.data[10].title : ''}
      third={data?.data ? data.data[10].title : ''}>
      <div
        className="select-inner"
        dangerouslySetInnerHTML={{
          __html: data ? data.data[10].content : '',
        }}
      />
    </LayoutWithSidebar>
  );
}
