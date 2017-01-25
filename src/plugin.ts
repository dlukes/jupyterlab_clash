import {
  JupyterLab, JupyterLabPlugin
} from "jupyterlab/lib/application"

import {
  IClash, ClashWidget
} from "."

/**
 * Initialization data for the jupyterlab_clash extension.
 */
// JupyterLabPlugin should have a type parameter corresponding to the type of my extension widget,
// as defined in an index.ts in this directory
const extension: JupyterLabPlugin<IClash> = {
  id: "cz.korpus.jupyter.extensions.clash",
  // stuff that"s required here will be passed as additional arguments to activate below
  // requires: [IServiceManager, IPathTracker, ...]
  autoStart: true,
  provides: IClash,
  activate
}

export default extension

function activate(app: JupyterLab): IClash {
  console.log("JupyterLab extension jupyterlab_clash is activated!")
  let widget = new ClashWidget
  app.shell.addToMainArea(widget)
  return widget.model
}
