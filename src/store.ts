import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { WebsocketProvider } from "y-websocket";
import { reactive } from 'vue'

import { enableVueBindings } from '@syncedstore/core';
import * as Vue from "vue";
import { DocTypeDescription } from "@syncedstore/core/types/doc";

export interface Cell {
  value: string;
  style: Object;
  override?: boolean;
}

export interface Row {
  cells: Cell[];
}

export interface Column {
  name?: string;
  width: string;
}


export interface Grid {
  columns: Column[];
  rows: Row[];
}

export interface Table {
  name: string;
  startIndexY: number;
  startIndexX: number;
  grid: Grid;
}
export interface Block {
  name: string;
  startIndexY: number;
  startIndexX: number;
}

export interface Page {
  name: string;
  grid: Grid;
  tables: Table[];
  blocks: Block[];
}
export interface blockDefinition {
  name: string;
  grid: Grid;
}
export interface SpreadsheetStore extends DocTypeDescription {
  pages: Page[];
  blockDefinitions: blockDefinition[];
};

// Create your SyncedStore store
export const store = syncedStore<SpreadsheetStore>({
  pages: [],
  blockDefinitions: []
});


export const state = reactive({
  sidebarHidden: true,
  sidebarWidth: 200,
  currentPageIndex: 0,
})


// Enable Vue bindings for the SyncedStore store
enableVueBindings(Vue);
// Create a document that syncs automatically using Y-WebRTC
const doc = getYjsDoc(store);
export const websocketProvider = new WebsocketProvider("ws://instrumenta.cf:1889", "syncedstore-todos", doc, { params: { password: "test" } });

export const disconnect = () => websocketProvider.disconnect();
export const connect = () => websocketProvider.connect();