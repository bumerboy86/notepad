import { INotes } from "./INotes";

export interface IState {
    notes: INotes[],
    loading: boolean,
    message: string,
    note: INotes | null,
    editValue: boolean,
    alert: boolean
}