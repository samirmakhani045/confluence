import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidnav',
  templateUrl: './sidnav.component.html',
  styleUrls: ['./sidnav.component.scss']
})
export class SidnavComponent implements OnInit {

  @Input()
  events!: Observable<boolean>;
  sideNavFlag = true;
  private eventsSubscription!: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((data) => {
      this.sideNavFlag = data;
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout()
  }

}
