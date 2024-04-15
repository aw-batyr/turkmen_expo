'use client';

import React from 'react';
import { v4 } from 'uuid';

import { contacBottomData, innerContactData, menuData } from '@/lib/database/contactsData';
import { ContactsDropDown } from './ContactsDropDown';

import { useAppDispatch } from '@/redux/hooks';
import { setActiveMenu, setContactTitle } from '@/redux/slices/contactsSlice';

export const ContactsSec = () => {
  const dispatch = useAppDispatch();

  const openContacts = (name: string) => {
    dispatch(setContactTitle(name));
    dispatch(setActiveMenu(name)); // Set the active menu to the clicked menu's name
  };

  return (
    <div className="flex flex-col w-full">
      {menuData.map((obj) => (
        <ContactsDropDown key={v4()} openContacts={openContacts} {...obj} />
      ))}
      <div className="flex flex-col items-start mt-[20px] w-full">
        {contacBottomData.map((item) => (
          <div className="py-10 sm:py-[30px] border-b-[1px] border-navyBlue5 w-full" key={v4()}>
            <h4 className="leading-[120%] sm:leading-[100%] text-[16px] sm:text-[21px] mb-6">
              {item.title}
            </h4>
            <div className="text-gray4 sm:text-bgWhite flex flex-col items-start leading-[150%] text-[14px] sm:text-[16px]">
              <p>{item.phone}</p>
              <p>{item.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
