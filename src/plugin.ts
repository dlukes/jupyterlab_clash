import {
  JupyterLab, JupyterLabPlugin
} from 'jupyterlab/lib/application';

import {
  IClash, ClashModel
} from "./";

/**
 * Initialization data for the jupyterlab_clash extension.
 */
// instead of <void>, this should be a type parameter corresponding to the type of my extension
// widget, as defined in an index.ts in this directory
const extension: JupyterLabPlugin<IClash> = {
  id: 'jupyterlab_clash',
  // stuff that's required here will be passed as additional arguments to activate below
  // requires: [IServiceManager, IPathTracker, ...]
  autoStart: true,
  activate
};

export default extension;

function activate(app: JupyterLab): IClash {
  console.log('JupyterLab extension jupyterlab_clash is activated!');
  return new ClashModel;
}
