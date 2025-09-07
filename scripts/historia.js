 // === NAVBAR HAMBURGUER ===
 const hamburger = document.getElementById('hamburger');
 const nav = document.getElementById('nav');
 hamburger.addEventListener('click', () => {
   hamburger.classList.toggle('active');
   nav.classList.toggle('active');
 });
 
// Carrossel

(function () {
  const track = document.querySelector('.carousel-track');
  const viewport = document.querySelector('.carousel-viewport');
  const prevBtn = document.querySelector('.carousel-button.prev');
  const nextBtn = document.querySelector('.carousel-button.next');

  if (!track) return;

  let originals = Array.from(track.children);
  const origCount = originals.length;
  if (origCount === 0) return;

  const prependClones = originals.map(el => el.cloneNode(true));
  const appendClones  = originals.map(el => el.cloneNode(true));

  appendClones.forEach(n => track.appendChild(n));
  prependClones.slice().reverse().forEach(n => track.insertBefore(n, track.firstChild));

  let items = Array.from(track.children);
  const total = items.length;

  let index = origCount; 
  let step = 0;       
  let centerOffset = 0;  
  let isAnimating = false;

  function calcMeasurements(){
    const itemRect = items[0].getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    step = Math.round(itemRect.width + gap);
    const viewportW = viewport.getBoundingClientRect().width;
    centerOffset = Math.round((viewportW - itemRect.width) / 2);
  }

  function setPosition(animated = true){
    if (animated) track.style.transition = `transform var(--transition)`;
    else track.style.transition = 'none';
    const x = -index * step + centerOffset;
    track.style.transform = `translateX(${x}px)`;
    updateActiveClass();
  }

  function updateActiveClass(){
    items.forEach(it => it.classList.remove('active'));
    const safeIndex = ((index % total) + total) % total;
    const activeEl = items[safeIndex];
    if (activeEl) activeEl.classList.add('active');
  }

  function handleTransitionEnd(){
    isAnimating = false;
    if (index >= origCount * 2){
      index = index - origCount;
      setPosition(false); 
    }
    if (index < origCount){
      index = index + origCount;
      setPosition(false);
    }
  }

  function next(){
    if (isAnimating) return;
    isAnimating = true;
    index++;
    setPosition(true);
  }
  function prev(){
    if (isAnimating) return;
    isAnimating = true;
    index--;
    setPosition(true);
  }

  let pointerDown = false;
  let startX = 0;
  let startOffset = 0;

  function onPointerDown(e){
    pointerDown = true;
    track.style.transition = 'none';
    startX = (e.touches ? e.touches[0].clientX : e.clientX);

    const matrix = new WebKitCSSMatrix(getComputedStyle(track).transform);
    startOffset = matrix.m41; // current translateX
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('touchmove', onPointerMove, {passive:false});
    document.addEventListener('touchend', onPointerUp);
  }

  function onPointerMove(e){
    if (!pointerDown) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    const dx = x - startX;
    const newX = startOffset + dx;
    track.style.transform = `translateX(${newX}px)`;

    if (Math.abs(dx) > 5 && e.cancelable) e.preventDefault();
  }

  function onPointerUp(e){
    if (!pointerDown) return;
    pointerDown = false;
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);
    document.removeEventListener('touchmove', onPointerMove);
    document.removeEventListener('touchend', onPointerUp);

    const matrix = new WebKitCSSMatrix(getComputedStyle(track).transform);
    const currentX = matrix.m41;
    const expectedX = -index * step + centerOffset;
    const delta = currentX - expectedX;

    const threshold = step * 0.25; 
    if (delta > threshold) {
      prev();
    } else if (delta < -threshold) {
      next();
    } else {
      setPosition(true);
      isAnimating = true;
    }
  }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  track.addEventListener('transitionend', handleTransitionEnd);
  viewport.addEventListener('pointerdown', onPointerDown);
  viewport.addEventListener('touchstart', onPointerDown, {passive:false});

  window.addEventListener('resize', () => {
    calcMeasurements();
    setPosition(false);
  });

  calcMeasurements();
  items = Array.from(track.children); 
  setPosition(false);
  updateActiveClass();

  let autoplayId = setInterval(next, 3500);
  viewport.addEventListener('mouseenter', () => clearInterval(autoplayId));
  viewport.addEventListener('mouseleave', () => autoplayId = setInterval(next, 3500));
})();