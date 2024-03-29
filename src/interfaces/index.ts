export interface Data {
  id?: number;
  first_name?: string;
  last_name?: string;
  date_birth?: number | string;
  date_created?: number | string;
  mark?: string;
  model?: string;
  number?: string;
  driver_id?: number;
  year?: number;
  status?: {
    title: string;
    code: string;
  };
}

export interface Status {
  title: string;
  code: string;
}

export interface ActionType<T> {
  type: string;
  payload?: T;
}

export interface Route {
  path: string;
  pageName: string;
}

export interface Filter {
  driver_id?: string,
  id?: string,
  mark?: string,
  model?: string,
  number?: string,
  status?: string,
  year?: string,
  first_name?: string,
  last_name?: string,
}

export interface CarFormik {
  mark: string;
  model: string;
  number: string;
  driver_id: string | number;
  year: string | number;
  status: {
    title: string;
    code: string;
  } | string;
}

export interface DriverFormik {
  first_name: string;
  last_name: string;
  date_birth: number | string;
  status: {
    title: string;
    code: string;
  } | string;
}

export type BodyType = Record<string, string | number | Status>;

export type Language = Record<string, string>;
