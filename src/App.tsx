import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import * as Sentry from "@sentry/react";
import Users from "./User";

function App() {
  const user = {
    id: 1,
    username: "runningwater",
  };
  return (
    <div>
      <h1>Sentry Test</h1>
      <Sentry.ErrorBoundary fallback={<p>error occurred:(</p>}>
        <Users user={user} />
      </Sentry.ErrorBoundary>
    </div>
  );
}

export default App;
