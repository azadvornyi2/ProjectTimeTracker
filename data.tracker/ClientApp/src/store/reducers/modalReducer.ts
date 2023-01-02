import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModalContent, IModalState } from "../../models";

const initModal = () => {
    return {
        visible: false,
        modalContent: {
            title: '',
            component: null
        }
    } as IModalState
}

const modalSlice = createSlice({
    name: "modal",
    initialState: initModal(),
    reducers: {
        showModal(state, action: PayloadAction<IModalContent>){
            state.modalContent = {
                ...state.modalContent,
                title: action.payload.title,
                component: action.payload.component
            };
            state.visible = true;
            return state;
        },
        hideModal(state) {
            state.visible = false;
            state.modalContent = initModal().modalContent;
            return state;
        },
    }
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer