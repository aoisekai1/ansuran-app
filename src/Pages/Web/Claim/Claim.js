import axios from 'axios'
import React, { Component } from 'react'
import routeApi from '../../../General/Links'
import {getSession, typeAnsuran, FormatDateTime} from '../../../Hooks/Hook'


export default class Claim extends Component {
	constructor(props){
		super(props)
		this.state = {
			data:[]
		}
	}
	componentDidMount(){
		this.getDataClaim();
	}
	
	getDataClaim(){
		let userinfo = getSession("userinfo");
		axios.get(routeApi.CLAIM_USER+userinfo._id+"?page=1&limit=100")
			.then((response) =>{
				this.setState({data: response.data.data});
			})
			.catch((err) => {
				console.log(err);
			})
	}

	listTable(){
		console.log(this.state.data.length);
		return this.state.data.map((item) => {
			return (
				<tr key={item._id}>
					<th scope="row">{!item.no_polis && !item.status ? "":item.no_polis ? item.no_polis:"Belum Terbit"}</th>
					<td>{typeAnsuran(item.jenis_ansuransi).ansuran}</td>
					<td>{item.no_invoice}</td>
					<td>{item.status}</td>
					<td>{FormatDateTime(item.tanggal_req)}</td>
					<td>
						<a href="">Lihat Rincian</a>
					</td>
				</tr>
			)
			
		})
	}
	
	render() {
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
            </div>
		)
	}
}
