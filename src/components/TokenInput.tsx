import { PasswordInput } from '@mantine/core';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';

import './TokenInput.scss';

export default function TokenInput() {
  const [token, setToken] = useState('');

  const handleTokenChange = (event: BaseSyntheticEvent) => {
    console.log(event);
    setToken(event.target.value);
  };

  useEffect(() => {
    chrome.storage.sync.get(['token'], (data) => {
      setToken(data.token);
    });
  }, [setToken]);

  useEffect(() => {
    chrome.storage.sync.set({ token });
  }, [token]);

  return (
    <div className="token-input-container">
      <span className="token-label"> Github Token: </span>
      <PasswordInput
        className="token-input"
        placeholder="input password"
        value={token}
        onChange={handleTokenChange}
      />
    </div>
  );
}
