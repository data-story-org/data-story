import { SerializedDiagram } from '@data-story-org/core'

export interface SerializedReactDiagram extends SerializedDiagram {
  id: string;
  offsetX: number;
  offsetY: number;
  zoom: number;
  gridSize: number;
  layers: any[];
  locked: boolean;
  version: string;
};