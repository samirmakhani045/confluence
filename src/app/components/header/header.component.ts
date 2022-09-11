import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() newsideNavFlag = new EventEmitter<boolean>();
  
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
