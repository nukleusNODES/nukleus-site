import { Injectable } from '@angular/core';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireAuthModule } from 'angularfire2/auth';

import { FileItem } from '../directives/file-item';
// import * as firebase from 'firebase';
// import * as _ from 'lodash';
// import { environment } from './../../../config/firebase-config';

@Injectable()
export class UploadImagesService {

  private mStorageRef: String;
  private static HYPHEN: String = "-";
  private static ORDER_IMAGES: String = "Order Images";
  private static SIGNATURE: String = "Signature";
  private static PROFILE: String = "Profile";
  private static WORKSHOP: String = "Workshop";
  private static YEAR: String = "Year";
  private static MONTH: String = "Month";
  private static DAY: String = "Day";
  private static HOUR: String = "Hour";
  private static ORDER: String = "Order";
  private static ITEM: String = "Item";
  private static BEFORE: String = "Before";
  private static AFTER: String = "After";
  private static USER: String = "User";

  private IMAGES_FOLDER: string = 'Profile/';

  private date: Date = new Date();
// public af: AngularFireModule, public auth: AngularFireAuthModule
  constructor() { 
    //console.log("inside console", firebase);
    // try{
    //   if(firebase.apps.length == 0){
    //     firebase.initializeApp(environment.firebase);
    //   }       
    // }catch(e){
    //   console.log(e);
    // }    
  }

  // uploadImagesToFirebase(name, url, file, token, userId): any {
  //   console.log("token",token);      
  //   firebase.auth().signInWithCustomToken(token);
  //   console.log(firebase.auth().currentUser); 
  //   let storageRef = firebase.storage().ref(url);
  //   console.log("storageRef", storageRef);
  //   let uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.getProfileImageUploadUrl(userId)}/${name}`).put(file);
  //   return uploadTask;
  // }

  public getProfileImageUploadUrl(userId): String {
    let imageUploadUrl = "";
    imageUploadUrl = imageUploadUrl + this.getYearRefForImage() + this.getMonthRefForImage() + this.getDayRefForImage() + this.getHourRefForImage() + this.getUserRef(userId);
    return imageUploadUrl;
  }
  //  private saveImage(image:any) {
  //    this.af.database.list(`/${this.IMAGES_FOLDER}`).push(image);
  //  }

  private getYearRefForImage(): String {
    return UploadImagesService.YEAR + "-" + this.getCurrentYear() + "/";
  }

  private getMonthRefForImage(): String {
    return UploadImagesService.MONTH + "-" + this.getCurrentMonth() + "/";
  }

  private getDayRefForImage(): String {
    return UploadImagesService.DAY + "-" + this.getCurrentDay() + "/";
  }

  private getHourRefForImage(): String {
    return UploadImagesService.HOUR + "-" + this.getCurrentHour() + "/";
  }

  private getUserRef(userId): String {
    return UploadImagesService.USER + "-" + userId + "/";
  }

  private getCurrentYear(): number {
    return this.date.getFullYear();
  }

  private getCurrentMonth(): number {
    return this.date.getMonth() + 1;
  }

  private getCurrentDay(): number {
    return this.date.getDate();
  }

  private getCurrentHour(): number {
    return this.date.getHours();
  }
}