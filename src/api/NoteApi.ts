import { INotes } from '../interfaces/INotes';
import { INotesMessageDto } from '../interfaces/INotesMessageDto';
import { IResponse } from '../interfaces/IResponse';
import { IResponseNotes } from '../interfaces/IResponseNotes';
import {dataBaseInstans} from './instanses';

class NoteApi {
    public addNote = async (data: string): Promise<IResponse | null> => {
        try {
            const response = await dataBaseInstans.post(`notes.json`, {message: data, performed: false});
            return response.data;
        } catch (error) {
            return null;
        }
    }

    public getNotes = async (): Promise<IResponseNotes | null> => {
        try {
            const response = await dataBaseInstans.get(`notes.json`);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    public editNotePerform = async (data: INotes): Promise<{performed: boolean} | null> => {
        try {
            const response = await dataBaseInstans.patch(`notes/${data.id}.json`, {performed: !data.performed});
            return response.data;
        } catch (error) {
            return null;
        }
    }

    public editNoteText = async (data: INotesMessageDto): Promise<{message: string} | null> => {
        try {
            const response = await dataBaseInstans.patch(`notes/${data.id}.json`, {message: data.message});
            return response.data;
        } catch (error) {
            return null;
        }
    }

    public deleteNote = async (data: INotes): Promise<null> => {
        try {
            const response = await dataBaseInstans.delete(`notes/${data.id}.json`);
            return response.data;
        } catch (error) {
            return null;
        }
    }

}

export const noteApi = new NoteApi();