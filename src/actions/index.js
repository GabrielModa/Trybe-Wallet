// Coloque aqui suas actions
import { SET_LOGIN, RECEIVE_CURRENCY } from './actionTypes';
import { getCurrency } from '../services/RequestAPI';

export const actionLogin = (payload) => (
  {
    type: SET_LOGIN,
    payload,
  });

export const receiveCurrency = (payload) => ({
  type: RECEIVE_CURRENCY,
  payload,
});

export const fetchCurrency = (payload) => async (dispatch) => {
  const data = await getCurrency();
  dispatch(receiveCurrency({ ...payload, exchangeRates: data }));
};
