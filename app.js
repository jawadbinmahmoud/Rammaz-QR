/**
 * QR Generator with centered watermark logo
 * 
 * HOW TO USE YOUR LOGO:
 * Place your logo file in the /assets/ folder and set the path below.
 * The logo will appear centered inside every generated QR code.
 * 
 * Recommended logo specs:
 *   - PNG with transparency (preferred)
 *   - Square ratio (1:1) or close to it
 *   - Min 100×100 px, max 300×300 px
 *   - Keep it simple — it sits on a QR pattern
 */

// ─── CONFIG ─────────────────────────────────────────
const LOGO_PATH      = 'assets/logo.png';   // ← ضع صورتك هنا
const LOGO_RATIO     = 0.22;                // حجم اللوغو نسبةً لعرض الـ QR (22%)
const LOGO_PADDING   = 8;                   // بياض حول اللوغو بالبكسل
const ERROR_CORRECT  = QRCode.CorrectLevel.H; // H = أعلى تصحيح للأخطاء (ضروري للشعار)
// ────────────────────────────────────────────────────

const generateBtn  = document.getElementById('generate-btn');
const downloadBtn  = document.getElementById('download-btn');
const copyBtn      = document.getElementById('copy-btn');
const inputEl      = document.getElementById('qr-input');
const fgColorEl    = document.getElementById('fg-color');
const bgColorEl    = document.getElementById('bg-color');
const sizeEl       = document.getElementById('qr-size');
const resultCard   = document.getElementById('result-card');
const canvas       = document.getElementById('qr-canvas');
const hiddenDiv    = document.getElementById('qr-hidden');

generateBtn.addEventListener('click', generateQR);
inputEl.addEventListener('keydown', e => { if (e.ctrlKey && e.key === 'Enter') generateQR(); });

async function generateQR() {
  const text = inputEl.value.trim();
  if (!text) {
    shake(inputEl);
    return;
  }

  const size   = Math.max(200, Math.min(1000, parseInt(sizeEl.value) || 400));
  const fg     = fgColorEl.value;
  const bg     = bgColorEl.value;

  generateBtn.textContent = '⏳ جارٍ الإنشاء…';
  generateBtn.disabled = true;

  // Clear previous QR
  hiddenDiv.innerHTML = '';

  try {
    // 1) Render QR to a temp div using qrcodejs (creates its own canvas)
    const qr = new QRCode(hiddenDiv, {
      text,
      width:         size,
      height:        size,
      colorDark:     fg,
      colorLight:    bg,
      correctLevel:  ERROR_CORRECT,
    });

    // qrcodejs renders asynchronously — wait for the canvas/img
    await waitForQRRender(hiddenDiv);

    // 2) Get rendered image from the hidden element
    const qrCanvas = hiddenDiv.querySelector('canvas') || hiddenDiv.querySelector('img');

    // 3) Draw everything onto our visible canvas
    canvas.width  = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (qrCanvas.tagName === 'CANVAS') {
      ctx.drawImage(qrCanvas, 0, 0);
    } else {
      // img fallback
      await drawImageEl(ctx, qrCanvas, 0, 0, size, size);
    }

    // 4) Overlay the logo in the center
    await overlayLogo(ctx, size);

    // 5) Show result
    resultCard.style.display = 'block';
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  } catch (err) {
    console.error(err);
    alert('حدث خطأ أثناء إنشاء الـ QR. تأكد من صحة المدخل.');
  } finally {
    generateBtn.textContent = '⚡ أنشئ QR';
    generateBtn.disabled = false;
  }
}

// ─── Overlay logo ─────────────────────────────────────────────────────────────
async function overlayLogo(ctx, canvasSize) {
  const logoSize = Math.round(canvasSize * LOGO_RATIO);
  const padded   = logoSize + LOGO_PADDING * 2;
  const x        = Math.round((canvasSize - padded) / 2);
  const y        = Math.round((canvasSize - padded) / 2);

  // White rounded background behind logo for readability
  const bg = ctx.fillStyle;
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, x, y, padded, padded, 10);
  ctx.fill();
  ctx.fillStyle = bg;

  // Try to load and draw the logo
  try {
    const img = await loadImage(LOGO_PATH);
    ctx.drawImage(img, x + LOGO_PADDING, y + LOGO_PADDING, logoSize, logoSize);
  } catch {
    // If logo file not found, draw a simple placeholder badge instead
    drawPlaceholderBadge(ctx, x + LOGO_PADDING, y + LOGO_PADDING, logoSize);
  }
}

function drawPlaceholderBadge(ctx, x, y, size) {
  // Simple "Q" badge as placeholder until logo file is added
  ctx.fillStyle = '#1a56db';
  roundRect(ctx, x, y, size, size, 8);
  ctx.fill();

  ctx.fillStyle = '#fff';
  ctx.font = `bold ${Math.round(size * 0.55)}px Cairo, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Q', x + size / 2, y + size / 2);
}

// ─── Download ─────────────────────────────────────────────────────────────────
downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'qr-code.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

// ─── Copy to clipboard ────────────────────────────────────────────────────────
copyBtn.addEventListener('click', async () => {
  try {
    const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    copyBtn.textContent = '✅ تم النسخ!';
    setTimeout(() => { copyBtn.textContent = '📋 نسخ الصورة'; }, 2000);
  } catch {
    copyBtn.textContent = '❌ تعذّر النسخ';
    setTimeout(() => { copyBtn.textContent = '📋 نسخ الصورة'; }, 2000);
  }
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload  = () => resolve(img);
    img.onerror = () => reject(new Error(`Cannot load: ${src}`));
    img.src = src;
  });
}

function drawImageEl(ctx, imgEl, x, y, w, h) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => { ctx.drawImage(img, x, y, w, h); resolve(); };
    img.src = imgEl.src;
  });
}

function waitForQRRender(container) {
  return new Promise((resolve) => {
    const check = () => {
      const el = container.querySelector('canvas') || container.querySelector('img');
      if (el && (el.tagName === 'CANVAS' || el.complete)) {
        resolve();
      } else {
        requestAnimationFrame(check);
      }
    };
    requestAnimationFrame(check);
  });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y,     x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x,     y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x,     y,     x + r, y);
  ctx.closePath();
}

function shake(el) {
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.style.animation = 'shake .4s ease';
}

// Inject shake animation
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
  0%,100%{transform:translateX(0)}
  20%{transform:translateX(-6px)}
  40%{transform:translateX(6px)}
  60%{transform:translateX(-4px)}
  80%{transform:translateX(4px)}
}`;
document.head.appendChild(style);
