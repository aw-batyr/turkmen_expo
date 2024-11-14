'use client';

import { FormSec } from '@/components/bid/FormSec';
import { LayoutWithSidebar } from '@/components/page/LayoutWithSidebar';
import { useAppSelector } from '@/redux/hooks';
import { selectHeader } from '@/redux/slices/headerSlice';
import { useLang } from '@/utils/useLang';

const Bid = () => {
  const { activeLang } = useAppSelector(selectHeader);

  return (
    <>
      <div className="h-full w-full">
        <LayoutWithSidebar
          title={useLang(
            'Online application',
            'Онлайн-заявка для участников',
            activeLang.localization,
          )}
          second={useLang('Participants', 'Участникам', activeLang.localization)}
          path="/members"
          third={useLang(
            'Online application',
            'Онлайн-заявка для участников',
            activeLang.localization,
          )}>
          <FormSec />
        </LayoutWithSidebar>
      </div>
    </>
  );
};

export default Bid;
