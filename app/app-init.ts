import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setActiveLang } from '@/redux/slices/headerSlice';

const AppInitializer = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.scroll({ behavior: 'smooth', top: 0 });

    const lang = searchParams.get('lang') || 'ru'; // Язык из URL или дефолтный
    const title = lang === 'ru' ? 'Ру' : lang === 'en' ? 'En' : 'Tm';
    dispatch(setActiveLang({ localization: lang, title }));
  }, [searchParams, dispatch]);

  return null;
};

export default AppInitializer;
