import { DiagramModel } from '../diagram/models';
import { BootPayload } from '../types';

export interface RunResult {
  diagram: DiagramModel;
}

export interface ClientInterface {
  boot(options: object): Promise<BootPayload>;
  run(model: DiagramModel): Promise<RunResult>;
  save(name: string, model: DiagramModel): Promise<any>;
  load(name: string): string;
}
