import React from "react";
import { MONTHS } from "./months";
import { YEARS } from "./years";
import "../../../css/month-selector.css";

export interface Props {
    selectedYYYYMMDD: string;
    handleSelectedYYYYMMDDChange: (yyyymm: string) => void;
}

const MonthSelector = ({ selectedYYYYMMDD, handleSelectedYYYYMMDDChange }: Props) => {
    const selectedYYYY = selectedYYYYMMDD.substring(0, 4);
    const selectedMM = selectedYYYYMMDD.substring(4, 6);
    const onYYYYChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleSelectedYYYYMMDDChange(event.target.value + selectedMM + "01");
    };
    const onMMChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleSelectedYYYYMMDDChange(selectedYYYY + event.target.value + "01");
    };
    const handleTodayBtnClick = () => {
        const currentYYYYMM =
            new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString().padStart(2, "0");
        handleSelectedYYYYMMDDChange(currentYYYYMM + "01");
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
