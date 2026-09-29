(()=>{'use strict';
const base=new URL('.',document.currentScript.src);
if(document.documentElement.hasAttribute('data-default-case')){
  document.querySelectorAll('.lead-consult-fab,.lead-phone-fab,.home-inquiry-layer,.hero-lead-section').forEach(node=>node.remove());
}
function cleanVisibleAddress(){if(location.protocol==='file:')return;const cleanPath=location.pathname.replace(/\/index\.html$/i,'/');if(cleanPath!==location.pathname||location.hash)history.replaceState(history.state,'',cleanPath+location.search)}
const initialHash=location.hash;
if(initialHash){requestAnimationFrame(()=>{document.querySelector(initialHash)?.scrollIntoView();cleanVisibleAddress()})}else cleanVisibleAddress();
document.addEventListener('click',event=>{const link=event.target.closest('a[href*="#"]');if(!link)return;const url=new URL(link.href,location.href);if(url.origin!==location.origin||url.pathname!==location.pathname||url.search!==location.search||!url.hash)return;const target=document.querySelector(url.hash);if(!target)return;event.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});history.replaceState(history.state,'',location.pathname+location.search)});
window.addEventListener('hashchange',cleanVisibleAddress);
const markup="<aside class=\"quick-menu\" aria-label=\"빠른 상담\">\n    <button class=\"quick-reserve\" type=\"button\" aria-expanded=\"false\" aria-controls=\"quick-booking-menu\"><i class=\"fa-solid fa-calendar-check\" aria-hidden=\"true\"></i><span>예약</span></button>\n    <button class=\"quick-chat\" type=\"button\" aria-expanded=\"false\" aria-controls=\"quick-chat-menu\"><i class=\"fa-solid fa-comments\" aria-hidden=\"true\"></i><span>채팅상담</span></button>\n    <button class=\"quick-self\" type=\"button\" aria-expanded=\"false\" aria-controls=\"quick-self-menu\"><i class=\"fa-solid fa-magnifying-glass\" aria-hidden=\"true\"></i><span>셀프 조회</span></button>\n    <button type=\"button\" data-scroll-top ><b>↑</b><span>TOP</span></button>\n    <div class=\"quick-booking-menu\" id=\"quick-booking-menu\" aria-label=\"예약 지점 선택\" hidden>\n      <a href=\"https://booking.naver.com/booking/13/bizes/555238\" target=\"_blank\" rel=\"noopener noreferrer\">명지</a>\n      <a href=\"https://booking.naver.com/booking/6/bizes/990663\" target=\"_blank\" rel=\"noopener noreferrer\">센텀</a>\n      <a href=\"https://booking.naver.com/booking/6/bizes/1466063\" target=\"_blank\" rel=\"noopener noreferrer\">창원</a>\n    </div>\n    <div class=\"quick-chat-menu\" id=\"quick-chat-menu\" aria-label=\"채팅 상담 채널 선택\" hidden><a href=\"https://talk.naver.com/ct/wm8stnh\" target=\"_blank\" rel=\"noopener noreferrer\">네이버</a><a href=\"https://pf.kakao.com/_aCMxkxj/chat\" target=\"_blank\" rel=\"noopener noreferrer\">카톡</a></div>\n    <div class=\"quick-self-menu\" id=\"quick-self-menu\" aria-label=\"셀프 조회 선택\" hidden><a href=\"https://www.kics.go.kr/?menuCd=Main\" target=\"_blank\" rel=\"noopener noreferrer\">사건 조회</a><a href=\"/자가진단.html\">자가 진단</a></div>\n  </aside>\n\n  <nav class=\"mobile-bar\" aria-label=\"모바일 빠른 메뉴\">\n    <a href=\"/오시는길/\"><i class=\"fa-solid fa-location-dot\" aria-hidden=\"true\"></i><span>오시는 길</span></a>\n    <button class=\"mobile-self\" type=\"button\" aria-expanded=\"false\" aria-controls=\"mobile-self-menu\"><i class=\"fa-solid fa-magnifying-glass\" aria-hidden=\"true\"></i><span>셀프 조회</span></button>\n    <button class=\"mobile-reserve\" type=\"button\" aria-expanded=\"false\" aria-controls=\"mobile-booking-menu\"><i class=\"fa-solid fa-calendar-check\" aria-hidden=\"true\"></i><span>예약</span></button>\n    <a href=\"tel:1800-6419\"><i class=\"fa-solid fa-phone\" aria-hidden=\"true\"></i><span>전화</span></a>\n    <button class=\"mobile-chat\" type=\"button\" aria-expanded=\"false\" aria-controls=\"mobile-chat-menu\"><i class=\"fa-solid fa-comments\" aria-hidden=\"true\"></i><span>채팅상담</span></button>\n    <div class=\"mobile-booking-menu\" id=\"mobile-booking-menu\" aria-label=\"예약 지점 선택\" hidden>\n      <a href=\"https://booking.naver.com/booking/13/bizes/555238\" target=\"_blank\" rel=\"noopener noreferrer\">명지</a>\n      <a href=\"https://booking.naver.com/booking/6/bizes/990663\" target=\"_blank\" rel=\"noopener noreferrer\">센텀</a>\n      <a href=\"https://booking.naver.com/booking/6/bizes/1466063\" target=\"_blank\" rel=\"noopener noreferrer\">창원</a>\n    </div>\n    <div class=\"mobile-chat-menu\" id=\"mobile-chat-menu\" aria-label=\"채팅 상담 채널 선택\" hidden><a href=\"https://talk.naver.com/ct/wm8stnh\" target=\"_blank\" rel=\"noopener noreferrer\">네이버</a><a href=\"https://pf.kakao.com/_aCMxkxj/chat\" target=\"_blank\" rel=\"noopener noreferrer\">카톡</a></div>\n    <div class=\"mobile-self-menu\" id=\"mobile-self-menu\" aria-label=\"셀프 조회 선택\" hidden><a href=\"https://www.kics.go.kr/?menuCd=Main\" target=\"_blank\" rel=\"noopener noreferrer\">사건 조회</a><a href=\"/자가진단.html\">자가 진단</a></div>\n  </nav>";
document.body.insertAdjacentHTML('beforeend',markup.replace(/href="\/([^"]*)"/g,(_,p)=>`href="${new URL(p,base).href}"`));
const fieldByPath={"교통사고":"traffic","사기":"fraud","성범죄":"sexual","폭력범죄":"violence","재산범죄":"property","일반형사":"general"};
function fieldFromSection(section){if(fieldByPath[section])return fieldByPath[section];if(/마약|성범죄|성매매|성추행|성폭행|성희롱|준강간|아동성|청소년성|직장내성/.test(section))return'sexual';if(/음주운전|뺑소니|교통사고/.test(section))return'traffic';if(/보이스피싱|사기/.test(section))return'fraud';if(/폭행/.test(section))return'violence';if(/배임|횡령/.test(section))return'property';if(/스토킹|공무집행방해|사이버범죄|구속대응/.test(section))return'general';return''}
function syncSelfCheckLinks(){
  const currentSection=decodeURIComponent(location.pathname).split('/').filter(Boolean).pop();
  const currentField=fieldFromSection(currentSection||'');
  document.querySelectorAll('.quick-self-menu a:last-child,.mobile-self-menu a:last-child').forEach(link=>{
    const url=new URL(link.href);
    if(currentField)url.searchParams.set('field',currentField);else url.searchParams.delete('field');
    link.href=url.href;
  });
}
syncSelfCheckLinks();
window.addEventListener('popstate',syncSelfCheckLinks);
const bookingButtons = document.querySelectorAll(".mobile-reserve, .quick-reserve, .mobile-chat, .quick-chat, .mobile-self, .quick-self");
const bookingMenus = document.querySelectorAll(".mobile-booking-menu, .quick-booking-menu, .mobile-chat-menu, .quick-chat-menu, .mobile-self-menu, .quick-self-menu");

document.querySelectorAll(".mobile-booking-menu, .quick-booking-menu").forEach(menu => {
  menu.querySelectorAll("a").forEach(link => {
    if (link.textContent.trim() === "서면") link.remove();
  });
  const count = menu.querySelectorAll("a").length;
  if (count) menu.style.gridTemplateColumns = `repeat(${count}, minmax(0, 1fr))`;
});

function menuFor(button) {
  return document.getElementById(button.getAttribute("aria-controls"));
}

function closeBookingMenus({ restoreFocus = false } = {}) {
  bookingButtons.forEach(button => {
    const menu = menuFor(button);
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
    if (restoreFocus) button.focus();
  });
}

bookingButtons.forEach(button => {
  button.addEventListener("click", event => {
    event.stopPropagation();
    if(button.matches('.quick-self,.mobile-self'))syncSelfCheckLinks();
    const menu = menuFor(button);
    if (!menu) return;
    const willOpen = menu.hidden;
    closeBookingMenus();
    menu.hidden = !willOpen;
    button.setAttribute("aria-expanded", String(willOpen));
  });
});

bookingMenus.forEach(menu => {
  menu.addEventListener("click", event => {
    event.stopPropagation();
    if (event.target.closest("a")) closeBookingMenus();
  });
});

document.addEventListener("click", () => closeBookingMenus());
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeBookingMenus({ restoreFocus: true });
});

document.querySelectorAll('[data-scroll-top]').forEach(button=>button.addEventListener('click',event=>{
  event.preventDefault(); closeBookingMenus();
  window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}));
})();


