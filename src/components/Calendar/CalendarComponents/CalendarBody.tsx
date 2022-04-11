import React from "react";
import { MONTHS } from "./months";

export interface Props {
    selectedYYYYMM: string;
}

const CalendarBody = (props: Props) => {
    const firstDay = 1;
    const weekdayIdxOfFirstDay = new Date(
        parseInt(props.selectedYYYYMM.substring(0, 4)),
        parseInt(props.selectedYYYYMM.substring(4, 6)) - 1,
        1,
    ).getDay(); // Sunday - Saturday : 0 - 6
    const lastDay = new Date(
        parseInt(props.selectedYYYYMM.substring(0, 4)),
        parseInt(props.selectedYYYYMM.substring(4, 6)),
        0,
    ).getDate();
    const tableData: JSX.Element[] = [];
    const setTableData = () => {
        let rowData = [];
        let weekdayIdx = weekdayIdxOfFirstDay;
        let emptySlotCount = 0;
        while (emptySlotCount < weekdayIdx) {
            rowData.push(<td key={`Slot_${emptySlotCount}`}></td>);
            emptySlotCount++;
        }
        for (let i = firstDay; i <= lastDay; i++) {
            rowData.push(<td key={i}>{i}</td>);
            weekdayIdx++;
            if (weekdayIdx === 7 || i === lastDay) {
                tableData.push(<tr key={i}>{rowData}</tr>);
                rowData = [];
                weekdayIdx = 0;
            }
        }
    };
    setTableData();
    return (
        <div>
            <h1>
                {(MONTHS as any)[props.selectedYYYYMM.substring(4, 6)]}&nbsp;
                {props.selectedYYYYMM.substring(0, 4)}
            </h1>
            <table>
                <tbody>{tableData}</tbody>
            </table>
        </div>
    );
};

export default CalendarBody;
