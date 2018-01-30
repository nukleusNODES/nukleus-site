import { NgModule } from '@angular/core';

import { InfiniteScrollerDirective } from './infinitescroller.directive';

@NgModule({
    declarations: [
        InfiniteScrollerDirective
    ],
    exports: [
        InfiniteScrollerDirective
    ]
})
export class InfinityScrollerModule{}