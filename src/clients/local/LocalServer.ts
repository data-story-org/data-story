import { Server } from '@data-story-org/core'
import DiagramModel from '../../diagram/models/DiagramModel';

export class LocalServer extends Server {
  async save(name: string, model: DiagramModel) {
		// @ts-ignore
    localStorage.setItem(name, model.toJson());

    return new Promise((success) => {
      return success(true);
    });
  }	
}
