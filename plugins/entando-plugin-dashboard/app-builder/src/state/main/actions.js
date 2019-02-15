import {getRoute, getParams, getSearchParams, gotoRoute} from "@entando/router";
import {addToast, addErrors, TOAST_ERROR} from "@entando/messages";
import {formattedText} from "@entando/utils";
import {formValueSelector} from "redux-form";

import {getPageConfiguration, getLanguages} from "api/appBuilder";

import {
  getServerConfig,
  deleteServerConfig,
  postServerConfig,
  putServerConfig,
  getDatasources,
  getDatasourceData,
  putDatasourceColumn
} from "api/dashboardConfig";
import {
  SET_INFO_PAGE,
  SET_LANGUAGES,
  SET_SERVER_CONFIG_LIST,
  ADD_SERVER_CONFIG,
  REMOVE_SERVER_CONFIG,
  SET_DATASOURCE_LIST,
  SET_DATASOURCE_DATA,
  SET_DATASOURCE_COLUMNS,
  CLEAR_DATASOURCE_COLUMNS,
  SET_SHOW_HIDE_COLUMN,
  SET_SELECTED_DATASOURCE,
  CLEAR_SELECTED_DATASOURCE,
  SET_INTERNAL_ROUTE
} from "./types";

const DATASOURCE_PROPERTY_DATA = "data";
const DATASOURCE_PROPERTY_COLUMNS = "columns";

export const setInfoPage = info => ({
  type: SET_INFO_PAGE,
  payload: {
    info
  }
});

export const setLanguages = languages => ({
  type: SET_LANGUAGES,
  payload: {
    languages
  }
});

export const setServerConfigList = serverList => ({
  type: SET_SERVER_CONFIG_LIST,
  payload: {
    serverList
  }
});

export const addServerConfig = server => ({
  type: ADD_SERVER_CONFIG,
  payload: {
    server
  }
});

export const removeServerConfigSync = configId => ({
  type: REMOVE_SERVER_CONFIG,
  payload: {
    configId
  }
});

export const setDatasourceList = datasourceList => ({
  type: SET_DATASOURCE_LIST,
  payload: {
    datasourceList
  }
});

export const setDatasourceColumns = columns => ({
  type: SET_DATASOURCE_COLUMNS,
  payload: {
    columns
  }
});

export const clearDatasourceColumns = () => ({
  type: CLEAR_DATASOURCE_COLUMNS
});

export const setShowHideColumn = column => ({
  type: SET_SHOW_HIDE_COLUMN,
  payload: {
    column
  }
});

export const setDatasourceData = data => ({
  type: SET_DATASOURCE_DATA,
  payload: {
    data
  }
});

export const setSelectedDatasource = datasource => ({
  type: SET_SELECTED_DATASOURCE,
  payload: {
    datasource
  }
});

export const clearSelectedDatasource = () => ({
  type: CLEAR_SELECTED_DATASOURCE
});

export const setInternalRoute = route => ({
  type: SET_INTERNAL_ROUTE,
  payload: {route}
});

// thunk

export const gotoPluginPage = pluginPage => (dispatch, getState) => {
  const state = getState();
  const route = getRoute(state);
  const params = getParams(state);
  const searchParams = getSearchParams(state);
  try {
    gotoRoute(route, params, {...searchParams, pluginPage});
  } catch (error) {
    console.error("error", error);
    dispatch(setInternalRoute(pluginPage));
  }
};

export const fetchPageInformation = pageCode => dispatch =>
  new Promise(resolve => {
    getPageConfiguration(pageCode).then(response => {
      response.json().then(json => {
        if (response.ok) {
          dispatch(setInfoPage(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
          dispatch(addToast(formattedText("plugin.alert.error"), TOAST_ERROR));
          resolve();
        }
      });
    });
  });

export const fetchLanguages = () => dispatch =>
  new Promise(resolve => {
    getLanguages().then(response => {
      response.json().then(json => {
        /* da sostituire quando non ci saranno le API non mockate*/
        if (response.ok) {
          dispatch(setLanguages(json.payload));
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
          dispatch(addToast(formattedText("plugin.alert.error"), TOAST_ERROR));
          resolve();
        }
      });
    });
  });

export const fetchServerConfigList = mockServer => dispatch =>
  new Promise(resolve => {
    getServerConfig(mockServer).then(response => {
      if (response.ok) {
        response.json().then(json => {
          dispatch(setServerConfigList(json.payload));
          resolve();
        });
      } else {
        resolve();
      }
    });
  });

export const removeServerConfig = id => dispatch =>
  new Promise(resolve => {
    deleteServerConfig(id).then(response => {
      if (response.ok) {
        dispatch(removeServerConfigSync(id));
      }
      resolve();
    });
  });

export const createServerConfig = serverConfig => dispatch =>
  new Promise(resolve => {
    console.log("createServerConfig", serverConfig);
    postServerConfig(serverConfig).then(response => {
      console.log("response", response);
      if (response.ok) {
        response.json().then(json => {
          dispatch(addServerConfig(json.payload));
        });
      } else {
        resolve();
      }
      resolve();
    });
  });

export const updateServerConfig = serverConfig => dispatch =>
  new Promise(resolve => {
    putServerConfig(serverConfig).then(response => {
      if (response.ok) {
        dispatch(fetchServerConfigList()).then(resolve);
      } else {
        resolve();
      }
    });
  });

export const fecthDatasourceList = configId => dispatch =>
  new Promise(resolve => {
    if (configId) {
      getDatasources(configId).then(response => {
        response.json().then(json => {
          if (response.ok) {
            dispatch(setDatasourceList(json.payload));
            resolve();
          } else {
            dispatch(addErrors(json.errors.map(e => e.message)));
            dispatch(
              addToast(formattedText("plugin.alert.error"), TOAST_ERROR)
            );
            resolve();
          }
        });
      });
    } else {
      dispatch(setDatasourceList([]));
      resolve();
    }
  });

const wrapApiCallFetchDatasource = (apiCall, actionCreator) => (
  ...args
) => dispatch =>
  new Promise(resolve => {
    apiCall(...args).then(response => {
      response.json().then(json => {
        if (response.ok) {
          dispatch(actionCreator(json.payload));
          resolve(json.payload);
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
          dispatch(addToast(formattedText("plugin.alert.error"), TOAST_ERROR));
          resolve();
        }
      });
    });
  });

export const fetchDatasourceColumns = (formName, field, datasourceId) => (
  dispatch,
  getState
) => {
  const state = getState();
  const selector = formValueSelector(formName);
  const configId = selector(state, field);
  dispatch(clearSelectedDatasource());
  dispatch(setSelectedDatasource(datasourceId));
  dispatch(
    wrapApiCallFetchDatasource(getDatasourceData, setDatasourceColumns)(
      configId,
      datasourceId,
      DATASOURCE_PROPERTY_COLUMNS
    )
  );
};

export const fetchDatasourceData = (configId, datasourceId) => dispatch =>
  dispatch(
    wrapApiCallFetchDatasource(getDatasourceData, setDatasourceData)(
      configId,
      datasourceId,
      DATASOURCE_PROPERTY_DATA
    )
  );

export const updateDatasourceColumns = (formName, columns) => (
  dispatch,
  getState
) =>
  new Promise(resolve => {
    const state = getState();
    const selector = formValueSelector(formName);
    const configId = selector(state, "serverName");
    const datasourceId = selector(state, "datasource");
    putDatasourceColumn(configId, datasourceId, columns).then(response => {
      response.json().then(json => {
        if (response.ok) {
          dispatch(setDatasourceColumns(columns));
          resolve();
        } else {
          dispatch(addErrors(json.errors.map(e => e.message)));
          dispatch(addToast(formattedText("plugin.alert.error"), TOAST_ERROR));
          resolve();
        }
      });
    });
  });

export const showHideColumn = key => dispatch => {
  console.log("Show Hide Column ", key);
  dispatch(setShowHideColumn(key));
};

/*
 Widget Chart thunk
*/
