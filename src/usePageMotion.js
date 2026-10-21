import { useLayoutEffect, useRef } from 'react';

const revealSelectors = [
  '.about-layout > *', '.about-bottom', '.section-heading > *',
  '.service-card', '.services-bottom', '.portfolio-toolbar', '.project-card',
  '.projects-bottom', '.technology-heading', '.technology-brand',
  '.technology-chips', '.why-intro', '.value-block', '.industries-heading',
  '.industry-grid > *', '.contact-copy', '.contact-form', '.footer-main > *',
].join(', ');

// Animate each element once; newly mounted project cards are picked up on filter changes.
// Content remains readable if observers or the animation API are unavailable.
export function usePageMotion(filter, showAll) {
  const revealed = useRef(new WeakSet());

  useLayoutEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!window.IntersectionObserver || !Element.prototype.animate) return;

    const elements = [...document.querySelectorAll(revealSelectors)];
    const animations = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        revealed.current.add(target);
        target.classList.remove('reveal-pending');
        if (preference.matches || target.contains(document.activeElement)) return;

        const siblings = [...target.parentElement.children].filter(el => el.matches(revealSelectors));
        const delay = Math.min(Math.max(siblings.indexOf(target), 0) * 75, 225);
        const animation = target.animate([
          { opacity: 0, translate: '0 22px' },
          { opacity: 1, translate: '0 0' },
        ], { duration: 650, delay, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' });
        animations.add(animation);
        animation.finished.then(() => animations.delete(animation)).catch(() => {});
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });

    const showImmediately = () => {
      observer.disconnect();
      elements.forEach(el => el.classList.remove('reveal-pending'));
      animations.forEach(animation => animation.cancel());
      animations.clear();
    };
    const observe = () => {
      showImmediately();
      if (preference.matches) return;
      elements.forEach(el => {
        if (revealed.current.has(el)) return;
        el.classList.add('reveal-pending');
        observer.observe(el);
      });
    };
    const onFocus = event => {
      elements.forEach(el => {
        if (!el.contains(event.target)) return;
        el.classList.remove('reveal-pending');
        revealed.current.add(el);
        observer.unobserve(el);
        el.getAnimations().forEach(animation => animation.finish());
      });
    };

    observe();
    preference.addEventListener('change', observe);
    document.addEventListener('focusin', onFocus);
    return () => {
      showImmediately();
      preference.removeEventListener('change', observe);
      document.removeEventListener('focusin', onFocus);
    };
  }, [filter, showAll]);
}
