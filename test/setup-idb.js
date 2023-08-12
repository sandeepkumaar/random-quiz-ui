//import "fake-indexeddb/auto";
import * as fakeIndexedDB  from "fake-indexeddb";
import { indexedDB, IDBKeyRange } from "fake-indexeddb";


let idbMethods = [
    "indexedDB",
    "IDBCursor",
    "IDBCursorWithValue",
    "IDBDatabase",
    "IDBFactory",
    "IDBIndex",
    "IDBKeyRange",
    "IDBObjectStore",
    "IDBOpenDBRequest",
    "IDBRequest",
    "IDBTransaction",
    "IDBVersionChangeEvent",
];

const registered = [];

export default function setupIndexedDB() {
  if (registered.length) {
    throw new Error('Failed to register. Fake IndexedDB is already registered');
  };
  for(const idbMethod of idbMethods) {
    global[idbMethod] =  fakeIndexedDB[idbMethod];
    registered.push(idbMethod);
  };
  let { IDBFactory } = fakeIndexedDB;
  //global.indexedDB = new IDBFactory(); // for fresh indexedDb on every test
  return unregister;
};

export function unregister() {
  if (!registered.length) {
    throw new Error(
      'Failed to unregister. Fake IndexedDB has not previously been globally registered.'
    );
  };	
  while (registered.length) {
    const key = registered.pop();
    delete global[key];
  }

};

