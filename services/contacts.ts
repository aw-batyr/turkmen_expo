import { baseAPI } from "@/lib/API";
import { ContactsDataType } from "@/lib/types/Contacts.type";

export const getContacts = async (lang: string) => {
  const res = await fetch(`${baseAPI}contacts`, {
    headers: {
      "Accept-Language": lang,
    },
  });

  if (!res.ok) {
    throw new Error("Contacts error");
  }

  const data: ContactsDataType = await res.json();

  return data;
};
