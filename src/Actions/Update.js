import React, { useState } from "react";
import "./Update.css";

function Update(props) {
  const fName = props.updateFname;
  const lName = props.updateLname;
  const aage = props.updateAge;

  const [firstName, setFirstName] = useState(`${fName}`);
  const [lastName, setLastName] = useState(`${lName}`);
  const [age, setAge] = useState(`${aage}`);

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
                  props.updateDismiss(text, props.index);
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
