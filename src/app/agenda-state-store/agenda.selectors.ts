import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AgendaModel } from "../models/agenda.model";

export const schedulingsCounter = createSelector(
    createFeatureSelector('agenda'),
    (state: AgendaModel) => {
        return state.schedulings.length;
    }
);