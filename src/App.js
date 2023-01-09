import React from "react";
import "./App.css";
import { useState } from "react";
import Update from "./Actions/Update";
import db from "./FirebaseConfig";
import firebase from "firebase/compat/app"; //import firebase
import Search from "./Components/Search";
import { useCollection, useDocument } from "react-firebase-hooks/firestore"; // imported firestore hooks

import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const App = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setAge] = useState(0);
  const [oldfirstName, setOldFirstName] = useState("");
  const [oldlastName, setOldLastName] = useState("");
  const [oldAge, setOldAge] = useState();
  const [docID, setDocID] = useState("");
  const [showDialog, setshowDialog] = useState(false);

  const [search, setSearch] = useState("");

  const addFunction = () => {
    if (firstName === "") {
      return false;
    }

    //adding data to firestore
    db.collection("users").add({
      firstname: firstName,
      lastname: lastName,
      Age: age,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), //This is the time the data is recorded. So we order the data according to timestamp
    });

    setfirstName("");
    setlastName("");
    setAge(0);
  };

  const [preview, loading, error] = useCollection(
    db.collection("users").orderBy("timestamp", "desc")
  ); // preview is users - so we're going to map on it.
  // loading represents the time it takes to fecth the data
  // error if there one

  const ShowUpdateForm = async (id) => {
    //editing data

    const result = await db.collection("users").doc(id).get();
    const data = result.data();
    setOldFirstName(data.firstname);
    setOldLastName(data.lastname);
    setOldAge(data.Age);
    setDocID(id);
    setshowDialog(true);
  };

  const updateFunction = (text) => {
    var extract = text.split(" ");

    db.collection("users").doc(docID).set(
      {
        firstname: extract[0],
        lastname: extract[1],
        Age: extract[2],
      },
      { merge: true }
    );
    setshowDialog(false);
  };

  const deleteFunction = async (id) => {
    await db.collection("users").doc(id).delete();
  };

  function RowWidget({ data, id }) {
    var username = "";
    username = data.firstname + " " + data.lastname;

    return (
      <div className="row-two">
        <div className="data">{username}</div>
        <div className="data">{data.Age}</div>
        <div className="data">
          <button className="update" onClick={() => ShowUpdateForm(id)}>
            Update
          </button>
          <button
            className="delete"
            onClick={() => {
              deleteFunction(id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {showDialog ? (
        <Update
          updateFunction={updateFunction}
          oldfirstName={oldfirstName}
          oldlastName={oldlastName}
          oldAge={oldAge}
        />
      ) : (
        <div></div>
      )}
      <h1>REACT RECAPPING</h1>
      <Search search={search} setSearch={setSearch} />
      <div className="mainContainer">
        <div className="firstName">
          <label>FirstName: </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => {
              setfirstName(e.target.value);
            }}
          />
        </div>
        <div className="lastName">
          <label>LastName: </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              setlastName(e.target.value);
            }}
          />
        </div>
        <div className="age">
          <label>Age: </label>
          <input
            type="number"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <button onClick={addFunction}>Add</button>
      </div>
      <br />
      <div className="table">
        <div className="row-one">
          <div className="data">Name</div>
          <div className="data">Age</div>
          <div className="action">Actions</div>
        </div>

        {/* { .filter((prev) => prev.toLowerCase().includes(search.toLowerCase()))} */}
        {preview?.docs.map((doc) => {
          // console.log("id:", doc?.id, "data:", doc?.data()); // here
          return (
            <>
              <RowWidget data={doc?.data()} id={doc?.id} />
            </>
          );
        })}
      </div>
    </>
  );
};

export default App;
