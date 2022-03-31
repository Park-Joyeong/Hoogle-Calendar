import React from "react";

export interface Props {
    selectedYYYYMM: string;
}

const CalendarBody = (props: Props) => {
    return <div>CalendarBody: {props.selectedYYYYMM}</div>;
};

export default CalendarBody;
