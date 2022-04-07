import React from "react";
import monthsData from "./months.json";

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
            rowData.push(<td>{i}</td>);
            weekdayIdx++;
            if (weekdayIdx === 7) {
                tableData.push(<tr>{rowData}</tr>);
            }
        }
    };
    setTableData();
    return (
        <div>
            <h1>
                {(monthsData as any)[props.selectedYYYYMM.substring(4, 6)]}&nbsp;
                {props.selectedYYYYMM.substring(0, 4)}
            </h1>
            <table>{tableData}</table>
        </div>
    );
};

export default CalendarBody;
