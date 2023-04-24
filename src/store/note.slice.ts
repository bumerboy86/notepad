
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IState } from "../interfaces/IState";
import { noteApi } from "../api/NoteApi";
import { INotes } from "../interfaces/INotes";
import { INotesMessageDto } from "../interfaces/INotesMessageDto";

const nameSpace = 'notes';

export const addNewNote = createAsyncThunk(
    `${nameSpace}/addNote`,
    async (data: string) => {
        const response = await noteApi.addNote(data);
        return response?.name ? {id: response.name, message: data, performed: false} : null;
    }
)

export const getNotes = createAsyncThunk(
    `${nameSpace}/getNotes`,
    async () => {
        const response = await noteApi.getNotes();
        return response;
    }
)

export const editNotePerform = createAsyncThunk(
    `${nameSpace}/editNotePerform`,
    async (data: INotes) => {
        const response = await noteApi.editNotePerform(data);
        return response ? {...data, performed: response.performed} : null;
    }
)

export const editNoteText = createAsyncThunk(
    `${nameSpace}/editNoteText`,
    async (data: INotesMessageDto) => {
        const response = await noteApi.editNoteText(data);
        return response?.message ? data : null;
    }
)

export const deleteNote = createAsyncThunk(
    `${nameSpace}/deleteNote`,
    async (data: INotes) => {
        await noteApi.deleteNote(data);
        return data;
    }
)

const initialState: IState = {
    notes: [],
    loading: false,
    message: '',
    note: null,
    editValue: false,
    alert: false,
}

const notesSlice = createSlice({
    name: nameSpace,
    initialState,
    reducers: {
        clearMessage (state) {
            state.message = ''
        },
        showEdit(state, actions) {
            state.editValue = !state.editValue,
            state.note = actions.payload
        },
        showAlert(state, actions) {
            state.alert = !state.alert,
            state.note = actions.payload
        },
    },
    extraReducers:builder => {
        builder

        .addCase(addNewNote.pending, (state) => {
            state.loading = true;
        })
        .addCase(addNewNote.rejected, (state) => {
            state.loading = false;
        })        
        .addCase(addNewNote.fulfilled, (state, actions) => {
            state.loading = false;
            if (actions.payload !== null) {
                state.notes = [...state.notes, actions.payload]
            }
        })
        
        .addCase(getNotes.pending, (state) => {
            state.loading = true;
        })
        .addCase(getNotes.rejected, (state) => {
            state.loading = false;
        })        
        .addCase(getNotes.fulfilled, (state, actions) => {
            state.loading = false;
            if (actions.payload !== null) {
                const response = actions.payload;
                const arr: INotes[] = Object.keys(response).map(
                    key => {
                        return (
                            {id: key, message: response[key].message, performed: response[key].performed}
                        )
                    }
                )
                state.notes = arr;
            }
        })

        .addCase(editNotePerform.pending, (state) => {
            state.loading = true;
        })
        .addCase(editNotePerform.rejected, (state) => {
            state.loading = false;
        })        
        .addCase(editNotePerform.fulfilled, (state, actions) => {
            state.loading = false;
            if (actions.payload !== null) {
                state.notes = [...state.notes].map(item => {
                    if (item.id === actions.payload?.id) {
                        item.performed = actions.payload.performed
                    }
                    return item;
                })
            }
        })
        
        .addCase(deleteNote.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteNote.rejected, (state) => {
            state.loading = false;
            state.alert = false;
            state.note = null;
        })        
        .addCase(deleteNote.fulfilled, (state, actions) => {
            state.loading = false;
            if (actions.payload !== null) {
                state.notes = [...state.notes].filter(item => item.id !== actions.payload.id);
            }
            state.alert = !state.alert;
        })

        .addCase(editNoteText.pending, (state) => {
            state.loading = true;
        })
        .addCase(editNoteText.rejected, (state) => {
            state.loading = false;
        })        
        .addCase(editNoteText.fulfilled, (state, actions) => {
            state.loading = false;
            state.editValue = false;
            if (actions.payload !== null) {
                state.notes = [...state.notes].map(item => {
                    if (item.id === actions.payload?.id) {
                        item.message = actions.payload.message;
                    }
                    return item
                });
            }
        })
        
    }
})

export const { 
    clearMessage, showEdit, showAlert
 } = notesSlice.actions;
 
export default notesSlice.reducer;