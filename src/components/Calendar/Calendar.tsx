import React from "react";
import MonthSelector from "./CalendarComponents/MonthSelector";
import CalendarBody from "./CalendarComponents/CalendarBody";

const Calendar = () => {
    return (
        <div>
            <MonthSelector />
            <CalendarBody />
        </div>
    );
};

export default Calendar;
