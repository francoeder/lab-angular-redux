import { createAction, props } from "@ngrx/store";
import { SchedulingModel } from "../models/scheduling.model";

export enum ActionTypes{
    Add = 'ADD',
    Remove = 'REMOVE',
    Clear = 'CLEAR'
}

export const addScheduling = createAction(ActionTypes.Add, props<SchedulingModel>());
export const removeScheduling = createAction(ActionTypes.Remove, props<SchedulingModel>());
export const clearAgenda = createAction(ActionTypes.Clear);
