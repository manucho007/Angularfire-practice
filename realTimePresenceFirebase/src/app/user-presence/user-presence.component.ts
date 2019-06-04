import { Component, OnInit, Input } from '@angular/core';
import { PresenceService } from '../services/presence.service';

@Component({
  selector: 'user-presence',
  templateUrl: './user-presence.component.html',
  styleUrls: ['./user-presence.component.scss']
})
export class UserPresenceComponent implements OnInit {

  // Id received from component
  @Input() uid;

  presence$;

  constructor(private presence: PresenceService) { }

  ngOnInit() {
    this.presence$ = this.presence.getPresence(this.uid);
  }

}
