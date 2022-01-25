'use strict';

// Element Selections
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const learnMoreBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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

// Smooth page navigation scrolling using event delagation (bubbling up)
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
