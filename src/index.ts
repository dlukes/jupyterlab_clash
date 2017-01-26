import { Message } from "phosphor/lib/core/messaging"
import { Token } from "phosphor/lib/core/token"
import {
  h, VNode
} from "phosphor/lib/ui/vdom"

import {
  VDomModel, VDomWidget
} from "jupyterlab/lib/common/vdom"

const LANDSCAPE_ICON_CLASS = "jp-MainAreaLandscapeIcon"
export const CLASH_ICON_CLASS = "cl-ImageClash"

export const cmdIds = {
  showClash: "clash:show-clash"
}

export interface IClash { }

export const IClash = new Token<IClash>("cz.korpus.jupyter.extensions.clash")

export class ClashModel extends VDomModel implements IClash {
  public rendered: boolean = false
  private _query = '[lemma="kočka"]'

  get query(): string {
    return this._query
  }

  set query(newQuery: string) {
    this._query = newQuery
    this.stateChanged.emit(void 0)
  }
}

// NOTE: take inspiration from landing/widget.ts on how to implement VDomWidgets. See also
// <https://jupyterlab-tutorial.readthedocs.io/en/latest/virtualdom.html>.
export class ClashWidget extends VDomWidget<ClashModel> {
  public model: ClashModel

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

  protected onAfterAttach(msg: Message): void {
    if (!this.model.rendered) {
      this.render()
    }
  }

  protected onBeforeDetach(msg: Message): void {
    // delete this.node
  }

  protected onActivateRequest(msg: Message): void {
    this.node.tabIndex = -1
    this.node.focus()
  }

  protected render(): VNode | VNode[] {
    return h.div({},
      h.h3({}, "Corpus Linguistics Advanced Shell"),
      h.p({}, "Hello, world of corpus linguistics, and prepare to be amazed!"),
      h.form({},
        h.span({}, "Query: "),
        h.input({ type: "text", value: this.model.query }),
        h.input({
          type: "submit", value: "Search",
          onclick: (e) => {
            e.preventDefault()
            console.log("search performed")
          }
        })))
  }
}
