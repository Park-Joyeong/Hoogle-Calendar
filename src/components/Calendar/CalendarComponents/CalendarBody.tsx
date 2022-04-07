import React from "react";

export interface Props {
    selectedYYYYMM: string;
}

const CalendarBody = (props: Props) => {
    const firstDay = 1;
    const lastDay = new Date(
        parseInt(props.selectedYYYYMM.substring(0, 4)),
        parseInt(props.selectedYYYYMM.substring(4, 6)),
        0,
    ).getDate();
    const tableData: JSX.Element[] = [];
    const setTableData = () => {
        tableData.push(<tr>);
        for(let i=firstDay; i<=lastDay; i++) {
         console.log();   
        }
        tableData.push(</tr>);
    };
    setTableData();
    return (
        <div>
            <table>{tableData}</table>
        </div>
    );
};

export default CalendarBody;
