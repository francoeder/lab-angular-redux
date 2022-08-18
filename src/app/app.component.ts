import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addScheduling } from './agenda-state-store/agenda.actions';
import { AgendaModel } from './models/agenda.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lab-angular-redux';

  constructor(
    private store: Store<{agenda: AgendaModel}>
  ) {}

  async addScheduling(scheduling) {
    console.log('AppComponent.addScheduling()');
    this.store.dispatch(addScheduling(scheduling));
  }

}
