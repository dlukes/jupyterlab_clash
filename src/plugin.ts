import { ILauncher } from "jupyterlab/lib/launcher"
import { ICommandPalette } from "jupyterlab/lib/commandpalette"
import { IInstanceRestorer } from "jupyterlab/lib/instancerestorer"

import {
  JupyterLab, JupyterLabPlugin
} from "jupyterlab/lib/application"

import {
  IClash, ClashWidget, cmdIds, CLASH_ICON_CLASS
} from "."

import "./index.css"

/**
 * Initialization data for the jupyterlab_clash extension.
 */
// JupyterLabPlugin should have a type parameter corresponding to the type of my extension widget,
// as defined in an index.ts in this directory
const extension: JupyterLabPlugin<IClash> = {
  id: "cz.korpus.jupyter.extensions.clash",
  // stuff that"s required here will be passed as additional arguments to activate below
  requires: [ILauncher, ICommandPalette, IInstanceRestorer],
  autoStart: true,
  provides: IClash,
  activate
}

export default extension

function activate(app: JupyterLab, launcher: ILauncher, palette: ICommandPalette, restorer: IInstanceRestorer): IClash {
  console.log("JupyterLab extension jupyterlab_clash is activated!")

  let widget = new ClashWidget()

  restorer.add(widget, "clash")

  function showClash(): void {
    app.shell.addToMainArea(widget)
    app.shell.activateMain(widget.id)
  }

  app.commands.addCommand(cmdIds.showClash, {
    execute: showClash,
    label: "Show Clash"
  })
  palette.addItem({ command: cmdIds.showClash, category: 'Help' });

  launcher.add({
    name: "Clash",
    command: cmdIds.showClash,
    imgClassName: CLASH_ICON_CLASS
  })

  showClash()
  return widget.model
}
