import React, { useState } from "react";
import "../../../css/month-selector.css";

type Props = {
    children: React.ReactNode;
    shown: boolean;
    close(): void;
    save(): void;
};

const ScheduleModal: React.FunctionComponent<Props> = ({ children, shown, close, save }) => {
    return shown ? (
        <div
            className="modal-backdrop"
            onClick={() => {
                close();
            }}
        >
            <div
                className="modal-content"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}
            >
                {children}
                <div className="content-header">
                    <button className="save-btn" onClick={save}>
                        Save
                    </button>
                    <button className="close-btn" onClick={close}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default ScheduleModal;
