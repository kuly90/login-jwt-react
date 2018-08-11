import GetData from '../api/ApiData';

export function startFetchData() {
  return { type: 'START_FETCH_DATA' }
}

export function fetchDataSuccess(payload) {
  return { type: 'FETCH_SUCCESS_DATA', payload }
}

export function fetchErrorData() {
  return { type: 'FETCH_ERROR_DATA' }
}

export function InsertItems(payload) {
  return { type: 'NEW_ITEM_DATA', payload }
}

export function deleteitem(payload) {
  return { type: 'DELETE_ITEM_DATA', payload }
}

export function EditItemData(payload, oldData) {
  return { type: 'EDIT_ITEM_DATA', payload, oldData }
}

export function FetchDataList() {
  return dispatch => {
    dispatch(startFetchData());
    GetData()
      .then(data => {
        dispatch(fetchDataSuccess(data))
      })
      .catch(() => dispatch(fetchErrorData()));
  };
}
