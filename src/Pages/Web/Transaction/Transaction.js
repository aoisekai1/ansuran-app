import React, { Component } from 'react'
import { getSession } from '../../../Hooks/Hook'

export default class Transaction extends Component {
    componentDidMount(){
        let cart = getSession('cart');
        if(!cart || typeof cart == 'undefined'){
            window.location.href = "/claim"
        }
    }

    render() {
        let cart = getSession('cart');
        if(!cart || typeof cart == 'undefined'){
            return (
                <div></div>
            )
        }
        return (
            <div className='container-fluid'>
                <section id="hero" className="d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 d-flex flex-column justify-content-center">
                                <div className='col-12'>
                                    <h1 className='fw-bold text-success' style={{textAlign:"left"}}>Hore Pengajuan Klaim Berhasil.</h1>
                                    <h2 style={{textAlign:"left"}}>Silahkan Lakukan Pembayaran Untuk Selanjutnya Diproses</h2>
                                    &nbsp;
                                </div>
                            </div>
                            <div className="col-lg-6 hero-img">
                                <img src="https://img.freepik.com/free-vector/online-mobile-banking-internet-banking-isometric-design-concept-cashless-society-security-transaction-via-credit-card_73903-310.jpg?w=740" className="img-fluid" alt="" />
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        )
    }
}
