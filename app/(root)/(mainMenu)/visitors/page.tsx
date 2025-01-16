"use client";

import { LayoutWithSidebar } from "@/components/page/layout-with-sidebar";
import { baseAPI } from "@/lib/API";
import { useAppSelector } from "@/redux/hooks";
import { selectHeader } from "@/redux/slices/headerSlice";
import { useLang } from "@/utils/useLang";
import { useEffect, useState } from "react";

const Visitors = () => {
  const [visitorsData, setVisitorsData] = useState<string>();
  const { activeLang } = useAppSelector(selectHeader);

  const fetchVisitors = async () => {
    try {
      const res = await fetch(`${baseAPI}settings/visitors_page`, {
        headers: {
          "Accept-Language": activeLang.localization,
        },
      });

      if (!res.ok) {
        throw new Error("Error");
      }

      const data = await res.json();

      setVisitorsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <div>
      <LayoutWithSidebar
        title={useLang(
          "Information for visitors",
          "Информация для посетителей",
          activeLang.localization
        )}
        second={useLang("For visitors", "Посетителям", activeLang.localization)}
      >
        <div
          dangerouslySetInnerHTML={{ __html: visitorsData ? visitorsData : "" }}
          className="flex flex-col gap-1 select-inner"
        />
      </LayoutWithSidebar>
    </div>
  );
};

export default Visitors;
