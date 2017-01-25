import {
  VDomModel
} from "jupyterlab/lib/common/vdom";
import { Widget } from 'phosphor/lib/ui/widget';

export
interface IClash { }

export
class ClashModel extends VDomModel implements IClash {}

export class ClashWidget extends Widget {

  constructor() {
    super()
    this.id = "jupyterlab_clash_unique_id"
    this.title.label = "Clash"
    this.title.closable = true
  }

  // TODO: import Message and specify type of msg
  onAfterAttach(msg: any) {
    this._render()
  }

  // TODO: import Message and specify type of msg
  onBeforeDetach(msg: any) {
    delete this.node
  }

  _render() {
    this.node.innerHTML = `<h3>Corpus Linguistics Advanced Shell</h3>
      <p>Hello, world of corpus linguistics, and prepare to be amazed!</p>`
  }
}
