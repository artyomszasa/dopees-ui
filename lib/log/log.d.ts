import { PolymerElement } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-repeat';
import { LogMessageData } from 'dopees-core/lib/core';
interface LogMessageDataWithId extends LogMessageData {
    id: number;
}
export declare class DopeLog extends PolymerElement {
    messages: LogMessageDataWithId[];
    ready(): void;
    _className(severity: any): string;
}
export {};
