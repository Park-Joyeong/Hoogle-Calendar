import React, { useState } from "react";
import MonthSelector from "./CalendarComponents/MonthSelector";
import CalendarBody from "./CalendarComponents/CalendarBody";

const Calendar = () => {
    const currentYYYYMMDD = getCurrentYYYYMMDD();
    const [selectedYYYYMMDD, setSelectedYYYYMMDD] = useState(currentYYYYMMDD);
    const [scheduleArray, setScheduleArray] = useState<
        {
            title: string;
            startDay: string;
            endDay: string;
            isAllDay: boolean;
            startTime: string;
            endTime: string;
        }[]
    >([]);
    const handleSelectedYYYYMMDDChange = (yyyymmdd: string) => {
        setSelectedYYYYMMDD(yyyymmdd);
    };
    return (
        <div>
            <MonthSelector
                selectedYYYYMMDD={selectedYYYYMMDD}
                handleSelectedYYYYMMDDChange={handleSelectedYYYYMMDDChange}
            />
            SELECTED YYYYMMDD : {selectedYYYYMMDD}
            <br />
            SCEDULE ARRAY:
            {scheduleArray.map((scheduleObj) => (
                <div>
                    title: {scheduleObj.title}, startDay: {scheduleObj.startDay}, endDay : {scheduleObj.endDay},
                    isAllDay: {scheduleObj.isAllDay ? "true" : "false"}, startTime: {scheduleObj.startTime}, endTime:
                    {scheduleObj.endTime}
                </div>
            ))}
            <CalendarBody
                selectedYYYYMMDD={selectedYYYYMMDD}
                handleSelectedYYYYMMDDChange={handleSelectedYYYYMMDDChange}
                scheduleArray={scheduleArray}
                setScheduleArray={setScheduleArray}
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
