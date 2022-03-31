import React from "react";
import monthsData: object from "./months.json";

type Months = {
    01: string,
    02: string,
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
}

export interface Props {
    selectedYYYYMM: string;
    setSelectedYYYYMM: (selectedYYYYMM: string) => void;
}

const MonthSelector = ({ selectedYYYYMM }: Props) => {
    const selectedYYYY = selectedYYYYMM.substring(0, 4);
    const selectedMM = selectedYYYYMM.substring(4, 6);
    console.log(typeof monthsData);
    return (
        <div>
            <select value={selectedMM}>
                {Object.keys(monthsData).map((item, index) => {
                    console.log(item);
                    console.log(typeof item);
                    return (
                        <option value={item} key={index}>
                            {monthsData["01"]}
                            {/* {monthsData[item]} */}
                        </option>
                    );
                })}
            </select>
            <select value={selectedYYYY}>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
            </select>
        </div>
    );
};

export default MonthSelector;
