import React, { useContext, useState } from "react";

import { deletedContext } from "../../../context";

import FormSectionTab from "./formSectionTab/FormSectionTab";
import { REMOVE } from '../../../requests';
import { Button } from "../../button";

import icons from '../../../img/IconsDirection.svg'
import './formSection.style.scss';

const FormSection = (props: any) => {
  let itemInfo = props.info;
  const [isOpen, setIsopen]: any = useState(false) 
  const [isDeleted, setIsDeleted] = useContext(deletedContext);


  let infoEntries = Object.entries(props.info) as any;  

  const deleteEl = (event: any) => {
    REMOVE(props.title, itemInfo.id)
    .then((data: any) => {
      setIsDeleted((isDeleted : any) => !isDeleted);
    })
  }

  return (
    <>
      <div className="table_section">
        {infoEntries.map((item: any, index: any) => {
          return <FormSectionTab key={index} {...{ ...props, item: item }} />;
        })}
        <Button 
          onClick = {() => setIsopen((prevState: any) => !prevState)}
          className = 'table_section-showButton'
          btnText = 'show'
        />
        <Button 
          onClick = {deleteEl}
          className = 'table_section-deleteButton'
          btnText = 'delete'
        />
      </div>
        { isOpen ? <div className='table_section_isActive'>
          <div className='table_section_isActive-style'>
            <div className='table_section_isActive-cap block'>
              <p>id <img src={icons} alt="alt" /></p> 
              <p>model <img src={icons} alt="alt" /></p> 
              <p>mark <img src={icons} alt="alt" /></p>
              <p>number <img src={icons} alt="alt" /></p>
              <p>year <img src={icons} alt="alt" /></p>
              <p>class <img src={icons} alt="alt" /></p>
            </div>
            <div className='table_section_isActive-cars block'>
              <p>23462664</p> 
              <p>Ford</p> 
              <p>Fusion</p>
              <p>AX6475HA</p>
              <p>2020</p>
              <p>Эко</p>
            </div>
            <div className='table_section_isActive-cars block'>
              <p>23462664</p> 
              <p>Ford</p> 
              <p>Fusion</p>
              <p>AX6475HA</p>
              <p>2020</p>
              <p>Эко</p>
            </div>
            <div className='table_section_isActive-cars block'>
              <p>23462664</p> 
              <p>Ford</p> 
              <p>Fusion</p>
              <p>AX6475HA</p>
              <p>2020</p>
              <p>Эко</p>
            </div>
          </div>
        </div> : '' } 
    </>
  );
};

export default FormSection;