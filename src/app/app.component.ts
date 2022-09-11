import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'confluence';
  isShowHeader = true;
  isSideNavOpen = true;
  eventsSubject: Subject<boolean> = new Subject<boolean>();
  constructor(
    router: Router
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if(event.url === '/login') {
          this.isShowHeader = false
        } else {
          this.isShowHeader = true
        }
      }
    });
  }

  ngOnInit(): void {}

  sideNavFlag(newflag: boolean) {
    this.isSideNavOpen = newflag;
    this.eventsSubject.next(this.isSideNavOpen);
  }
  
}