import { useState, useContext, useEffect } from "react";
import { Context } from "../../../context";

import FindDriverId from "../../findDriverId/FindDriverId";
import YearSelect from "../../yearSelect/YearSelect";
import Input from "../../regularComponents/input/Input";
import { Button } from "../../regularComponents/button/Button";
import { GET, POST } from "../../../requests";

import addObj from '../../../img/addObj.svg'
import deleteObj from '../../../img/deleteObj.svg'

import './addCar.style.scss'

const AddForm = () => {
    const [statuses, setStatuses]: any = useState();
    const [context, setContext] = useContext(Context);
    const [addRequest, setAddRequest]: any = useState({
        model: '',
        mark: '',
        number: '',
        year: null,
        driver_id: 120,
        status: {
            title: '',
            code: ''
        }
    })

    useEffect(() => {
        const getStatuses = GET('car-status');
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

        if (addRequest.status.title === "") {
            addRequest.status = {
                title: "Эконом",
                code: "econom"
            }
        }

        checkRequest(addRequest);

        for (let index of checkMass) {
            if (index === '' || !index) {
                return
            }
        }
        setContext(false)

        POST('car', addRequest);
        addRequest.model = ''
        addRequest.mark = ''
        addRequest.number = ''
        addRequest.year = null
        addRequest.driver_id = ''
        addRequest.status.title = ''
        addRequest.status.code = ''
    }

    const changeSelect = (event: any) => {
        addRequest.status.title = event.target.selectedOptions[0].innerText
        addRequest.status.code = event.target.value
    }

    return (
        <div
            className='table_section_add'>
            <div
                className='table_section-block-input'>
                <Input
                    className='table_section-input'
                    onChange={(event) => addRequest.mark = event.target.value}
                    placeholder='Brand'
                />
            </div>
            <div
                className='table_section-block-input'>
                <Input
                    className='table_section-input'
                    onChange={(event) => addRequest.model = event.target.value}
                    placeholder='Modal'
                />
            </div>
            <div
                className='table_section-block-input'>
                <Input
                    className='table_section-input'
                    maxLength={8}
                    onChange={(event) => addRequest.number = event.target.value}
                    placeholder='Number car'
                />
            </div>
            <div
                className='table_section-block-input'>
                <YearSelect onChange={(event: any) => addRequest.year = event.target.value} />
            </div>
            <div
                className='table_section-block-input'>
                <FindDriverId
                    onChange={(event: any) => addRequest.driver_id = event} />
            </div>
            <select
                className='table_section_add-select'
                onChange={changeSelect}
            >
                {renderCheckbox()}
            </select>
            <div
                className='table_section_buttons' >
                <Button
                    className='table_section-button'
                    onClick={() => check()}
                    btnText={<img src={addObj} alt="alt" />} />
                <Button
                    className='table_section-button'
                    onClick={() => setContext(false)}
                    btnText={<img src={deleteObj} alt="alt" />} />
            </div>
        </div>
    )
}

export default AddForm