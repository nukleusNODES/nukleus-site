import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './../main/base.component';

export const ROUTES: Routes = [
  
  { 
    path: 'index',
    component: BaseComponent,
    data: {
      // title: 'Masternode Platform | Masternode pools - Nukleus',
      // meta: [
      // { 'name': 'description', 'id':'description', 'content': '' },
      // { 'name': 'keywords', 'id':'keywords', 'content': '' }]
    }
  }
];

export const ROUTING = RouterModule.forChild(ROUTES);