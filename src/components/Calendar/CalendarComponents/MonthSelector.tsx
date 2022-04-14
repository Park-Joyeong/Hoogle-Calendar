import React from "react";
import { MONTHS } from "./months";
import { YEARS } from "./years";
import "../../../css/month-selector.css";

export interface Props {
    selectedYYYYMM: string;
    handleSelectedYYYYMMChange: (yyyymm: string) => void;
}

const MonthSelector = ({ selectedYYYYMM, handleSelectedYYYYMMChange }: Props) => {
    const selectedYYYY = selectedYYYYMM.substring(0, 4);
    const selectedMM = selectedYYYYMM.substring(4, 6);
    const onYYYYChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleSelectedYYYYMMChange(event.target.value + selectedMM);
    };
    const onMMChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleSelectedYYYYMMChange(selectedYYYY + event.target.value);
    };
    const handleTodayBtnClick = () => {
        alert("Clicked");
    };
    return (
        <div className="month-selector">
            <div className="selectbox-selector">
                <select value={selectedMM} onChange={onMMChanged}>
                    {Object.entries(MONTHS)
                        .sort()
                        .map(([key, value], index) => {
                            return (
                                <option value={key} key={index}>
                                    {`${value}`}
                                </option>
                            );
                        })}
                </select>
                <select value={selectedYYYY} onChange={onYYYYChanged}>
                    {Object.entries(YEARS)
                        .sort()
                        .map(([key, value], index) => {
                            return (
                                <option value={key} key={index}>
                                    {`${value}`}
                                </option>
                            );
                        })}
                </select>
            </div>
            <div className="today-button-selector">
                <button onClick={handleTodayBtnClick}>Today</button>
            </div>
        </div>
    );
};

export default MonthSelector;
