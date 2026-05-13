import React from 'react'
import Signin from './components/SignIn/Signin'
import Signup from './components/SignUp/Signup'
import HomePage from './components/HomePage/HomePage'
import MoviePage from './components/MoviePage/MoviePage'
import InsertMovie from './components/InsertMovie/InsertMovie'
import Test from './components/TEST/Test'
import Profile from './components/Profile/Profile'
import Admin from './components/Admin/Admin'
import Search from './components/Search/Search'
import TEST2 from './components/TEST2/Rough'
import Subscription from './components/Subscription/Subscription'
import  AdminLogin from './components/AdminLogin/AdminLogin'
import ViewLogs from './components/ViewLogs/ViewLogs'
import Hall from './components/HALL/Hall'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path= '/' element= {<Signin/>}></Route>
       <Route path= '/signup' element= {<Signup/>}></Route>
       <Route path= '/:username/homepage' element= {<HomePage/>}></Route>
       <Route path ='/:username/movie/:id/:moviename' element={<MoviePage/>}></Route>
       <Route path ='movies/:type' element={<h1>movies list</h1>}></Route>
       <Route path ='/insertmovie' element={<InsertMovie/>}></Route>
       <Route path ='/test' element={<Test/>}></Route>
       <Route path ='/:username/profile' element={<Profile/>}></Route>
       <Route path ='/:username/admin' element={<Admin/>}></Route>
       <Route path ='/search/:username/:searchId/:searchStr' element={<Search/>}></Route>
       <Route path ='/test2' element={<TEST2/>}></Route>
       <Route path ='/:username/subscribe' element={<Subscription/>}></Route>
       <Route path ='/adminlogin' element={<AdminLogin/>}></Route>
       <Route path ='/:username/viewlogs' element={<ViewLogs/>}></Route>
       <Route path ='/:id/hall' element={<Hall/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
