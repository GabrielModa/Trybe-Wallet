// Coloque aqui suas actions
export const SET_LOGIN = 'SET_LOGIN';

const loginUser = (payload) => (
  {
    type: SET_LOGIN,
    payload,
  });

export default loginUser;
