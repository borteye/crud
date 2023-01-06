import "./App.css";
import React, { useState } from "react";
import Update from "./Actions/Update";
import Search from "./Components/Search";
import { db } from "./FirebaseConfig";
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

function App() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setAge] = useState(0);
  const [updateFname, setUpdateFname] = useState("");
  const [updateLname, setUpdateLname] = useState("");
  const [updateAge, setUpdateAge] = useState();
  const [preview, setPreview] = useState([]);
  const [updateData, setUpdateData] = useState("");
  const [showDialog, setshowDialog] = useState(false);
  const [dialogData, setdialogData] = useState("");
  const [dialogCurrentIndex, setdialogCurrentIndex] = useState("");
  const [search, setSearch] = useState("");

  const addFunction = () => {
    if (firstName === "") {
      return;
    }
    const colRef = collection(db, "users");
    addDoc(colRef, {
      firstname: firstName,
      lastname: lastName,
      Age: age,
    });

    onSnapshot(colRef, (snapshot) => {
      setPreview(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    setfirstName("");
    setlastName("");
    setAge(0);
  };
  const updateFunction = (id) => {
    const docRef = doc(db, "users", id);
    onSnapshot(docRef, (doc) => {
      const info = doc.data();
      console.log(info);
      setUpdateFname(info.firstname);
      setUpdateLname(info.lastname);
      setUpdateAge(info.Age);
    });
    console.log(updateData);
    setshowDialog(true);
  };

  const updateDismissFunction = (data, index) => {
    const myList = preview;
    myList[index] = data;
    setPreview(myList);
    console.log(myList);
    setfirstName("");
    setshowDialog(false);
  };

  const deleteFunction = (id) => {
    const docRef = doc(db, "users", id);

    deleteDoc(docRef);
  };

  function RowWidget({ data }) {
    var username = "";
    // var age = "";
    // var extract = data.split(" ");
    username = data.firstname + " " + data.lastname;
    // age = extract[2];

    return (
      <div className="row-two">
        <div className="data">{username}</div>
        <div className="data">{data.Age}</div>
        <div className="data">
          <button className="update" onClick={() => updateFunction(data.id)}>
            Update
          </button>
          <button
            className="delete"
            onClick={() => {
              deleteFunction(data.id);
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
          updateFname={updateFname}
          updateLname={updateLname}
          updateAge={updateAge}
          data={dialogData}
          index={dialogCurrentIndex}
          updateDismiss={updateDismissFunction}
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
        {preview.map((data) => {
          console.log(data.id);
          return (
            <>
              <RowWidget data={data} />
            </>
          );
        })}
      </div>
    </>
  );
}

export default App;
