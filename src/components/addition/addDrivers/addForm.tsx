import React, { useState, useContext, useEffect } from "react";

import { Context } from "../../../context";

import Input from "../../input";
import { Button } from "../../button";
import { GET } from "../../../requests";
import { POST } from "../../../requests";

import addObj from '../../../img/addObj.svg'
import deleteObj from '../../../img/deleteObj.svg'

import './addForm.style.scss'

const AddDrivers = () => {
    const [statuses, setStatuses]: any = useState();
    const [context, setContext] = useContext(Context);
    const [addRequest, setAddRequest]: any = useState({
        first_name: '',
        last_name: '',
        date_birth: 0,
        status: {
            title: '', 
            code: ''
        }
    })

    useEffect(() => {
        const getStatuses = GET('driver-status');
        getStatuses.then((resp: any) => {
            setStatuses(resp.data);
        });
    }, [])

    const renderCheckbox = () => {
        return statuses && statuses.map((item: any, index: any) => {
            return <option key={index} value={item.code} >{item.title}</option>
        })
    }

    const check = () => {
        let checkMass: any = [];

        const checkRequest = (mass: any) => {
            for (let item in mass) {
                if (typeof mass[item] === "object") {
                    checkRequest(mass[item]);
                } else {
                    checkMass.push(mass[item]);
                }
            }
        }

        checkRequest(addRequest);

        if(addRequest.status.title === ""){
            addRequest.status = {
                title: "Активный",
                code: "active"
            }
        }

        for(let index of checkMass){
            if(index === '' || !index){
                return
            }
        } 

        POST('driver', addRequest);
        setContext(false);
        addRequest.first_name = '';
        addRequest.last_name = '';
        addRequest.date_birth = 0; 
        addRequest.status.title = '';
        addRequest.status.code = '';
    }

    const chendeSelect = (event: any) => {
        addRequest.status.title = event.target.selectedOptions[0].innerText
        addRequest.status.code = event.target.value
    }

    return (
        <div className='table_section_add'>
            <div className='table_section-block-input'>
                <Input 
                    className='table_section-input' 
                    onChange={(event) => addRequest.first_name = event.target.value} 
                    placeholder='Name'
                    pattern='[a-zA-Z]{1,15}'
                    title='no'
                />
                <div className="table_section-block-input__error">
                    Please use only English letters; 1-15 symbols.
                </div>
            </div>
            <div className='table_section-block-input'>
                <Input 
                    className='table_section-input' 
                    onChange={(event) => addRequest.last_name = event.target.value} 
                    placeholder='first name'
                    pattern='[a-zA-Z]{1,15}'
                />
                <div className="table_section-block-input__error">
                    Please use only English letters; 1-15 symbols.
                </div>
            </div>
            <div className='table_section-block-input'>
                <Input type="date" className='table_section-input-date' onChange={(event) => addRequest.date_birth = Date.parse(event.target.value)} />
            </div>
            <select className='table_section_add-select' onChange={chendeSelect} >
                {renderCheckbox()}
            </select>
            <div className='table_section_buttons' >
                <Button className='table_section-button' onClick={() => check()} btnText={ <img src={addObj} alt="alt"/> }/>
                <Button className='table_section-button' onClick={ () => setContext(false)} btnText={<img src={deleteObj} alt="alt"/> }/>
            </div>   
        </div>
    )
}

export default AddDrivers
