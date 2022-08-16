import { Action } from "@ngrx/store";

export enum ActionTypes{
    Add = 'ADD',
    Remove = 'REMOVE',
    Clear = 'CLEAR'
}

export const Add = (scheduling: any) => {
    return <Action>{ type: ActionTypes.Add, payload: scheduling };
}

export const Remove = (scheduling: any) => {
    return <Action>{ type: ActionTypes.Remove, payload: scheduling };
}

export const Clear = () => {
    return <Action>{ type: ActionTypes.Clear, payload: null };
}
