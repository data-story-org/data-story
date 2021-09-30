import React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { NodeModel } from '../models';
import { NodeWidget } from '../../components/widgets/Node/';
import CommentNodeWidget from '../../components/widgets/CommentNodeWidget';
// import OutputNodeWidget from '../../components/widgets/OutputNode';

export class NodeModelFactory extends AbstractReactFactory {
  constructor() {
    super('NodeModel');
  }

  generateModel(event) {
    return new NodeModel(event.initialConfig);
  }

  generateReactWidget(event) {
    // Specialiced nodes
    const types = {
      Comment: CommentNodeWidget,
      //Output: OutputNodeWidget, // WIP
    };

    // Default: NodeWidget
    const fallback = NodeWidget;

    const Type = types[event.model.name] ?? fallback;

    return <Type engine={this.engine} node={event.model} />;
  }
}
