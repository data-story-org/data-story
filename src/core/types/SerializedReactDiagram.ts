import {
  SerializedDiagram,
  SerializedLink,
  SerializedNode,
} from '@data-story-org/core';

export interface SerializedReactDiagram
  extends SerializedDiagram {
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
}
