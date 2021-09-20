import {
  Server,
  DataStory,
  Diagram,
} from '@data-story-org/core';
import { DiagramModel } from '../../diagram/models';
import { SerializedReactDiagram } from '../../types';
import { parse, stringify } from 'flatted';

export class LocalServer extends Server {
  boot() {
    const bootPayload = super.boot();

    // Inject demo stories into localStorage
    // Add stories from localStorage to bootPayload

    return bootPayload;
  }

  load(name: string): SerializedReactDiagram {
    const story: DataStory<SerializedReactDiagram> = parse(
      localStorage.getItem(name),
    );
    return story.diagram;
  }

  async save(name: string, model: DiagramModel) {
    localStorage.setItem(
      name,
      stringify(
        new DataStory<SerializedReactDiagram>(
          name,
          '',
          [''],
          model.serialize(),
        ),
      ),
    );

    return new Promise((success) => {
      return success(true);
    });
  }
}
