import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { WebsocketProvider } from "y-websocket";

export type Cell = { value: string };
export type Row = Cell[];
export type SpreadsheetStore = {
  rows: Row[];
};

// Create your SyncedStore store
export const store = syncedStore<SpreadsheetStore>({
  rows: [],
});

// Create a document that syncs automatically using Y-WebRTC
const doc = getYjsDoc(store);
export const websocketProvider = new WebsocketProvider("ws://instrumenta.cf:1889", "syncedstore-todos", doc, { params: { password: "test" } });

export const disconnect = () => websocketProvider.disconnect();
export const connect = () => websocketProvider.connect();

export default store;