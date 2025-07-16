// import React from 'react'
import { Card, Grid } from '@mui/material'
import loginImage from '../../assets/Login-amico.png'
import signup from '../../assets/Sign_up.png'
import Login from './Login'
// import mojo from '../../assets/mojo.png'
import Register from './Register'
import { Route, Routes } from 'react-router-dom'
const Authentication = () => {
    return (
        <div>

            <div className='bg-slate-500 flex md:flex-wrap flex-col'>
                <Grid container className='h-screen overflow-hidden'>
                    <Grid item xs={7}>
                        <img className='w-screen h-screen'
                            src={loginImage}
                            alt="Secure Login"
                        />
                        {/*{<img className='w-screen h-screen'*/}
                        {/*    src={signup}*/}
                        {/*    alt="Secure Login"*/}
                        {/*/>}*/}
                    </Grid>

                    <Grid item xs={5} >
                        <div className='px-20 flex flex-col justify-center h-full'>
                            <Card className="card  bg-slate-900 p-8">
                                <div className='flex flex-col items-center mb-5 space-y-1'>

                                    <h1 className='text-emerald-800 logo text-center text-5xl font-serif italic font-bold tracking-wide '>MOJO</h1>
                                    <p className='text-emerald-800 text-1xl  text-center  w-[70&]'>Connecting Lives,Sharing Stories:Your Social World ,Your Way</p>
                                </div>
                                <Routes>
                                    <Route path='/*' element={<Login></Login>}></Route>
                                    <Route path='/login' element={<Login></Login>}></Route>
                                    <Route path='/register' element={<Register></Register>}></Route>
                                </Routes>




                            </Card>
                        </div>
                    </Grid>

                </Grid>
            </div>

        </div>
    )
}

export default Authentication