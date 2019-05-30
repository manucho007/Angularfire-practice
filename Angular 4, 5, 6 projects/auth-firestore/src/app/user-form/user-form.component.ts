import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  signupForm: FormGroup;
  detailForm: FormGroup;
  constructor(public fb:FormBuilder, public auth:AuthService, private router:Router) { }

  ngOnInit() {
    this.buildForm();
    this.buildDetailForm();
}

// Creates the first Form
buildForm():void{
  // First step
  this.signupForm =this.fb.group({
  'email':['',[
    Validators.required,
    Validators.email
  ]
],
'password':['',[
  Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
  Validators.minLength(6),
  Validators.maxLength(25)
  ]
]
});
}
// Creates the second form
buildDetailForm():void{
  // Second step
  this.detailForm = this.fb.group({
  'catchPhrase': ['',[Validators.required]]
  })
}

// Using getters will make your code look pretty
get email(){return this.signupForm.get('email')};
get password(){return this.signupForm.get('password')};
get catchPhrase(){return this.detailForm.get('catchPhrase')};
//Step 1
signup(){
    return this.auth.emailSignUp(this.email.value, this.password.value);
}
// Step 2
setCatchPhrase(user){
return this.auth.updateUser(user, {catchPhrase: this.catchPhrase.value})
.then(() => this.afterSignIn());
}
/// Shared

private afterSignIn(): void {
  // Do after login stuff here, such router redirects, toast messages, etc.
  this.router.navigate(['profile']);
}
}
