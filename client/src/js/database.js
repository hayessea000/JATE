
import { openDB } from 'idb';

const DB_jate = "jate"

const initdb = async () =>
  openDB(DB_jate, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_jate)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(DB_jate, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const holdDB = await openDB(DB_jate, 1);

  const textVar = holdDB.transaction(DB_jate, 'readwrite');

  const storeVar = textVar.objectStore(DB_jate);

  const request = storeVar.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

/*
  We need to add some code below which will get all content from IndexedDB.
*/
export const getDb = async () => {
  // You can duplicate the same lines of code from above, except that the transaction will be 'readonly'
  
  // TODO: Copy LINES 28, 31 and 34 above; the new line 31 code should be "readonly"

  // Leave the rest as-is
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();
