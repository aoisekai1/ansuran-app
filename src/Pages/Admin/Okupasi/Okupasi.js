import axios from 'axios';
import React, { Component } from 'react'
import routeApi from '../../../General/Links';
import { getFloat } from '../../../Hooks/Hook';

export default class Okupasi extends Component {
    constructor(props){
        super(props)
        this.state = {
            code: "",
            premi: "",
            ket: "",
            data:[],
            isEdit: false,
            dataEdit: {}
        }
    }

    componentDidMount(){
        this.listData();
    }

    listData(){
        axios.get(routeApi.OKUPASI)
            .then(res => {
                this.setState({data:res.data.data});
            })
            .catch(err => console.log(err))
    }
    save(){
        document.getElementById("btn-save").innerHTML = "<i class='fa fa-circle-o-notch fa-spin'></i> Loading";
        document.getElementById("btn-save").disable = true;
        
        axios.post(routeApi.OKUPASI_CREATE,{
                code:this.state.code,
                premi: parseFloat(this.state.premi),
                ket: this.state.ket
            })
            .then(res => {
                alert("Save data success")
                document.getElementById("btn-save").innerHTML = "Login";
                document.getElementById("btn-save").disable = false;
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    selectOneData(e, item){
        let recompose = {
            _id: item._id,
            code: item.code,
            premi: getFloat(item.premi),
            ket: item.ket
        }
        this.setState({isEdit: true, dataEdit:recompose});
        // e.target.classList.remove('fa-pencil');
        // e.target.innerHTML="<i class='fa fa-circle-o-notch fa-spin'></i> Presess updating";
        // e.target.disable = true;
    }
    update(){
        let data = {};
        if(this.state.code){
            data.code = this.state.code;
        }
        if(this.state.premi){
            data.premi = this.state.premi;
        }
        if(this.state.ket){
            data.ket = this.state.ket;
        }

        axios.patch(routeApi.OKUPASI_UPDATE+this.state.dataEdit._id, data)
            .then(res => {
                alert("Update data success");
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }
    delete(e, id){
        if(!window.confirm("Are you sure delete this ?")){
            return
        }
        e.target.classList.remove('fa-trash');
        e.target.innerHTML="<i class='fa fa-circle-o-notch fa-spin'></i>";
        e.target.disable = true;
        
        axios.delete(routeApi.OKUPASI_DELETE+id)
            .then(res => {
                alert("Delete data success");
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }
    cancel(){
        window.location.reload();
    }
    render() {
        return (
            <div className='container-fluid'>
                <section id="hero" className="hero d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 d-flex flex-column justify-content-center">
                                <div className='col-12'>
                                    <h1 style={{textAlign:"left"}}>Master Okupasi Admin</h1>
                                    &nbsp;
                                </div>
                                <div className='col-md-12 text-start shadow bg-body rounded' style={{padding:"1.5rem"}}>
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Code</label>
                                            <input type="number" defaultValue={this.state.dataEdit.code} onChange={(e) => this.setState({code: e.target.value})} className="form-control" id="exampleInputEmail1" placeholder="Code" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Premi</label>
                                            <input type="number" defaultValue={this.state.dataEdit.premi} onChange={(e) => this.setState({premi: e.target.value})} className="form-control" placeholder="Premi" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Bangunan</label>
                                            <input type="text" defaultValue={this.state.dataEdit.ket} onChange={(e) => this.setState({ket: e.target.value})} className="form-control" id="exampleInputPassword1" placeholder="Ket" />
                                        </div>
                                        {this.state.isEdit ? (
                                            <>
                                                <button type="button" id="btn-update" onClick={() => this.update()} className="btn btn-primary">Update</button>
                                                &nbsp;
                                                <button type="button" onClick={() => this.cancel()} className="btn btn-danger">Cancel</button>
                                            </>
                                        ):(
                                            <button type="button" id="btn-save" onClick={() => this.save()} className="btn btn-primary">Save</button>
                                        )}
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <table className='table table-hovered'>
                                    <thead>
                                        <tr>
                                            <th>Kode</th>
                                            <th>Premi</th>
                                            <th>Bangunan</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.data.map((item, index) => {
                                            return(
                                                <tr key={index}>
                                                    <td>{item.code}</td>
                                                    <td>{getFloat(item.premi)}</td>
                                                    <td>{item.ket}</td>
                                                    <td>
                                                        <button onClick={(e) => this.selectOneData(e, item)} className='btn btn-sm btn-warning btn-select-data'><i className='fa fa-pencil'></i></button>
                                                        &nbsp;  
                                                        <button onClick={(e) => this.delete(e, item._id)} className='btn btn-sm btn-danger'><i className='fa fa-trash'></i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        )
    }
}
