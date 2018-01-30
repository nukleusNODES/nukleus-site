import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ROUTING } from './base.routes';
// ,
//         ROUTING
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,       
        ROUTING
    ],
    declarations: [
        BaseComponent
        
    ],
    exports: [
        BaseComponent
    ]
})
export class BaseModule { }
