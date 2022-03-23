import React from "react";

export interface Props {
    selectedYYYYMM: string;
    setSelectedYYYYMM: (selectedYYYYMM: string) => void;
}

const MonthSelector = ({ selectedYYYYMM }: Props) => {
    console.log(`Selected month: ${selectedYYYYMM}`);
    const selectedYYYY = selectedYYYYMM.substring(0, 4);
    const selectedMM = selectedYYYYMM.substring(4, 2);
    return (
        <div>
            <select>
                <option value="01" {selectedMM == "01" ? 'selected' : ''}>January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            <select>
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
