import { LayoutWithSidebar } from "@/components/page/layout-with-sidebar";
import { getServices } from "@/services/services";

export default async function AdvertisingPage({
  searchParams,
}: {
  searchParams: { lang: string };
}) {
  const { data } = await getServices(searchParams.lang);

  return (
    <LayoutWithSidebar
      title={data ? data[8].title : ""}
      third={data ? data[8].title : ""}
    >
      <div
        className="select-inner"
        dangerouslySetInnerHTML={{
          __html: data ? data[8].content : "",
        }}
      />
    </LayoutWithSidebar>
  );
}
