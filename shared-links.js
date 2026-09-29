// Retain the reference site's existing menus and destinations without dead local routes.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.header-nav a,.quick-self-menu a,.mobile-self-menu a,.mobile-bar>a').forEach(link=>{
    const url=new URL(link.href);
    if(url.origin===location.origin && url.pathname!=='/') link.href=new URL(url.pathname+url.search,'https://yulmaru-criminal.co.kr').href;
  });
});
