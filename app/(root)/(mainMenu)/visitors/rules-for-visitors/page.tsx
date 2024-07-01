"use client";

import { LayoutWithSidebar } from "@/components/page/LayoutWithSidebar";
import { baseAPI } from "@/lib/API";
import { useAppSelector } from "@/redux/hooks";
import { selectHeader } from "@/redux/slices/headerSlice";
import { useLang } from "@/utils/useLang";
import { useEffect, useState } from "react";

const RulesForVisitors = () => {
  const [visitorsData, setVisitorsData] = useState<string>();
  const { activeLang } = useAppSelector(selectHeader);

  const fetchVisitors = async () => {
    try {
      const res = await fetch(`${baseAPI}settings/visiting_rules`, {
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
        title={useLang("Entrance rules", "Правила посещения")}
        second={useLang(
          "Information for visitors",
          "Информация для посетителей"
        )}
        path="/visitors"
        third={useLang("Entrance rules", "Правила посещения")}
      >
        <div
          dangerouslySetInnerHTML={{ __html: visitorsData ? visitorsData : "" }}
          className="flex flex-col gap-1 select-inner"
        />
      </LayoutWithSidebar>
    </div>
  );
};

export default RulesForVisitors;
