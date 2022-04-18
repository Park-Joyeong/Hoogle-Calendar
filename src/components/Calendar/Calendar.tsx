import React, { useState } from "react";
import MonthSelector from "./CalendarComponents/MonthSelector";
import CalendarBody from "./CalendarComponents/CalendarBody";

const Calendar = () => {
    const currentYYYYMM = getCurrentYYYYMM();
    const [selectedYYYYMM, setSelectedYYYYMM] = useState(currentYYYYMM);
    const [scheduleArray, setScheduleArray] = useState<object[]>([]);
    const handleSelectedYYYYMMChange = (yyyymm: string) => {
        setSelectedYYYYMM(yyyymm);
    };
    const handleScheduleArrayChange = (scheduleArray: object[]) => {
        setScheduleArray(scheduleArray);
    };
    return (
        <div>
            <MonthSelector selectedYYYYMM={selectedYYYYMM} handleSelectedYYYYMMChange={handleSelectedYYYYMMChange} />
            <CalendarBody
                selectedYYYYMM={selectedYYYYMM}
                handleSelectedYYYYMMChange={handleSelectedYYYYMMChange}
                scheduleArray={scheduleArray}
                handleScheduleArrayChange={handleScheduleArrayChange}
            />
        </div>
    );
};

function getCurrentYYYYMM() {
    return new Date().getFullYear().toString() + ("0" + (new Date().getMonth() + 1)).slice(-2);
}

export default Calendar;
