import React from "react";

import { BreadCrumbs } from "@/components/ui/bread-crumbs";
import { ContactsForm } from "@/components/contacts/contacts-form";
import { getContacts } from "@/services/contacts";

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: {
    lang: string;
  };
}) {
  const lang = searchParams.lang;

  const { data } = await getContacts(searchParams.lang);

  console.log(data);

  return (
    <main className="bg-blueBg h-full w-full">
      <div className="container flex flex-col items-start">
        <div className="mt-5">
          <BreadCrumbs second={lang === "ru" ? "Контакты" : "Contacts"} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <ContactsForm />

          <div className="p-6 bg-bg_surface_container rounded-[8px]">
            <h2 className="h2 mb-10 xl:mb-8 text-3xl font-normal">Контакты</h2>

            <div className="flex flex-col gap-20">
              <div className="flex items-center gap-6">
                <img src="/assets/icons/contacts/address.svg" alt="address" />

                <div>
                  <h3 className="text-xl mb-2">Адрес:</h3>
                  <address className="text-base normal not-italic">
                    744000, г. Ашхабад, просп. Битарап Туркменистан, 183
                  </address>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <img src="/assets/icons/contacts/phone.svg" alt="phone" />

                <div>
                  <h3 className="text-xl mb-2"></h3>
                  <h4 className="text-base normal">
                    +99371871814; 99363719588
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <img src="/assets/icons/contacts/mail.svg" alt="email" />

                <div>
                  <h3 className="text-xl mb-2">Email:</h3>
                  <h4 className="text-base normal">contact@turkmenexpo.com</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[728px] mt-12 google-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.67827952586!2d58.29659607507902!3d37.8912058554459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f7003944259cb1d%3A0xafc893357e4b0d2!2z0KLQvtGA0LPQvtCy0L4t0L_RgNC-0LzRi9GI0LvQtdC90L3QsNGPINC_0LDQu9Cw0YLQsCDQotGD0YDQutC80LXQvdC40YHRgtCw0L3QsA!5e0!3m2!1sru!2s!4v1713164734635!5m2!1sru!2s"
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </main>
  );
}
