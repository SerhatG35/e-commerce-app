import { createContext, Dispatch, SetStateAction, useContext } from "react";

export enum ModalState {
    LOGIN,
    SIGNUP,
}

export type ModalContextTypes = {
    modal: ModalState | undefined;
    setModal: Dispatch<SetStateAction<ModalState | undefined>>;
};

const ModalContext = createContext<ModalContextTypes | undefined>(undefined);

export const useModal = () => useContext(ModalContext);

export default ModalContext;
