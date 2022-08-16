import { ActionTypes } from "../actions/scheduling.action";
import { ActionModel } from "../models/action.model";
import { AgendaModel } from "../models/agenda.model";

export const agenda = new AgendaModel();

export function agendaReducer(
    state = agenda,
    action: ActionModel
) {
    switch (action.type) {
        case ActionTypes.Add:
            state.schedulings.push(action.payload);
            console.log(state);
            break;
    
        case ActionTypes.Remove:
            const index = state.schedulings.indexOf(action.payload);
            state.schedulings.splice(index, 1);
            console.log(state);
            break;

        case ActionTypes.Clear:
            state = new AgendaModel();
            console.log(state);
            break;

        default:
            break;
    }
}