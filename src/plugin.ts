// TODO: clean up these imports based on what I actually end up using
import {
  TerminalSession, Kernel, KernelMessage, Session
} from "@jupyterlab/services"

import { IServiceManager } from "jupyterlab/lib/services"
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
  requires: [IServiceManager, ILauncher, ICommandPalette, IInstanceRestorer],
  autoStart: true,
  provides: IClash,
  activate
}

export default extension

function activate(app: JupyterLab, services: IServiceManager, launcher: ILauncher, palette: ICommandPalette, restorer: IInstanceRestorer): IClash {
  console.log("JupyterLab extension jupyterlab_clash is activated!")

  const category = "Help"
  const command = cmdIds.showClash
  const tracker = new InstanceTracker<ClashWidget>({ namespace: "clash" })
  // TODO: wrap this up or get rid of it (see inspiration in console/plugin.ts)
  const manager = services.sessions

  // TODO: starting a kernel, connecting to it, etc. -- see
  // <https://github.com/jupyterlab/services> and also outputarea/model.ts#execute. Once started, a
  // NotebookPanel widget has a kernel property which allows manipulating the kernel. Here's how to
  // manipulate and execute cells:
  //
  // // use first cell in notebook
  // cell = ntbPanel.notebook.widgets.at(0)
  // // or create a new one
  // cell = ntbPanel.model.contentFactory.createCodeCell({ cell: { source: ["hooray", "yay"], metadata: {} } })
  // cellMaxIndex = ntbPanel.model.cells.insert(0, cell)
  // cell.model.value.text = "42"
  // cell.execute(ntbPanel.kernel)
  //
  // After execution, anyone who's listening on the kernel's IOPub socket will get notified about
  // the result. Dig around in notebook/actions.ts (like insertBelow) for more treasures, and hook
  // into the notebook creation code in notebook/plugin.ts, store the notebook on window and play
  // around with them interactively in the browser console.
  Session.startNew({ kernelName: "python3", path: "clash" }).then(session => {
    // for playing with the kernel from the browser console
    ;(window as any).mykern = session.kernel
    let future = session.kernel.requestExecute({ code: `"Hello, kernel! I'm Clash, nice to meet you :)"` })
    future.onDone = () => {
      console.log("future is fulfilled")
    }
    future.onIOPub = (msg) => {
      console.log(msg)
    }
    session.terminated.connect(() => {
      console.log("clash-kernel session died")
    })
  })

  // TODO: get rid of this, it's kind of a demo on how to start a terminal session and send some
  // input to it, but I can't get it to evaluate (though the text does appear in the terminal widget
  // when you open it from the Running sidebar tab)
  ;(window as any).tsession = () => {
    TerminalSession.startNew().then(session => {
      session.send({ type: "stdin", content: ["echo foo"] })
    }).then(value => console.log(value))
  }

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
