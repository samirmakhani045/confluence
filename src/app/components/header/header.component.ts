import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableService } from 'src/app/services/observable.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() newsideNavFlag = new EventEmitter<boolean>();
  @Input() userInfo:any; 

  isSideNvOpen = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToDashboard() {
    this.router.navigate([''])
  }

  sideNavFlag() {
    this.isSideNvOpen = !this.isSideNvOpen
    this.newsideNavFlag.emit(this.isSideNvOpen);
  }

}
