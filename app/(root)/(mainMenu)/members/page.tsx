'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import membersImg from '@/public/assets/images/members.png';
import { aboutMembers } from '@/lib/database/members';
import { v4 } from 'uuid';

import { LayoutWithSidebar } from '@/components/page/LayoutWithSidebar';
import { baseAPI } from '@/lib/API';
import { useAppSelector } from '@/redux/hooks';
import { selectHeader } from '@/redux/slices/headerSlice';
import { ParticipantsDataType } from '@/lib/types/Participants.type';
import { useLang } from '@/utils/useLang';

const Members = () => {
  const { activeLang } = useAppSelector(selectHeader);
  const [membersData, setMembersData] = useState<ParticipantsDataType>();

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${baseAPI}participants-page-items`, {
        headers: {
          'Accept-Language': activeLang.localization,
        },
      });

      if (!res.ok) {
        throw new Error('Error');
      }

      const data = await res.json();

      setMembersData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="flex flex-col">
      <LayoutWithSidebar
        title={useLang(
          'Information for participants',
          'Информация для участников',
          activeLang.localization,
        )}
        second={useLang(
          'Information for participants',
          'Информация для участников',
          activeLang.localization,
        )}>
        <p className="text-p">
          В распоряжении компании имеются возможности размещения и застройки полностью оборудованных
          павильонов общей площадью 1200 кв.м. которые соответствуют современным стандартам. В
          помещении имеются все необходимые коммуникации для реализации проектов любого характера.
          Конгрессы, конференции и другие мероприятия проводятся в специально подготовленных залах.
        </p>

        <Image src={membersImg} width={1000} height={500} alt="members" />

        {aboutMembers.map((item) => (
          <div key={v4()} className="flex flex-col items-start gap-y-[24px] text-p">
            <p>{item.text}</p>
            <ol className="mob:list-disc list-none marker:bg-none mob:ml-5 ml-0">
              {item.list.map((text) => (
                <li key={v4()}>{text}</li>
              ))}
            </ol>
            <p>{item.text2}</p>
          </div>
        ))}
        {/* <div className="flex flex-col mt-10">
          {membersData?.data.map((item) => (
            <>
              <h3 className="font-semibold text-[24px]">{item.title}</h3>
              <div
                className="select-inner py-10"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </>
          ))}
        </div> */}
      </LayoutWithSidebar>
    </div>
  );
};

export default Members;
