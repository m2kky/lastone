# إعداد EmailJS للمشروع

## الخطوات المطلوبة:

### 1. إنشاء حساب EmailJS
- اذهب إلى [EmailJS](https://www.emailjs.com/)
- أنشئ حساب جديد أو سجل دخول

### 2. إعداد الخدمة (Service)
- اذهب إلى Email Services
- اضغط على "Add New Service"
- اختر Gmail أو أي مزود بريد إلكتروني تفضله
- اتبع التعليمات لربط بريدك الإلكتروني

### 3. إنشاء Email Template
- اذهب إلى Email Templates
- اضغط على "Create New Template"
- استخدم هذا المحتوى:

```
Subject: رسالة جديدة من {{from_name}} - {{subject}}

مرحباً {{to_name}},

لديك رسالة جديدة من موقعك الشخصي:

الاسم: {{from_name}}
البريد الإلكتروني: {{from_email}}
رقم الهاتف: {{phone}}
الموضوع: {{subject}}

الرسالة:
{{message}}

---
تم إرسال هذه الرسالة من موقع muhammedmekky.com
```

### 4. إنشاء Newsletter Template (اختياري)
- أنشئ template آخر للنشرة البريدية:

```
Subject: اشتراك جديد في النشرة البريدية

مرحباً {{to_name}},

لديك مشترك جديد في النشرة البريدية:

البريد الإلكتروني: {{subscriber_email}}

---
تم إرسال هذه الرسالة من موقع muhammedmekky.com
```

### 5. الحصول على المعرفات
- انسخ Service ID من صفحة Email Services
- انسخ Template ID من صفحة Email Templates
- انسخ Public Key من صفحة Account (Integration)

### 6. تحديث الكود
افتح ملف `src/components/common/EmailService.js` وحدث:

```javascript
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID', // ضع Service ID هنا
  templateId: 'YOUR_TEMPLATE_ID', // ضع Template ID هنا
  publicKey: 'YOUR_PUBLIC_KEY' // ضع Public Key هنا
};
```

### 7. تثبيت المكتبة
```bash
npm install @emailjs/browser
```

### 8. اختبار الإعداد
- شغل المشروع: `npm run dev`
- اذهب إلى صفحة Contact
- املأ النموذج وأرسل رسالة تجريبية
- تحقق من بريدك الإلكتروني

## ملاحظات مهمة:
- تأكد من تفعيل الخدمة في لوحة تحكم EmailJS
- يمكنك إرسال 200 رسالة مجاناً شهرياً
- للاستخدام التجاري، قد تحتاج للترقية لخطة مدفوعة

## استكشاف الأخطاء:
- تأكد من صحة المعرفات (Service ID, Template ID, Public Key)
- تحقق من إعدادات CORS في EmailJS
- راجع console المتصفح للأخطاء