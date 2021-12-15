import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { CARINFO, DRIVERINFO } from "../../../constants/unitsTitles"

import IconsDirection from '../../../ascets/img/svg/IconsDirection.svg'
import './unitsTitles.style.scss'

const UnitsTitles = ({ title }: { title: string }) => {
    const info: any = (title === "car" && CARINFO) || DRIVERINFO;

    const mapItems = (item: string) => {
        if (["Drivers", "Cars"].includes(item)) {
            return (
                <div key={item} className="title-section-button">
                    <div className='title-section-title'><FormattedMessage id={item} /><img src={IconsDirection} alt="alt" /></div>
                    <div className='title-section-title'><FormattedMessage id='delete' /><img src={IconsDirection} alt="alt" /></div>
                </div>
            )
        }
        else {
            return <div key={item} className='title-section-title'><FormattedMessage id={item} /><img src={IconsDirection} alt="alt" /></div>
        }
    }

    const mappedItems = useMemo(() => info.map(mapItems), [info])

    return (
        <div className='title-section'>
            {mappedItems}
        </div>
    )
}

export default UnitsTitles;
