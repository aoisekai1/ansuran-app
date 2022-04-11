import axios from 'axios';
import React, { Component } from 'react'
import routeApi from '../../../General/Links';
import { setSession, validateForm } from '../../../Hooks/Hook';

export default class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            next:true,
            isFirstStep: true,
            fullName: "",
            email:"",
            noHp:"",
            jekel:"",
            alamat:"",
            password:""
        }
    }

    step(act){
        if(act === "next"){
            this.setState({next: true})
        }
        if(act === "prev"){
            this.setState({next: false});
        }

        return;
    }

    register(e){
        document.getElementById("prev").disable = true;
        e.target.disable = true;
        e.target.innerHTML="<i class='fa fa-circle-o-notch fa-spin'></i> Waiting to redirect..";
        let data = {
            nama: this.state.fullName,
            email:this.state.email,
            no_hp:this.state.noHp,
            jekel:this.state.jekel,
            password: this.state.password
        }
        // console.log(data);
        let validate = validateForm(data);
        if(!validate.status){
            alert("Please input all fields form register")
            return;
        }
        data.alamat = "-";
        axios.post(routeApi.CUSTOMER_CREATE, data)
            .then(res => {
                let userinfo = res.data;
                userinfo.isLogin = true;
                userinfo.isAdmin = false;
                userinfo.isCustomer = true;
                setSession("userinfo", userinfo);
                window.location.href="/claim";
            }).catch(err => {
                console.log(err);
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
                                    <h1 style={{textAlign:"left"}}>Welcome to Register</h1>
                                    <h2 style={{textAlign:"left"}}>We are team of talented designers making websites</h2>
                                    &nbsp;
                                </div>
                                <div className='col-md-8 text-start shadow bg-body rounded' style={{padding:"1.5rem"}}>
                                    <form>
                                        <div className={this.state.isFirstStep && this.state.next ? "col-12 step-1":"hide"}>
                                            <div className="mb-3">
                                                <label className="form-label">Full Name</label>
                                                <input type="text" onChange={(e) => this.setState({fullName: e.target.value})} className="form-control" id="exampleInputEmail1" placeholder="Full Name" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Email address</label>
                                                <input type="email" onChange={(e) => this.setState({email: e.target.value})} className="form-control" id="exampleInputEmail1" placeholder="Email" />
                                            </div>
                                        </div>
                                        <div className={this.state.isFirstStep && !this.state.next ? "col-12 step-1":"hide"}>
                                            <div className="mb-3">
                                                <label className="form-label">No HP</label>
                                                <input type="text" onChange={(e) => this.setState({noHp: e.target.value})} className="form-control" id="exampleInputEmail1" placeholder="No HP" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Jenis Kelamin</label>
                                                <div className='col-md-12'>
                                                    <div className=''>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" onChange={(e) => this.setState({jekel: e.target.value})} name="inlineRadioOptions" id="inlineRadio1" value="L" />
                                                            <label className="form-check-label">Laki-Laki</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" onChange={(e) => this.setState({jekel: e.target.value})} name="inlineRadioOptions" id="inlineRadio2" value="P" />
                                                            <label className="form-check-label">Perempuan</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <input type="text" onChange={(e) => this.setState({jekel: e.target.value})} className="form-control" id="exampleInputEmail1" placeholder="Jenis Kelamin" /> */}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Password</label>
                                                <input type="password" onChange={(e) => this.setState({password: e.target.value})} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                            </div>
                                        </div>
                                        <div className='col-md-12'>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                {this.state.isFirstStep && !this.state.next ? (
                                                    <button type="button" onClick={() => this.step("next")} className="btn btn-primary btn-block btn-prev" id="prev">&laquo; Previous</button>
                                                ):""}
                                                </div>
                                                <div className='col-md-6'>
                                                    {this.state.isFirstStep && !this.state.next ? (
                                                        <button type="button" className="btn btn-primary btn-block" id="register" onClick={(e) => this.register(e)}>Register</button>
                                                    ):(
                                                        <button type="button" onClick={() => this.step("prev")} className="btn btn-primary btn-block btn-next">Next &raquo;</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
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
