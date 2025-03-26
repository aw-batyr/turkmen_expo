// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Проверяем существующую куку
  let lang = request.cookies.get('lang')?.value;

  // 2. Если куки нет, определяем язык из браузера
  if (!lang) {
    lang = request.headers
      .get('Accept-Language')
      ?.split(',')[0]          // Берём первый язык из списка
      .split('-')[0]           // Убираем регион (en-US → en)
      .toLowerCase() || 'en';  // Fallback на английский
  }

  // 3. Сохраняем язык в куки
  const response = NextResponse.next();
  if (!request.cookies.has('lang')) {
    response.cookies.set('lang', lang, {
      maxAge: 60 * 60 * 24 * 365, // 1 год
      httpOnly: true,
    });
  }

  // 4. Добавляем язык в заголовки ВСЕХ исходящих запросов
  response.headers.set('Accept-Language', lang);
  
  return response;
}