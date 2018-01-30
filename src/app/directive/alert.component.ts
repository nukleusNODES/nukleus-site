import { Component, OnInit } from '@angular/core';

import { AlertService } from './../shared/alert.service';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => {
            this.message = message;
            if (message) {
                setTimeout(function () {
                    this.message = "";
                }.bind(this), 5000);
            }
        });
    }
    
    dismissAlert() {
        this.message = "";
    }
}