import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import moment from "moment";
import { DATE_FORMAT, TIME_FORMAT } from "../helpers/constants";

const initialState = {
  disableDatepicker: false,
  showDatePickerDropdown: false,
  dateRange: {
    START_DATE: "",
    START_TIME: "",
    END_DATE: "",
    END_TIME: "",
  },
  predefinedHistoricalPeriod: "",
  selectedLappsIds: [] as string[],
  dateTimeConfigs: {
    tzOffset: "",
    dateFormat: "",
    timeFormat: "",
  },
};

export enum HIST_PERIODS_VALUES {
  TODAY = "Today",
  YESTERDAY = "Yesterday",
  THIS_WEEK = "This Week",
  LAST_WEEK = "Last Week",
  THIS_MONTH = "This Month",
  LAST_MONTH = "Last Month",
  LAST_2_MONTHS = "Last 2 Months",
  LAST_3_MONTHS = "Last 3 Months",
}

export function getUserTzPrefferedTime(tzOffset: string) {
  const [hours, minutes] = tzOffset.split(":").map(Number);
  const totalOffsetInMinutes = hours * 60 + Math.sign(hours) * minutes;
  const withOffset = moment().utcOffset(totalOffsetInMinutes);

  return withOffset;
}

export const usageDashboardSlice = createSlice({
  name: "usageDashboard",
  initialState,
  reducers: {
    setPredefinedDateRange: (
      state,
      action: PayloadAction<{ historicalPeriods: string }>,
    ) => {
      const { tzOffset } = state.dateTimeConfigs;

      if (tzOffset) {
        const { historicalPeriods } = action.payload;

        const today = getUserTzPrefferedTime(tzOffset);
        let startDate, endDate;

        switch (historicalPeriods) {
          case HIST_PERIODS_VALUES.TODAY:
            startDate = today.clone().startOf("day");
            endDate = today.clone().endOf("day");
            break;

          case HIST_PERIODS_VALUES.YESTERDAY:
            startDate = today.clone().subtract(1, "day").startOf("day");
            endDate = today.clone().subtract(1, "day").endOf("day");
            break;

          case HIST_PERIODS_VALUES.THIS_WEEK:
            startDate = today.clone().startOf("week"); // Sunday as start of the week
            endDate = today.clone().endOf("week"); // Saturday as end of the week
            break;

          case HIST_PERIODS_VALUES.LAST_WEEK:
            startDate = today.clone().subtract(1, "week").startOf("week");
            endDate = today.clone().subtract(1, "week").endOf("week");
            break;

          case HIST_PERIODS_VALUES.THIS_MONTH:
            startDate = today.clone().startOf("month");
            endDate = today.clone().endOf("month");
            break;

          case HIST_PERIODS_VALUES.LAST_MONTH:
            startDate = today.clone().subtract(1, "month").startOf("month");
            endDate = today.clone().subtract(1, "month").endOf("month");
            break;

          case HIST_PERIODS_VALUES.LAST_2_MONTHS:
            startDate = today.clone().subtract(2, "months").startOf("month");
            endDate = today.clone().endOf("month");
            break;

          case HIST_PERIODS_VALUES.LAST_3_MONTHS:
            startDate = today.clone().subtract(3, "months").startOf("month");
            endDate = today.clone().endOf("month");
            break;

          default:
            throw new Error(`Unsupported period: ${historicalPeriods}`);
        }

        // Ensure the endDate is not greater than today's end
        if (endDate.isAfter(today)) {
          endDate = today;
        }

        state.dateRange = {
          END_DATE: endDate.format(DATE_FORMAT),
          END_TIME: endDate.format(TIME_FORMAT),
          START_DATE: startDate.format(DATE_FORMAT),
          START_TIME: startDate.format(TIME_FORMAT),
        };

        state.predefinedHistoricalPeriod = historicalPeriods;
      }
    },
    setDisableDatePicker: (state, action) => {
      state.disableDatepicker = action.payload;
    },
    setCustomDateRange: (state, action) => {
      state.predefinedHistoricalPeriod = "Custom";
      state.dateRange = action.payload;
    },
    setShowDatePickerDropdown: (state) => {
      state.showDatePickerDropdown = true;
    },
    setHideDatePickerDropdown: (state) => {
      state.showDatePickerDropdown = false;
    },
    setSelectedLapps: (
      state,
      action: PayloadAction<{ key: string; value: string }[]>,
    ) => {
      const selected = action.payload;

      // if the first element key is truthy then
      // user has selected some lapp ids, else no lapp ids are selected
      if (selected[0].key) {
        state.selectedLappsIds = selected.map((s) => s.key.replace(/_1$/, ""));
      } else {
        state.selectedLappsIds = [];
      }
    },
    setDateTimeConfigs: (state, action) => {
      const { tzOffset, dateFormat, timeFormat } = action.payload;

      if (tzOffset) state.dateTimeConfigs.tzOffset = tzOffset;

      if (dateFormat) state.dateTimeConfigs.dateFormat = dateFormat;

      if (timeFormat) state.dateTimeConfigs.timeFormat = timeFormat;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPredefinedDateRange,
  setDisableDatePicker,
  setCustomDateRange,
  setShowDatePickerDropdown,
  setHideDatePickerDropdown,
  setSelectedLapps,
  setDateTimeConfigs,
} = usageDashboardSlice.actions;

export const usageDasboardReducer = usageDashboardSlice.reducer;
