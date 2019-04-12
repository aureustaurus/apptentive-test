import queryString from "query-string";

const GET_AMOUNT = "GET_AMOUNT";
const GET_TOTAL = "GET_TOTAL";

const initialState = { amount: { count: 0 }, total: { count: 0 } };

export const getAmount = (params = {}) => {
  const finalParams = {};
  const { empty = false, by = "shape" } = params;
  if (empty) finalParams.empty = empty;
  if (by) finalParams.by = by;

  const urlQuery = `?${queryString.stringify(finalParams)}`;

  return dispatch => {
    return fetch(`http://localhost:5000/api/v1/ufo/count${urlQuery}`)
      .then(
        response => response.json(),
        error => console.log("An error occurred.", error)
      )
      .then(data => {
        dispatch({
          type: GET_AMOUNT,
          data
        });
      });
  };
};

export const getTotal = () => {
  return dispatch => {
    return fetch("http://localhost:5000/api/v1/ufo")
      .then(
        response => response.json(),
        error => console.log("An error occurred.", error)
      )
      .then(data => {
        dispatch({
          type: GET_TOTAL,
          data
        });
      });
  };
};

// reducers
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_AMOUNT: {
      return { ...state, amount: action.data };
    }
    case GET_TOTAL: {
      return { ...state, total: action.data };
    }

    default:
      return state;
  }
}
