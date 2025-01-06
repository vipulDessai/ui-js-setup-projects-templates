import React, { useState, Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import queryString from "query-string";

function App({ }) {
  return (
    <section>This is React 16 App</section>
  )
}

export function render() {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.querySelector("#root"),
  );
}
