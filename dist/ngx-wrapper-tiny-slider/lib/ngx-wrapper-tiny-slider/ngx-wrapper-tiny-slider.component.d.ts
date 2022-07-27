import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TinySliderInstance, TinySliderSettings } from 'tiny-slider';
import { BrowserWindowRef } from '../services/windowref.service';
import * as i0 from "@angular/core";
export declare class NgxWrapperTinySliderComponent implements OnInit, OnDestroy {
    private wr;
    private cd;
    slideItemsContainerRef: ElementRef;
    config: Partial<TinySliderSettings>;
    initManually: boolean;
    id: string;
    sliderReady$: BehaviorSubject<boolean>;
    sliderInstance: TinySliderInstance;
    private tns$;
    private componentDestroy$;
    private defaultConfig;
    constructor(wr: BrowserWindowRef, cd: ChangeDetectorRef);
    ngOnInit(): void;
    private initTns;
    initSlider(): void;
    /**
     * OVERIDE TINY SLIDER METHOD
     */
    goTo(target: number | 'next' | 'prev' | 'first' | 'last'): void;
    play(): void;
    pause(): void;
    destroy(): void;
    /**
     * DESTROY
     */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxWrapperTinySliderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxWrapperTinySliderComponent, "ngx-wrapper-tiny-slider", never, { "config": "config"; "initManually": "initManually"; "id": "id"; }, {}, never, ["*"]>;
}
