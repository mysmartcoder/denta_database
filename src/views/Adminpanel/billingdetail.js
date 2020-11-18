import React, { Component } from 'react';
import Button from './../Components/Buttons/Btnpurple/btnpurple'
import Thead from '../Components/table/tableHead'
const tableHeads= [
  {
     tittle:'Transaction ID'
  } , 
  {
     tittle:'Date'
  }, 
  {
    tittle:'Time'
 } 
 , 
  {
    tittle:'Amount'
  } 
  , 
  {
    tittle:'Invoice ID'
  } 
 
];
const tablevalue =[
   { 
     tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $75.00', '905b97d4 - 981f - 4aaa'],
     amt:'amt-remove'
   },
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','-$104.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    }
    ,
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','+ $124.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-add'
    }
    ,
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','+ $78.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-add'
    }
    ,
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $110.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    }
    ,
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','+ $475.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-add'
    }
    ,
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $458.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    }
    ,
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','+ $214.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-add'
    }
    ,
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $150.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    },
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $150.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    },
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $150.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    },
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $150.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    },
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $150.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    },
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $150.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    },
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $150.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    },
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $150.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    },
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $150.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    },
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $150.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    },
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $150.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    },
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $150.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    },
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $150.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    },
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $150.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    },
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $150.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    },
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $150.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    },
    {   
      tdData: ['905b97d4 - 981f - 4aaa - ba8d - 87d54f','01/05/2020' ,'11:20:05 AM','- $150.00', '905b97d4 - 981f - 4aaa'],
      amt:'amt-remove'
    }
];

class Billing extends Component {
   render(){ 
      return (
        <div className="billing-body">
            <div className="py-3">
              <h2 className="text-custom-light-blue mb-0 f-700">
              Billing Details
              </h2>
            </div>
              <div className="billingcard">
                <div className="common-box-profile common-box-sahdow">
                      <div className="">
                        <div className="d-flex align-items-center h-100">
                          <div>
                              <p className="h2 text-custom-light-blue mb-0 f-700">
                                Payment Methods
                              </p>
                          </div>
                          <div className="ml-auto">
                            <Button value="Edit Card" />
                          </div>
                        </div>
                      </div>
                      <div className="payment-card-main">
                        <div className="payment-card">
                            <div className="d-flex flex-column h-100">
                              <div className="card-tittle">
                                <p className="card-number-title text-uppercase">Card Number</p>
                              </div>
                              <div className="card-number">
                                <p className="h4 text-white f-700 pt-1">
                                  4358 - 7421 - 9256 - 6682
                                </p>
                              </div>
                              <div className="card-details d-flex justify-content-between mt-auto align-items-center">
                                <div className="card-holder d-inline-flex flex-column">
                                    <p className="card-holder-title text-uppercase">Name</p>
                                    <p className="card-holder-name card-data">John Doe</p>
                                </div>
                                <div className="card-holder-exp-block d-inline-flex flex-column">
                                    <p className="card-holder-title text-uppercase">Expiry Date</p>
                                    <p className="card-holder-exp-date card-data">11/23</p>
                                </div>
                                <div>
                                  <img src={require('../../assets/img/mastercard.svg')} alt="master card" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                        </div>
                      </div>
                </div>
              </div>
              <div className="transactiondetails">
                <div className="main-table-block billing-table table-section rounded-0  common-box-sahdow">
                  <div className="table-record-tittle h-auto">
                    <div className="d-flex flex-column flex-sm-row h-100">
                          <div>
                              <p className="h2 text-custom-light-blue mb-0 f-700">
                              Transaction Details
                              </p>
                          </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover">
                          <thead>
                              <Thead tableheads={tableHeads}/>
                          </thead>
                        <tbody>
                          { tablevalue.map((clm,index) => (
                              <tr key={index} className={clm.amt}>
                              {clm.tdData.map((data,index) => ( 
                                <React.Fragment>
                                    <td key={index}>{data}</td>                              
                                </React.Fragment>                                                      
                              ))}
                            </tr>
                          ))}
                        </tbody> 
                    </table>
                  </div>
                </div>
              </div>
            </div>          
       );
   }
}

export default Billing;