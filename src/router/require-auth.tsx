import React, { useState, FC, ReactNode } from "react18";
import { useNavigate, useLocation } from "react18-router";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";

import { LazyLoaderComponent } from "../components/shared/mx-controls/lsq-lazy-loader-fallback";
import { useInit } from "../hooks/useInit";
import authenticationUtility from "../helpers/autentication";
import configProvider from "../helpers/configProvider";
import { ROOT_STORE_TYPE, setDateTimeConfigs } from "../reducer";
import { pendoScriptHookGenerator } from "../hooks/usePendoScript";
import { UnauthorizedScreen } from "../components/shared/mx-controls/unauthorized-screen";
import { setAuthData } from "../reducer/authentication.slice";
import { appInit } from "../App";

const CURRENT_PAGE_REACT_VERSION = "18";

const usePendoScript = pendoScriptHookGenerator(CURRENT_PAGE_REACT_VERSION);

const UnauthorizedScreenComponent = UnauthorizedScreen(
  CURRENT_PAGE_REACT_VERSION,
);

interface REQUIRE_AUTH_TYPE {
  children: ReactNode;
}

export const RequireAuth: FC<REQUIRE_AUTH_TYPE> = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const authUserData = useSelector(
    (state: ROOT_STORE_TYPE) => state.auth.userAuthData,
  );
  const [isLoading, setIsLoading] = useState(true);

  // TODO: check if the error is coz of unauthentication
  // and if so then redirect, this can be used on action such as button click etc
  const navigate = useNavigate();

  usePendoScript(authUserData.success);

  useInit(async () => {
    setIsLoading(true);
    try {
      const params = queryString.parse(location.search);
      appInit(params);

      const authDataRes = await authenticationUtility.getAuthKey();

      if (typeof authDataRes === "string") {
        dispatch(
          setDateTimeConfigs({
            dateFormat: configProvider.get("DATE_FORMAT"),
          }),
        );

        dispatch(
          setAuthData({
            success: true,
            data: authDataRes,
          }),
        );
      } else {
        throw {
          message: "Invalid token",
        };
      }
    } catch (error) {
      let message = "Something went wrong";

      if (error instanceof Error) {
        message = error.message;
      }

      dispatch(
        setAuthData({
          success: false,
          data: message,
        }),
      );

      // TODO: check if the error is coz of unauthentication
      // and if so then redirect
      // navigate("/unauthorized");
    }
    setIsLoading(false);
  });

  if (isLoading) {
    return LazyLoaderComponent(CURRENT_PAGE_REACT_VERSION);
  } else {
    if (authUserData.success) {
      return children; // Render the protected component if authenticated
    } else {
      return UnauthorizedScreenComponent;
    }
  }
};
