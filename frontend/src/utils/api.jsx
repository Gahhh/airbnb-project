import { modalGlobalConfig } from 'antd/lib/modal/confirm';
const axios = require('axios').default;

// localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InEiLCJpYXQiOjE2MzYzNzM5ODF9.FrdyT-6w7hCKT21x7KhtChGosTnHdUn8DInp3fskzOo")

export const dataDispatch = (method, url, body) => {
  const config = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  }
  switch (method) {
    case 'POST':
      return axios.post(`http://localhost:5005/${url}`, body, config)
    
    case 'GET':
      if (url == 'bookings') {
        return axios.get(`http://localhost:5005/${url}`, config)
      } else {
        return axios.get(`http://localhost:5005/${url}`)
      }
      

    case 'PUT':
      return axios.put(`http://localhost:5005/${url}`, body, config)

    case 'DELETE':
      return axios.delete(`http://localhost:5005/${url}`, config)
    default:
      break;
  }
   
}