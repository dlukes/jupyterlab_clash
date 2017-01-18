import {
  JupyterLabPlugin
} from 'jupyterlab/lib/application';

/**
 * Initialization data for the jupyterlab_clash extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_clash',
  autoStart: true,
  activate: (app) => {
    console.log('JupyterLab extension jupyterlab_clash is activated!');
  }
};

export default extension;
