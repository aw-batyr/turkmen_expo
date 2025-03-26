import { LayoutWithSidebar } from "@/components/page/layout-with-sidebar";
import { getServices } from "@/services/services";

export default async function HybridsPage() {
  const data = await getServices();

  return (
    <LayoutWithSidebar
      title={data?.data ? data.data[2].title : ""}
      third={data?.data ? data.data[2].title : ""}
    >
      <div
        className="select-inner"
        dangerouslySetInnerHTML={{
          __html: data ? data.data[2].content : "",
        }}
      />
    </LayoutWithSidebar>
  );
}
