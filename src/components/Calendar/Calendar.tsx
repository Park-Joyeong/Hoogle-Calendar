import React, { useState } from "react";
import MonthSelector from "./CalendarComponents/MonthSelector";
import CalendarBody from "./CalendarComponents/CalendarBody";

const Calendar = () => {
    const currentYYYYMMDD = getCurrentYYYYMMDD();
    const [selectedYYYYMMDD, setSelectedYYYYMMDD] = useState(currentYYYYMMDD);
    const [scheduleArray, setScheduleArray] = useState<object[]>([]);
    const handleSelectedYYYYMMDDChange = (yyyymmdd: string) => {
        setSelectedYYYYMMDD(yyyymmdd);
    };
    const handleScheduleArrayChange = (scheduleObject: object) => {
        setScheduleArray(scheduleArray.concat(scheduleObject));
    };
    return (
        <div>
            <MonthSelector
                selectedYYYYMMDD={selectedYYYYMMDD}
                handleSelectedYYYYMMDDChange={handleSelectedYYYYMMDDChange}
            />
            SELECTED YYYYMMDD : {selectedYYYYMMDD}
            <br />
            SCEDULE ARRAY: {scheduleArray}
            <CalendarBody
                selectedYYYYMMDD={selectedYYYYMMDD}
                handleSelectedYYYYMMDDChange={handleSelectedYYYYMMDDChange}
                scheduleArray={scheduleArray}
                handleScheduleArrayChange={handleScheduleArrayChange}
            />
        </div>
    );
};

function getCurrentYYYYMMDD() {
    return (
        new Date().getFullYear().toString() +
        (new Date().getMonth() + 1).toString().padStart(2, "0") +
        new Date().getDate().toString().padStart(2, "0")
    );
}

export default Calendar;
