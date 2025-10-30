# TODO List - Portfolio Website

## 🔴 أولويات عالية (High Priority)

### 1. صفحة Blog
- [ ] إنشاء صفحة Blog في `src/pages/Blog/`
- [ ] إنشاء Blog.jsx و blog.css
- [ ] إضافة قائمة المقالات
- [ ] إنشاء صفحة تفاصيل المقال (BlogDetail.jsx)
- [ ] إضافة الـ route في App.jsx

### 2. المحتوى الحقيقي
- [ ] استبدال صور Unsplash بصور حقيقية
- [ ] إضافة صورة Avatar الحقيقية في `/public/images/avatar.png`
- [ ] إضافة بيانات المشاريع الحقيقية في ProjectDetail
- [ ] تحديث نصوص About/Story بمعلومات حقيقية
- [ ] إضافة شهادات Testimonials حقيقية

### 3. معلومات الاتصال
- [ ] تحديث البريد الإلكتروني في Contact page
- [ ] تحديث رقم التليفون
- [ ] إضافة روابط السوشيال ميديا الحقيقية (LinkedIn, Twitter, GitHub)
- [ ] تحديث معلومات Footer

## 🟡 أولويات متوسطة (Medium Priority)

### 4. ربط الفورمات
- [ ] ربط Contact Form بـ EmailJS أو Formspree
- [ ] ربط Newsletter Form بـ Mailchimp أو ConvertKit
- [ ] ربط Project Request Form
- [ ] إضافة رسائل نجاح/فشل

### 5. SEO و Meta Tags
- [ ] إضافة meta descriptions لكل صفحة
- [ ] إضافة Open Graph tags
- [ ] إضافة Twitter Card tags
- [ ] تحديث title لكل صفحة
- [ ] إضافة sitemap.xml
- [ ] إضافة robots.txt

### 6. صفحة 404
- [ ] إنشاء صفحة 404 مخصصة
- [ ] إضافة تصميم جذاب
- [ ] إضافة روابط للعودة للصفحة الرئيسية

### 7. Performance
- [ ] تحسين أحجام الصور (WebP format)
- [ ] إضافة lazy loading للصور
- [ ] تقليل حجم الـ bundle
- [ ] إضافة code splitting

## 🟢 أولويات منخفضة (Low Priority)

### 8. Responsive Testing
- [ ] اختبار كل الصفحات على موبايل
- [ ] اختبار على تابلت
- [ ] اختبار على شاشات كبيرة
- [ ] إصلاح أي مشاكل في التصميم

### 9. Accessibility
- [ ] مراجعة ARIA labels
- [ ] تحسين keyboard navigation
- [ ] إضافة focus states واضحة
- [ ] اختبار مع screen readers

### 10. Loading States
- [ ] إضافة skeleton loaders
- [ ] إضافة loading spinners
- [ ] تحسين تجربة الانتظار

### 11. Animations
- [ ] مراجعة وتحسين الانيميشنز في كل الصفحات
- [ ] إضافة page transitions
- [ ] تحسين scroll animations

### 12. Testing
- [ ] اختبار كل الروابط
- [ ] اختبار كل الفورمات
- [ ] اختبار على متصفحات مختلفة (Chrome, Firefox, Safari)
- [ ] اختبار الأداء (Lighthouse)

## 📝 ملاحظات

### الملفات المهمة:
- `src/pages/` - كل الصفحات
- `src/components/layout/Navbar.jsx` - شريط التنقل
- `src/components/layout/Footer.jsx` - الفوتر
- `public/images/` - الصور

### البيانات المطلوبة:
1. **المشاريع**: عنوان، وصف، صور، تفاصيل، نتائج
2. **الشهادات**: اسم، صورة، منصب، نص الشهادة
3. **المقالات**: عنوان، محتوى، صورة، تاريخ
4. **الخدمات**: وصف تفصيلي لكل خدمة

### روابط مفيدة:
- EmailJS: https://www.emailjs.com/
- Formspree: https://formspree.io/
- Mailchimp: https://mailchimp.com/
- Vercel (للنشر): https://vercel.com/
- Netlify (للنشر): https://netlify.com/

## ✅ تم إنجازه
- [x] Navbar مع Glassmorphism effect
- [x] Compact/Full mode للـ navbar
- [x] Custom Cursor
- [x] Home page مع كل الـ sections
- [x] Projects page مع filters
- [x] Project Detail page
- [x] Story page
- [x] Contact page
- [x] Responsive navbar للموبايل
- [x] Hover animations
- [x] Scroll animations
- [x] Mobile menu
