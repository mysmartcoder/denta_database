import React, { Component } from 'react';
import { Form ,FormGroup, Col ,Row }  from 'reactstrap';
import Thead from './tableHead';
import TDropdown from './Tdropdown'
import Pagination from './pagination'

class reportTable extends Component {
      render(){
         console.log(this.props.tableHead)
         return (   
            <div className="main-table-block table-section">
            <div className="table-responsive">
               <table className="table table-hover">
                     <thead>
                        <Thead tableheads={this.props.tableHead}/>
                    </thead>
                  <tbody>
                     {this.props.tablevalue.map((clm,index) => (
                        <tr key={index}>
                        {clm.tdData.map((data,index) => ( 
                           <React.Fragment>
                              <td key={index}>{data}</td>                              
                           </React.Fragment>                                                      
                        ))}
                        {clm.isDropDownAvailabe && <TDropdown downlinks={this.props.downlinks}/> }
                        </tr>
                     ))}
                  </tbody> 
               </table>
            </div>
            <Pagination />
         </div>
      );
   }
}

export default reportTable;