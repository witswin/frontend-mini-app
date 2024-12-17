import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export const MiniAppNavigation = () => {
  const router = useRouter();
  useEffect(() => {
    const initData = window?.Telegram?.WebApp?.initDataUnsafe?.start_param;

    const hasPage = initData?.includes('page');

    if (hasPage) {
      const pageSegment = initData
        ?.split(',')
        ?.find((item) => item?.includes('page'))
        ?.split('page')
        ?.at(-1);

      const pathSegments = pageSegment?.split('_')?.join('/');

      router?.replace(pathSegments);
    }
  }, []);
  return <></>;
};
