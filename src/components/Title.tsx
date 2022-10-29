import React from 'react';
import { Avatar } from '@mantine/core';

// @ts-ignore
import logo from '../assets/img/icon.svg';
import './Title.scss';

export default function Title() {
  return (
    <div className="title">
      <Avatar className="title-avatar" src={logo} />
      <h3 className="title-text"> Github Downloader </h3>
    </div>

  );
}
