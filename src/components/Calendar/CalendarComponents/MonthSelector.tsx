import React from "react";
import monthsData from "./months.json";
import yearsData from "./years.json";

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
    return (
        <div>
            <select value={selectedMM} onChange={onMMChanged}>
                {Object.keys(monthsData)
                    .sort()
                    .map((item, index) => {
                        return (
                            <option value={item} key={index}>
                                {(monthsData as any)[item]}
                            </option>
                        );
                    })}
            </select>
            <select value={selectedYYYY} onChange={onYYYYChanged}>
                {Object.keys(yearsData)
                    .sort()
                    .map((item, index) => {
                        return (
                            <option value={item} key={index}>
                                {(yearsData as any)[item]}
                            </option>
                        );
                    })}
            </select>
        </div>
    );
};

export default MonthSelector;
