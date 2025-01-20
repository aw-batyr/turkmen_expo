import { LayoutWithSidebar } from "@/components/page/layout-with-sidebar";
import { getServices } from "@/services/services";

export default async function OrganizationPage({
  searchParams,
}: {
  searchParams: { lang: string };
}) {
  const data = await getServices(searchParams.lang);

  return (
    <LayoutWithSidebar
      title={data?.data ? data.data[0].title : ""}
      third={data?.data ? data.data[0].title : ""}
    >
      <div
        className="select-inner"
        dangerouslySetInnerHTML={{
          __html: data?.data ? data.data[0].content : "",
        }}
      />
    </LayoutWithSidebar>
  );
}
