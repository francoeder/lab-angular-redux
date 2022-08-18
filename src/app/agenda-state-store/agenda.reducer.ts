import { createReducer, on } from "@ngrx/store";
import { addScheduling, removeScheduling, clearAgenda } from "./agenda.actions";
import { AgendaModel } from "../models/agenda.model";

export const initialState = new AgendaModel();

export const agendaReducer = createReducer(
    initialState,

    on(addScheduling, (state, scheduling) => {
        const stateClone: AgendaModel = JSON.parse(JSON.stringify(state));
        stateClone.schedulings.push(scheduling);
        return stateClone;
    }),

    on(removeScheduling, (state, scheduling) => {
        const stateClone: AgendaModel = JSON.parse(JSON.stringify(state));
        const index = state.schedulings.indexOf(scheduling);
        stateClone.schedulings.splice(index, 1);
        return stateClone;
    }),

    on(clearAgenda, () => new AgendaModel())
  );
