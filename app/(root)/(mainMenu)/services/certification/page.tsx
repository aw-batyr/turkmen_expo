import { LayoutWithSidebar } from "@/components/page/layout-with-sidebar";
import { getServices } from "@/services/services";

export default async function CertificationPage({
  searchParams,
}: {
  searchParams: { lang: string };
}) {
  const data = await getServices(searchParams.lang);

  return (
    <LayoutWithSidebar
      title={data?.data ? data.data[3].title : ""}
      third={data?.data ? data.data[3].title : ""}
    >
      <div
        className="select-inner"
        dangerouslySetInnerHTML={{
          __html: data ? data.data[3].content : "",
        }}
      />
    </LayoutWithSidebar>
  );
}
