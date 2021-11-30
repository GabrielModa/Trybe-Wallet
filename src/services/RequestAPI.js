export const getCurrency = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requestJson = await request.json();
  console.log(requestJson);
  return requestJson;
};

export const getCurrencies = async () => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requestJson = await request.json();
  delete requestJson.USDT;
  return requestJson;
};
