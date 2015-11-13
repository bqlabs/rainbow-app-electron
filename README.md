![][rainbow]

Web client interface for [rainbow](https://github.com/bqlabs/rainbow) servers.

## Build & development

Install `nodejs` and all the project's dependencies `npm install` and `bower install`.
Run `grunt` for building and `grunt serve` for preview.

### Electron

Also you can use `grunt electron` to generate an [electron](https://github.com/atom/electron) distribution.

```bash
npm -g install electron-prebuilt
```

#### Run application

```bash
cd electron
npm install
electron .
```

#### Build packages

[electron-packager](https://github.com/maxogden/electron-packager) is used to build the packages.

```bash
npm -g install electron-packager
```

```bash
electron-packager electron Rainbow --platform=linux --arch=x64 --version=0.28.2
```

## Testing

Running `grunt test` will run the unit tests with karma.

[rainbow]: doc/images/rainbow.png
