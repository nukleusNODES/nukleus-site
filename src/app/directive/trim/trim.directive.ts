import { Directive, HostListener, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: '[trim]'
})

export class TrimDirective {

    private el: any;

    constructor(private eR: ElementRef, private renderer: Renderer){
        this.el = eR.nativeElement;
    }

    /*@HostListener('keypress')
    onEvent() {
        setTimeout(() => { // get new input value in next event loop!
            let value: string = this.el.value;
            this.el.value= value.replace(/\s\s+/g, ' ');
            console.log("Element is",this.el);
            if(value && (value.startsWith(' ') || (value.endsWith('')))) {
                console.log('trim!');
                this.el.value = value.trim();
                let event: Event = document.createEvent("Event");
                event.initEvent('input', true, true);
                Object.defineProperty(event, 'target', {value: this.el, enumerable: true});
                this.renderer.invokeElementMethod(this.el, 'dispatchEvent', [event]);
            }
        },0);
    }*/
    @HostListener('blur')
    onEvent(){
      console.log("Hiii");
      let value:string=this.el.value;
      //this.el.value= value.replace(/\s\s+/g, ' ');
      this.el.value= this.el.value.trim();
      console.log(this.el.value);
      let event: Event = document.createEvent("Event");
      event.initEvent('input', true, true);
      Object.defineProperty(event, 'target', {value: this.el, enumerable: true});
      this.renderer.invokeElementMethod(this.el, 'dispatchEvent', [event]);
    }
}