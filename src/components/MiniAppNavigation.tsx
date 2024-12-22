import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export const MiniAppNavigation = () => {
  const router = useRouter();
  useEffect(() => {
    const initData = window?.Telegram?.WebApp?.initDataUnsafe?.start_param;

    const hasPage = initData?.includes('page');
    const invitationCode = initData
      ?.split(',')
      ?.find((item) => item?.includes('referralCode_'))
      ?.split('referralCode_')
      ?.at(-1)
      ?.split('_')
      ?.at(0);

    if (hasPage) {
      const pageSegment = initData
        ?.split(',')
        ?.find((item) => item?.includes('page'))
        ?.split('page')
        ?.at(-1);

      const pathSegments = pageSegment?.split('_')?.join('/');

      // Pass the invitationCode as a query parameter
      const newPath = invitationCode
        ? `${pathSegments}?invitationCode=${invitationCode}`
        : pathSegments;

      router?.replace(newPath);
    }
  }, []);

  return <></>;
};
