import React, { Component } from 'react'
import { 
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'

import Navbar from '../Component/Navbar'
import ProtectedRoute from '../Component/ProtectedRoute';

import {
    LoginAdmin,
    ProfileAdmin,
    ClaimAdmin,
    OkupasiAdmin
} from '../Pages/Admin/index';

import {
    Home,
    Claim,
    ClaimReq,
    Cart,
    Register,
    Login,
    Transaction,
    Profile
} from '../Pages/Web/index';


export default class Navigation extends Component {
  render() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="claim/request" element={<ClaimReq />} />
                <Route path="cart" element={<Cart />} />
                <Route path="profile" element={<Profile />} />
                <Route path="transaksi" element={<Transaction />} />
                <Route exact path="claim" element={<Claim />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="admin/login" element={<LoginAdmin />} />
                <Route path="admin/profile" element={<ProfileAdmin />} />
                <Route path="admin/okupasi" element={<OkupasiAdmin />} />
                <Route path="admin/all/request" element={<ClaimAdmin />} />
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Routes>
        </BrowserRouter>
    )
  }
}
