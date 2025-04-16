export function usageReport(state, action) {
  switch (action.type) {
    case usageReportActions.SET_GLOBAL_LOADER: {
      const stateRelica = { ...state };
      stateRelica.showGlobalLoader = action.loaderStatus;
      return stateRelica;
    }
    case usageReportActions.SET_USAGE_REPORT_ERROR: {
      const stateRelica = { ...state };
      stateRelica.usageReportError = action.errorMessage;
      return stateRelica;
    }

    case usageReportActions.SET_VIEW_TYPE: {
      const stateRelica = { ...state };
      stateRelica.viewType = action.viewType;
      return stateRelica;
    }
  }
}
