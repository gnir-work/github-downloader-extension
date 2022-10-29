import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import React, {
  BaseSyntheticEvent, useEffect, useState,
} from 'react';

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
    <Input.Password
      placeholder="input password"
      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      value={token}
      onChange={handleTokenChange}
      addonBefore="Github Token"
    />
  );
}
