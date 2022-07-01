import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import { v4 as uuidv4 } from 'uuid';
import { provider, database } from '../firebase/config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { set, ref, onValue } from "firebase/database";
import React, { useEffect } from 'react';


const LocalStorage = require('local-storage');
const auth = getAuth();

const Login = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: () => {
      LocalStorage.set('token', uuidv4())
      router.push('/');
    }
  });

  // useEffect(() => {
  //   getUserData()
  // }, [])

  const GoogleAuth = () => {
    console.log('proses login')

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log('berhasil login')
        console.log('user', result.user.accessToken)
        console.log('user', result.user)
        const userCheck = getUserData(result?.user?.uid) || null;
        if(!userCheck) {
          writeUserData(result.user.uid, result.user.displayName, result.user.email, result.user.photoURL)
        }
        LocalStorage.set('token', result.user.accessToken)
        router.push('/');
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        console.log("error", errorMessage);
      });
  }

  const writeUserData = (userId, name, email, imageUrl) => {
    set(ref(database, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl,
      role: "guest"
    });
  }

  const getUserData = (uid) => {
    const key = ref(database, 'users/' + uid)
    let data = {};
    onValue(key, (snapshot) => {
      // console.log(snapshot.val())
      data = snapshot.val()
    })
    console.log("data", data)
    return data
  }

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Pewe Food
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Akses menggunakan akun google
              </Typography>
            </Box>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                md={12}
              >
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon fontSize='small' />}
                  onClick={GoogleAuth}
                  size="large"
                  variant="contained"
                >
                  Masuk atau daftar dengan Google
                </Button>
              </Grid>
            </Grid>
            {/* <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                or login with email address
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box> */}
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
