import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Avatar, Divider } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/config"

const Pengguna = () => {

    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        GetUserData()
    }, [])

    const GetUserData = async () => {
        const key = ref(database, 'users/');
        let arr = [];
        await onValue(key, (snapshot) => {
            // setUsers(snapshot.val())
            Object.keys(snapshot.val()).map((uid) => {
                arr.push({
                    ...snapshot.val()[uid],
                    uid: uid,
                })
            })
        })
        await setUsers(arr);
    }

    return (
        <>
            <Head>
                <title>
                    Pengguna | Material Kit
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={3}
                    >
                        {
                            users?.map((rows, index) => (
                                <Grid
                                    item
                                    lg={3}
                                    sm={6}
                                    xl={3}
                                    xs={12}
                                >
                                    <Card className='shadow'>
                                        <CardContent className="container">
                                            <Box
                                                sx={{
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Avatar
                                                    src={rows.profile_picture}
                                                    sx={{
                                                        height: 70,
                                                        mb: 2,
                                                        width: 70
                                                    }}
                                                />

                                                <Typography className="text-muted my-1" variant='h6'>{rows.username}</Typography>
                                                <Typography className="text-muted my-1" variant=''>{rows.email}</Typography>
                                                <Typography className="text-muted my-1" variant=''>{rows.role}</Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

Pengguna.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Pengguna;
