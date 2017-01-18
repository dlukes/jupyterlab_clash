var buildExtension = require('@jupyterlab/extension-builder').buildExtension;

buildExtension({
        name: 'jupyterlab_clash',
        entry: './lib/plugin.js',
        outputDir: './jupyterlab_clash/static'
});
