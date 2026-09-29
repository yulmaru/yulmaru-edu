(()=>{'use strict';
const script=document.currentScript;
const base=new URL('.',script.src);
const items=[
  ['traffic','교통사고','교통사고/','car-side'],
  ['fraud','사기','사기/','wallet'],
  ['sexual','성범죄·마약','성범죄마약/','shield-halved'],
  ['violence','폭력범죄','폭력범죄/','hand'],
  ['property','재산범죄','재산범죄/','box-archive'],
  ['general','일반 형사','일반형사/','scale-balanced'],
  ['directions','오시는 길','오시는길/','location-dot']
];
const fieldByPath=Object.fromEntries(items.map(([id,,path])=>[path.replace(/\/$/,''),id]));
const activeFromPath=()=>fieldByPath[decodeURIComponent(location.pathname).split('/').filter(Boolean).pop()]||'';
const href=path=>new URL(path,base).href;
const brand=`<span class="brand"><img class="brand-logo" src="${href('assets/yulmaru-logo.png')}" alt=""><span class="brand-copy"><strong>부산학폭전문변호사</strong><small>법무법인 율마루</small></span></span>`;
function markup(active=activeFromPath()){
  const links=items.map(([id,label,path,icon])=>`<a href="${href(path)}"${id==='directions'?'':' data-route'}${id===active?' class="active" aria-current="page"':''}><i class="header-nav-icon fa-solid fa-${icon}" aria-hidden="true"></i><span>${label}</span></a>`).join('');
  return `<header class="site-header"><a href="${href('')}" data-route aria-label="메인 페이지로 이동">${brand}</a><div class="header-field-menu"><button class="header-menu-toggle" type="button" aria-label="메뉴 열기" aria-expanded="false" aria-controls="header-field-nav"><i class="fa-solid fa-bars" aria-hidden="true"></i></button><nav id="header-field-nav" class="header-nav" aria-label="주요 메뉴" hidden>${links}</nav></div></header>`;
}
function mount(target,active=activeFromPath()){
  if(!target)return null;
  const template=document.createElement('template');
  template.innerHTML=markup(active);
  const header=template.content.firstElementChild;
  target.replaceWith(header);
  return header;
}
function setOpen(open){
  const button=document.querySelector('.header-menu-toggle');
  const nav=document.querySelector('#header-field-nav');
  if(!button||!nav)return;
  document.body.classList.toggle('menu-open',open);
  button.setAttribute('aria-expanded',String(open));
  button.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');
  button.innerHTML=`<i class="fa-solid fa-${open?'xmark':'bars'}" aria-hidden="true"></i>`;
  nav.hidden=!open;
  button.closest('.site-header')?.classList.toggle('menu-open',open);
}
function mountPlaceholders(){document.querySelectorAll('[data-shared-header]').forEach(target=>mount(target,target.dataset.sharedHeader||activeFromPath()))}
document.addEventListener('click',event=>{
  const toggle=event.target.closest('.header-menu-toggle');
  if(toggle){setOpen(toggle.getAttribute('aria-expanded')!=='true');return}
  if(event.target.closest('.header-nav a')){setOpen(false);return}
  const active=document.querySelector('.header-menu-toggle[aria-expanded="true"]');
  if(active&&!active.closest('.header-field-menu')?.contains(event.target))setOpen(false);
});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){const active=document.querySelector('.header-menu-toggle[aria-expanded="true"]');if(active){setOpen(false);active.focus()}}});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mountPlaceholders,{once:true});else mountPlaceholders();
window.YulmaruSharedHeader={markup,mount,setOpen,activeFromPath};
})();
