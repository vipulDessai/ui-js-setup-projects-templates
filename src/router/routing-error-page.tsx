import React from "react";
import { useRouteError } from "react18-router";

export function RoutingErrorPage() {
  const error = useRouteError();

  return (
    <section className="routing-error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </section>
  );
}
