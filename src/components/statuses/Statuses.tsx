import { useSelector } from "react-redux";

import { Status } from "../../interfaces";
import { RootState } from "../../store/rootReducer";

interface Props {
    defaultValue?: string;
    id?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Statuses({ defaultValue, onChange, id }: Props) {

    const statuses = useSelector((state: RootState) => state.statusReducer);

    return (
        <select
            name="status"
            className="table_section_add-select"
            defaultValue={defaultValue}
            onChange={onChange}
            id={id}
        >
            {statuses &&
                statuses.map((item: Status, index: number) =>
                    <option key={index} >
                        {item.title}
                    </option>
                )}
        </select>
    )
}