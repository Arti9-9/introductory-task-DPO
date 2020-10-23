import 'react-calendar-heatmap/dist/styles.css';

import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/GlobalStyles';
import { ThemeName, themes } from './styles/Themes';

import { Header, Footer } from "./components";
import { Profile, Table, AdminPage } from "./pages";


function App() {
  const [themeName, setThemeName] = useState<ThemeName>('light');
  const currentTheme = themes[themeName];

  return (
    <ThemeProvider theme={currentTheme}>
      <BrowserRouter>
        <Header/>

        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user/" element={<Profile />} />
          <Route path="/user/:username" element={<Profile />} />
        </Routes>

        <Footer />
        <GlobalStyles />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
