import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styles: [],
})
export class CustomerComponent implements OnInit {
  @Input() customer;
  progress = 0;
  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {}
  deleteCustomer(e, customer) {
    this.progress = e / 10;
    if (this.progress > 100) {
      this.afs.doc(`customers/${this.customer.id}`).delete();
    }
  }
}
