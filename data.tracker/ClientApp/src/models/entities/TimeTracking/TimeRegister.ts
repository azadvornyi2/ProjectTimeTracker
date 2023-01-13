import { EntityBase } from "../entity.base";
import { Project } from "../Projects/Project";

export class TimeRegister extends EntityBase {
  public Starts: string;
  public Ends: string;
  public Duration: number;
  public ProjectId: number;
  public Notes: string;
  public Project: Project;
  public ProjectName: string;
}
