import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, from, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/windowref.service";
import * as i2 from "@angular/common";
export class NgxWrapperTinySliderComponent {
    constructor(wr, cd) {
        this.wr = wr;
        this.cd = cd;
        this.config = {};
        this.initManually = false;
        this.id = '';
        this.sliderReady$ = new BehaviorSubject(false);
        this.componentDestroy$ = new Subject();
        this.defaultConfig = {
            items: 3,
            mode: 'carousel',
            speed: 400,
            controls: false,
            nav: false,
            navPosition: 'bottom',
            autoplayButtonOutput: false
        };
    }
    ngOnInit() {
        if (this.wr.nativeWindow) {
            this.initTns();
            if (!this.initManually) {
                this.initSlider();
            }
        }
    }
    initTns() {
        this.tns$ = from(import('tiny-slider/src/tiny-slider'));
        this.tns$.pipe(takeUntil(this.componentDestroy$)).subscribe();
    }
    initSlider() {
        if (this.wr.nativeWindow && this.tns$) {
            const extendConfig = Object.assign({ container: this.slideItemsContainerRef.nativeElement }, { ...this.defaultConfig, ...this.config });
            this.tns$
                .pipe(take(1), map((item) => {
                const tns = item.tns;
                this.sliderInstance = tns(extendConfig);
                this.sliderReady$.next(true);
            }))
                .subscribe();
        }
    }
    /**
     * OVERIDE TINY SLIDER METHOD
     */
    // public getInfo(): any {
    //   if (this.wr.nativeWindow) {
    //     const info = this.sliderInstance.getInfo() as TinySliderInfo;
    //     return {
    //       disablePrev: info.index <= 0 ? true : false,
    //       disableNext: info.index >= info.slideCount - info.items ? true : false
    //     };
    //   }
    // }
    goTo(target) {
        if (this.wr.nativeWindow) {
            this.sliderInstance.goTo(target);
        }
    }
    play() {
        if (this.wr.nativeWindow) {
            this.sliderInstance.play();
        }
    }
    pause() {
        if (this.wr.nativeWindow) {
            this.sliderInstance.pause();
        }
    }
    destroy() {
        if (this.wr.nativeWindow && this.sliderInstance?.destroy) {
            this.sliderReady$.next(false);
            this.sliderInstance.destroy();
        }
    }
    /**
     * DESTROY
     */
    ngOnDestroy() {
        this.componentDestroy$.next(false);
        this.componentDestroy$.complete();
        this.destroy();
    }
}
NgxWrapperTinySliderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxWrapperTinySliderComponent, deps: [{ token: i1.BrowserWindowRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NgxWrapperTinySliderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NgxWrapperTinySliderComponent, selector: "ngx-wrapper-tiny-slider", inputs: { config: "config", initManually: "initManually", id: "id" }, viewQueries: [{ propertyName: "slideItemsContainerRef", first: true, predicate: ["slideItems"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"slider-wrapper\" [class.ready]=\"sliderReady$ | async\">\n  <div class=\"slide-items\" #slideItems>\n    <ng-content></ng-content>\n  </div>\n</div>\n", styles: [".tns-outer{padding:0!important}.tns-outer [hidden]{display:none!important}.tns-outer [aria-controls],.tns-outer [data-action]{cursor:pointer}.tns-slider{transition:all 0s}.tns-slider>.tns-item{box-sizing:border-box}.tns-horizontal.tns-subpixel{white-space:nowrap}.tns-horizontal.tns-subpixel>.tns-item{display:inline-block;vertical-align:top;white-space:normal}.tns-horizontal.tns-no-subpixel:after{content:\"\";display:table;clear:both}.tns-horizontal.tns-no-subpixel>.tns-item{float:left}.tns-horizontal.tns-carousel.tns-no-subpixel>.tns-item{margin-right:-100%}.tns-no-calc{position:relative;left:0}.tns-gallery{position:relative;left:0;min-height:1px}.tns-gallery>.tns-item{position:absolute;left:-100%;transition:transform 0s,opacity 0s}.tns-gallery>.tns-slide-active{position:relative;left:auto!important}.tns-gallery>.tns-moving{transition:all .25s}.tns-autowidth{display:inline-block}.tns-lazy-img{transition:opacity .6s;opacity:.6}.tns-lazy-img.tns-complete{opacity:1}.tns-ah{transition:height 0s}.tns-ovh{overflow:hidden}.tns-visually-hidden{position:absolute;left:-10000em}.tns-transparent{opacity:0;visibility:hidden}.tns-fadeIn{opacity:1;filter:alpha(opacity=100);z-index:0}.tns-normal,.tns-fadeOut{opacity:0;filter:alpha(opacity=0);z-index:-1}.tns-vpfix{white-space:nowrap}.tns-vpfix>div,.tns-vpfix>li{display:inline-block}.tns-t-subp2{margin:0 auto;width:310px;position:relative;height:10px;overflow:hidden}.tns-t-ct{width:calc(100% * 70 / 3);position:absolute;right:0}.tns-t-ct:after{content:\"\";display:table;clear:both}.tns-t-ct>div{width:calc(100% / 70);height:10px;float:left}\n", ".slider-wrapper{opacity:0;overflow:hidden;max-height:0;transition:all 20ms ease-out;position:relative}.slider-wrapper.ready{opacity:1;max-height:none;overflow:visible}\n"], pipes: { "async": i2.AsyncPipe }, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxWrapperTinySliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-wrapper-tiny-slider', encapsulation: ViewEncapsulation.None, template: "<div class=\"slider-wrapper\" [class.ready]=\"sliderReady$ | async\">\n  <div class=\"slide-items\" #slideItems>\n    <ng-content></ng-content>\n  </div>\n</div>\n", styles: [".tns-outer{padding:0!important}.tns-outer [hidden]{display:none!important}.tns-outer [aria-controls],.tns-outer [data-action]{cursor:pointer}.tns-slider{transition:all 0s}.tns-slider>.tns-item{box-sizing:border-box}.tns-horizontal.tns-subpixel{white-space:nowrap}.tns-horizontal.tns-subpixel>.tns-item{display:inline-block;vertical-align:top;white-space:normal}.tns-horizontal.tns-no-subpixel:after{content:\"\";display:table;clear:both}.tns-horizontal.tns-no-subpixel>.tns-item{float:left}.tns-horizontal.tns-carousel.tns-no-subpixel>.tns-item{margin-right:-100%}.tns-no-calc{position:relative;left:0}.tns-gallery{position:relative;left:0;min-height:1px}.tns-gallery>.tns-item{position:absolute;left:-100%;transition:transform 0s,opacity 0s}.tns-gallery>.tns-slide-active{position:relative;left:auto!important}.tns-gallery>.tns-moving{transition:all .25s}.tns-autowidth{display:inline-block}.tns-lazy-img{transition:opacity .6s;opacity:.6}.tns-lazy-img.tns-complete{opacity:1}.tns-ah{transition:height 0s}.tns-ovh{overflow:hidden}.tns-visually-hidden{position:absolute;left:-10000em}.tns-transparent{opacity:0;visibility:hidden}.tns-fadeIn{opacity:1;filter:alpha(opacity=100);z-index:0}.tns-normal,.tns-fadeOut{opacity:0;filter:alpha(opacity=0);z-index:-1}.tns-vpfix{white-space:nowrap}.tns-vpfix>div,.tns-vpfix>li{display:inline-block}.tns-t-subp2{margin:0 auto;width:310px;position:relative;height:10px;overflow:hidden}.tns-t-ct{width:calc(100% * 70 / 3);position:absolute;right:0}.tns-t-ct:after{content:\"\";display:table;clear:both}.tns-t-ct>div{width:calc(100% / 70);height:10px;float:left}\n", ".slider-wrapper{opacity:0;overflow:hidden;max-height:0;transition:all 20ms ease-out;position:relative}.slider-wrapper.ready{opacity:1;max-height:none;overflow:visible}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.BrowserWindowRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { slideItemsContainerRef: [{
                type: ViewChild,
                args: ['slideItems', { static: true }]
            }], config: [{
                type: Input
            }], initManually: [{
                type: Input
            }], id: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXdyYXBwZXItdGlueS1zbGlkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXdyYXBwZXItdGlueS1zbGlkZXIvc3JjL2xpYi9uZ3gtd3JhcHBlci10aW55LXNsaWRlci9uZ3gtd3JhcHBlci10aW55LXNsaWRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtd3JhcHBlci10aW55LXNsaWRlci9zcmMvbGliL25neC13cmFwcGVyLXRpbnktc2xpZGVyL25neC13cmFwcGVyLXRpbnktc2xpZGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBRVQsS0FBSyxFQUtMLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBZXRELE1BQU0sT0FBTyw2QkFBNkI7SUFxQnhDLFlBQW9CLEVBQW9CLEVBQVUsRUFBcUI7UUFBbkQsT0FBRSxHQUFGLEVBQUUsQ0FBa0I7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQW5COUQsV0FBTSxHQUFnQyxFQUFFLENBQUM7UUFDekMsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsT0FBRSxHQUFHLEVBQUUsQ0FBQztRQUVWLGlCQUFZLEdBQUcsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFJekMsc0JBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUMzQyxrQkFBYSxHQUFnQztZQUNuRCxLQUFLLEVBQUUsQ0FBQztZQUNSLElBQUksRUFBRSxVQUFVO1lBQ2hCLEtBQUssRUFBRSxHQUFH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NkI7K0dBQTdCLDZCQUE2Qix5UUM1QjFDLHFLQUtBOzRGRHVCYSw2QkFBNkI7a0JBTnpDLFNBQVM7K0JBQ0UseUJBQXlCLGlCQUdwQixpQkFBaUIsQ0FBQyxJQUFJO3VJQUdNLHNCQUFzQjtzQkFBaEUsU0FBUzt1QkFBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUNoQyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxFQUFFO3NCQUFWLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgZnJvbSwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YWtlLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBUaW55U2xpZGVySW5mbyxcbiAgVGlueVNsaWRlckluc3RhbmNlLFxuICBUaW55U2xpZGVyU2V0dGluZ3Ncbn0gZnJvbSAndGlueS1zbGlkZXInO1xuXG5pbXBvcnQgeyBCcm93c2VyV2luZG93UmVmIH0gZnJvbSAnLi4vc2VydmljZXMvd2luZG93cmVmLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtd3JhcHBlci10aW55LXNsaWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnbmd4LXdyYXBwZXItdGlueS1zbGlkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90aW55LXNsaWRlci5zY3NzJywgJy4vbmd4LXdyYXBwZXItdGlueS1zbGlkZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hXcmFwcGVyVGlueVNsaWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnc2xpZGVJdGVtcycsIHsgc3RhdGljOiB0cnVlIH0pIHNsaWRlSXRlbXNDb250YWluZXJSZWY6IEVsZW1lbnRSZWY7XG4gIEBJbnB1dCgpIGNvbmZpZzogUGFydGlhbDxUaW55U2xpZGVyU2V0dGluZ3M+ID0ge307XG4gIEBJbnB1dCgpIGluaXRNYW51YWxseSA9IGZhbHNlO1xuICBASW5wdXQoKSBpZCA9ICcnO1xuXG4gIHB1YmxpYyBzbGlkZXJSZWFkeSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgcHVibGljIHNsaWRlckluc3RhbmNlOiBUaW55U2xpZGVySW5zdGFuY2U7XG5cbiAgcHJpdmF0ZSB0bnMkOiBPYnNlcnZhYmxlPGFueT47XG4gIHByaXZhdGUgY29tcG9uZW50RGVzdHJveSQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICBwcml2YXRlIGRlZmF1bHRDb25maWc6IFBhcnRpYWw8VGlueVNsaWRlclNldHRpbmdzPiA9IHtcbiAgICBpdGVtczogMyxcbiAgICBtb2RlOiAnY2Fyb3VzZWwnLFxuICAgIHNwZWVkOiA0MDAsXG4gICAgY29udHJvbHM6IGZhbHNlLFxuICAgIG5hdjogZmFsc2UsXG4gICAgbmF2UG9zaXRpb246ICdib3R0b20nLFxuICAgIGF1dG9wbGF5QnV0dG9uT3V0cHV0OiBmYWxzZVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgd3I6IEJyb3dzZXJXaW5kb3dSZWYsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLndyLm5hdGl2ZVdpbmRvdykge1xuICAgICAgdGhpcy5pbml0VG5zKCk7XG5cbiAgICAgIGlmICghdGhpcy5pbml0TWFudWFsbHkpIHtcbiAgICAgICAgdGhpcy5pbml0U2xpZGVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0VG5zKCkge1xuICAgIHRoaXMudG5zJCA9IGZyb20oaW1wb3J0KCd0aW55LXNsaWRlci9zcmMvdGlueS1zbGlkZXInKSk7XG4gICAgdGhpcy50bnMkLnBpcGUodGFrZVVudGlsKHRoaXMuY29tcG9uZW50RGVzdHJveSQpKS5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0U2xpZGVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLndyLm5hdGl2ZVdpbmRvdyAmJiB0aGlzLnRucyQpIHtcbiAgICAgIGNvbnN0IGV4dGVuZENvbmZpZyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHsgY29udGFpbmVyOiB0aGlzLnNsaWRlSXRlbXNDb250YWluZXJSZWYubmF0aXZlRWxlbWVudCB9LFxuICAgICAgICB7IC4uLnRoaXMuZGVmYXVsdENvbmZpZywgLi4udGhpcy5jb25maWcgfVxuICAgICAgKTtcblxuICAgICAgdGhpcy50bnMkXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgbWFwKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRucyA9IGl0ZW0udG5zO1xuICAgICAgICAgICAgdGhpcy5zbGlkZXJJbnN0YW5jZSA9IHRucyhleHRlbmRDb25maWcpO1xuICAgICAgICAgICAgdGhpcy5zbGlkZXJSZWFkeSQubmV4dCh0cnVlKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT1ZFUklERSBUSU5ZIFNMSURFUiBNRVRIT0RcbiAgICovXG5cbiAgLy8gcHVibGljIGdldEluZm8oKTogYW55IHtcbiAgLy8gICBpZiAodGhpcy53ci5uYXRpdmVXaW5kb3cpIHtcbiAgLy8gICAgIGNvbnN0IGluZm8gPSB0aGlzLnNsaWRlckluc3RhbmNlLmdldEluZm8oKSBhcyBUaW55U2xpZGVySW5mbztcbiAgLy8gICAgIHJldHVybiB7XG4gIC8vICAgICAgIGRpc2FibGVQcmV2OiBpbmZvLmluZGV4IDw9IDAgPyB0cnVlIDogZmFsc2UsXG4gIC8vICAgICAgIGRpc2FibGVOZXh0OiBpbmZvLmluZGV4ID49IGluZm8uc2xpZGVDb3VudCAtIGluZm8uaXRlbXMgPyB0cnVlIDogZmFsc2VcbiAgLy8gICAgIH07XG4gIC8vICAgfVxuICAvLyB9XG4gIHB1YmxpYyBnb1RvKHRhcmdldDogbnVtYmVyIHwgJ25leHQnIHwgJ3ByZXYnIHwgJ2ZpcnN0JyB8ICdsYXN0Jyk6IHZvaWQge1xuICAgIGlmICh0aGlzLndyLm5hdGl2ZVdpbmRvdykge1xuICAgICAgdGhpcy5zbGlkZXJJbnN0YW5jZS5nb1RvKHRhcmdldCk7XG4gICAgfVxuICB9XG4gIHB1YmxpYyBwbGF5KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLndyLm5hdGl2ZVdpbmRvdykge1xuICAgICAgdGhpcy5zbGlkZXJJbnN0YW5jZS5wbGF5KCk7XG4gICAgfVxuICB9XG4gIHB1YmxpYyBwYXVzZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy53ci5uYXRpdmVXaW5kb3cpIHtcbiAgICAgIHRoaXMuc2xpZGVySW5zdGFuY2UucGF1c2UoKTtcbiAgICB9XG4gIH1cbiAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMud3IubmF0aXZlV2luZG93ICYmIHRoaXMuc2xpZGVySW5zdGFuY2U/LmRlc3Ryb3kpIHtcbiAgICAgIHRoaXMuc2xpZGVyUmVhZHkkLm5leHQoZmFsc2UpO1xuICAgICAgdGhpcy5zbGlkZXJJbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERFU1RST1lcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY29tcG9uZW50RGVzdHJveSQubmV4dChmYWxzZSk7XG4gICAgdGhpcy5jb21wb25lbnREZXN0cm95JC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwic2xpZGVyLXdyYXBwZXJcIiBbY2xhc3MucmVhZHldPVwic2xpZGVyUmVhZHkkIHwgYXN5bmNcIj5cbiAgPGRpdiBjbGFzcz1cInNsaWRlLWl0ZW1zXCIgI3NsaWRlSXRlbXM+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19