'use strict';

/* Element Selections */
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const learnMoreBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

/* Nav functionalities */

// Sticky Navigation: Intersection Observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  // threshold is 0 when header is completely out of view
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const currlink = e.target;
    // Searches closest parent of link to get all siblings of link
    const siblings = currlink.closest('.nav').querySelectorAll('.nav__link');
    const logo = currlink.closest('.nav').querySelector('img');

    // Selecting all siblings besides current target
    siblings.forEach(sib => {
      if (sib !== currlink) {
        sib.style.opacity = this;
      }
    });

    logo.style.opacity = this;
  }
};

// Fades other links in menu on hover
// Can't pass in handleHover(e, 0.5) because this returns a value from the handleHover function
// Event listeners require that only functions be passed in, aka only handleHover
// .bind() returns a new function that sets "this" to the argument, aka: 0.5 and 1
nav.addEventListener('mouseover', handleHover.bind(0.5));

// Undos fading of other menu links
nav.addEventListener('mouseout', handleHover.bind(1));

/* Modal functionalities */
const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* Smooth page navigation scrolling using event delagation (bubbling up) */
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // This prevents the links from automatically going to section
  e.preventDefault();

  // Matching if target element is one of the nav_links (incase we click somewhere else in the nav)
  if (e.target.classList.contains('nav__link')) {
    // Finding which nav link was clicked on
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// Scrolling functionality for "learn more" button
learnMoreBtn.addEventListener('click', function (e) {
  // Gives the coordinates of section 1
  const s1coords = section1.getBoundingClientRect();
  // Scrolling: (horizontal scroll, vertical scroll)
  // s1coords.top is always relative to the viewport but not to the document (not to the top of page).
  // So to go to the section we want, we need:
  // position of section from where we are (s1coords.top) + how far we have scrolled so far (window.pageYOffSet)
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

// Tabbing Operations Component
tabsContainer.addEventListener('click', function (e) {
  const currTab = e.target.closest('.operations__tab');

  // Guard clause: incase a click happens somewhere else on the container and closest results in null
  if (!currTab) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  currTab.classList.add('operations__tab--active');

  // Activate content area
  tabsContent.forEach(cont =>
    cont.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${currTab.dataset.tab}`)
    .classList.add('operations__content--active');
});

/* Lazy Loading Images */
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // Only remove blurry img when it is done loading: for slower network
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTargets.forEach(img => imgObserver.observe(img));
