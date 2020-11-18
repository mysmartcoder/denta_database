import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import Button from './Buttons/Btnpurple/btnpurple'
import ButtonGreen from './Buttons/Btnpurple/btngreen'
const NavbarSearch = (props) => {
  const [modal, setModal] = useState(false);

  return (
      <Modal isOpen={props.isModalOpen} toggle={props.onModalClick} centered={true} className="wrap-small-modal popup-content main-block ">
              <div className="">
                <div className="sub-block">
                  <div className="inner-block">
                    <p className="h1 mb-3 f-600 text-capitalize">
                     Search Data
                    </p>
                    <form className="position-relative">
                        <input className="form-control mr-sm-2 pl-5 pr-2" type="search" placeholder="Search Record" aria-label="Search"/>
                        <span to="javascript:void(0)" className="navbar-search">
                          <img src={require('../../assets/img/search.svg')} className="img-fluid"  alt="searchicon" />
                        </span>
                    </form>
                    <div className="py-md-3 py-3 text-right">
                        <ButtonGreen type="button" onClick={props.onModalClick}  value="Cancel" styleClass="mr-2" />
                        <Button type="button" onClick={props.onModalClick}  value="Save"  />
                    </div>
                  </div>
                </div>
             </div>
       </Modal>
  );
}

export default NavbarSearch;