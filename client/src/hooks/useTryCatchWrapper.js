import useToast from "./useToast";

const useTryCatchWrapper = (func) => async (...args) => {
    const showToast = useToast;

    const tryCatchWrapper = async () => {
        try {
            return await func(...args);
        } catch (error) {
            const { message } = error;
            showToast("error", message);
        }
        return null;
    };

    return tryCatchWrapper();
};

export default useTryCatchWrapper;
