import React, { Fragment, useEffect } from "react";
import { openDB, deleteDB, wrap, unwrap } from "idb";
import axios from "axios";
import table_heads from "../../dictionary/table_heads.json";

const Idb_test = () => {
  var exp_data_json = [];

  const getData = async (api_url, db_suffix) => {
    try {
      console.log("getting data...");
      const res = await axios.get(api_url);
      console.log(res.data);

      //jsonify data
      res.data.map((d, i) => {
        const entryObj = {};
        d.map((entry, index) => {
          entryObj[table_heads.table_heads[index]] = entry;
        });
        exp_data_json.push(entryObj);
      });
      createIndexDB(db_suffix);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData(
      "http://13.126.189.78/api/detail_exp_test?start=2018-8-01&end=2018-11-30",
      "_"
    );
  }, []);

  //indexdb code
  const createIndexDB = db_suffix => {
    console.log(exp_data_json);

    const customerData = [
      { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
      { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
    ];

    const dbName = "hp_fiscal_idb";

    var request = indexedDB.open(dbName, 2);

    request.onerror = function(event) {
      // Handle errors.
    };
    request.onupgradeneeded = function(event) {
      var db = event.target.result;

      // Create an objectStore to hold information about our customers. We're
      // going to use "ssn" as our key path because it's guaranteed to be
      // unique - or at least that's what I was told during the kickoff meeting.
      var objectStoreName = "exp_data" + db_suffix;

      var objectStore = db.createObjectStore(objectStoreName, {
        keyPath: "id",
        autoIncrement: true
      });

      // Create an index to search customers by name. We may have duplicates
      // so we can't use a unique index.
      objectStore.createIndex("demand", "demand", { unique: false });
      objectStore.createIndex("major", "major", { unique: false });
      objectStore.createIndex("submajor", "submajor", { unique: false });
      objectStore.createIndex("minor", "minor", { unique: false });
      objectStore.createIndex("subminor", "subminor", { unique: false });

      // Use transaction oncomplete to make sure the objectStore creation is
      // finished before adding data into it.
      objectStore.transaction.oncomplete = function(event) {
        // Store values in the newly created objectStore.
        var expDataObjectStore = db
          .transaction(objectStoreName, "readwrite")
          .objectStore(objectStoreName);
        exp_data_json.forEach(function(exp_line) {
          expDataObjectStore.add(exp_line);
        });
      };
    };
  };

  return <Fragment>Hello</Fragment>;
};
export default Idb_test;
