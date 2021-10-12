import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { EngineFactory } from '../../../../src/lib/diagram';

describe('EngineFactory', () => {
  it('can make a default engine', () => {
    expect(EngineFactory.loadOrCreate(null)).toBeInstanceOf(
      DiagramEngine,
    );
  });
});
