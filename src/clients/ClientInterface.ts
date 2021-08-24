import { DiagramModel } from '../diagram/models';
import { BootPayload } from '../types/BootPayload';

export default interface ClientInterface {
  boot(options: object): Promise<BootPayload>;
  run(model: DiagramModel): Promise<any>;
  save(name: string, model: DiagramModel): Promise<any>;
  load(name: string): string;
}
