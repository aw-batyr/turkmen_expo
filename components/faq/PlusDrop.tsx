'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
import { setFaqInfo } from '@/redux/slices/faqSlice';
import { motion } from 'framer-motion';

import add from '@/public/assets/icons/faq/add.svg';
import minus from '@/public/assets/icons/faq/minus.svg';

interface Props {
  question: string;
  answer: string;
}

console.log('plusDrop');

export const PlusDrop = ({ question, answer }: Props) => {
  const dispatch = useAppDispatch();

  const [openItems, setOpenItems] = useState<string[]>([]);

  const onText = (name: string) => {
    if (openItems.includes(name)) {
      setOpenItems(openItems.filter((item) => item !== name));
    } else {
      setOpenItems((prev) => [...prev, name]);
    }
  };

  return (
    <>
      <div
        onClick={() => dispatch(setFaqInfo(''))}
        className="flex items-center gap-x-[10px] cursor-pointer">
        <motion.div>
          <Image
            src={openItems.includes(question || '') ? minus : add}
            width={20}
            height={20}
            alt="button"
          />
        </motion.div>
        <h4
          onClick={() => {
            question && onText(question);
          }}
          className="text-[16px] text-bgWhite">
          {question}
        </h4>
      </div>

      <div className="md:ml-[30px] ml-0">
        {openItems.includes(question || '') && (
          <div>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </>
  );
};

{
  /* {list && <p className="faq-list">{list}</p>}
        {list2 && <p className="faq-list">{list2}</p>}
        {list3 && <p className="faq-list">{list3}</p>}
      {list4 && <p className="faq-list">{list4}</p>} */
}
