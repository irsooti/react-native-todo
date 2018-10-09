import * as actionTypes from './actionTypes';
import { firebaseInstance } from '../../../utils/firebaseInstance';

export const addStuff = stuffDescription => {
  return (dispatch, getState) => {
    const { token, localId } = getState().account.user;
    const client = firebaseInstance(token);

    client
      .post('stuff/' + localId + '.json', { description: stuffDescription })
      .then(response => {
        dispatch({
          type: actionTypes.ADD_STUFF,
          payload: {
            stuffDescription,
            key: response.data.name
          }
        });
      });
  };
};

export const deleteStuff = stuffUuid => {
  return (dispatch, getState) => {
    const { token, localId } = getState().account.user;
    const client = firebaseInstance(token);
    client
      .delete('stuff/' + localId + '/' + stuffUuid + '.json')
      .then(response => {
        dispatch({
          type: actionTypes.REMOVE_STUFF,
          payload: {
            stuffUuid
          }
        });
      });
  };
};

export const showStuff = () => {
  return (dispatch, getState) => {
    const { token, localId } = getState().account.user;
    const client = firebaseInstance(token);
    let result = [];

    client.get('stuff/' + localId + '.json').then(response => {
      console.log(result);
      if (response.data !== null) {
        let keys = Object.keys(response.data);
        keys.map((key, index) => {
          result.push({ ...response.data[key], key: key });
        });

        dispatch({
          type: actionTypes.RETRIEVE_STUFF,
          payload: {
            stuff: result
          }
        });
      }
    });
  };
};
