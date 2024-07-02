'use client';

import React from 'react';

import { useAppSelector } from '@/redux/hooks';
import { selectBid } from '@/redux/slices/bidSlice';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  text: string;
  id: string;
  onRadio: (name: string) => void;
}

export const BidRadio = ({ text, id, onRadio }: Props) => {
  const { radioStatus } = useAppSelector(selectBid);

  return (
    <div
      onClick={() => {
        onRadio(id);
      }}
      className="flex items-center gap-2.5 cursor-pointer">
      <AnimatePresence>
        <div className="p-[3px] rounded-full w-[16px] h-[16px] border-[1px] border-[#738799] cursor-pointer">
          {radioStatus === id && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.1 }}
              className={`bg-green h-full w-full rounded-full`}
            />
          )}
        </div>
      </AnimatePresence>
      <div className="leading-[125%] md:text-[16px] text-[12px]">{text}</div>
    </div>
  );
};
