import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as i0 from "@angular/core";
export class BrowserWindowRef {
    constructor(platformId) {
        this.platformId = platformId;
    }
    get nativeWindow() {
        if (isPlatformBrowser(this.platformId)) {
            return this.windowRef();
        }
        return false;
    }
    windowRef() {
        // return the global native browser window object
        return window;
    }
}
BrowserWindowRef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BrowserWindowRef, deps: [{ token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
BrowserWindowRef.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BrowserWindowRef, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: BrowserWindowRef, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93cmVmLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtd3JhcHBlci10aW55LXNsaWRlci9zcmMvbGliL3NlcnZpY2VzL3dpbmRvd3JlZi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFHcEQsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixZQUF5QyxVQUFVO1FBQVYsZUFBVSxHQUFWLFVBQVUsQ0FBQTtJQUFHLENBQUM7SUFFdkQsSUFBSSxZQUFZO1FBQ2QsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEMsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTyxTQUFTO1FBQ2YsaURBQWlEO1FBQ2pELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7OzhHQWJVLGdCQUFnQixrQkFDUCxXQUFXO2tIQURwQixnQkFBZ0IsY0FESCxNQUFNOzRGQUNuQixnQkFBZ0I7a0JBRDVCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzswQkFFbkIsTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgUExBVEZPUk1fSUQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJXaW5kb3dSZWYge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQpIHt9XG5cbiAgZ2V0IG5hdGl2ZVdpbmRvdygpOiBhbnkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm4gdGhpcy53aW5kb3dSZWYoKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSB3aW5kb3dSZWYoKTogV2luZG93IHtcbiAgICAvLyByZXR1cm4gdGhlIGdsb2JhbCBuYXRpdmUgYnJvd3NlciB3aW5kb3cgb2JqZWN0XG4gICAgcmV0dXJuIHdpbmRvdztcbiAgfVxufVxuIl19