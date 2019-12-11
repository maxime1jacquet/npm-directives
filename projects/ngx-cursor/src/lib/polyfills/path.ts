export const path = () => {
  if (!('path' in Event.prototype)) {
    Object.defineProperty(Event.prototype, 'path', {
      get: function() {
        let path = [];
        let currentElem = this.target;
        while (currentElem) {
          path.push(currentElem);
          currentElem = currentElem.parentElement;
        }
        if (path.indexOf(window) === -1 && path.indexOf(document) === -1) {
          path.push(document);
        }
        if (path.indexOf(window) === -1) {
          path.push(window);
        }
        return path;
      }
    });
  }
};
