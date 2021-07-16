import React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import NodeModel from '../core/NodeModel';
import NodeWidget from './components/NodeWidget';
import CommentNodeWidget from './components/CommentNodeWidget';

export default class NodeModelFactory extends AbstractReactFactory {
  constructor() {
    super('NodeModel');
  }

  generateModel(event) {
    return new NodeModel(event.initialConfig);
  }

  generateReactWidget(event) {
    if (event.model.name == 'Comment') {
      return <CommentNodeWidget node={event.model} />;
    }

    return (
        <NodeWidget
          engine={this.engine}
          node={event.model}
        />
    );
  }
}
