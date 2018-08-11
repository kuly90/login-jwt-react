const LOAD = 'DEFAULT_LOAD_ITEM_LIST_EDIT';

const EditReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return {
        data: action.payload
      }
    default:
      return state
  }
}

export const loadGo = payload => ({ type: LOAD, payload })

export default EditReducer;
