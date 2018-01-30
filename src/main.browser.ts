/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './app/environment';
import { bootloader } from '@angularclass/hmr';
import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { TRANSLATION_EN } from './../src/i18n/messages.en';
import { TRANSLATION_FR } from './../src/i18n/messages.fr';
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
  let TRANSLATION = TRANSLATION_FR;
  let language="en"
  if(localStorage.getItem('language') == null){
   language="en"
  }else{
    language=localStorage.getItem('language');
  }
  switch(language){
   case "en":
   TRANSLATION = TRANSLATION_EN;
   break;
   case "fr":
   TRANSLATION = TRANSLATION_FR;
   break;
   default:
   TRANSLATION = TRANSLATION_EN;
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
