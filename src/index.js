import React from 'react';
import ReactDOM from 'react-dom/client';

import GameBoard from './App/game/components/index';

import './style.css';
import { BrowserRouter, Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <GameBoard />
  </BrowserRouter>
);
