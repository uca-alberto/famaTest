const BASE_URL = process.env.REACT_APP_API_URL;
export const FAMA_GET_ENDPOINTS = {
  customers: `${BASE_URL}customers`,
  customerCrud: `${BASE_URL}customers/{id}`,
  customerFilter: `${BASE_URL}Customers/filter`,
  personTypes: `${BASE_URL}personTypes`,
  personTypeCrud: `${BASE_URL}personTypes/{id}`,
  civilStatus: `${BASE_URL}CivilStatus`,
  civilStatusCrud: `${BASE_URL}CivilStatus/{id}`,
};
