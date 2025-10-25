# exam-system
نظام اختبار إلكتروني بسيط جاهز للنشر على GitHub Pages.

تم إنشاؤه بتاريخ 2025-10-25 11:36 UTC.

الملفات الأساسية:
- index.html — صفحة البداية (إدخال الاسم والرمز واختيار الوحدة).
- exam.html — صفحة الامتحان تعرض السؤال واحدًا في كل مرة.
- result.html — عرض النتيجة ومراجعة الأخطاء.
- exams/ — مجلد يحتوي على ملفات JSON لكل وحدة.
- results تحفظ محليًا في LocalStorage باسم 'exam_results'.

تعليمات سريعة للنشر:
1. رفع المجلد `exam-system` إلى مستودع GitHub (مثلاً `exam-system`).
2. تفعيل GitHub Pages من Settings → Pages → Branch: main, Folder: root.
3. افتح الرابط الناتج، جرّب الامتحان (رمز الدخول: Earth2025).
