import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import FormUnits from "../FormUnits";
import AddNewCar from "../AddNewUnit/AddNewCar";
import AddNewDriver from "../AddNewUnit/AddNewDriver";
import { Car, Driver } from "../AddNewUnit/initialValues";
import { ROUTES_INFO } from "../../constants/routesInfo"
import { addNewUnit } from "../../redux/actions/";
import { isAddNewUnitSelector, statusesSelector } from "../../redux/selectors";
import { Data, Status } from "../../interfaces";

const uuid = require("react-uuid");

interface RouteProp {
    path: string;
    pageName: string;
}

const UnitsRoute = () => {
    const dispatch = useDispatch();
    const isAddNewUnit = useSelector(isAddNewUnitSelector);
    const statuses = useSelector(statusesSelector);

    const mapItems = ({ path, pageName }: RouteProp) => {

        const onSubmit = (values: Car | Driver) => {
            const status = statuses.find((status: Status) => status.title === values.status)!;
            values.status = status;
            if (values.hasOwnProperty("date_birth")) {
                (values as Driver).date_birth = new Date((values as Driver).date_birth).getTime();
            }
            dispatch(addNewUnit(pageName, true, (values as Data)));
        }

        const newUnit = isAddNewUnit === "car"
            ? <AddNewCar submit={onSubmit} />
            : <AddNewDriver submit={onSubmit} />;
        return (
            <Route key={uuid()} path={path} element={
                <>
                    {isAddNewUnit && newUnit}
                    <FormUnits pageName={pageName} />
                </>
            } />
        )
    }
    const mappedItems = useMemo(() => ROUTES_INFO.map(mapItems), [isAddNewUnit]);

    return (
        <div className="content__inform">
            <div className="table">
                <Routes>
                    {mappedItems}
                </Routes>
            </div>
        </div>
    )
}

export default UnitsRoute;
