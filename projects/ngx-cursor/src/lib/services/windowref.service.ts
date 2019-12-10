import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class BrowserWindowRef {
  constructor(@Inject(PLATFORM_ID) private platformId) {}

  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return this.windowRef();
    }
    return false;
  }

  private windowRef(): Window {
    // return the global native browser window object
    return window;
  }
}
