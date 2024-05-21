import React from "react";

import { FormSec } from "@/components/bid/FormSec";
import { LayoutWithSidebar } from "@/components/page/LayoutWithSidebar";

const Bid = () => {
  return (
    <>
      <div className="h-full w-full">
        <LayoutWithSidebar
          title="Онлайн-заявка для участников"
          second="Участникам"
          path="/members"
          third="Онлайн-заявка для участников"
        >
          <FormSec />
        </LayoutWithSidebar>
      </div>
    </>
  );
};

export default Bid;
