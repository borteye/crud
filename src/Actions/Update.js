import React, { useState } from "react";
import "./Update.css";

function Update({ updateFunction, oldfirstName, oldlastName, oldAge }) {
  const [firstName, setFirstName] = useState(oldfirstName);
  const [lastName, setLastName] = useState(oldlastName);
  const [age, setAge] = useState(oldAge);

  return (
    <>
      <div className="container">
        <div className="overlay">
          <div className="content">
            <h2>Update</h2>
            <div className="mainContainer">
              <div className="firstName">
                <label>FirstName: </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="lastName">
                <label>LastName: </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
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
              <button
                onClick={() => {
                  const text = firstName + " " + lastName + " " + age;
                  updateFunction(text);
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Update;

//delete single document using react-firebase-hooks?
