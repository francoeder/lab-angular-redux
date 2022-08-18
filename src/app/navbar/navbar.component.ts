import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { schedulingsCounter } from '../agenda-state-store/agenda.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  schedulingsCounter$: Observable<number>;

  constructor(private store: Store) {
    this.schedulingsCounter$ = store.select(schedulingsCounter);
  }

  ngOnInit(): void {
  }

}
