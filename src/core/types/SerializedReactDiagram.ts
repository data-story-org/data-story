import { SerializedDiagram } from '@data-story-org/core'
import { SerializedLink } from '../../../../core/lib/src/types/SerializedLink';
import { SerializedNode } from '../../../../core/lib/src/types/SerializedNode';

export interface SerializedReactDiagram extends SerializedDiagram {
  id: string;
  offsetX: number;
  offsetY: number;
  zoom: number;
  gridSize: number;
  layers: any[];
	links: SerializedLink[];
	nodes: SerializedNode[];
  locked: boolean;
  version: string;
};