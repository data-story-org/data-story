export const INSPECTOR_MODES = ['Table', 'JSON', 'Canvas'] as const;
type ModesTuple = typeof INSPECTOR_MODES;
export type InspectorMode = ModesTuple[number];
// type InspectorMode = 'Table' | 'JSON';

export interface Inspector {
  nodeId: number;
  mode: InspectorMode;
}
