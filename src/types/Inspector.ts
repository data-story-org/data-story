export type InspectorMode = 'Table' | 'JSON';

export interface Inspector {
  nodeId: number;
  mode: InspectorMode;
}
