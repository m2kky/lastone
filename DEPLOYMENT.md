# نشر المشروع على GitHub

## الخطوات المطلوبة:

### 1. تثبيت Git
إذا لم يكن Git مثبتاً على جهازك:
- قم بتحميل Git من: https://git-scm.com/download/win
- اتبع خطوات التثبيت

### 2. إنشاء حساب GitHub
- اذهب إلى: https://github.com
- قم بإنشاء حساب جديد إذا لم يكن لديك حساب

### 3. إنشاء repository جديد
1. اضغط على "New repository" في GitHub
2. اختر اسم للمشروع (مثل: portfolio-website)
3. اتركه public أو private حسب رغبتك
4. لا تضع علامة على "Initialize with README"
5. اضغط "Create repository"

### 4. رفع المشروع
افتح Command Prompt في مجلد المشروع وقم بتشغيل:

```bash
# تهيئة Git
git init

# إضافة جميع الملفات
git add .

# إنشاء أول commit
git commit -m "Initial commit: Portfolio website"

# ربط المشروع بـ GitHub (استبدل YOUR_USERNAME و YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# تحديد الفرع الرئيسي
git branch -M main

# رفع المشروع
git push -u origin main
```

### 5. نشر الموقع (اختياري)
يمكنك نشر الموقع مجاناً باستخدام:
- **Vercel**: https://vercel.com
- **Netlify**: https://netlify.com
- **GitHub Pages**: في إعدادات repository

### ملاحظات مهمة:
- تأكد من أن Git مثبت قبل تشغيل الأوامر
- استبدل YOUR_USERNAME بـ username الخاص بك في GitHub
- استبدل YOUR_REPO_NAME باسم المشروع الذي أنشأته

### في حالة وجود مشاكل:
1. تأكد من أن Git مثبت: `git --version`
2. تأكد من أنك في المجلد الصحيح
3. تأكد من أن لديك اتصال بالإنترنت
4. تأكد من صحة رابط repository