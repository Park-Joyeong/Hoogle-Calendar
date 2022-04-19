import React, { WheelEvent } from "react";
import { MONTHS } from "./months";
import "../../../css/calendar-body.css";
import ScheduleModal from "./ScheduleModal";

export interface Props {
    selectedYYYYMM: string;
    handleSelectedYYYYMMChange: (yyyymm: string) => void;
    scheduleArray: object[];
    handleScheduleArrayChange: (scheduleArray: []) => void;
}

const CalendarBody = ({ selectedYYYYMM, handleSelectedYYYYMMChange }: Props) => {
    const firstDay = 1;
    const weekdayIdxOfFirstDay = new Date(
        parseInt(selectedYYYYMM.substring(0, 4)),
        parseInt(selectedYYYYMM.substring(4, 6)) - 1,
        1,
    ).getDay(); // Sunday - Saturday : 0 - 6
    const lastDay = new Date(
        parseInt(selectedYYYYMM.substring(0, 4)),
        parseInt(selectedYYYYMM.substring(4, 6)),
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
                        toggleModal(!modalShown);
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
        const selectedYYYY = selectedYYYYMM.substring(0, 4);
        const selectedMM = selectedYYYYMM.substring(4, 6);
        const targetDate = new Date(parseInt(selectedYYYY), parseInt(selectedMM) - 1 + monthAddCount);
        handleSelectedYYYYMMChange(
            targetDate.getFullYear().toString() + (targetDate.getMonth() + 1).toString().padStart(2, "0"),
        );
    };

    const [modalShown, toggleModal] = React.useState(false);
    return (
        <div>
            <h1>
                {(MONTHS as any)[selectedYYYYMM.substring(4, 6)]}&nbsp;
                {selectedYYYYMM.substring(0, 4)}
            </h1>
            <table className="calendar-body-table" onWheel={handleOnWheel}>
                <tbody>{tableData}</tbody>
            </table>
            <ScheduleModal
                shown={modalShown}
                close={() => {
                    toggleModal(false);
                }}
            >
                <h1>Look! I'm inside the modal!</h1>
            </ScheduleModal>
        </div>
    );
};

export default CalendarBody;
