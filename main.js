/* Nguyễn Gia Hân · Portfolio 2026 — tương tác dùng chung cho mọi trang
   Nguyên tắc: không lắng nghe sự kiện cuộn, không hiệu ứng chờ — nội dung hiện ngay. */
(function () {
  'use strict';
  var isEN = (document.documentElement.lang || '').indexOf('en') === 0;
  var T = isEN
    ? { copied: 'Copied', copy: 'Copy', selected: 'Selected, press Ctrl/Cmd + C', close: 'Close', top: 'Back to top' }
    : { copied: 'Đã sao chép', copy: 'Sao chép', selected: 'Đã chọn, nhấn Ctrl/Cmd + C', close: 'Đóng', top: 'Lên đầu trang' };

  /* 1. Mở trang mới luôn ở đầu trang (trừ khi link có #mục) */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (!location.hash) {
    window.scrollTo(0, 0);
    // khi website được nhúng trong khung (iframe), kéo cả khung về đầu trang
    var head = document.querySelector('.top') || document.body;
    try { if (window.self !== window.top) head.scrollIntoView({ block: 'start', behavior: 'instant' }); } catch (e) {}
  }

  /* 2. Sao chép số điện thoại / email */
  document.querySelectorAll('.copy[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var el = document.getElementById(btn.dataset.copy);
      if (!el) return;
      var text = el.textContent.trim();
      function done() { btn.textContent = T.copied; setTimeout(function () { btn.textContent = T.copy; }, 1800); }
      function fallback() {
        var r = document.createRange(); r.selectNodeContents(el);
        var s = getSelection(); s.removeAllRanges(); s.addRange(r);
        btn.textContent = T.selected;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
      else fallback();
    });
  });

  /* 3. Nút lên đầu trang — hiện khi phần đầu trang đã khuất (không dùng sự kiện cuộn) */
  var header = document.querySelector('.top');
  if (header && document.querySelector('main > *') && 'IntersectionObserver' in window) {
    var topBtn = document.createElement('button');
    topBtn.type = 'button'; topBtn.className = 'totop'; topBtn.setAttribute('aria-label', T.top);
    topBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try { if (window.self !== window.top) header.scrollIntoView({ block: 'start', behavior: 'smooth' }); } catch (e) {}
    });
    document.body.appendChild(topBtn);
    // hiện nút khi khối đầu tiên của trang đã cuộn khuất hẳn
    var mark = document.querySelector('main h1') || document.querySelector('main > *');
    new IntersectionObserver(function (e) {
      topBtn.classList.toggle('show', !e[0].isIntersecting);
    }).observe(mark);
  }

  /* 4. Bấm ảnh minh chứng để phóng to */
  var imgs = document.querySelectorAll('main img');
  var box, big, cap, closeBtn, last;
  function ensureBox() {
    if (box) return;
    box = document.createElement('div');
    box.className = 'lightbox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<button type="button" class="x" aria-label="' + T.close + '">×</button><figure><img alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(box);
    big = box.querySelector('img'); cap = box.querySelector('figcaption'); closeBtn = box.querySelector('.x');
    box.addEventListener('click', function (e) { if (e.target === box || e.target === closeBtn) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('open')) close(); });
  }
  function open(img) {
    ensureBox();
    last = img; big.src = img.currentSrc || img.src; big.alt = img.alt; cap.textContent = img.alt;
    box.classList.add('open');
    closeBtn.focus({ preventScroll: true });
  }
  function close() {
    box.classList.remove('open');
    if (last) last.focus({ preventScroll: true });
  }
  imgs.forEach(function (img) {
    if (img.closest('a') || img.closest('.tool') || img.closest('[aria-hidden="true"]')) return;
    img.classList.add('zoomable'); img.tabIndex = 0; img.setAttribute('role', 'button');
    img.addEventListener('click', function () { open(img); });
    img.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); } });
  });
})();
