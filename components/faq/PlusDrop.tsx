"use client";

import React from "react";

interface Props {
  question: string;
  answer: string;
}

export const PlusDrop = ({ question, answer }: Props) => {
  return (
    <div className="md:ml-[30px] ml-0">
      <div>
        <p>{answer}</p>
        {/* {list && <p className="faq-list">{list}</p>}
        {list2 && <p className="faq-list">{list2}</p>}
        {list3 && <p className="faq-list">{list3}</p>}
        {list4 && <p className="faq-list">{list4}</p>} */}
      </div>
    </div>
  );
};
