<img src="https://user-images.githubusercontent.com/3457668/117117786-3d48a900-ad90-11eb-91eb-520f7919d7fa.png">

_Visual programming | Process design | Workflows | ETL | Data manipulation_

:point*right: This repo provides the \_data-story* for DataStory. See also:

[data-story-org/core](https://github.com/data-story-org/core)

[data-story-org/x-to-y](https://github.com/data-story-org/x-to-y)

[Demo](https://data-story-org.github.io/data-story)

## Installation and usage in react app

```sh
yarn add @data-story-org/data-story
```

```js
import { DataStory } from '@data-story-org/data-story';
import '@data-story-org/data-story/lib/styles/app.css';

const someComponent = () => {
  return <DataStory />;
};
```

> :warning: **Using React.StrictMode with data-story-org/data-story in development mode will provoke a lot of useless errors**
> see [projectstorm/react-diagrams#598](https://github.com/projectstorm/react-diagrams/issues/598#issuecomment-635924991)

> as temporally fix you can either disable React.StrictMode or enable it only for production builds

## Development

See [contributing](contributing.md) for setuping seamless development environment for core and data-story.

## Hotkeys

| Hotkey   |       Action       |
| -------- | :----------------: |
| ALT+D    |   Go to diagram    |
| ALT+I    |  Go to Inspectors  |
| ALT+J    | Go to diagram JSON |
| ALT+O    |        open        |
| ALT+PLUS |      Add node      |
| ALT+R    |    Run diagram     |
| ALT+S    |        save        |
