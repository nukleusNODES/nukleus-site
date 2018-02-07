// import { Component } from '@angular/core';
import { Component, OnInit, Input, ElementRef,AfterViewInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { Router , Params, ActivatedRoute } from '@angular/router';
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
  public future: Date;
  public futureString: string;
  public diff: number;
  public $counter: Observable<number>;
  public subscription: Subscription;
  public message: string;
  public id=0;
  public lan:any
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private elementRef: ElementRef, private alertService: AlertService, private titleService: Title, private metaService: Meta) {
    window.scrollTo(0, 0);
   
    this.lan=localStorage.getItem("language");   
    this.route.queryParams.forEach((params: Params) => {
      if (params['lang'] != null && params['lang'] != undefined && params['lang'] != '') {
          if(localStorage.getItem("language") != params['lang'] && localStorage.getItem("isLanguagePresent") != 'no'){
          localStorage.setItem("language",params['lang']);
          this.lan=params['lang'];
           window.location.reload() 
        }
      }
    });
   
    this.setTitleAndMetaTags()
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
    this.lan= localStorage.getItem("language")
    this.router.navigate(['/'],{ queryParams: { lang: localStorage.getItem("language") } });  
  }

   ngAfterViewInit(){
     
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
      days + '<span class="count-date count1" i18n>days - </span>',
      hours + '<span class="count-date count2" i18n>hrs - </span>',
      minutes + '<span class="count-date count3" i18n>min - </span>',
      seconds + '<span class="count-date" i18n>sec </span>'
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
    window.location.reload();
  }

setTitleAndMetaTags(){
    let pageTitle = "One-Click Masternodes | Masternode Pools - Nukleus";
    let pageDescription="Launch a masternode with one-click. Join a masternode pool and start earning no matter how many coins you have."
    let language=localStorage.getItem("language");
    switch (language) {
    case "ar":
      pageTitle = "ماسترنود بنقرة واحدة | مجموعات الماسترنود -  Nukleus";
      pageDescription="اطلق ماسترنود بنقرة واحدة. اشترك فى مجموعة ماسترنود وابدأ بالربح بغض النظر عن عدد العملات التى تمتلكها"
      break;
    case "bn":
      pageTitle = "এক ক্লিক ক্লিক করুন | ঠিকানাs";
      pageDescription="এক-ক্লিক সঙ্গে একটি মাস্টার নোড আরম্ভ করুন একটি মাস্টার নোড পুলের সাথে যোগ দিন এবং আপনার কতগুলি কয়েন আছে তার কোনও অর্থ উপার্জন শুরু করুন।"
      break;
    case "ch":
      pageTitle = "一键购Masternodes | Masternode彩池 -  Nukleus";
      pageDescription="一键式启动masternode。不管您有多少密码货币，加入masternode彩池并开始赚钱。"
      break;
    case "en":
      pageTitle = "One-Click Masternodes | Masternode Pools - Nukleus";
      pageDescription="Launch a masternode with one-click. Join a masternode pool and start earning no matter how many coins you have."
      break;
    case "es":
      pageTitle = "Nodo Maestro a Un-Clic | Comunidad de Nodos Maestros - Nukleus";
      pageDescription="Inicia un nodo maestro con solamente un clic. Ingresa al grupo de nodos maestros y comienza a ganar sin importar cuántas monedas tengas."
      break;
    case "hi":
      pageTitle = "वन क्लिक मास्टरनोड्स | मास्टरनोड्स समूह - नुक्लेउस";
      pageDescription="एक क्लिक के साथ मास्टरनोड्स को शुरू करे | कोई अंतर नहीं पड़ता की आपके पास कितनी मुद्रा है ,मास्टरनोड्स समूह से जुड़े और कमाना शुरू करे|"
      break;
    case "ja":
      pageTitle = "ワンクリック マスターノード | マスターノードプール ‐ ニュークレウス";
      pageDescription="ワンクリックでマスターノードを作動させる。コインの数に関係なくマスターノードプールに参加して報酬を得る。"
      break;
    case "ko":
      pageTitle = "원 클맄 마스터노드  | 마스터노드풀 - 누클레우스";
      pageDescription="원 클맄으로 마스터노드를 시작한다. 마스터노드 풀에 가입하고 가지고있는 동전의 수에 관계없이 돈을 벌기 시작한다."
      break;
    case "pt":
      pageTitle = "Masternodes Em Um Clique | Masternode Pools - Nukleus";
      pageDescription="Crie um masternode em apenas um clique. Junte-se ao masternode pool e comece a ganhar, não importa quantas moedas você tenha."
      break;
    case "ru":
      pageTitle = "Однокликабельные Мастерноды. Пулы главных узлов";
      pageDescription="Стартуй Мастерноды одним кликом. Присоединяйся к пулам главных узлов и начни зарабатывать - не имеет значение сколько у тебя коинов."
      break;
    default:
      pageTitle = "One-Click Masternodes | Masternode Pools - Nukleus";
      pageDescription="Launch a masternode with one-click. Join a masternode pool and start earning no matter how many coins you have."
  }
    
    this.titleService.setTitle(pageTitle);
    const discription:MetaDefinition = { name : "description", id : "description", content:pageDescription}
    this.metaService.updateTag(discription);
  
  }

}
