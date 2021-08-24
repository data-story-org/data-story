import { Server } from '@data-story-org/core';
import { DiagramModel } from '../../diagram/models';

export class LocalServer extends Server {
  boot() {
    const bootPayload = super.boot();

    // Inject demo stories into localStorage
    // Add stories from localStorage to bootPayload

    return bootPayload;
  }

  load(name: string): string {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(name));
  }

  async save(name: string, model: DiagramModel) {
    // @ts-ignore
    localStorage.setItem(name, model.toJson());

    return new Promise((success) => {
      return success(true);
    });
  }
}
