# DataStory ⚡ visual programming

![tests](https://github.com/ajthinking/data-story/workflows/tests/badge.svg)
![proofofconcept](https://img.shields.io/badge/proof%20of%20concept-gold)
<!--![version](https://img.shields.io/packagist/v/ajthinking/data-story?color=blue)-->


DataStory provides a workbench for designing data flow diagrams.

![image](https://user-images.githubusercontent.com/3457668/117117786-3d48a900-ad90-11eb-91eb-520f7919d7fa.png)

## Live Demo
[Here](https://ajthinking.github.io/data-story/). Press the *open* icon for a couple of examples.

## Development Installation
* Clone it
* Run `yarn && yarn watch`
* Serve app from `public/index.html`

## Available default nodes
```
Clone_,
Comment,
Create,
CreateAttribute,
CreateGrid,
CreateJSON,
CreateSequence,
DeleteRepositories,
DownloadJSON,
DownloadGeoJSON,
Evaluate,
FilterDuplicates,
Flatten,
HTTPRequest,
Inspect,
Log,
Map,
OutputProvider,
RegExpFilter,
Repositories,
Sleep,
ThrowError,
```

## Add node
You may run the following command
```
yarn add-node YourNodeName
```

This will create a new `ServerNode` class along with a test stub. Then you need to manually register it in `ServerNodeFactory`.

Run tests with
```
yarn test --watch
```

## Nodejs server [WIP]
Repository: [ajthinking/ds-server](https://github.com/ajthinking/ds-server)
Deployed at [heroku](https://data-story-server.herokuapp.com/)

## Hotkeys (MAC)

| Hotkey        | Action           |
| ------------- |:-------------:|
| ALT+D                 | Go to diagram |
| ALT+T                 | Go to inspectors |
| ALT+PLUS              | Add node |
| ALT+R                 | Run diagram |
| SHIFT+click on link   | Select link |

<hr>

## Acknowledgements
Thanks to Dylan & [projectstorm/react-diagrams](https://github.com/projectstorm/react-diagrams)

## License
MIT
