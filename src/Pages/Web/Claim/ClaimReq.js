import axios from 'axios';
import React, { Component } from 'react'
import routeApi from '../../../General/Links';
import {setSession, getSession,listPriode, validateForm, FormatCurrency} from '../../../Hooks/Hook';

export default class ClaimReq extends Component {
    constructor(props){
        super(props)
        this.state = {
            showMsg: false,
            msgValidate: "",
            priode: "",
            okupasi: "",
            harga_bangunan: "",
            konstruksi: "",
            alamat:"",
            provinsi:"",
            kabupaten:"",
            daerah:"",
            gempa:"",
            listOkupasi:[
                {code: "1", ket:"Rumah"},
                {code: "2", ket:"Ruko"},
                {code: "3", ket:"Hotel"},
            ]
        }
    }

    async componentDidMount(){
        await axios.get(routeApi.OKUPASI)
            .then(res =>  {
                this.setState({listOkupasi: res.data.data})
            })
            .catch((err) => {
                console.log(err);
            })
    }

    checkPremi(){
        let userinfo = getSession('userinfo');
        let items = [];
        const {
            priode, okupasi, harga_bangunan,
            konstruksi, alamat, provinsi,
            kabupaten, daerah, gempa
        } = this.state;

        let data = {
            user_id: userinfo._id,
            type_ansuransi: 1,
            priode: priode,
            okupasi: okupasi,
            harga_bangunan: harga_bangunan,
            konstruksi:  konstruksi,
            alamat: alamat,
            provinsi: provinsi,
            kabupaten: kabupaten,
            daerah: daerah,
        }

        let validate = validateForm(data);
        if(!validate.status){
            this.setState({showMsg: true, msgValidate:validate.msg});
            return;
        }
        data.gempa = gempa == "on" ? 1:0
        items.push(data);
        setSession("cart", items)
        
        window.location.href="/cart";
    }

    disabled(){
        const {
            priode, okupasi, harga_bangunan,
            konstruksi, alamat, provinsi,
            kabupaten, daerah, gempa
        } = this.state;

        let data = {
            priode: priode,
            okupasi: okupasi,
            harga_bangunan: harga_bangunan,
            konstruksi:  konstruksi,
            alamat: alamat,
            provinsi: provinsi,
            kabupaten: kabupaten,
            daerah: daerah,
        }
        let status = false;
        Object.keys(data).forEach(function(key){
            if(data[key] == ""){
                status = true
            }
        })

        return status;
    }
    
    render() {
        const {listOkupasi} = this.state; 
        return (
            <div className='container-fluid'>
                <section id="hero" className="d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 d-flex flex-column justify-content-center">
                                <div className='col-md-12 text-start shadow bg-body rounded' style={{padding:"1.5rem"}}>
                                    <h5 className='fw-bold'>Ansuransi Kebakaran</h5>
                                </div>
                                <div className='col-md-12 text-start shadow bg-body rounded' style={{padding:"1.5rem"}}>
                                    {
                                        this.state.showMsg && <div className='col-md-12 shadow-sm alert alert-danger' dangerouslySetInnerHTML={ { __html: this.state.msgValidate}}></div>
                                            
                                    }
                                    
                                    <form>
                                        <div className='row'>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Jangka Waktu Pertanggungan</label>
                                                    <select name='priode' onChange={(e) => this.setState({priode: e.target.value})} className='form-control'>
                                                        <option value="">Pilih Jangka Waktu Pertanggungan</option>
                                                        {listPriode().map((item,index) => (
                                                            <option key={index} value={item.priode}>{item.priode} Tahun</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Okupasi</label>
                                                    <select name='okupasi' onChange={(e) => this.setState({okupasi: e.target.value})} className='form-control'>
                                                        <option>Pilih Okupasi</option>
                                                        {listOkupasi.map((item, index) => 
                                                            (<option key={index} value={item.code}>{item.ket}</option>)
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Harga Bangunan</label>
                                                    <input type="text" value={this.state.harga_bangunan = this.state.harga_bangunan.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0')} onChange={(e) => this.setState({harga_bangunan: e.target.value})} className="form-control" id="exampleInputPassword1" placeholder='Rp'/>
                                                </div>
                                                <div className="mb-3">
                                                    <div className='col-md-12'>
                                                        <label className="form-check-label form-text fw-bold">Konstruksi</label>
                                                        <div>&nbsp;</div>
                                                    </div>
                                                    <div className='col-md-12'>
                                                        <div className='row'>
                                                            <div className='col-md-1'>
                                                            <input className="form-check-input" type="radio" value="1" name="flexRadioDefault" id="flexRadioDefault2" onChange={(e) => this.setState({konstruksi: e.target.value})} className="form-check-input" id="exampleCheck1" />
                                                            </div>
                                                            <div className='col-md-11'>
                                                                <label className="form-check-label fw-bold">Kelas 1</label>
                                                                <label className='form-text'>
                                                                    Dinding, Lantai dan  Semua Komponen Penunjang Strukturalnya Serta
                                                                    Penutup Atap
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-12'>
                                                        <div className='row'>
                                                            <div className='col-md-1'>
                                                            <input className="form-check-input" type="radio" value="2" name="flexRadioDefault" id="flexRadioDefault2" onChange={(e) => this.setState({konstruksi: e.target.value})} id="exampleCheck1" />
                                                            </div>
                                                            <div className='col-md-11'>
                                                                <label className="form-check-label col-md-12 fw-bold">Kelas 2</label>
                                                                <label className='form-text'>
                                                                    Penutup Atap Terbuat Dari Sirap Kayu Keras
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-12'>
                                                        <div className='row'>
                                                            <div className='col-md-1'>
                                                            <input className="form-check-input" type="radio" value="3" name="flexRadioDefault" id="flexRadioDefault2" onChange={(e) => this.setState({konstruksi: e.target.value})} id="exampleCheck1" />
                                                            </div>
                                                            <div className='col-md-11'>
                                                                <label className="form-check-label fw-bold">Kelas 3</label>
                                                                <label className='form-text col-md-12'>
                                                                    Selain Konstruksi Kelas 1 Dan Kelas 2
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className="mb-3">
                                                    <label className="form-label">Alamat</label>
                                                    <textarea className='form-control' onChange={(e) => this.setState({alamat: e.target.value})} rows={4}></textarea>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Provinsi</label>
                                                    <input type="text" className='form-control' onChange={(e) => this.setState({provinsi: e.target.value})} />
                                                </div>
                                                <div className="mb-3">
                                                    <div className='col-md-12'>
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                <label className="form-label">Kota/Kabupaten</label>
                                                                <input type="text" className='form-control' onChange={(e) => this.setState({kabupaten: e.target.value})} />
                                                            </div>
                                                            <div className='col-md-6'>
                                                                <label className="form-label">Daerah</label>
                                                                <input type="text" className='form-control' onChange={(e) => this.setState({daerah: e.target.value})} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                <   div className='col-md-12 form-text'>Perluasan</div>
                                                   <div className='col-md-12'>
                                                        <input type="checkbox" className="form-check-input" onChange={(e) => this.setState({gempa: e.target.value})} id="exampleCheck1" />
                                                        <label className="form-label">&nbsp;&nbsp;Gempa Bumi</label> 
                                                   </div>
                                                </div>
                                            </div>
                                            <div className='col-md-12'>
                                                <button type="button"  onClick={() => this.checkPremi()} className="btn btn-primary btn-block" disabled={this.disabled()}>Check Premi</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>                       
                        </div>
                    </div>

                </section>
            </div>
        )
    }
}
