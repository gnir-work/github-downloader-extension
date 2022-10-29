import React, { useEffect, useState } from 'react';
import './Popup.css';

function Popup() {
  const [token, setToken] = useState('');

  const handleTokenChange = (event) => {
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
    <div className="App">
      <input type="text" value={token} onChange={handleTokenChange} />

    </div>
  );
}

export default Popup;
