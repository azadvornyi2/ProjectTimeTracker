import { EntityBase } from "../entity.base";

export class Project extends EntityBase {
    public Name: string;
    public Description: string;
    public TimeRegisters: TimeRanges[];
}