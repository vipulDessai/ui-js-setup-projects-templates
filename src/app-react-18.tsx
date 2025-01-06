import React, { Suspense, StrictMode } from "react18";
import { createRoot } from "react18-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLoaderData,
} from "react18-router";

// imported for additional packages like datepicker etc
import "jquery-ui-dist/jquery-ui";

import "./styles/index.css";

import { useInit } from "./hooks/useInit";
import {
  rootloader,
  RoutingErrorPage,
  RequireAuth,
  UnauthorizedPage,
} from "./router";
import { LazyLoaderComponent } from "./components/shared/mx-controls/lsq-lazy-loader-fallback/";
import commonUtility from "./helpers/common";
import { store } from "./reducer";
import { ShowSimpleNotification } from "./components/shared/mx-controls/show-simple-notification/ShowSimpleNotification";

const UsageDashboard = React.lazy(
  () => import("./components/usage-dashboard/usage-dashboard"),
);
const RenderedLazyLoader = LazyLoaderComponent("18");

function Root() {
  // Use the rootLoaderData if common data needs to be fetched
  const rootLoaderData = useLoaderData();

  useInit(() => {
    commonUtility.removeLoadingIconFromParent();
  });

  return (
    <section className="lapps-ui-react-latest">
      <Outlet />
    </section>
  );
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <RoutingErrorPage />,
      loader: rootloader,
      children: [
        {
          path: "UsageDashboard",
          element: (
            <RequireAuth>
              <Suspense fallback={RenderedLazyLoader}>
                <UsageDashboard />
              </Suspense>
            </RequireAuth>
          ),
        },
        {
          // use UnauthorizedScreen
          path: "unauthorized",
          element: <UnauthorizedPage />,
        },
      ],
    },
  ],
  {
    // options to migrate from react router dom v6 to v7
    future: {
      v7_relativeSplatPath: true,
    },
  },
);

export function renderLatest() {
  // #root is core of the application, it will be always available
  const root = createRoot(document.getElementById("root") as HTMLElement);

  // TODO: Add strictmode here
  root.render(
    <StrictMode>
      <Provider store={store}>
        <ShowSimpleNotification />
        {/* TODO: check why the router component throws error
         * that the component is not a valid JSX element
         * remvoe the below @ts-ignore to get the error
         * also need to migrate the router to v7 - https://reactrouter.com/upgrading/v6
         */}
        {/* @ts-ignore */}
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </Provider>
    </StrictMode>,
  );
}
