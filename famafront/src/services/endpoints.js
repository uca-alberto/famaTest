const BASE_URL = process.env.URL_BASE_API;
export const FAMA_GET_ENDPOINTS = {
  customers: `${BASE_URL}customers`,
  customerUpdate: `${BASE_URL}customer/{id}`,
};
