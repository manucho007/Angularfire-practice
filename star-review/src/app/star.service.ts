import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface Star {
  userId:any;
  movieId:any;
  value: number;
}


@Injectable()
export class StarService {

  constructor(private afs:AngularFirestore) {}
  // Star reviews that belong to a user
  getUserStar(userId){
    const starsRef = this.afs.collection('stars', ref=> ref.where('userId', '==', userId));
    return starsRef.valueChanges();
  }
  //Get all stars that belong to a Movie
  getMovieStars(movieId){
    const starsRef =this.afs.collection('stars', ref=> ref.where('movieId', '==', movieId));
    return starsRef.valueChanges();
  }

//Create or Update star
setStar(userId, movieId, value){
// star document data
  const star:Star={userId,movieId,value};
  //Custom doc ID for relationship
  const starPath = `stars/${star.userId}_${star.movieId}`;
  // Set the data, retun the promise
  return this.afs.doc(starPath).set(star);
}
}
