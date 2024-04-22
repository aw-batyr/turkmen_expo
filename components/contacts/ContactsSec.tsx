"use client";

import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

import {
  contacBottomData,
  innerContactData,
  menuData,
} from "@/lib/database/contactsData";
import { ContactsDropDown } from "./ContactsDropDown";

import { useAppDispatch } from "@/redux/hooks";
import { setActiveMenu, setContactTitle } from "@/redux/slices/contactsSlice";
import { baseAPI } from "@/lib/API";
import { ContactsDataType } from "@/lib/types/Contacts.type";

export const ContactsSec = () => {
  const [contactsData, setContactsData] = useState<ContactsDataType>();
  const dispatch = useAppDispatch();

  const openContacts = (name: string) => {
    dispatch(setContactTitle(name));
    dispatch(setActiveMenu(name));
  };

  const fetchContactsData = async () => {
    try {
      const res = await fetch(`${baseAPI}contacts`);

      if (!res.ok) {
        throw new Error("Error");
      }

      const data = await res.json();

      setContactsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContactsData();
  }, []);

  console.log(contactsData);

  return (
    <div className="flex flex-col w-full">
      {/* {menuData.map((obj) => (
        <ContactsDropDown key={v4()} openContacts={openContacts} {...obj} />
      ))} */}
      <div className="flex flex-col items-start mt-[20px] w-full">
        {contactsData
          ? contactsData.data.map((item) => (
              <div
                className="py-10 sm:py-[30px] border-b-[1px] border-navyBlue5 w-full"
                key={v4()}
              >
                <h4 className="leading-[120%] sm:leading-[100%] text-[16px] sm:text-[21px] mb-6">
                  {item.header}
                </h4>
                <div className="text-gray4 sm:text-bgWhite flex flex-col items-start leading-[150%] text-[14px] sm:text-[16px]">
                  {item.services.map((service) => (
                    <>
                      <p>{service.title}</p>
                      <p>{service.phone}</p>
                      <p>{service.email}</p>
                      <p>{service.web_site}</p>
                    </>
                  ))}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
