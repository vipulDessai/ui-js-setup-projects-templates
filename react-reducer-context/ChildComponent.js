import {
  useUsageReportStore,
} from "./_reducers";

export function CumulativeChart({}) {
  const [usageReportState, dispatch] = useUsageReportStore();
  return (
    <>
      {/* do something with usageReportState */}
    </>
  );
}
