import axios from 'axios'
import React, { Component } from 'react'
import routeApi from '../../../General/Links'
import { getSession, removeSession, setSession } from '../../../Hooks/Hook'

export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            user_id:getSession("userinfo")._id, 
            nama: getSession("userinfo").nama,
            email: getSession("userinfo").email,
            role_type: getSession("userinfo").role_type,
            password: getSession("userinfo").password,
            isCustomer: getSession("userinfo").isCustomer,
            isAdmin: getSession("userinfo").isAdmin,
            isLogin: getSession("userinfo").isLogin
        }
    }
    updateProfile(){
        let dataUser = {
            nama: this.state.nama,
            email: this.state.email,
            role_type: this.state.role_type,
            password: this.state.password
        }
        axios.patch(routeApi.ADMIN_UPDATE+this.state.user_id, dataUser)
            .then(res => {
                res.data.isCustomer = this.state.isCustomer;
                res.data.isAdmin = this.state.isAdmin;
                res.data.isLogin =  this.state.isLogin;
                setSession("userinfo", res.data);
                alert('Success update profile')
            })
            .catch(err => {
                console.log(err)
            })
    }
    logout(){
        removeSession("userinfo");
        window.location.href = "/admin/login";
    }
    render() {
        return (
            <div className='container-fluid'>
                <section id="hero" className="hero d-flex align-items-center" style={{height:"70%"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 d-flex flex-column justify-content-center" style={{marginTop: 50}}>
                                <div className='col-12'>
                                    <div className='row'>
                                        <div className='col-md-4'></div>
                                        <div className='col-md-4 shadow-lg body-form rounded'>
                                            <div className='col-md-12'>
                                                <div className='img-profile shadow body-form'>
                                                    <i className='fa fa-user' style={{fontSize:200}}></i>
                                                </div>
                                                <button className='btn btn-danger' onClick={() => this.logout()} style={{marginTop: "-75px"}}><i className='fa fa-power-off'></i></button>
                                            </div>
                                            <div className='col-md-12 text-start' style={{padding: 10}}>
                                                <form>
                                                    <div className="mb-3">
                                                        <label className="form-label">Full Name</label>
                                                        <input type="text" defaultValue={this.state.nama} onChange={(e) => this.setState({nama:e.target.value})} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Email</label>
                                                        <input type="email" defaultValue={this.state.email} onChange={(e) => this.setState({email:e.target.value})} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Role</label>
                                                        <input readOnly type="text" defaultValue={this.state.role_type} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Password</label>
                                                        <input type="password" onChange={(e) => this.setState({password:e.target.value})} className="form-control" placeholder='New password' />
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                <button type="button" className="btn btn-primary" onClick={() => this.updateProfile()}>Update Profile</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                <div>&nbsp;</div>
                                            </div>
                                        </div>
                                        <div className='col-md-4'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        )
    }
}
