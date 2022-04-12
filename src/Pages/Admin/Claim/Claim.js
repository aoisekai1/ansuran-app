import axios from 'axios'
import React, { Component } from 'react'
import { Modal, Button } from "react-bootstrap";
import routeApi from '../../../General/Links'
import {
	getSession, 
	typeAnsuran, 
	FormatDateTime, 
	FormatCurrency,
	GenerateNoPolis
} from '../../../Hooks/Hook'

export default class Claim extends Component {
	constructor(props){
		super(props)
		this.state = {
			data:[],
			item:{},
			premi:{},
			isShow: false,
			userinfo:{}
		}
	}
	componentDidMount(){
		this.getDataClaim();
	}
	
	getDataClaim(){
		let userinfo = getSession("userinfo");
		axios.get(routeApi.CLAIM+"?page=1&limit=100")
			.then((response) =>{
				this.setState({data: response.data.data});
			})
			.catch((err) => {
				console.log(err);
			})
	}

	publishPolisNum(id){
		if(!window.confirm("Are you sure to publish polis number ?")){
			return;
		}

		let data = this.state.data.sort((a, b) => a.no_polis < b.no_polis ? -1:1)
		let lastRecord = data[data.length - 1];
		let polisNum = "";
		let findNoPolis =  this.state.data.find(item => item.no_polis == lastRecord.no_polis);
		polisNum = GenerateNoPolis(findNoPolis.no_polis);
		let userinfo = getSession("userinfo");

		axios.patch(routeApi.CLAIM_UPDATE+id,{
			no_polis: polisNum,
			approve: true,
			approve_by: userinfo.nama,
			approve_date: FormatDateTime(),
			status: "Sudah dibayar"
		})
		.then(res => {
			console.log(res);
			window.location.reload();
		}).catch(err =>  console.log(err));

	}

	reject(id){
		if(!window.confirm("Are you sure to reject this ?")){
			return;
		}

		let userinfo = getSession("userinfo");
		axios.patch(routeApi.CLAIM_UPDATE+id,{
			reject: true,
			reject_by: userinfo.nama,
			reject_date: FormatDateTime(),
			status: "Belum dibayar"
			})
			.then(res => {
				alert("Reject success");
				window.location.reload();
			})
			.catch(err => {
				console.log("Oke");
			});
	}

	listTable(){
		console.log(this.state.data.length);
		return this.state.data.map((item) => {
			return (
				<tr key={item._id}>
					<th scope="row">
						{!item.no_polis && !item.status ? (
							<>
								<button type='button' className='btn btn-sm btn-primary' onClick={() => this.publishPolisNum(item._id)}>Approve</button> &nbsp; 
								<button className='btn btn-sm btn-danger' onClick={() => this.reject(item._id)}> Reject</button>
							</>
						): item.no_polis ? item.no_polis:"Belum Terbit"}
					</th>
					<td>{typeAnsuran(item.jenis_ansuransi).ansuran}</td>
					<td>{item.no_invoice}</td>
					<td>{item.status}</td>
					<td>{FormatDateTime(item.tanggal_req)}</td>
					<td>
						<a href="#" onClick={() => this.handleShow(item)}>Lihat Rincian</a>
					</td>
				</tr>
			)
			
		})
	}
	handleShow(obj){
		this.findPremi(obj.okupasi);
		this.findUser(obj.user_id);
		this.setState({isShow: true,item:obj});
	}
	handleClose(){
		this.setState({isShow: false});
	}
	async findPremi(code){
        let cart = getSession("cart");
        await axios.get(routeApi.OKUPASI+"premi/"+code)
            .then(res => {
                this.setState({premi:res.data.data});
            })
            .catch((err) => {
                console.log(err);
            });
    }
	async findUser(user_id){
		await axios.get(routeApi.CUSTOMER+user_id)
            .then(res => {
                this.setState({userinfo:res.data.data});
            })
            .catch((err) => {
                console.log(err);
            });
	}
	render() {
		const {item, premi, userinfo} = this.state;
		console.log(premi);
		return (
			<div className='container-fluid'>
                <section id="hero" className="d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 shadow-sm bg-body rounded d-flex flex-column justify-content-center">
								<div className='row'>
									<div className='col-md-12 text-start' style={{padding:"1.5rem"}}>
										<table className='table table-hovered'>
											<thead>
												<tr>
													<th scope="col">No Polis</th>
													<th scope="col">Jenis Penanggungan</th>
													<th scope="col">No Invoice</th>
													<th scope="col">Status</th>
													<th scope="col">Tanggal</th>
													<th scope="col">#</th>
												</tr>
											</thead>
											<tbody>
												{this.listTable()}
											</tbody>
										</table>
									</div>
								</div>
                            </div>
                        </div>
                    </div>

                </section>

				<Modal show={this.state.isShow} onHide={() => this.handleClose()}>
					<Modal.Header>
						<Modal.Title>Rincian Informasi</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<table className='table'>
							<tbody>
								<tr>
									<td>User Request</td>
									<td>:</td>
									<td>{item.user_id == userinfo._id ? userinfo.nama:""}</td>
								</tr>
								<tr>
									<td>No Polis</td>
									<td>:</td>
									<td>{item.no_polis}</td>
								</tr>
								<tr>
									<td>No Invoice</td>
									<td>:</td>
									<td>{item.no_invoice}</td>
								</tr>
								<tr>
									<td>Tanggal Request</td>
									<td>:</td>
									<td>{FormatDateTime(item.tanggal_req)}</td>
								</tr>
								<tr>
									<td>Priode</td>
									<td>:</td>
									<td>{item.priode} Tahun</td>
								</tr>
								<tr>
									<td>Konstruksi</td>
									<td>:</td>
									<td>Kelas {item.konstruksi}</td>
								</tr>
								<tr>
									<td>Okupasi</td>
									<td>:</td>
									<td>{item.okupasi == parseInt(premi.code) ? premi.ket: ""}</td>
								</tr>
								<tr>
									<td>Harga Bangunan</td>
									<td>:</td>
									<td>{FormatCurrency(item.harga_bangunan)}</td>
								</tr>
								<tr>
									<td>Jenis Penanggungan</td>
									<td>:</td>
									<td>{typeAnsuran(item.jenis_ansuransi).ansuran}</td>
								</tr>
								<tr>
									<td>Status</td>
									<td>:</td>
									<td>{item.status}</td>
								</tr>
							</tbody>
						</table>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => this.handleClose()}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
            </div>
		)
	}
}
