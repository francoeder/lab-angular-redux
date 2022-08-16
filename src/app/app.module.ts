import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { agendaReducer } from './reducers/agenda.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      agenda: agendaReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
