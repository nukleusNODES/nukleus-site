import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
//import { AuthenticationService } from './authentication.service';

@Injectable()
export class AlertService {
    public subject = new Subject<any>();
    public logoutSubject = new Subject<any>();
    private keepAfterNavigationChange = false;
    private errorMsg: string;
    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                    this.logoutSubject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    }

    error(message: any, keepAfterNavigationChange = false) {
       // console.log("in error method",message);
        if (message === 401 || message === 403) {
            this.errorMsg = "Your session has timed out. Please sign in again.";
            this.logoutSubject.next({ type: 'logout', text: this.errorMsg });
        }
        else if (message === 404) {
            //let responseMessage = JSON.parse(message._body);
            this.errorMsg = "The details you are looking for, not found in our database";
        }
        else if (message === 409) {
            //let responseMessage = JSON.parse(message._body);
            this.errorMsg = "Already exists";
        }
        else {
            // if (message) {
            //     this.errorMsg = message.message;
            // }
            // else {
                this.errorMsg = "Something went wrong, Please contact your system administrator."
           // }
        }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: this.errorMsg });
        
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    
    logoutUser(): Observable<any> {
        return this.logoutSubject.asObservable();
    }
}