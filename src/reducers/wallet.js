// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVE_CURRENCY } from '../actions/actionTypes';

const INITIAL_STATE = {
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCY:

    return { ...state,
      expenses: [...state.expenses, { ...action.payload, id: state.expenses.length }] };

  default:
    return state;
  }
};

export default wallet;
