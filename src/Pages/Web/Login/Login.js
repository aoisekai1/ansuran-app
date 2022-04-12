import axios from 'axios'
import React, { Component } from 'react'
import routeApi from '../../../General/Links'
import {setSession} from '../../../Hooks/Hook'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:"",
            password: ""
        }
    }

    verifyUser(){
        let reqAuth = {
            email: this.state.email,
            password: this.state.password
        }
        
        axios.post(routeApi.CUSTOMER_AUTH, reqAuth)
            .then(response => {
                if(response.data.data){
                    let userinfo = response.data.data
                    userinfo.isLogin = true;
                    userinfo.isCustomer = true;
                    userinfo.isAdmin = false;
                    setSession("userinfo", userinfo);
                    window.location.href = '/claim?type=1';
                }else{
                    alert("Ops, username/password wrong");
                }
            })
            .catch((err) => {
                console.log('ERR > ',err);
            })
    }
    render() {
        return (
            <div className='container-fluid'>
                <section id="hero" className="hero d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 d-flex flex-column justify-content-center">
                                <div className='col-12'>
                                    <h1 style={{textAlign:"left"}}>Welcome to Login</h1>
                                    <h2 style={{textAlign:"left"}}>We are team of talented designers making websites</h2>
                                    &nbsp;
                                </div>
                                <div className='col-md-8 text-start shadow bg-body rounded' style={{padding:"1.5rem"}}>
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Email address</label>
                                            <input type="email" onChange={(e) => this.setState({email: e.target.value})} className="form-control" id="exampleInputEmail1" placeholder="Email" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <input type="password" onChange={(e) => this.setState({password: e.target.value})} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                        </div>
                                        <button type="button" onClick={() => this.verifyUser()} className="btn btn-primary">Sign In</button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 hero-img">
                                <img src="assets/img/hero-img.png" className="img-fluid" alt="" />
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        )
    }
}
