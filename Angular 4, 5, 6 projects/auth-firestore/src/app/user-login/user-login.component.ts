import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(public auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }
  signInWithGoogle(): void {
        this.auth.googleLogin()
          .then(() => this.afterSignIn());
      }

      signInWithFacebook(): void {
        this.auth.facebookLogin()
          .then(() => this.afterSignIn());
      }

      signInWithTwitter(): void {
        this.auth.twitterLogin()
          .then(() => this.afterSignIn());
      }

      /// Anonymous Sign In

      signInAnonymously() {
        this.auth.anonymousLogin()
          .then(() => this.afterSignIn());
      }


      /// Shared

      private afterSignIn(): void {
        // Do after login stuff here, such router redirects, toast messages, etc.
        this.router.navigate(['profile']);
      }
}
