import axios from 'axios';
import { useState } from 'react';

export default function useForm(initialValue, setUsers) {
  const [form, setForm] = useState(initialValue);

  const updateForm = async (e, headers) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    try {
      if (e.target.value.length >= 3 || e.target.value.length === 0) {
        const { data: users } = await axios.request({
          baseURL: process.env.REACT_APP_BACKEND_URL,
          url: '/usernames',
          method: 'get',
          params: { [e.target.name]: e.target.value },
          headers,
        });
        setUsers(users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [form, updateForm, setForm];
}
