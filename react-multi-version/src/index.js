// use the dynamic import for faster app loading in the browser
async function begin() {
  // render the migration in progress react latest version code
  // TODO: simply the route check by adding a function of object that
  // holds all the routes, instead of multiple if checks
  if (window.location.pathname === "/UsageDashboard") {
    const app = await import("./app-react-18");
    app.renderLatest();
  }
  // old code (react 16)
  else {
    const app = await import("./App");
    app.render();
  }

  if (process.env.NODE_ENV !== "local") {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("Service Worker registered:", registration);
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error);
          });
      });
    }
  }
}

begin();

if (module.hot) {
  module.hot.accept(); // Accept updates for the current module
}
