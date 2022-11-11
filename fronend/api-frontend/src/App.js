import React from "react";
import User from "./user/User";
import UserModify from "./user/UserModify";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App(props) {
  return (
    <div>
      <Router>
        <Route exact path="/common/assignments" element={<User {...props} />} />
        <Route
          path="/common/users/new"
          element={<UserModify {...props} purpose="new" />}
        />
        <Route
          path="/common/users/:id/edit"
          element={<UserModify {...props} purpose="edit" />}
        />
      </Router>
    </div>
  );
}

export default App;
