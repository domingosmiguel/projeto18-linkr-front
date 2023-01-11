import { useState } from 'react';

export default function useToken() {
  const configStructure = (data) => {
    return { headers: { Authorization: 'Bearer ' + data } };
  };

  const [config, setConfig] = useState(
    configStructure(localStorage.getItem('token'))
  );

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setConfig(configStructure(newToken));
  };

  const deleteToken = () => {
    localStorage.clear();
    setConfig(configStructure(null));
  };

  return [config, updateToken, deleteToken];
}
