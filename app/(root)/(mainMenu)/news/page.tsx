import React from "react";

import { LayoutWithSidebar } from "@/components/page/LayoutWithSidebar";
import { NewsSec } from "@/components/news/NewsSec";

const News = () => {
  return (
    <div>
      <LayoutWithSidebar second="Новости" cursor={false} title={"Новости"}>
        <div>
          <div className="flex flex-col">
            {/* <div className="relative">
              <input
                className="bid-input bg-[url('../public/assets/icons/news/search.svg')] bg-right bg-no-repeat w-full max-w-[461px] mb-10 sm:mb-6 md:mb-[50px] lg:mb-[60px]"
                type="text"
              />
            </div> */}

            <NewsSec />
          </div>
        </div>
      </LayoutWithSidebar>
    </div>
  );
};

export default News;
