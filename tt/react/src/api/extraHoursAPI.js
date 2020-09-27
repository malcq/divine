import axios from './axios';

export const getExtraHours = ({ order, orderBy, rowsPerPage, page, value: isProcessed }) => {
  return axios({
    method: 'GET',
    url: '/api/extra',
    params: {
      offset: page * rowsPerPage,
      limit: rowsPerPage,
      order,
      orderBy,
      isProcessed
    }
  });
};

export const postExtraHours = (data) => {
  return axios({
    method: 'POST',
    url: '/api/extra',
    data
  });
};

export const updateExtraHours = (id, data) => {
  return axios({
    method: 'PUT',
    url: `/api/extra/${id}`,
    data
  });
};

export const deleteExtraHours = (id) => {
  return axios({
    method: 'DELETE',
    url: `/api/extra/${id}`
  });
};
