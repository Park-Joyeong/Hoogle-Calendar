import React from "react";
import { MONTHS } from "./months";
import { YEARS } from "./years";

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
    );
};

export default MonthSelector;
