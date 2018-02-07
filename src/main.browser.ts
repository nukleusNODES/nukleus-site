/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router , Params, ActivatedRoute } from '@angular/router';
import { decorateModuleRef } from './app/environment';
import { bootloader } from '@angularclass/hmr';
import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { TRANSLATION_AR } from './../src/i18n/messages.ar';
import { TRANSLATION_BN } from './../src/i18n/messages.bn';
import { TRANSLATION_CH } from './../src/i18n/messages.ch';
import { TRANSLATION_EN } from './../src/i18n/messages.en';
import { TRANSLATION_ES } from './../src/i18n/messages.es';
import { TRANSLATION_HI } from './../src/i18n/messages.hi';
import { TRANSLATION_JA } from './../src/i18n/messages.ja';
import { TRANSLATION_KO } from './../src/i18n/messages.ko';
import { TRANSLATION_PT } from './../src/i18n/messages.pt';
import { TRANSLATION_RU } from './../src/i18n/messages.ru';
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app';
//uncomment this to enable production mode
// import {enableProdMode} from '@angular/core';
// enableProdMode();
/*
 * Bootstrap our Angular app with a top level NgModule
 */
// Add these lines after AppModule in main function to implement i18n
// ,
//   {providers: [
//     {provide: TRANSLATIONS, useValue: TRANSLATION},
//     {provide:TRANSLATIONS_FORMAT, useValue:'xlf'},
//     {provide:LOCALE_ID, useValue:'en'}
//   ]}
export function main(): Promise<any> {
  let route: ActivatedRoute
  let TRANSLATION = TRANSLATION_EN;
  let language = "en"
  if (localStorage.getItem('language') == null) {
    localStorage.setItem('language', 'en')
    language = "en"
  } else {
    language = localStorage.getItem('language');
  }
  // this.route.queryParams.forEach((params: Params) => {
  //     if (params['lang'] != null && params['lang'] != undefined && params['lang'] != '') {
  //         localStorage.setItem("language",params['lang']);
  //         alert(params['lang'])
  //         window.location.reload;
  //     }
  //   });
  switch (language) {
    case "ar":
      TRANSLATION = TRANSLATION_AR;
      localStorage.setItem('isLanguagePresent', "yes");
      break;
    case "bn":
      TRANSLATION = TRANSLATION_BN;
      localStorage.setItem('isLanguagePresent', "yes");
      break;
    case "ch":
      TRANSLATION = TRANSLATION_CH;
      localStorage.setItem('isLanguagePresent', "yes");
      break;
    case "en":
      TRANSLATION = TRANSLATION_EN;
      localStorage.setItem('isLanguagePresent', "yes");
      break;
    case "es":
      TRANSLATION = TRANSLATION_ES;
      localStorage.setItem('isLanguagePresent', "yes");
      break;
    case "hi":
      TRANSLATION = TRANSLATION_HI;
      localStorage.setItem('isLanguagePresent', "yes");
      break;
    case "ja":
      TRANSLATION = TRANSLATION_JA;
      localStorage.setItem('isLanguagePresent', "yes");
      break;
    case "ko":
      TRANSLATION = TRANSLATION_KO;
      localStorage.setItem('isLanguagePresent', "yes");
      break;
    case "pt":
      TRANSLATION = TRANSLATION_PT;
      localStorage.setItem('isLanguagePresent', "yes");
      break;
    case "ru":
      TRANSLATION = TRANSLATION_RU;
      localStorage.setItem('isLanguagePresent', "yes");
      break;
    default:
      TRANSLATION = TRANSLATION_EN;
      localStorage.setItem('isLanguagePresent', "no");
      localStorage.setItem('language', 'en')
  }
  //localStorage.removeItem("language")
  return platformBrowserDynamic()
    .bootstrapModule(AppModule,
    {
      providers: [
        { provide: TRANSLATIONS, useValue: TRANSLATION },
        { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
        { provide: LOCALE_ID, useValue: language }
      ]
    })
    .then(decorateModuleRef)
    .catch((err) => console.error(err));
}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
