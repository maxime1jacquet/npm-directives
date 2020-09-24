export function ifVisible(
  thisClass,
  element: HTMLElement,
  pourcent: number,
  callbackIf,
  destroyIf
) {
  new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting === true) {
        const callIf = callbackIf.bind(thisClass);
        callIf();
      } else {
        const destroy = destroyIf.bind(thisClass);
        destroy();
      }
    },
    { threshold: [pourcent / 100] }
  ).observe(element);
}
