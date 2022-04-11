import React from "react";
import { MONTHS } from "./months";

export interface Props {
    selectedYYYYMM: string;
}

const CalendarBody = (props: Props) => {
    const firstDay = 1;
    const weekdayIdxOfFirstDay = new Date(
        parseInt(props.selectedYYYYMM.substring(0, 4)),
        parseInt(props.selectedYYYYMM.substring(4, 6)),
        0,
    ).getDay();
    const lastDay = new Date(
        parseInt(props.selectedYYYYMM.substring(0, 4)),
        parseInt(props.selectedYYYYMM.substring(4, 6)),
        0,
    ).getDate();
    const tableData: JSX.Element[] = [];
    const setTableData = () => {
        const rowData = [];
        let weekdayIdx = weekdayIdxOfFirstDay;
        for (let i = firstDay; i <= lastDay; i++) {
            rowData.push(<td key={i}>{i}</td>);
            weekdayIdx++;
            if (weekdayIdx === 7) {
                tableData.push(<tr key={i}>{rowData}</tr>);
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
