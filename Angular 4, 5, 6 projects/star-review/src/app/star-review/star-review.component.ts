import { Component, OnInit, ViewEncapsulation,Input } from '@angular/core';
import {StarService} from '../star.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StarReviewComponent implements OnInit {

@Input() userId;
@Input() movieId;

stars:Observable<any>;
avgRating:Observable<any>;
  constructor(private starService: StarService) { }

  ngOnInit() {
    this.stars = this.starService.getMovieStars(this.movieId)

    this.avgRating = this.stars.map(arr=>{
      const ratings = arr.map(v=> v.value)
      return ratings.lenght? ratings.reduce((total, val) => total + val)/ arr.lenght:'not reviewed'
    })
  }

starHandler(value){
  this.starService.setStar(this.userId,this.movieId, value)
}
}
