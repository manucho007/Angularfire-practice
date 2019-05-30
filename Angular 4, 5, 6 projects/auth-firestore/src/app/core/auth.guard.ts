import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService} from './auth.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,
              private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user
      .take(1)
      .map(user=>!!user)
      // With condition
      // .map(user=>!!(user && user.catchPhrase))
      .do(loggedIn=>{
        if(!loggedIn){
          console.log("Access denied")
          this.router.navigate(['/login']);
        }
      })
  }
}
