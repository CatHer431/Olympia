import React from "react";
import { toast } from "react-toastify";
import { TOAST_POSITION, TOAST_TYPE } from "constants/global";

function MessageContent({ message, type }) {
    const icon = () => {
        switch (type) {
            case TOAST_TYPE.SUCCESS:
                return (<i className="bx bxs-check-circle me-2" style={{ color: "#57ad23" }} />);

            case TOAST_TYPE.ERROR:
                return (<i className="bx bx-error-circle me-2" style={{ color: "#d45058" }} />);
            case TOAST_TYPE.WARN:
                return (<i className="bx bx-error-circle me-2" style={{ color: "#d45058" }} />);
            case TOAST_TYPE.INFO:
                return (<i className="bx bx-info-circle me-2" style={{ color: "#f19d42" }} />);

            default:
                return null;
        }
    };
    const title = () => {
        switch (type) {
            case TOAST_TYPE.SUCCESS:
                return "Success";
            case TOAST_TYPE.ERROR:
                return "Error";
            case TOAST_TYPE.WARN:
                return "Alert";
            case TOAST_TYPE.INFO:
                return "Information";
            default:
                return "";
        }
    };

    return (
        <div className="toast-container d-flex align-items-center">
            {icon()}
            <div className="content">
                <div>
                    {title()}
                </div>
                <div>{message}</div>
            </div>
        </div>
    );
}

const useToast = () => (message, onclose, type = TOAST_TYPE.SUCCESS, position = TOAST_POSITION.TOP_RIGHT) => {
    const toastFunc = type ? toast[type] : toast;
    const options = {
        position,
        closeButton: false,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onclose: typeof onclose === "function" ? onclose() : () => { },
        icon: false
    };
    if (type) {
        toastFunc(<MessageContent message={message} type={type} />, options);
    }
    if (!type) {
        toast(message, options);
    }
};

export default useToast;
