import { SchedulingModel } from "./scheduling.model";

export class AgendaModel {
    public schedulings: SchedulingModel[] = [];
    public get total(): number { return this.schedulings.length };
}
