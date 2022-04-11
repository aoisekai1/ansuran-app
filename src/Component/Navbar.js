import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {FormatDateTime, getSession} from '../Hooks/Hook'

export class Navbar extends Component {
    componentDidMount(){
        
    }
    listMenu(){
        let userinfo = getSession("userinfo");
        userinfo = userinfo ? userinfo:"";
        if(userinfo.isCustomer){
            return(<>
                <li><Link className="nav-link scrollto" to="/claim">Kebakaran</Link></li>
                <li><Link className="nav-link scrollto" to="/profile">Gempa Bumi</Link></li>
                <li><Link className="nav-link scrollto" to="/profile">Kendaraan Bermotor</Link></li>
                <li><Link className="nav-link scrollto" to="/profile">Kecelakaan Diri</Link></li>
                <li><Link className="nav-link scrollto" to="/profile">Kesehatan</Link></li>
                <li><Link className="getstarted scrollto" to="/claim/request">Pengajuan Klaim</Link></li>
                <li><Link className="getstarted scrollto" to="/profile" style={{width:"40px",height:"40px",borderRadius:"50%"}}>
                        <i className="fa fa-user-circle" style={{fontSize:30, marginLeft:"-14px"}}></i>    
                    </Link>
                </li>
            </>)
        }else if(userinfo.isAdmin){
            return(<>
                <li><Link className="nav-link scrollto" to="/admin/all/request">All Request</Link></li>
                <li><Link className="nav-link scrollto" to="/admin/okupasi">Master Okupasi</Link></li>
                <li><Link className="getstarted scrollto" to="/admin/profile" style={{width:"40px",height:"40px",borderRadius:"50%"}}>
                        <i className="fa fa-user-circle" style={{fontSize:30, marginLeft:"-14px"}}></i>    
                    </Link>
                </li>
            </>)
        }else{
            let urlAdmin = window.location.href.replace("http://127.0.0.1:3000/","");
            if(urlAdmin !== "admin/login"){
                return(<>
                    <li><Link className="nav-link scrollto" to="/login">Login</Link></li>
                    <li><Link className="getstarted scrollto" to="/register">Get Started</Link></li>
                </>)
            }else{
                return(
                    <>
                        <li>
                            <button className='getstarted scrollto' style={{backgroundColor:"transparent", border:"none"}}>{FormatDateTime(new Date(), 'Y-m-d H:i:s')}</button>
                        </li>
                    </>
                )
            }
           
        }
    }
    render() {
        return (
            <div>
                <header id="header" className="header fixed-top shadow-sm p-3 bg-body rounded">
                    <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

                    <a href="index.html" className="logo d-flex align-items-center">
                        <img src="assets/img/logo.png" alt="" />
                        <span>FlexAnsuran</span>
                    </a>

                    <nav id="navbar" className="navbar">
                        <ul>
                            {/* <li><Link className="nav-link scrollto" to="/login">Login</Link></li>
                            <li><Link className="getstarted scrollto" to="/register">Get Started</Link></li> */}
                            {this.listMenu()}
                            
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>

                    </div>
                </header>    
            </div>
        )
    }
}

export default Navbar