import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private  auth: AuthService,
    private router: Router
  ) {}
// Traditional way using the user$ from authstate

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//       return this.auth.user$.pipe(
//         take(1),
//         map(user => !!user), // <-- map to boolean
//         tap(loggedIn => {
//           if (!loggedIn) {
//             console.log('access denied');
//             this.router.navigate(['/']);
//           }
//       })
//  );
//   }

// Using the getUser based promised for an async function
async canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Promise<boolean>{

  const user = await this.auth.getUser();
  const loggedIn = !!user;

  if (!loggedIn) {
    console.log('access denied');
    this.router.navigate(['/']);
  }

  return loggedIn;
}
}
