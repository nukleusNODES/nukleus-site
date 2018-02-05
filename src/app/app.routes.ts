import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './static-pages/no-content';
import { ActivateGuard } from './activate-guard';
import { DataResolver } from './app.resolver';
import { BaseComponent } from './main/base.component';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BaseComponent,
    data: {
      // title: 'Masternode Platform | Masternode pools - Nukleus' ,
      //  meta: [
      // { 'name': 'description', 'id':'description', 'content': '' },
      // { 'name': 'keywords', 'id':'keywords', 'content': '' }]   
    }
  },
  
  {
    path: '**',
    component: NoContentComponent
  },
];

export const ROUTING = RouterModule.forRoot(ROUTES, { useHash: false });