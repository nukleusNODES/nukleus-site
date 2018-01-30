// import { Component } from '@angular/core';
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as Typed from 'typed.js';
import { CountDown } from "ng2-date-countdown";
import { AlertService } from './../shared/alert.service';
import { Observable, Subscription } from 'rxjs/Rx';
import * as firebase from 'firebase';
declare var $: any;

@Component({
  selector: 'base-component',
  templateUrl: 'base.component.html',
  styleUrls: [],
  providers: []
})
//added after worked component <offer-component></offer-component>
export class BaseComponent implements OnInit {
  public isSubscribeDisabled: boolean = false;
  public submitted: boolean;
  subscribeForm: FormGroup;
  public isSubscribed: boolean = false;
  private future: Date;
  private futureString: string;
  private diff: number;
  private $counter: Observable<number>;
  private subscription: Subscription;
  private message: string;
  private id=0;
  private lan='en'
  constructor(private fb: FormBuilder, private elementRef: ElementRef, private alertService: AlertService) {
    window.scrollTo(0, 0);
    if(localStorage.getItem("language")!=null &&  localStorage.getItem("language")!=undefined && localStorage.getItem("language")!=''){
      this.lan=localStorage.getItem("language");
    }
    firebase.auth().signInAnonymously().then(resp => {
      var refObject = firebase.database().ref().child('subscribers');
      refObject.on('value', snap => {
        if (snap.val() == null) {
          this.id = 0;
        } else {
          this.id = snap.val()[snap.val().length-1].id
        }
      });
      
    });

    const emailRegex = `^[a-zA-Z0-9!#$%&'*+=?^_{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+=?^_{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$`;
    this.subscribeForm = this.fb.group({
      'email_id': [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])]
    });
  }

  dhms(t) {
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
      days + '<span class="count-date count1">days - </span>',
      hours + '<span class="count-date count2">hrs - </span>',
      minutes + '<span class="count-date count3">min - </span>',
      seconds + '<span class="count-date">sec </span>'
    ].join(' ');
  }

  ngOnInit() {
    var typed = new Typed("#typed", {
      stringsElement: '#typed-strings',
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 1000,
      loop: true

    });

    this.future = new Date('february 15, 2018 12:00:00');
    this.$counter = Observable.interval(1000).map((x) => {
      this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
      return x;
    });

    this.subscription = this.$counter.subscribe((x) => this.message = this.dhms(this.diff));
  }

  subscribe(value, isValid: boolean) {
    this.submitted = true;
    if (!isValid) {
      return;
    }
    this.isSubscribeDisabled = true;
    // this.footerService.subscribe(value).subscribe(response => {
    //  // console.log(response);
    //   this.isSubscribeDisabled = false;
    //   (<any>this.subscribeForm.controls['email_id']).setValue("");
    //   this.submitted = false;
    //   (<any>this.subscribeForm).controls.email_id._valid = true;
    //   (<any>this.subscribeForm).controls.email_id._touched = false;
    //   this.isSubscribed = true;
    // }, err => {
    //   this.alertService.error(err);
    // })
    firebase.auth().signInAnonymously().then(resp => {
      this.id=this.id+1;
      var refObject = firebase.database().ref().child('subscribers');
       firebase.database().ref('subscribers/' + this.id).set({
          id:this.id,
          email: value.email_id,
        });
      this.isSubscribeDisabled = false;
      (<any>this.subscribeForm.controls['email_id']).setValue("");
      this.submitted = false;
      (<any>this.subscribeForm).controls.email_id._valid = true;
      (<any>this.subscribeForm).controls.email_id._touched = false;
      this.isSubscribed = true;
    });
    
  }

  onlanguageClick(language :string){
    localStorage.setItem("language",language);
    window.location.reload;
  }

}
