import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DataService {
  public data: any;

  constructor() {

  }
  settter(data: any) {

    this.data = data;

  }
  getter() {

    return this.data;
  }
}
