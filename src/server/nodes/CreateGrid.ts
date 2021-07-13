import { Feature } from '@data-story-org/core';
import ServerNode from '../ServerNode';
import NodeParameter from '../../core/NodeParameter';

export default class CreateGrid extends ServerNode {
  constructor(options = {}) {
    super({
      // Defaults
      name: 'CreateGrid',
      summary:
        'Create a set of objects with coordinates x and y',
      category: 'Reader',
      defaultInPorts: [],
      defaultOutPorts: ['Output'],
      // Explicitly configured
      ...options,
    });
  }

  async run() {
    const type = this.getParameterValue('grid_type');
    const gridMinX = parseFloat(
      this.getParameterValue('grid_min_x'),
    );
    const gridMinY = parseFloat(
      this.getParameterValue('grid_min_y'),
    );
    const gridMaxX = parseFloat(
      this.getParameterValue('grid_max_x'),
    );
    const gridMaxY = parseFloat(
      this.getParameterValue('grid_max_y'),
    );
    let gridSizeX = parseInt(
      this.getParameterValue('grid_size_x'),
    );
    let gridSizeY = parseInt(
      this.getParameterValue('grid_size_y'),
    );
    const gridSpacingX = parseFloat(
      this.getParameterValue('grid_spacing_x'),
    );
    const gridSpacingY = parseFloat(
      this.getParameterValue('grid_spacing_y'),
    );

    if (gridMaxX && gridMaxY) {
      gridSizeX = Math.ceil(
        (gridMaxX - gridMinX) / gridSpacingX,
      );
      gridSizeY = Math.ceil(
        (gridMaxY - gridMinY) / gridSpacingY,
      );
    }

    const features = [];

    for (let x = 0; x < gridSizeX; x++) {
      for (let y = 0; y < gridSizeY; y++) {
        const point = {
          x: gridMinX + x * gridSpacingX,
          y: gridMinY + y * gridSpacingY,
        };

        if (type == 'points') {
          features.push(new Feature(point));
        }

        if (type == 'boxes') {
          features.push(
            new Feature({
              x_min: point.x,
              y_min: point.y,
              x_max: point.x + gridSpacingX,
              y_max: point.y + gridSpacingY,
            }),
          );
        }
      }
    }

    this.output(features);
  }

  getParameters() {
    return [
      ...super.getParameters(),
      NodeParameter.select('grid_type')
        .withOptions(['points', 'boxes'])
        .withValue('points'),
      NodeParameter.number('grid_min_x').withValue(0),
      NodeParameter.number('grid_min_y').withValue(0),
      NodeParameter.number('grid_max_x').withValue(10),
      NodeParameter.number('grid_max_y').withValue(10),
      NodeParameter.number('grid_size_x').withDescription(
        'Ignored if grid_max_x is set',
      ),
      NodeParameter.number('grid_size_y').withDescription(
        'Ignored if grid_max_y is set',
      ),
      NodeParameter.number('grid_spacing_x').withValue(1),
      NodeParameter.number('grid_spacing_y').withValue(1),
    ];
  }
}
