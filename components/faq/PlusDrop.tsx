'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAppDispatch } from '@/redux/hooks';
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
    <div className="w-full">
      <div className="flex items-center gap-x-[10px] cursor-pointer">
        <Image
          src={openItems.includes(question || '') ? minus : add}
          width={20}
          height={20}
          alt="button"
        />
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4">
            <p>{answer}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

{
  /* {list && <p className="faq-list">{list}</p>}
        {list2 && <p className="faq-list">{list2}</p>}
        {list3 && <p className="faq-list">{list3}</p>}
      {list4 && <p className="faq-list">{list4}</p>} */
}
