import React from "react";

const Store = React.createContext();
Store.displayName = "usage-report-store";

export const useUsageReportStore = () => React.useContext(Store);

export const UsageStoreProvider = ({ children, reducerData }) => {
  return <Store.Provider value={reducerData}>{children}</Store.Provider>;
};
