import * as i0 from '@angular/core';
import { PLATFORM_ID, Injectable, Inject, Component, ViewEncapsulation, ViewChild, Input, NgModule } from '@angular/core';
import * as i2 from '@angular/common';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, from } from 'rxjs';
import { takeUntil, take, map } from 'rxjs/operators';

class BrowserWindowRef {
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

class NgxWrapperTinySliderComponent {
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
NgxWrapperTinySliderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxWrapperTinySliderComponent, deps: [{ token: BrowserWindowRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NgxWrapperTinySliderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NgxWrapperTinySliderComponent, selector: "ngx-wrapper-tiny-slider", inputs: { config: "config", initManually: "initManually", id: "id" }, viewQueries: [{ propertyName: "slideItemsContainerRef", first: true, predicate: ["slideItems"], descendants: true, static: true }], ngImport: i0, template: "<div class=\"slider-wrapper\" [class.ready]=\"sliderReady$ | async\">\n  <div class=\"slide-items\" #slideItems>\n    <ng-content></ng-content>\n  </div>\n</div>\n", styles: [".tns-outer{padding:0!important}.tns-outer [hidden]{display:none!important}.tns-outer [aria-controls],.tns-outer [data-action]{cursor:pointer}.tns-slider{transition:all 0s}.tns-slider>.tns-item{box-sizing:border-box}.tns-horizontal.tns-subpixel{white-space:nowrap}.tns-horizontal.tns-subpixel>.tns-item{display:inline-block;vertical-align:top;white-space:normal}.tns-horizontal.tns-no-subpixel:after{content:\"\";display:table;clear:both}.tns-horizontal.tns-no-subpixel>.tns-item{float:left}.tns-horizontal.tns-carousel.tns-no-subpixel>.tns-item{margin-right:-100%}.tns-no-calc{position:relative;left:0}.tns-gallery{position:relative;left:0;min-height:1px}.tns-gallery>.tns-item{position:absolute;left:-100%;transition:transform 0s,opacity 0s}.tns-gallery>.tns-slide-active{position:relative;left:auto!important}.tns-gallery>.tns-moving{transition:all .25s}.tns-autowidth{display:inline-block}.tns-lazy-img{transition:opacity .6s;opacity:.6}.tns-lazy-img.tns-complete{opacity:1}.tns-ah{transition:height 0s}.tns-ovh{overflow:hidden}.tns-visually-hidden{position:absolute;left:-10000em}.tns-transparent{opacity:0;visibility:hidden}.tns-fadeIn{opacity:1;filter:alpha(opacity=100);z-index:0}.tns-normal,.tns-fadeOut{opacity:0;filter:alpha(opacity=0);z-index:-1}.tns-vpfix{white-space:nowrap}.tns-vpfix>div,.tns-vpfix>li{display:inline-block}.tns-t-subp2{margin:0 auto;width:310px;position:relative;height:10px;overflow:hidden}.tns-t-ct{width:calc(100% * 70 / 3);position:absolute;right:0}.tns-t-ct:after{content:\"\";display:table;clear:both}.tns-t-ct>div{width:calc(100% / 70);height:10px;float:left}\n", ".slider-wrapper{opacity:0;overflow:hidden;max-height:0;transition:all 20ms ease-out;position:relative}.slider-wrapper.ready{opacity:1;max-height:none;overflow:visible}\n"], pipes: { "async": i2.AsyncPipe }, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxWrapperTinySliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-wrapper-tiny-slider', encapsulation: ViewEncapsulation.None, template: "<div class=\"slider-wrapper\" [class.ready]=\"sliderReady$ | async\">\n  <div class=\"slide-items\" #slideItems>\n    <ng-content></ng-content>\n  </div>\n</div>\n", styles: [".tns-outer{padding:0!important}.tns-outer [hidden]{display:none!important}.tns-outer [aria-controls],.tns-outer [data-action]{cursor:pointer}.tns-slider{transition:all 0s}.tns-slider>.tns-item{box-sizing:border-box}.tns-horizontal.tns-subpixel{white-space:nowrap}.tns-horizontal.tns-subpixel>.tns-item{display:inline-block;vertical-align:top;white-space:normal}.tns-horizontal.tns-no-subpixel:after{content:\"\";display:table;clear:both}.tns-horizontal.tns-no-subpixel>.tns-item{float:left}.tns-horizontal.tns-carousel.tns-no-subpixel>.tns-item{margin-right:-100%}.tns-no-calc{position:relative;left:0}.tns-gallery{position:relative;left:0;min-height:1px}.tns-gallery>.tns-item{position:absolute;left:-100%;transition:transform 0s,opacity 0s}.tns-gallery>.tns-slide-active{position:relative;left:auto!important}.tns-gallery>.tns-moving{transition:all .25s}.tns-autowidth{display:inline-block}.tns-lazy-img{transition:opacity .6s;opacity:.6}.tns-lazy-img.tns-complete{opacity:1}.tns-ah{transition:height 0s}.tns-ovh{overflow:hidden}.tns-visually-hidden{position:absolute;left:-10000em}.tns-transparent{opacity:0;visibility:hidden}.tns-fadeIn{opacity:1;filter:alpha(opacity=100);z-index:0}.tns-normal,.tns-fadeOut{opacity:0;filter:alpha(opacity=0);z-index:-1}.tns-vpfix{white-space:nowrap}.tns-vpfix>div,.tns-vpfix>li{display:inline-block}.tns-t-subp2{margin:0 auto;width:310px;position:relative;height:10px;overflow:hidden}.tns-t-ct{width:calc(100% * 70 / 3);position:absolute;right:0}.tns-t-ct:after{content:\"\";display:table;clear:both}.tns-t-ct>div{width:calc(100% / 70);height:10px;float:left}\n", ".slider-wrapper{opacity:0;overflow:hidden;max-height:0;transition:all 20ms ease-out;position:relative}.slider-wrapper.ready{opacity:1;max-height:none;overflow:visible}\n"] }]
        }], ctorParameters: function () { return [{ type: BrowserWindowRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { slideItemsContainerRef: [{
                type: ViewChild,
                args: ['slideItems', { static: true }]
            }], config: [{
                type: Input
            }], initManually: [{
                type: Input
            }], id: [{
                type: Input
            }] } });

class NgxWrapperTinySliderModule {
}
NgxWrapperTinySliderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxWrapperTinySliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxWrapperTinySliderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxWrapperTinySliderModule, declarations: [NgxWrapperTinySliderComponent], imports: [CommonModule], exports: [NgxWrapperTinySliderComponent] });
NgxWrapperTinySliderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxWrapperTinySliderModule, providers: [], imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxWrapperTinySliderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [NgxWrapperTinySliderComponent],
                    exports: [NgxWrapperTinySliderComponent],
                    providers: []
                }]
        }] });

/*
 * Public API Surface of ngx-wrapper-tiny-slider
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxWrapperTinySliderComponent, NgxWrapperTinySliderModule };
//# sourceMappingURL=ngx-wrapper-tiny-slider.mjs.map
