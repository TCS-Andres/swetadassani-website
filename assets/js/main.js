(function(){
  var nav=document.getElementById('nav');
  var onScroll=function(){ if(window.scrollY>24){nav.classList.add('scrolled');}else{nav.classList.remove('scrolled');} };
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});

  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items=document.querySelectorAll('.reveal');
  if(reduce || !('IntersectionObserver' in window)){
    items.forEach(function(el){el.classList.add('in');});
  }else{
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
    },{threshold:0.14, rootMargin:'0px 0px -8% 0px'});
    items.forEach(function(el){io.observe(el);});
  }
})();
