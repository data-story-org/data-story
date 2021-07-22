# Contributing

## Local development

To have seamless experience of developing [data-story-org/core](https://github.com/data-story-org/core) with [data-story-org/gui](https://github.com/data-story-org/gui) in your local environment you have to setup some things:

- Right directories structure
- Git filters to exclude locally linked core dependency from version control

The most usable and correct folder structure will be

```sh
data-story
├── core
└── gui
```

Then in gui you most likely want to change dependency on core repo to your local copy of it, so

```json
"@data-story-org/core": "link:../core",
```

To make git ignore those change and don't cause unnecessary headache let's setup our filters

```sh
git config  filter.changeToGitVersion.clean 'sed "s/\"@data-story-org\/core\": .*/\"@data-story-org\/core\": \"data-story-org\/core#master\",/"'
git config  filter.changeToGitVersion.smudge 'sed "s/\"@data-story-org\/core\": .*/\"@data-story-org\/core\": \"link:..\/core\",/"'
git config  filter.changeToGitVersion.required true
```

That's all, now it's possible to develop core and gui freely
