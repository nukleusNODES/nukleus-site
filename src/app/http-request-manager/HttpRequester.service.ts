// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpRequester {
    // Resolve HTTP using the constructor
    constructor(private http: Http) { }

    post(url: string, authorization: string, body: Object): Observable<any> {
        const bodyString = JSON.stringify(body); // Stringify payload
        // console.log(bodyString);
        const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Device-Token': 'jksahskads', 'Device-Type': 'WEB', 'Authorization': authorization }); // ... Set content type to JSON
        const options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, bodyString, options) // ...using post request
            .map((res: Response) => {
                // console.log(res);
                return res.json()
            }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || error.status)); //...errors if any
    }

    get(url: string, authorization: string): Observable<any> {
        // ...using get request
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': authorization }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.get(url, options)
            // ...and calling .json() on the response to return data
            .map((res: Response) => {
                if (res.status === 204) {
                    return res.status
                } else {
                    return res.json()
                }
            }
            )
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || error.status));

    }

    delete(url: string, authorization: string): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Device-Token': 'jksahskads', 'Device-Type': 'WEB', 'Authorization': authorization }); // ... Set content type to JSON
        const options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.delete(url, options) // ...using post request
            .map((res: Response) => {
                return res.json()
            }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || error.status)); //...errors if any
    }

    put(url: string, authorization: string, body: Object): Observable<any> {
        const bodyString = JSON.stringify(body); // Stringify payload
        // console.log(bodyString);
        const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Device-Token': 'jksahskads', 'Device-Type': 'WEB', 'Authorization': authorization }); // ... Set content type to JSON
        const options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.put(url, bodyString, options) // ...using post request
            .map((res: Response) => {
                // console.log(res);
                return res.json()
            }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || error.status)); //...errors if any
    }

    patch(url: string, authorization: string, body: Object): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Device-Token': 'jksahskads', 'Device-Type': 'WEB', 'Authorization': authorization }); // ... Set content type to JSON
        const options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.patch(url, JSON.stringify(body), options) // ...using post request
            .map((res: Response) => {
                return res.json()
            }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || error.status)); //...errors if any
    }

    verifyTOTPPostRequest(url: string, authorization: string, body: Object): Observable<any> {
        const bodyString = JSON.stringify(body); // Stringify payload
       // console.log(bodyString);
        const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Device-Token': 'jksahskads', 'Device-Type': 'WEB' }); // ... Set content type to JSON
        const options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, bodyString, options) // ...using post request
            .map((res: Response) => {
              //  console.log(res);
                return res.headers.get('X-Secret');
                // var authorization = res.headers.get('X-Secret');
                // if (authorization != null) {
                //     localStorage.setItem('token', authorization);
                // }
            }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || error.status)); //...errors if any
    }

    signupPostRequest(url: string, secret: string, body: Object): Observable<any> {
        const bodyString = JSON.stringify(body); // Stringify payload
       // console.log(bodyString);
        //console.log(secret);
        const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Device-Token': 'jksahskads', 'Device-Type': 'WEB', 'Contact-Mode-Id': '1', 'X-Secret': secret }); // ... Set content type to JSON
        const options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, bodyString, options) // ...using post request
            .map((res: Response) => {
                let payload = res.json();
               // console.log(payload)
                let authorization = res.headers.get('Authorization');
                if (authorization != null && payload != null) {
                    localStorage.setItem('token', authorization);
                    localStorage.removeItem('X-Secret');
                    localStorage.setItem("id", payload.id);
                    localStorage.setItem("email_id", payload.email_id);
                    localStorage.setItem("name", payload.name);
                    localStorage.setItem("gender", payload.gender);
                    localStorage.setItem("image_url", payload.image_url);
                    localStorage.setItem("referral_code", payload.referral_code);
                    localStorage.setItem("type", payload.type);
                    localStorage.setItem("phone", payload.phone);
                    localStorage.setItem("is_active", payload.is_active);
                    localStorage.setItem("cart_id", payload.id);
                    localStorage.setItem("cc", payload.cc);
                    localStorage.setItem("last_name", payload.last_name != undefined ? payload.last_name:"" );
                }
            }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    postLogin(url: string, authorization: string, body: Object): Observable<any> {
        const bodyString = JSON.stringify(body); // Stringify payload
        // console.log(bodyString);
        const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Device-Token': 'jksahskads', 'Device-Type': 'WEB' }); // ... Set content type to JSON
        const options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, bodyString, options) // ...using post request
            .map((res: Response) => {
                // console.log(res);
                let authorization = res.headers.get('Authorization');
                localStorage.setItem('token', authorization);
                return res.json()
            }) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || error.status)); //...errors if any
    }
}