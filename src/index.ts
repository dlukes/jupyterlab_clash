import { VDomModel } from "jupyterlab/lib/common/vdom"
import { Widget } from "phosphor/lib/ui/widget"
import { Token } from "phosphor/lib/core/token"

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

  // TODO: import Message and specify type of msg
  onAfterAttach(msg: any) {
    this._render()
  }

  // TODO: import Message and specify type of msg
  onBeforeDetach(msg: any) {
    delete this.node
  }

  private _render() {
    this.node.innerHTML = `<h3>Corpus Linguistics Advanced Shell</h3>
      <p>Hello, world of corpus linguistics, and prepare to be amazed!</p>
      <form>
        Query: <input type="text" name="query">
        <input type="submit" value="Search">
      </form>`
  }
}
