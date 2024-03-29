import { Data, Status, Filter } from "../interfaces";
import {
    DATA_RECEIVED,
    FILTER_DATA,
    RESET_FILTER,
    SET_IS_ADD_NEW_UNIT,
    IS_DATA_UPDATED,
    IS_DATA_FETCHING,
    IS_DATA_FETCH_ERROR,
    SET_IS_PAGE_CAR
} from './types'

interface FilterData {
    filterValues: string;
    name: string,
    value: string,
}

interface InitialState {
    receivedData: Data[];
    filteredData: Data[];
    filterValues: Filter;
    statuses: Status[];
    isAddNewUnit: string | null;
    isDataUpdated: boolean;
    isDataFiltered: boolean;
    isDataFetching: boolean;
    isDataFetchError: boolean;
    isFilterValuesUpdated: boolean;
    isPageCar: boolean;
}

interface Action {
    payload?: FilterData | string | boolean;
    data?: Data[],
    statuses?: Status[],
    type: string,
}

const initialState: InitialState = {
    receivedData: [],
    filteredData: [],
    filterValues: {},
    statuses: [],
    isAddNewUnit: null,
    isDataUpdated: false,
    isDataFiltered: false,
    isDataFetching: false,
    isDataFetchError: false,
    isFilterValuesUpdated: false,
    isPageCar: false,
}

const RootReducer = (state: InitialState = initialState, { type, payload, data, statuses }: Action)
    : InitialState => {
    switch (type) {
        case DATA_RECEIVED:
            return { ...state, receivedData: data!, statuses: statuses! };

        case FILTER_DATA:
            const { name, value } = payload as FilterData;
            const filterValues: Filter = state.filterValues;
            filterValues[name as keyof Filter] = value;
            let result = state.receivedData;
            for (let key in filterValues) {
                result = result.filter(item => {
                    if (key === "status") {
                        return filterValues[key] === (item.status as Status).title;
                    } else {
                        return String(item[key as keyof Data])
                            .toLocaleLowerCase()
                            .includes(filterValues[key as keyof Filter]!
                                .toLocaleLowerCase());
                    }
                });
            }
            return {
                ...state, filteredData: result, isDataFiltered: true,
                isFilterValuesUpdated: !state.isFilterValuesUpdated
            };

        case RESET_FILTER:
            return {
                ...state, filteredData: state.receivedData, isDataFiltered: false, filterValues: {}
            };

        case SET_IS_ADD_NEW_UNIT:
            return { ...state, isAddNewUnit: (payload as string) };

        case IS_DATA_UPDATED:
            return { ...state, isDataUpdated: !state.isDataUpdated };

        case IS_DATA_FETCHING:
            return { ...state, isDataFetching: (payload as boolean), isDataFetchError: false }

        case IS_DATA_FETCH_ERROR:
            return { ...state, isDataFetchError: true }

        case SET_IS_PAGE_CAR:
            return { ...state, isPageCar: (payload as boolean) }

        default:
            return state;
    }
}

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;