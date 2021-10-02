import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { EngineFactory } from '../../../../src/lib/diagram';
// import { DiagramBuilder } from '@data-story-org/core'

describe('EngineFactory', () => {
  it('can make a default engine', () => {
    expect(EngineFactory.loadOrCreate(null)).toBeInstanceOf(
      DiagramEngine,
    );
  });

  // it('can make a engine with headless model', () => {
  // 	const diagram = DiagramBuilder.begin()/* add some nodes here */.finish()
  // 	const serializedDiagram = diagram.serialize()
  // 	const engine = EngineFactory.loadOrCreate(serializedDiagram)

  //   expect(engine).toBeInstanceOf(DiagramEngine)
  // });
});
