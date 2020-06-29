import { Injectable } from '@angular/core';
import * as contentful from 'contentful';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import * as marked from 'marked';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
@Injectable()
export class ContentfulService {

// Initialize the SDK client
private client = contentful.createClient({
space: environment.contentful.spaceId,
accessToken: environment.contentful.token
})
  constructor() { }

// console log a response for debugging
logContent(contentId){
this.client.getEntry(contentId)
.then((entry)=>console.log(entry));
};

// retrieves content mapped to its data fields so it'll be more angular friendly
 getContent(contentId) {
   const promise = this.client.getEntry(contentId);
   return Observable.fromPromise(promise).map(entry => entry.fields);
 }

 // Function to change the body to html and not plain text
 markdownToHtml(md: string){
   return marked(md);
 }
}
