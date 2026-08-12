<div align="center">

<br/>

# رمّز · Rammaz

### حوّل أي نص أو رابط إلى QR Code فوري
**بلا إعلانات · بلا خوادم · بلا تتبع**

<br/>

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Static](https://img.shields.io/badge/Static%20Site-No%20Backend-brightgreen?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

<br/>

</div>

---

## ✦ الفكرة

**رمّز** منصة مفتوحة المصدر لتوليد QR Code احترافي — مبنية على نموذج عمل طبقتين:

**للشركات والمستقلين — أنت أولاً**
تنسخ المشروع، تحط شعارك في المركز، وتنشر نسختك الخاصة. تقدر توزعها على عملاءك، تدمجها في خدماتك، أو تبني فوقها منتجك — وكل كود يُنشأ يحمل هويتك تلقائياً كعلامة مائية.

**للمستخدم النهائي — من طرفك**
بعد ما تنشر نسختك، زبائنك أو جمهورك يستخدمون الأداة مباشرة — يولدون كود فوري بلا إعلانات بلا تأخير، وكل كود يصدر يرجع لعلامتك التجارية.

> الفكرة المحورية: كل كود ينتشر في السوق هو إعلان صامت يشير إليك.

---

## ⚡ المميزات

| الميزة | التفاصيل |
|--------|----------|
| 🏷 شعارك في المركز | كل كود يُنشأ يحمل هويتك — تلقائياً وبشكل دائم |
| 🚀 فوري | يعمل بالكامل في المتصفح — لا رفع، لا انتظار |
| 🎨 قابل للتخصيص | اختيار اللون والخلفية والحجم |
| 📥 تحميل مباشر | تصدير بصيغة صورة بنقرة واحدة |
| 📋 نسخ سريع | نسخ الصورة للحافظة مباشرة |
| 🔒 خصوصية تامة | لا يُرسَل أي شيء لأي خادم |
| 📱 متجاوب | يعمل على الجوال والكمبيوتر |
| 🔁 نسخة خاصة جاهزة | انسخ المشروع، غيّر الشعار، وانشر نسختك في دقائق |

---

## 🗂 هيكل المشروع

```
rammaz/
├── index.html        ← الصفحة الرئيسية
├── style.css         ← التصميم
├── app.js            ← منطق توليد QR
└── assets/
    └── logo.png      ← العلامة المائية (الشعار)
```

---

## 🚀 التشغيل

الموقع **static** بالكامل — لا يحتاج أي خادم أو إعداد.

```bash
# استنسخ المستودع
git clone https://github.com/username/rammaz.git

# افتح الملف مباشرة في المتصفح
open index.html
```

أو ارفعه مباشرة على أي منصة استضافة مجانية:

[![Deploy to Netlify](https://img.shields.io/badge/Deploy%20to-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://netlify.com)
[![Deploy to Vercel](https://img.shields.io/badge/Deploy%20to-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-181717?style=flat-square&logo=github&logoColor=white)](https://pages.github.com)

---

## 🖼 إعداد العلامة المائية

ضع صورة الشعار في المسار التالي:

```
assets/logo.png
```

> **المواصفات المثلى:** صورة شفافة · نسبة 1:1 · لا تقل عن 200×200 بكسل

لتعديل حجم الشعار داخل الكود، افتح `app.js` وعدّل:

```js
const LOGO_RATIO   = 0.22;   // حجم الشعار نسبةً للكود (22%)
const LOGO_PADDING = 8;      // البياض حول الشعار (بكسل)
```

---

## 🛠 التقنيات

- **[qrcodejs](https://github.com/davidshimjs/qrcodejs)** — توليد الكود في المتصفح
- **Canvas API** — رسم الشعار فوق الكود
- **مستوى تصحيح الأخطاء H** — الأعلى، لضمان قراءة الكود رغم وجود الشعار

---

## 📄 الرخصة

MIT © 2025 Rammaz
