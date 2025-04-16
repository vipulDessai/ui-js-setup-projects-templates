import { usageReport } from "./_reducers/usage-report.reducer";

function App(params) {
  const initialUsageReportState = {};

  const [usageReportState, dispatch] = useReducer(
    usageReport,
    initialUsageReportState,
  );

  return (
    <UsageStoreProvider
      reducerData={[usageReportState, dispatch]}
    ></UsageStoreProvider>
  );
}
