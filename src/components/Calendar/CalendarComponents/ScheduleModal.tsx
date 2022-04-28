import React, { useState } from "react";
import "../../../css/month-selector.css";

type Props = {
    children: React.ReactNode;
    shown: boolean;
    close(): void;
};

const ScheduleModal: React.FunctionComponent<Props> = ({ children, shown, close }) => {
    return shown ? (
        <div
            className="modal-backdrop"
            onClick={() => {
                // close modal when outside of modal is clicked
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
                <div className="content-header">
                    <button className="close-btn" onClick={close}>
                        Close
                    </button>
                </div>
                {children}
            </div>
        </div>
    ) : null;
};

export default ScheduleModal;
