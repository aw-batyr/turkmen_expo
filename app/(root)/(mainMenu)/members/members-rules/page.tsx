"use client";

import { SelectRules } from "@/components/members/SelectRules";
import { LayoutWithSidebar } from "@/components/page/LayoutWithSidebar";
import { baseAPI } from "@/lib/API";
import { ParticipantsDataType } from "@/lib/types/Participants.type";
import { useAppSelector } from "@/redux/hooks";
import { selectHeader } from "@/redux/slices/headerSlice";
import { useLang } from "@/utils/useLang";
import { useEffect, useState } from "react";

const MembersRules = () => {
  const { activeLang } = useAppSelector(selectHeader);
  const [membersRulesData, setMembersRulesData] =
    useState<ParticipantsDataType>();

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${baseAPI}participants-page-items`, {
        headers: {
          "Accept-Language": activeLang.localization,
        },
      });

      if (!res.ok) {
        throw new Error("Error");
      }

      const data = await res.json();

      setMembersRulesData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div>
      <LayoutWithSidebar
        title={useLang("Rules for participants", "Правила для участников")}
        second={useLang("Participants", "Участникам")}
        path="/members"
        third={useLang("Rules for participants", "Правила для участников")}
      >
        <div className="">
          {membersRulesData
            ? membersRulesData.data.map((item) => (
                <SelectRules key={item.title} {...item} />
              ))
            : null}
        </div>
      </LayoutWithSidebar>
    </div>
  );
};

export default MembersRules;
