/*
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AppState } from './app.service';
import { PublicationComponent } from "./publication/publication.component";
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';
import { environment } from './../../config/firebase-config';
import * as firebase from 'firebase';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app-container',
  template: `<router-outlet></router-outlet>    
  <alert></alert>`
})
export class AppComponent implements OnInit {
  // <footer-component></footer-component>
  constructor(public appState: AppState, private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title, private meta: Meta) {
    try {
            if (firebase.apps.length == 0) {
                firebase.initializeApp(environment.firebase);
            }
            
        } catch (e) {
            console.log(e);
        }
        
   }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
        this.titleService.setTitle(event['title']);
        const aa = Array.prototype.slice.call(document.getElementsByTagName("meta"));
        // aa.forEach(element => {
        //   this.meta.removeTagElement(element);
        // });
        if (event['meta'] != undefined) {
          event['meta'].forEach(element => {
            this.meta.updateTag(element);
          });
        }

        // this.meta.addTags(event['meta']);
        // this.meta.addTag({ 'name': 'google-site-verification', 'content': 'D1GRu8iCWEJXOz2-8bvUVD54VG3rmWSGXNb2Va8uObA'});
      });
  }

  // ngAfterViewInit() {
  //   var s = document.createElement("script");
  //   s.type = "text/javascript";
  //   s.src = "./assets/js/google-analytics.js";
  //   document.head.appendChild(s);
  // }
}

