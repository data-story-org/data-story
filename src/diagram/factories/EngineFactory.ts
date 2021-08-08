import createEngine, {
  DiagramEngine,
} from '@projectstorm/react-diagrams';
import NodeModelFactory from './NodeModelFactory';
import DiagramModel from '../models/DiagramModel';
import { SerializedReactDiagram } from '../../types/SerializedReactDiagram';

export default class EngineFactory {
  static loadOrCreate(
    serializedModel?: SerializedReactDiagram,
  ): DiagramEngine {
    return serializedModel
      ? this.load(serializedModel)
      : this.default();
  }

  static load(
    serializedModel: SerializedReactDiagram,
  ): DiagramEngine {
    const engine = this.getEngine();
    const model = new DiagramModel();

    serializedModel =
      typeof serializedModel == 'string'
        ? JSON.parse(serializedModel)
        : serializedModel;
    model.deserializeModel(serializedModel, engine);

    engine.setModel(model);

    return engine;
  }

  static default(): DiagramEngine {
    const engine = this.getEngine();

    const state: any = engine
      .getStateMachine()
      .getCurrentState();
    state.dragNewLink.config.allowLooseLinks = false;
    state.dragCanvas.config.allowDrag = true;

    engine
      .getNodeFactories()
      .registerFactory(new NodeModelFactory() as any);

    const model = new DiagramModel();

    engine.setModel(model);

    return engine;
  }

  static getEngine(): DiagramEngine {
    const engine = createEngine();

    engine
      .getNodeFactories()
      .registerFactory(new NodeModelFactory() as any);

    // Avoid link breakpoint creation when we just want to select it
    // https://github.com/projectstorm/react-diagrams/issues/49
    engine.maxNumberPointsPerLink = 0;

    return engine;
  }
}
