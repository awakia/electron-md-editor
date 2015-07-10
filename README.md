# Electron

https://github.com/seanchas116/electron-md-editor

## Docs

[slide](docs/electron-app.pdf)

## Getting Started

```
brew install node
npm install -g electron-prebuilt
```

## Run

```
electron .
```

## Packaging

```
npm install -g electron-packager
electron-packager . MarkdownEditor --platform=darwin --arch=x64 --version=0.28.3 --icon=examples.icns --overwrite
```
