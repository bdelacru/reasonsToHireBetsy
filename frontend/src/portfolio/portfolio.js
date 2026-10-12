/*
  The recipe-box portfolio (the homepage). Moved from explorations/v2-recipe-box/; see
  docs/decisions/0002-recipe-box-portfolio-homepage.md.

  Two views:
  - Closed box (the URL has no #/ route, as on a fresh visit to /): the landing. "Open the recipe box"
    plays the opening once, then adds #/ to the history, so Back closes the box again. Nothing is
    stored, so every fresh visit to / starts closed.
  - Open box (#/, #/experience, #/projects, #/ai, #/about, #/projects/<name>): the portfolio. A direct
    link to a route opens straight to that card with no animation. The skip link and "Go straight to the
    portfolio" do the same.
  Each card change is a real history entry, so Back/Forward and refreshes work.
*/
const root = document.documentElement;
const ROUTES = { '': 'Home', experience: 'Experience', projects: 'Projects', ai: 'AI & Learning', about: 'About',
  'projects/magic-8-ball': 'Magic 8-Ball · Projects',
  'projects/church-festival': 'Church Festival Signup · Projects',
  'projects/reasons-to-hire-betsy': 'ReasonsToHireBetsy v2.0 · Projects' };
// A project detail route ("projects/<name>") belongs to the Projects tab.
const sectionOf = (route) => route.split('/')[0];
const isDetail = (route) => route !== null && route.startsWith('projects/');
const SITE = 'Betsy De La Cruz';
const CLOSED_TITLE = `${SITE} · Full-stack Software Engineer`;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const landing = document.querySelector('[data-landing]');
const openButton = landing.querySelector('[data-open]');
const skipButton = landing.querySelector('[data-skip]');
const cards = [...document.querySelectorAll('.card')];
const tabs = [...document.querySelectorAll('.tab')];
const index = document.querySelector('.index');
const tabNav = document.querySelector('.tabs');
const tabList = tabNav.querySelector('ul');
const cardFor = (route) => cards.find((c) => c.dataset.card === (route || 'home'));
let current = null;

function updateTabFades() {
  const max = tabList.scrollWidth - tabList.clientWidth;
  tabNav.classList.toggle('more-left', tabList.scrollLeft > 2);
  tabNav.classList.toggle('more-right', tabList.scrollLeft < max - 2);
}
tabList.addEventListener('scroll', updateTabFades, { passive: true });
window.addEventListener('resize', updateTabFades);

// Returns the route for the hash; null for no route (the closed box) and undefined for an in-page jump.
function routeFromHash() {
  const hash = location.hash;
  if (hash === '' || hash === '#') return null;
  const match = hash.match(/^#\/([a-z0-9-]*)(?:\/([a-z0-9-]*))?\/?$/);
  if (!match) return undefined;
  const full = match[2] ? `${match[1]}/${match[2]}` : match[1];
  if (full in ROUTES) return full;
  return match[1] in ROUTES ? match[1] : '';  // an unknown project goes to Projects, an unknown page to Home
}

/* ---------- Opening and closing the box ---------- */
let timers = [];
let opening = false;

function clearStages() { timers.forEach(clearTimeout); timers = []; delete root.dataset.stage; }

// Ends with the portfolio showing and focus on the current card's heading.
function finishOpening() {
  if (!opening) return;
  opening = false;
  clearStages();
  skipButton.hidden = true;
  root.dataset.box = 'open';
  landing.inert = false;
  cardFor(current).querySelector('h1').focus({ preventScroll: true });
}

function openBox({ animate }) {
  if (root.dataset.box === 'open' || opening) return;
  document.title = `${ROUTES[current ?? '']} · ${SITE}`;
  if (!animate || reduceMotion.matches) {
    root.dataset.box = 'open';
    return;
  }
  opening = true;
  root.dataset.box = 'opening';
  landing.inert = true;            // nothing in the landing can be used mid-animation...
  skipButton.hidden = false;       // ...except Skip, which lives outside it
  skipButton.focus();
  // Stages: the hasp swings up, the lid opens, the dividers rise, then the view moves into the box.
  const stages = [[0, 'unlatch'], [300, 'unlatch lid'], [1150, 'unlatch lid cards'], [1750, 'unlatch lid cards zoom']];
  stages.forEach(([at, stage]) => timers.push(setTimeout(() => { root.dataset.stage = stage; }, at)));
  timers.push(setTimeout(finishOpening, 2700));
}

function closeBox() {
  if (opening) { opening = false; skipButton.hidden = true; landing.inert = false; }
  clearStages();
  root.dataset.box = 'closed';
  document.title = CLOSED_TITLE;
  window.scrollTo(0, 0);
  openButton.focus({ preventScroll: true });
}

// The landing is made inert while the box opens, so Skip lives outside it to stay usable.
document.body.append(skipButton);

openButton.addEventListener('click', () => {
  history.pushState(null, '', '#/');
  show('', { focus: false });
  openBox({ animate: true });
});
skipButton.addEventListener('click', finishOpening);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && opening) finishOpening(); });
document.querySelector('[data-close]').addEventListener('click', () => {
  history.pushState(null, '', location.pathname + location.search);
  closeBox();
});

/* ---------- Projects: a small stack of cards held in the hand ---------- */
const stack = (() => {
  const hand = document.querySelector('.hand');
  const stackEl = hand.querySelector('.recipe-stack');
  const pcards = [...stackEl.querySelectorAll('.pcard')];
  const count = hand.querySelector('.stack-count');
  const live = hand.querySelector('[data-stack-live]');
  const n = pcards.length;
  let active = 0;

  function render() {
    pcards.forEach((c, i) => {
      const pos = (i - active + n) % n;
      c.dataset.pos = pos;
      c.style.setProperty('--pos', pos);
      c.inert = pos !== 0;
    });
    count.textContent = `${active + 1} of ${n}`;
  }

  function go(step) {
    const old = pcards[active];
    const hadFocus = old.contains(document.activeElement);
    active = (active + step + n) % n;
    const now = pcards[active];
    pcards.forEach((c) => c.classList.remove('is-leaving', 'is-arriving'));
    if (!reduceMotion.matches) {
      const moving = step > 0 ? old : now;
      const cls = step > 0 ? 'is-leaving' : 'is-arriving';
      moving.classList.add(cls);
      const done = () => moving.classList.remove(cls);
      moving.addEventListener('animationend', done, { once: true });
      setTimeout(done, 600);  // in case animations don't run
    }
    old.style.removeProperty('--drag');
    render();
    live.textContent = `${now.querySelector('h2').textContent}, ${active + 1} of ${n}`;
    if (hadFocus) now.querySelector('h2').focus({ preventScroll: true });
  }

  hand.querySelectorAll('.stack-btn').forEach((b) => b.addEventListener('click', () => go(Number(b.dataset.step))));
  hand.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });

  // Touch swipe: the card follows the finger sideways; touch-action: pan-y leaves vertical scrolling to the browser.
  let drag = null;
  let swiped = false;
  stackEl.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' || !e.isPrimary || !pcards[active].contains(e.target)) return;
    drag = { x: e.clientX, y: e.clientY, dx: 0, card: pcards[active], horizontal: null };
  });
  stackEl.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (drag.horizontal === null && Math.hypot(dx, dy) > 8) drag.horizontal = Math.abs(dx) > Math.abs(dy);
    if (!drag.horizontal) return;
    drag.dx = dx;
    if (!reduceMotion.matches) {
      drag.card.classList.add('is-dragging');
      drag.card.style.setProperty('--drag', `${dx * .6}px`);
    }
  });
  const endDrag = (e) => {
    if (!drag) return;
    const { dx, card, horizontal } = drag;
    drag = null;
    card.classList.remove('is-dragging');
    if (e.type === 'pointerup' && horizontal && Math.abs(dx) > 50) {
      swiped = true;
      setTimeout(() => { swiped = false; }, 300);
      go(dx < 0 ? 1 : -1);
    } else {
      card.style.removeProperty('--drag');
    }
  };
  stackEl.addEventListener('pointerup', endDrag);
  stackEl.addEventListener('pointercancel', endDrag);

  hand.addEventListener('click', (e) => {
    // A swipe that ends on a link shouldn't also follow it.
    if (swiped) { e.preventDefault(); e.stopPropagation(); swiped = false; return; }
    // Clicking the edge of a card fanned out behind the front one brings that card forward.
    if (pcards[active].contains(e.target) || e.target.closest('.stack-controls')) return;
    const inside = (el) => { const r = el.getBoundingClientRect(); return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom; };
    const hit = pcards.filter((c) => c !== pcards[active] && inside(c)).sort((a, b) => a.dataset.pos - b.dataset.pos)[0];
    if (hit) go(hit.dataset.pos === '1' ? 1 : -1);
  }, true);

  render();
  return {
    // Puts a project back in front of the stack, without animation; returns its heading.
    select(name) {
      const i = pcards.findIndex((c) => c.dataset.project === name);
      if (i < 0) return null;
      active = i;
      render();
      return pcards[i].querySelector('h2');
    },
  };
})();

/* ---------- Changing cards: the chosen card is lifted out of the stack and set down in front ---------- */
// The usual change: the old card sinks back into the box; the new one rises out of the stack and settles in front.
const CHANGE = {
  leave: [
    { transform: 'none', opacity: 1, zIndex: 2 },
    { transform: 'translateY(2.5rem) scale(.97)', opacity: 1, zIndex: 0, offset: .45 },
    { transform: 'translateY(-.9rem) scale(.95)', opacity: 0, zIndex: 0 },
  ],
  enter: [
    { transform: 'translateY(-.9rem) scale(.95)', opacity: .4, zIndex: 0 },
    { transform: 'translateY(-2.4rem) scale(.985)', opacity: 1, zIndex: 1, offset: .5 },
    { transform: 'none', opacity: 1, zIndex: 1 },
  ],
};
// Opening a project: its card is pulled up out of the box, tilted in the hand, and laid flat to read.
const PULL_OUT = {
  leave: [
    { transform: 'none', opacity: 1, zIndex: 1 },
    { transform: 'translateY(1.5rem) scale(.98)', opacity: 0, zIndex: 1 },
  ],
  enter: [
    { transform: 'translateY(3.5rem) rotate(-1.5deg) scale(.96)', opacity: 0, zIndex: 2 },
    { transform: 'translateY(-1.4rem) rotate(.8deg) scale(1.01)', opacity: 1, zIndex: 2, offset: .55 },
    { transform: 'none', opacity: 1, zIndex: 2 },
  ],
};
// "All projects": the project's card is put back down into the box, and the stack comes back up.
const PUT_BACK = {
  leave: [
    { transform: 'none', opacity: 1, zIndex: 2 },
    { transform: 'translateY(-1rem) rotate(.6deg)', opacity: 1, zIndex: 2, offset: .3 },
    { transform: 'translateY(4rem) rotate(-1.5deg) scale(.96)', opacity: 0, zIndex: 2 },
  ],
  enter: [
    { transform: 'translateY(1rem) scale(.98)', opacity: .3, zIndex: 1 },
    { transform: 'none', opacity: 1, zIndex: 1 },
  ],
};

function show(route, { focus }) {
  if (route === current) return;
  const next = cardFor(route);
  const prevRoute = current;
  const prev = prevRoute === null ? null : cardFor(prevRoute);
  current = route;

  cards.forEach((c) => c.getAnimations().forEach((a) => a.finish()));
  root.dataset.route = route || 'home';
  document.title = `${ROUTES[route]} · ${SITE}`;
  tabs.forEach((t) => {
    const active = t.dataset.route === (sectionOf(route) || 'home');
    if (active) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
    if (active) tabList.scrollLeft = t.offsetLeft - (tabList.clientWidth - t.offsetWidth) / 2;
  });
  updateTabFades();

  // Back from a project's details: the stack shows that project in front.
  const returning = route === 'projects' && isDetail(prevRoute) ? stack.select(prevRoute.split('/')[1]) : null;

  next.hidden = false;
  if (prev && prev !== next) {
    if (reduceMotion.matches || !next.animate || root.dataset.box !== 'open') {
      prev.hidden = true;
    } else {
      const motion = isDetail(route) && prevRoute === 'projects' ? PULL_OUT : returning ? PUT_BACK : CHANGE;
      prev.inert = true;
      const leave = prev.animate(motion.leave, { duration: 460, easing: 'cubic-bezier(.4, 0, .4, 1)', fill: 'forwards' });
      let settled = false;
      const settle = () => {
        if (settled) return;
        settled = true;
        leave.cancel();
        prev.inert = false;
        if (prev !== cardFor(current)) prev.hidden = true;
      };
      leave.finished.then(settle, settle);
      setTimeout(settle, 650);  // in case animations are paused (background tabs, some test browsers)
      const enter = next.animate(motion.enter, { duration: motion === PULL_OUT ? 560 : 520, easing: 'cubic-bezier(.3, .6, .25, 1)' });
      setTimeout(() => { if (enter.playState !== 'finished') enter.finish(); }, 750);  // never leave a card mid-air
    }
  }

  if (focus && index.getBoundingClientRect().top < 0) index.scrollIntoView({ block: 'start' });
  if (focus) (returning ?? next.querySelector('h1')).focus({ preventScroll: true });
}

window.addEventListener('hashchange', () => {
  const route = routeFromHash();
  if (route === undefined) return;            // in-page jump, handled below
  if (route === null) { closeBox(); return; } // Back past the first card: the box closes again
  const wasClosed = root.dataset.box === 'closed';
  if (opening) finishOpening();
  openBox({ animate: false });
  show(route, { focus: true });
  if (wasClosed) cardFor(route).querySelector('h1').focus({ preventScroll: true });
});

// In-page jumps (Contact): move focus without touching the URL, so the current card stays put.
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]:not([href^="#/"])');
  if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const target = document.getElementById(link.getAttribute('href').slice(1));
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ block: 'start', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  target.focus({ preventScroll: true });
});

cards.forEach((c) => { c.hidden = true; });
const initial = routeFromHash();
show(initial ?? '', { focus: false });
if (initial === null || initial === undefined) document.title = CLOSED_TITLE;
if (root.dataset.box === 'closed' && initial !== null && initial !== undefined) root.dataset.box = 'open';
