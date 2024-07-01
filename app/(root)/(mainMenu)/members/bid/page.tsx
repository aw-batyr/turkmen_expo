"use client";

import { FormSec } from "@/components/bid/FormSec";
import { LayoutWithSidebar } from "@/components/page/LayoutWithSidebar";
import { useLang } from "@/utils/useLang";

const Bid = () => {
  return (
    <>
      <div className="h-full w-full">
        <LayoutWithSidebar
          title={useLang("Online application", "Онлайн-заявка для участников")}
          second={useLang("Participants", "Участникам")}
          path="/members"
          third={useLang("Online application", "Онлайн-заявка для участников")}
        >
          <FormSec />
        </LayoutWithSidebar>
      </div>
    </>
  );
};

export default Bid;
