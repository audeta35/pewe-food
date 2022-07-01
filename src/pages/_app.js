import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login';
// import {FirebaseApp} from '../firebase/config';
const LocalStorage = require('local-storage');
const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const token = LocalStorage.get('token') || null;
  const getLayout = Component.getLayout ?? ((page) => page);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // console.log('firebase: ', FirebaseApp)
    setIsLoading(false)
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Material Kit Pro
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {
            isLoading ? (
              <Typography>Loading...</Typography>
            ) : token ? getLayout(<Component {...pageProps} />) : (
              <Login />
            )
          }
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
