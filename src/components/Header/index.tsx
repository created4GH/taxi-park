import { useMemo } from 'react';
import styled from 'styled-components'

import { LOCALES } from '../../intl/locales';
import { Language } from "../../interfaces";
import { COLOR_SWITCH_LANGUAGE, BORDER_SWITCH_LANGUAGE } from '../../constants/style.colors';

import logo from '../../ascets/img/png/taxi.png';
import './header.style.scss';

const uuid = require("react-uuid");

const Select = styled.select`
    width: 150px;
    height: 30px;
    margin-right: 30px;
    padding: 0 4px;
    border: 1px solid ${BORDER_SWITCH_LANGUAGE};
    box-sizing: border-box;
    border-radius: 8px;
    color: ${COLOR_SWITCH_LANGUAGE};
    font-size: 12px;
`;

interface Props {
    localeLanguage: Language;
    setLocale: React.Dispatch<React.SetStateAction<Language>>;
}

const Header = ({ setLocale, localeLanguage }: Props) => {

    const itemsMap = (item: string) => {
        return (
            <option key={uuid()}
                value={item}>
                {item}
            </option>
        )
    }
    const mappedItems = useMemo(() => Object.keys(LOCALES).map(itemsMap), [LOCALES])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const local: Record<string, string> = {
            value: LOCALES[event.target.value],
            name: event.target.value
        }
        const sItem = JSON.stringify(local);
        localStorage.setItem('internationalization', sItem);
        setLocale(local)
    }

    return (
        <header className="header">
            <div className='header__content'>
                <div className='header__content leftSide'>
                    <div className='header__content logo'>
                        <img src={logo}
                            alt="#"
                            width='180px'
                            height='40px'
                        />
                    </div>
                </div>
                <Select onChange={handleChange}>
                    <option hidden>
                        {localeLanguage.hasOwnProperty("name") ?
                            localeLanguage.name
                            : 'ENGLISH'}
                    </option>
                    {mappedItems}
                </Select>
            </div>
        </header>
    )
}

export default Header;
