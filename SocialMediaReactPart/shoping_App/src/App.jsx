import { Route, Routes } from 'react-router-dom'
import './App.css'
import Authentication from './Pages/Authentication/Authentication'
import HomePages from './Pages/HomePage/HomePages'
import Message from './Pages/MessagePage.jsx/Message'
import { useDispatch, useSelector } from 'react-redux'
import { store } from './redux/Store'
import { getProfileAction } from './redux/Auth/auth.action'
import { useEffect } from 'react'
import ProfileModel from './Pages/ProfileModel/ProfileModel'
import Header from './components/Header/Header'

function App() {

  const jwtToken = localStorage.getItem("jwt")
  const { userData } = useSelector(store => store)
  console.log(userData)

  return (
    <>
      <div className='bg-slate-500'>
        {jwtToken && <Header />}
        <Routes>
          <Route path='/*' element={jwtToken ? <HomePages></HomePages> : <Authentication></Authentication>}></Route>
          <Route path='/message' element={jwtToken ? <Message></Message> : <Authentication></Authentication>}></Route>
          <Route path='/*' element={<Authentication></Authentication>}></Route>
          {/* <Route path='/edit-profile' element={jwtToken ? <ProfileModel></ProfileModel> : <Authentication></Authentication>}></Route> */}
        </Routes>
      </div>
    </>
  )
}

export default App
