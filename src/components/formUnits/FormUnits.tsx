import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../loader/loader";
import FormSection from "./formSection/FormSection";
import UnitsTitles from "./unitsTitles/UnitsTitles";
import { dispatchStatuses, dispatchData } from "../../store/actions/actions";
import { GET, GET_STATUS } from "../../requests/requests";
import { RootState } from "../../store/rootReducer";
import { Data } from "../../interfaces/interfaces";

import "./formUnits.style.scss";

interface Props {
  title: string;
}

const FormUnits = ({ title }: Props) => {
  const [isDeleted, setIsDeleted] = useState<boolean>(true);
  const receivedData = useSelector((state: RootState) => state.dataReducer);
  const filteredData = useSelector((state: RootState) => state.filteredDataReducer);
  const isFilteredData = useSelector((state: RootState) => state.isFilteredReducer);
<<<<<<< HEAD
  const isUpdated = useSelector((state: RootState) => state.IsUpdatedReducer);
=======
  const isData = useSelector((state: RootState) => state.IsUpdatedReducer);
  const addUnits = useSelector((state: RootState) => state.addNewReducer);
>>>>>>> 01cdd06db26590de97494d3ff8d7e5ba3dfab21b

  const data = (isFilteredData && filteredData) || receivedData;
  const dispatch = useDispatch();

  useEffect(() => {
    (async function fetchData() {
      const data = await GET(title);
      const statuses = await GET_STATUS(title);
      dispatch(dispatchStatuses(statuses.data));
      dispatch(dispatchData(data as Data[]));
    })();
<<<<<<< HEAD
  }, [isDeleted, title, isUpdated]);
=======
  }, [isDeleted, title, isData, addUnits]);
>>>>>>> 01cdd06db26590de97494d3ff8d7e5ba3dfab21b

  return (
    <>
      <UnitsTitles title={title} />
      {data.length ?
        data.map((item: any) => {
          return (
            <FormSection
              key={item.id}
              title={title}
              data={item}
              setIsDeleted={setIsDeleted}
            />
          );
        })
        : <>{!isFilteredData && <div><Loader /></div>}</>
      }
    </>
  );
};

export default FormUnits;
