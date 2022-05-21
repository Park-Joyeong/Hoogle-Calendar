import React, { WheelEvent, useState } from "react";
import { MONTHS } from "./months";
import "../../../css/calendar-body.css";
import ScheduleModal from "./ScheduleModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface Props {
    selectedYYYYMMDD: string;
    handleSelectedYYYYMMDDChange: (yyyymmdd: string) => void;
    scheduleArray: {
        title: string;
        startDay: string;
        endDay: string;
        isAllDay: boolean;
        startTime: string;
        endTime: string;
    }[];
    setScheduleArray: (
        scheduleArray: {
            title: string;
            startDay: string;
            endDay: string;
            isAllDay: boolean;
            startTime: string;
            endTime: string;
        }[],
    ) => void;
}

const CalendarBody = ({ selectedYYYYMMDD, handleSelectedYYYYMMDDChange, scheduleArray, setScheduleArray }: Props) => {
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
                        const selectedYYYY = selectedYYYYMMDD.substring(0, 4);
                        const selectedMM = selectedYYYYMMDD.substring(4, 6);
                        const selectedDD = i.toString().padStart(2, "0");
                        handleSelectedYYYYMMDDChange(selectedYYYY + selectedMM + selectedDD);
                        setModalStartDate(
                            new Date(parseInt(selectedYYYY), parseInt(selectedMM) - 1, parseInt(selectedDD)),
                        );
                        setModalEndDate(
                            new Date(parseInt(selectedYYYY), parseInt(selectedMM) - 1, parseInt(selectedDD)),
                        );
                        toggleModal(true);
                    }}
                >
                    <div key={i}>{i}</div>
                    {scheduleArray.map((scheduleObject) => {
                        const currDay = selectedYYYYMMDD.substring(0, 6) + i.toString().padStart(2, "0");
                        if (currDay >= scheduleObject.startDay && currDay <= scheduleObject.endDay) {
                            return <div>{scheduleObject.title}</div>;
                        }
                    })}
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

    const getSelectedDate = () => {
        const selectedYYYY = selectedYYYYMMDD.substring(0, 4);
        const selectedMM = selectedYYYYMMDD.substring(4, 6);
        const selectedDD = selectedYYYYMMDD.substring(6, 8);
        return new Date(parseInt(selectedYYYY), parseInt(selectedMM) - 1, parseInt(selectedDD));
    };

    const [modalTitle, setModalTitle] = useState("");
    const [modalStartDate, setModalStartDate] = useState(getSelectedDate());
    const [modalStarthh, setModalStarthh] = useState("00");
    const [modalStartmm, setModalStartmm] = useState("00");
    const [modalEndDate, setModalEndDate] = useState(getSelectedDate());
    const [modalEndhh, setModalEndhh] = useState("24");
    const [modalEndmm, setModalEndmm] = useState("00");
    const [isAllDay, toggleIsAllDay] = useState(true);

    const getYYYYMMDD = (inputDate: Date) => {
        const year = inputDate.getFullYear().toString();
        const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
        const day = inputDate.getDate().toString().padStart(2, "0");
        return year + month + day;
    };
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
                    const newObject = {
                        title: modalTitle,
                        startDay: getYYYYMMDD(modalStartDate),
                        endDay: getYYYYMMDD(modalEndDate),
                        isAllDay: isAllDay,
                        startTime: modalStarthh + modalStartmm,
                        endTime: modalEndhh + modalEndmm,
                    };
                    setScheduleArray([...scheduleArray, newObject]);
                    setModalTitle("");
                    toggleIsAllDay(true);
                    setModalStarthh("00");
                    setModalStartmm("00");
                    setModalEndhh("00");
                    setModalEndmm("00");
                    toggleModal(false);
                }}
            >
                <table className="modal-table">
                    <tbody>
                        <tr>
                            <td>
                                Title:
                                <input type="text" value={modalTitle} onChange={(e) => setModalTitle(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Start:
                                <button onClick={() => toggleIsAllDay(!isAllDay)}>
                                    {isAllDay ? "Add Time" : "All day"}
                                </button>
                                <DatePicker
                                    selected={modalStartDate}
                                    onChange={(date: Date) => setModalStartDate(date)}
                                />
                                <select hidden={isAllDay}>
                                    <option value="00">00</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                </select>
                                <select hidden={isAllDay}>
                                    <option value="00">00</option>
                                    <option value="15">15</option>
                                    <option value="30">30</option>
                                    <option value="45">45</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                End:
                                <DatePicker selected={modalEndDate} onChange={(date: Date) => setModalEndDate(date)} />
                                <select hidden={isAllDay}>
                                    <option value="00">00</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                </select>
                                <select hidden={isAllDay}>
                                    <option value="00">00</option>
                                    <option value="15">15</option>
                                    <option value="30">30</option>
                                    <option value="45">45</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </ScheduleModal>
        </div>
    );
};

export default CalendarBody;
