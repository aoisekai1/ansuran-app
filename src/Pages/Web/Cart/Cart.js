import axios from 'axios';
import React, { Component } from 'react'
import routeApi from '../../../General/Links';
import {
    getSession,
    removeSession, 
    typeAnsuran, 
    FormatCurrency,
    getFloat,
    GenerateInvoice,
    setSession,
    FormatDateTime
} from '../../../Hooks/Hook';

export default class Cart extends Component {
    constructor(props){
        super(props)
        this.state ={
            isShow : false,
            premi: {},
            total:0,
            invoiceNum: "",
            lastRecord:{},
            disable: ""
        }

    }
    componentDidMount(){
        let carts = getSession("cart");
        if(carts){
            this.findPremi();
            this.getLastRecord();
            this.setState({isShow:true});
        }
    }

    async getLastRecord(){
        await axios.get(routeApi.CLAIM+'last/record')
            .then(res => {
                if(res.data.data.length > 0){
                    // console.log(res.data.data[0]);
                    this.setState({lastRecord: res.data.data[0]});
                }
            })
            .catch((err) => console.log(err))
    }
    
    async checkInvoiceNum(invoice){
        await axios.get(routeApi.CLAIM+'check/invoice/'+invoice)
            .then(res => {
                console.log(res);
            })
            .catch((err) =>  {
                console.log(err);
            });
    }
    async findPremi(){
        let cart = getSession("cart");
        await axios.get(routeApi.OKUPASI+"premi/"+cart[0].okupasi)
            .then(res => {
                this.setState({premi:res.data.data});
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    payment(){
        document.getElementById("btn-payment").innerHTML="<i class='fa fa-spinner'></i>"
        document.getElementById("btn-payment").disabled = true;
        let d = parseInt(FormatDateTime(new Date(), 'd'))+1;
		let Y = FormatDateTime(new Date(), 'Y');
		let m = FormatDateTime(new Date(), 'm');
		let time = FormatDateTime(new Date(), 'H:i:s');
		let dateTime = Y+"-"+m+"-"+d+" "+time;
        let cart = getSession("cart");
        let premi = getFloat(this.state.premi.premi);
        let basicPremi = parseInt(cart[0].harga_bangunan) * parseFloat(premi) / 1000 * parseInt(cart[0].priode); 
        let total = parseFloat(basicPremi) + 10000;
        cart = cart.length > 0 ? cart[0]:{}; 
        let reqData = {
            user_id: cart.user_id,
            no_polis: "",
            no_invoice: GenerateInvoice(this.state.lastRecord.no_invoice),
            jenis_ansuransi: cart.type_ansuransi,
            priode: cart.priode,
            okupasi: cart.okupasi,
            harga_bangunan: cart.harga_bangunan,
            konstruksi: cart.konstruksi,
            alamat: cart.alamat,
            provinsi: cart.provinsi,
            kota: cart.kota,
            kabupaten: cart.kabupaten,
            daerah: cart.daerah,
            gempa: cart.gempa,
            total: total,
            approve: false,
            approve_date: "",
            approve_by: "",
            reject: false,
            reject_date: "",
            reject_by: "",
            status: "",
            expired: "",
            expired_date: dateTime
        }

        axios.post(routeApi.CLAIM_CREATE, reqData)
            .then(res => {
                sessionStorage.setItem('isTx', true);
                removeSession("cart");
                setTimeout(() => {
                    window.location.href="/transaksi?page=true";
                }, 2000)
            })
            .catch(err => {
                document.getElementById("btn-payment").innerHTML="Lanjut Ke Pembayaran"
                document.getElementById("btn-payment").disabled = false;
            })    
    }

    tableCart(){
        // Premi Dasar = Harga Bangunan x rate premi / 1000 x jangka waktu (dalam tahun)
        let cart = getSession("cart");
        let premi = getFloat(this.state.premi.premi);
        let basicPremi = parseInt(cart[0].harga_bangunan) * parseFloat(premi) / 1000 * parseInt(cart[0].priode); 
        let total = parseFloat(basicPremi) + 10000;
        let invoice = GenerateInvoice(this.state.lastRecord.no_invoice);
        
        return(
            <table className='table table-hovered'>
                <thead>
                    <tr>
                        <th>Premi Terbaik</th>
                        <th>Priode</th>
                        <th>Perluasan</th>
                        <th>Harga Bangunan</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, index) => {
                        return(
                            <tr key={index}>
                                <td>
                                    <p>Ansuransi {typeAnsuran(item.type_ansuransi).ansuran}</p>
                                    <p className='text-form fw-bold'>No. Invoice: {invoice}</p>
                                </td>
                                <td>{item.priode} Tahun</td>
                                <td >{item.gempa ? "yes":"no"}</td>
                                <td>{FormatCurrency(item.harga_bangunan)}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td></td>
                        <td></td>
                        <th className='text-end'>Premi Dasar:</th>
                        <td className='text-end'>{FormatCurrency(basicPremi)}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <th className='text-end'>Biaya Admin:</th>
                        <td className='text-end'>{FormatCurrency(10000)}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <th className='text-end'>Total:</th>
                        <td className='text-end'>{FormatCurrency(total)}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
    render() {
        return (
            <div className='container-fluid'>
                <section id="hero" className="d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 d-flex flex-column justify-content-center">
                                <div className='col-md-12 text-start shadow bg-body rounded' style={{padding:"1.5rem"}}>
                                    <div className='col-md-12'>
                                        {this.state.isShow ? this.tableCart(): (
                                            <div className='col-md-12 text-center'>
                                                <div className='col-md-12'>
                                                    <img style={{position:"relative",top:"-160px"}} src="https://img.freepik.com/free-vector/file-found-flat-illustration_418302-62.jpg?w=740"></img>
                                                </div>
                                                <div className='col-md-12'>
                                                    <h1 style={{margin:0,padding:0,position:"relative",top:"-250px"}} className='text-muted'>Ops. Cart kosong</h1>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className={this.state.isShow ? "col-md-12 text-end ":"col-md-12 text-end hide"}>
                                        <button type='button' onClick={() => this.payment()} className='button btn btn-primary' id="btn-payment">Lanjutkan Ke Pembayaran</button>
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
