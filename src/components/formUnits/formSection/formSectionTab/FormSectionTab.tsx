import { useState, MouseEvent } from "react";
import { useSelector } from "react-redux";

import Statuses from "../../../statuses/Statuses";

import { PATCH } from "../../../../requests/requests";
import { RootState } from "../../../../store/rootReducer";
import { Data, Status } from "../../../../interfaces/interfaces";

import "./formSectionTab.style.scss";

interface Props {
  value: string | number | Status;
  property: string;
  title: string;
  id: string;
  data: Data;
}

const FormSectionTab = ({ value, property, title, data, id }: Props) => {
  const statuses = useSelector((state: RootState) => state.statusReducer);
  const [selectValue, setSelectValue] = useState<string>((value as Status).title);
  const [isDiv, setIsDiv] = useState<boolean>(true);

  function updateElement(event: MouseEvent<HTMLElement>) {
    if (!["id", "date_birth", "date_created", "driver_id"].includes(property)) {
      setIsDiv(!isDiv);
    }
  }

  const saveNewInformation = (newValue: string | Status) => {
    (data[property as keyof Data] as string | Status) = newValue;
    PATCH(title, id, { [property]: newValue });
    setIsDiv(!isDiv);
  };

  const pressedEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const target = event.target as HTMLInputElement;
      target.value && saveNewInformation(target.value);
    }
  };

  const onBlurEvent = (event: React.FocusEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    target.value && saveNewInformation(target.value);
  };

  const saveStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTitle = event.target.value;
    const status = statuses.find((status: Status) => status.title === newTitle)!;
    saveNewInformation(status);
    setSelectValue(newTitle);
  };

  return (
    <>
      <div className="table-section-tab">
        {property !== "status" ? (
          isDiv ? (
            <p className="table_paragraph" onClick={updateElement} >
              {data[property as keyof Data]}
            </p>
          ) : (
            <input
              type="text"
              placeholder={String(data[property as keyof Data])}
              className="table_input"
              autoFocus={true}
              onClick={updateElement}
              onBlur={onBlurEvent}
              onKeyPress={pressedEnter}
            />)
        ) : (
          <Statuses
            value={selectValue}
            onChange={saveStatus}
            id={property}
          />
        )}
      </div>
    </>
  );
};

export default FormSectionTab;