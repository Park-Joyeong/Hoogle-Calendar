import React, { WheelEvent, useState } from "react";
import { MONTHS } from "./months";
import "../../../css/calendar-body.css";
import ScheduleModal from "./ScheduleModal";

export interface Props {
    selectedYYYYMMDD: string;
    handleSelectedYYYYMMDDChange: (yyyymmdd: string) => void;
    scheduleArray: object[];
    handleScheduleArrayChange: (scheduleArray: object[]) => void;
}

interface ScheduleObject {
    title: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
}

const CalendarBody = ({
    selectedYYYYMMDD,
    handleSelectedYYYYMMDDChange,
    scheduleArray,
    handleScheduleArrayChange,
}: Props) => {
    const firstDay = 1;
    const weekdayIdxOfFirstDay = new Date(
        parseInt(selectedYYYYMMDD.substring(0, 4)),
        parseInt(selectedYYYYMMDD.substring(4, 6)) - 1,
        1,
    ).getDay(); // Sunday - Saturday : 0 - 6
    const lastDay = new Date(
        parseInt(selectedYYYYMMDD.substring(0, 4)),
        parseInt(selectedYYYYMMDD.substring(4, 6)),
        0,
    ).getDate();
    const tableData: JSX.Element[] = [];
    const setTableData = () => {
        let rowData = [];
        let weekdayIdx = weekdayIdxOfFirstDay;
        let emptySlotCount = 0;
        while (emptySlotCount < weekdayIdx) {
            rowData.push(<td key={`Upper_Slot_${emptySlotCount}`} className="calendar-body-td"></td>);
            emptySlotCount++;
        }
        for (let i = firstDay; i <= lastDay; i++) {
            rowData.push(
                <td
                    key={i}
                    className="calendar-body-td"
                    onClick={() => {
                        handleSelectedYYYYMMDDChange(selectedYYYYMMDD.substring(0, 6) + i.toString().padStart(2, "0"));
                        toggleModal(true);
                    }}
                >
                    {i}
                </td>,
            );
            weekdayIdx++;
            if (weekdayIdx === 7) {
                tableData.push(<tr key={i}>{rowData}</tr>);
                rowData = [];
                weekdayIdx = 0;
            } else if (i === lastDay) {
                emptySlotCount = 0;
                while (weekdayIdx < 7) {
                    rowData.push(<td key={`Lower_Slot_${emptySlotCount}`} className="calendar-body-td"></td>);
                    weekdayIdx++;
                    emptySlotCount++;
                }
                tableData.push(<tr key={i}>{rowData}</tr>);
            }
        }
    };
    setTableData();

    const handleOnWheel = (e: WheelEvent<HTMLDivElement>) => {
        const isWheelUp = e.deltaY < 0 ? true : false;
        const monthAddCount = isWheelUp ? -1 : 1;
        const selectedYYYY = selectedYYYYMMDD.substring(0, 4);
        const selectedMM = selectedYYYYMMDD.substring(4, 6);
        const targetDate = new Date(parseInt(selectedYYYY), parseInt(selectedMM) - 1 + monthAddCount);
        handleSelectedYYYYMMDDChange(
            targetDate.getFullYear().toString() + (targetDate.getMonth() + 1).toString().padStart(2, "0") + "01",
        );
    };

    const [modalShown, toggleModal] = useState(false);
    return (
        <div>
            <h1>
                {(MONTHS as any)[selectedYYYYMMDD.substring(4, 6)]}&nbsp;
                {selectedYYYYMMDD.substring(0, 4)}
            </h1>
            <table className="calendar-body-table" onWheel={handleOnWheel}>
                <tbody>{tableData}</tbody>
            </table>
            <ScheduleModal
                shown={modalShown}
                close={() => {
                    toggleModal(false);
                }}
                save={() => {
                    handleScheduleArrayChange(
                        scheduleArray.concat({
                            title: scheduleObject.title,
                            startDate: scheduleObject.startDate,
                            startTime: scheduleObject.startTime,
                            endDate: scheduleObject.endDate,
                            endTime: scheduleObject.endTime,
                        }),
                    );
                }}
            >
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Title: <input type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Start: <input type="text" placeholder="YYYY" value={selectedYYYYMMDD.substring(0, 4)} />
                                -<input type="text" placeholder="MM" value={selectedYYYYMMDD.substring(4, 6)} />
                                -<input type="text" placeholder="DD" value={selectedYYYYMMDD.substring(6, 8)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                End: <input type="text" placeholder="YYYY" />-<input type="text" placeholder="MM" />-
                                <input type="text" placeholder="DD" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </ScheduleModal>
        </div>
    );
};

export default CalendarBody;
