import { Story as DefaultStory } from '@data-story-org/core';
import { SerializedReactDiagram } from './SerializedReactDiagram';

export type Story = DefaultStory<SerializedReactDiagram>;

export type DemoStory = DefaultStory;

export type GenericStory = Story | DemoStory;
