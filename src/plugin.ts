import { ILauncher } from "jupyterlab/lib/launcher"
import { ICommandPalette } from "jupyterlab/lib/commandpalette"
import { InstanceTracker } from "jupyterlab/lib/common/instancetracker"
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

  const category = "Help"
  const command = cmdIds.showClash
  const tracker = new InstanceTracker<ClashWidget>({ namespace: "clash" })

  // TODO: pass the app object to the ClashWidget constructor if you need to wire the two together
  let widget = new ClashWidget()
  restorer.restore(tracker, {
    command,
    args: () => null,
    name: () => "clash"
  })
  tracker.add(widget)

  function showClash(): void {
    app.shell.addToMainArea(widget)
    app.shell.activateMain(widget.id)
  }

  app.commands.addCommand(command, {
    execute: showClash,
    label: "Show Clash"
  })
  palette.addItem({ command, category });

  launcher.add({
    name: "Clash",
    command,
    imgClassName: CLASH_ICON_CLASS
  })

  // when restoring the app, if the user has (accidentally?) closed all tabs, show at least clash
  app.restored.then(() => {
    if (app.shell.mainAreaIsEmpty) {
      showClash()
    }
  })
  // if clash (or any other tab) is shown by default on startup, the Landing page with the launcher
  // won't be shown
  showClash()
  return widget.model
}
