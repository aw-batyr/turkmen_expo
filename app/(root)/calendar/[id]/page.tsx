import { EventPageButtons } from "@/components/shared/event-page-buttons";
import { getEventPage } from "@/services/calendar";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const lang = cookies().get("lang")?.value ?? "ru";

  const data = await getEventPage(id, lang);

  return (
    <div className="flex flex-col container gap-20 pt-16 section-mb">
      <h1 className="md:text-[48px] text-[28px] text-ON_SURFACE leading-[115%] font-medium">
        {data?.title ? data?.title : null}
      </h1>

      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex flex-col gap-20 w-full">
          <div className="flex flex-col gap-8 event-block ">
            <div className="flex justify-between items-center">
              <h4>{lang === "en" ? "Date" : "Дата"}</h4>
              <h5>{data?.date}</h5>
            </div>

            <hr />
            {data?.location && (
              <>
                <div className="flex justify-between items-center">
                  <h4>{lang === "en" ? "Venue" : "Место"}</h4>
                  <h5>{data?.location}</h5>
                </div>
                <hr />
              </>
            )}

            {data?.organizers.length > 0 && (
              <>
                <div className="flex justify-between items-center">
                  <h4>{lang === "en" ? "Organiser" : "Организатор"}</h4>
                  <h5>{data?.organizers[0]?.name}</h5>
                </div>
              </>
            )}

            {data?.coorganizers.length > 0 && (
              <>
                <hr />

                <div className="flex justify-between items-center">
                  <h4>{lang === "en" ? "Co-organiser" : "Со-организатор"}</h4>

                  <h5>{data?.coorganizers[0]?.name}</h5>
                </div>
              </>
            )}
          </div>

          <EventPageButtons
            once={Boolean(data?.our)}
            details={data?.url_detailed}
            register={data?.url_registration}
            visit={data?.url_web}
          />
        </div>

        <Image
          src={data?.images?.[0]?.path || ""}
          width={392}
          height={392}
          alt="event image"
          className="size-[392px] object-cover"
        />
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <h4 className="text_24 lg:flex-[0_0_392px]">
            {lang === "en" ? "Description" : "Описание"}
          </h4>
          <p className="flex-1 text_16">{data?.description}</p>
        </div>

        {data?.event_topic && (
          <>
            <hr className="border-OUTLINE_VAR" />

            <div className="flex flex-col lg:flex-row gap-6">
              <h4 className="text_24 lg:flex-[0_0_392px]">
                {lang === "en" ? "Theme of event" : "Тематика мероприятия"}
              </h4>
              <div
                className="flex-1 text_16"
                dangerouslySetInnerHTML={{ __html: data?.event_topic }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
