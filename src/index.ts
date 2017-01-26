import { Message } from "phosphor/lib/core/messaging"
import { Widget } from "phosphor/lib/ui/widget"
import { Token } from "phosphor/lib/core/token"

import { VDomModel } from "jupyterlab/lib/common/vdom"

const LANDSCAPE_ICON_CLASS = "jp-MainAreaLandscapeIcon"
export const CLASH_ICON_CLASS = "cl-ImageClash"

export
const cmdIds = {
  showClash: "clash:show-clash"
}

export
interface IClash { }

export
const IClash = new Token<IClash>("cz.korpus.jupyter.extensions.clash")

export
class ClashModel extends VDomModel implements IClash { }

// NOTE: take inspiration from landing/widget.ts on how to implement this as a VDomWidget
export class ClashWidget extends Widget {
  model: ClashModel

  constructor() {
    super()
    // NOTE: in the JupyterLab codebase (e.g. in the launcher plugin.ts), I've seen places where the
    // model is created separately and then slapped onto the widget -- perhaps there's a good reason
    // for that?
    this.model = new ClashModel()
    this.id = "jupyterlab_clash_unique_id"
    this.title.label = "Clash"
    this.title.closable = true
    this.title.icon = `${LANDSCAPE_ICON_CLASS} ${CLASH_ICON_CLASS}`;
  }

  protected onAfterAttach(msg: Message) {
    this._render()
  }

  protected onBeforeDetach(msg: Message) {
    // delete this.node
  }

  protected onActivateRequest(msg: Message): void {
    this.node.tabIndex = -1
    this.node.focus()
  }

  private _render() {
    if (!this.node.innerHTML) {
      this.node.innerHTML = `<h3>Corpus Linguistics Advanced Shell</h3>
        <p>Hello, world of corpus linguistics, and prepare to be amazed!</p>
        <form>
          Query: <input type="text" name="query">
          <input type="submit" value="Search">
        </form>`
    }
  }
}
