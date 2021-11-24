import React, { useEffect, useState, useContext, useRef } from 'react';
import { Context } from "../../context";
import { Routes, Route } from "react-router-dom";

import AddDrivers from '../addition/addDrivers/addForm'
import AddCar from '../addition/addCar/addForm'
import { GET } from "../../requests"; 

import FormSection from "./formSection/FormSection";
import FormDrivers from '../titles/Titles';

import "./form.scss";

type infoType = {
  id: number;
  first_name: string;
  last_name: string;
  date_birth: number;
  date_created: number;
  status: {
    title: string;
    code: string;
  };
};

const Form = (props : any) => {
  const [context, setContext] = useContext(Context);
  const [statuses, setStatuses] = useState([]);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    GET(props.status).then((resp) => {
      setStatuses(resp.data);
    });
    GET(props.title).then((resp) => {
      if(props.title === "driver"){
        resp.data = resp.data.map((item : any) => {
          item.date_birth = new Date(item.date_birth).toLocaleDateString();
          item.date_created = new Date(item.date_created).toLocaleDateString();
          return item;
        })

        setInfo(resp.data); 
      }
      
      setInfo(resp.data); 
    });
  }, [context]);

  // sudo apt install htop -y


  return (
    <>
      {statuses.length &&  info.length ? info.map((item : any, index : any) => {
        return (
          <FormSection nameDelete={props.title} key={index} {...{ info: item, statuses: statuses }} />
        );
      }) : <div>Загрузка</div>}
    </>
  );
};

export default Form;

