export function ifVisible(
  thisClass,
  element: HTMLElement,
  pourcent: number,
  callbackIf
) {
  new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting === true) {
        const callIf = callbackIf.bind(thisClass);
        callIf();
      }
    },
    { threshold: [pourcent / 100] }
  ).observe(element);
}
