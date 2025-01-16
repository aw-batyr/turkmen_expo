import { LayoutWithSidebar } from "@/components/page/layout-with-sidebar";
import { getServices } from "@/services/services";

export default async function BusinessTours({
  searchParams,
}: {
  searchParams: { lang: string };
}) {
  const { data } = await getServices(searchParams.lang);

  return (
    <LayoutWithSidebar
      title={data ? data[7].title : ""}
      third={data ? data[7].title : ""}
    >
      <div
        className="select-inner"
        dangerouslySetInnerHTML={{
          __html: data ? data[7].content : "",
        }}
      />
    </LayoutWithSidebar>
  );
}
