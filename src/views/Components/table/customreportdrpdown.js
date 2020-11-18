import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Example = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown className="select-drp" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle tag="a" className="alter d-block" >
        Daily
        </DropdownToggle>
        <DropdownMenu>
        <DropdownItem>Daily</DropdownItem>
        <DropdownItem>Month</DropdownItem>
        <DropdownItem>Week</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Example;