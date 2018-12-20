import { PolymerElement } from '@polymer/polymer/polymer-element';
import { customElement, property } from '@polymer/decorators/lib/decorators';
import '@polymer/polymer/lib/elements/dom-repeat';
import { LogMessageData, onMessage } from 'dopees-core/lib/core';

interface LogMessageDataWithId extends LogMessageData {
  id: number;
}

let sup = 0;

const nextId = () => {
  const id = sup;
  sup = sup + 1;
  return id;
}

@customElement('dope-log')
export class DopeLog extends PolymerElement {

  @property({ type: Array, notify: true })
  messages: LogMessageDataWithId[] = [];

  ready () {
    super.ready();
    onMessage(data => {
      const msg = <LogMessageDataWithId>data;
      msg.id = nextId();
      this.push('messages', msg);
      window.setTimeout(() => {
          const index = this.messages.findIndex(m => msg.id === m.id);
          this.splice('messages', index, 1);
      }, 6000);
    })
  }
  _className (severity) {
      return `message ${severity}`;
  }
}