import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest } from 'next/server';

// export default async function middleware(request: NextRequest) {
//   // Create the middleware instance
//   const handleI18nRouting = createMiddleware({
//     locales: ['en', 'zh'], // List of supported locales
//     defaultLocale: 'en', // Default locale
//     // localePrefix: ['en'], // Add a locale prefix to all paths except the default locale
//   });

//   // Call the middleware to handle the request
//   const response = await handleI18nRouting(request);

//   // Return the response
//   return response;
// }

export default createMiddleware(routing);
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|favicon.ico|.*\\..*).*)'
};