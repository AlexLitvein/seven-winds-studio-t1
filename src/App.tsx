import React from "react";
import "./App.scss";
import { Header } from "./components/header";

function App() {
  return (
    <div className="App">
      {/* <Header></Header> */}
      <ul className="tree">
        <li>
          <div>root</div>
          <ul>
            <li>
              <div>0</div>
              <ul>
                <li>
                  <div>1</div>
                </li>
                <li>
                  <div>2</div>
                </li>
                <li>
                  <div>3</div>
                </li>
              </ul>
            </li>
            <li>
              <div>4</div>
            </li>
            <li>
              <div>5</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default App;
