import { Language } from './types';

const translations = {
  en: {
    posts: 'Posts',
    reels: 'Reels',
    events: 'Events',
    debates: 'Debates',
    composePlaceholder: 'What do you want to share tonight?',
    post: 'Post',
    attachPhoto: 'Attach Photo',
    successPost: 'Your post was published.',
    loginSuccess: 'Welcome back!',
    logoutSuccess: 'You have logged out.',
    emptyFeed: 'No content here yet for this tab.',
    emptyFeedHint: 'Try another tab or create the first one!',
    home: 'Home',
    search: 'Search',
    compose: 'Compose',
    notifications: 'Notifications',
    profile: 'Profile',
    explore: 'Explore',
    candidates: 'Candidates',
    stories: 'Stories',
  },
  ar: {
    posts: 'المنشورات', reels: 'ريلز', events: 'الفعاليات', debates: 'النقاشات',
    composePlaceholder: 'عمّ تفكر تشارك الليلة؟', post: 'نشر', attachPhoto: 'إرفاق صورة',
    successPost: 'تم نشر منشورك.', loginSuccess: 'مرحباً بعودتك!', logoutSuccess: 'تم تسجيل الخروج.',
    emptyFeed: 'لا يوجد محتوى في هذا التبويب.', emptyFeedHint: 'جرّب تبويباً آخر أو أنشئ أول منشور!',
    home: 'الرئيسية', search: 'بحث', compose: 'إنشاء', notifications: 'الإشعارات', profile: 'الملف', explore: 'استكشاف', candidates: 'المرشحون', stories: 'القصص',
  },
  ku: {
    posts: 'بابەتەکان', reels: 'ڕیلز', events: 'چالاکییەکان', debates: 'گفتوگۆکان',
    composePlaceholder: 'ئەمشەو چی دەتەوێت هاوبەش بکەیت؟', post: 'بڵاوکردنەوە', attachPhoto: 'وێنە زیاد بکە',
    successPost: 'بابەتەکەت بڵاوکرایەوە.', loginSuccess: 'بەخێربێیتەوە!', logoutSuccess: 'دەرچوویت.',
    emptyFeed: 'هیچ ناوەڕۆکێک لەو تابەدا نییە.', emptyFeedHint: 'تابێکی تر هەڵبژێرە یان یەکەمیان دروست بکە!',
    home: 'ماڵەوە', search: 'گەڕان', compose: 'نووسین', notifications: 'ئاگادارکردنەوە', profile: 'پرۆفایل', explore: 'گەشت', candidates: 'کاندیدەکان', stories: 'چیرۆکەکان',
  },
} satisfies Record<Language, Record<string, string>>;

export const t = (language: Language) => translations[language];
