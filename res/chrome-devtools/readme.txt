https://github.com/atom/electron/blob/master/docs/tutorial/devtools-extension.md

to load a chrome extension like angularjs-inspector:

require('remote').require('browser-window').addDevToolsExtension('res/chrome-devtools/angularjs-inspector');
