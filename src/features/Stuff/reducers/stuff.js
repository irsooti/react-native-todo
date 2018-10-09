import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../../../utils/data';
import uuidv1 from 'uuid/v1';

const initialState = {
  stuff: []
};

const findStuff = (state, guid) => {
  let { stuff } = state.stuff;

  return stuff.find(w => w.key === guid);
};

const filterStuff = (state, guid) => {
  let { stuff } = state;

  return stuff.filter(w => w.key !== guid);
};

const reducer = (state = initialState, action) => {
  let { stuff } = state;

  switch (action.type) {
    case actionTypes.ADD_STUFF:
      let { stuffDescription, key } = action.payload;

      if (action.payload.stuffDescription.length === 0) return;

      return updateState(state, {
        stuff: stuff.concat({
          key: key,
          description: stuffDescription
        })
      });

    case actionTypes.REMOVE_STUFF:
      let { stuffUuid } = action.payload;

      return updateState(state, {
        stuff: filterStuff(state, stuffUuid)
      });

    case actionTypes.RETRIEVE_STUFF:
      return updateState(state, { stuff: action.payload.stuff });
    default:
      return state;
  }
};

export default reducer;
