import React from "react"
import ReactDom from "react-dom"
import Welcome from "./Welcome"
import './default.css'

import {StateProvider} from "./components/stateManagement/store"
ReactDom.render(
  <StateProvider>
    <Welcome />
  </StateProvider>,
 document.getElementById("root")
);
