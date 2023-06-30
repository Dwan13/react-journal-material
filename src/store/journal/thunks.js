import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      imageUrls:[],
      date: new Date().getTime(),
    };
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    const setDocRESP = await setDoc(newDoc, newNote);
    console.log(newDoc, setDocRESP);
    newNote.id = newDoc.id;
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};
export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};
export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files =[]) =>{
  return async (dispatch, getState) => {
    dispatch(setSaving());//bloquear botones
    //console.log(files);
    //await fileUpload(files[0]);
    const fileUploadPrimises = [];//envio todas en simultaneo
    for (const file of files) {
        fileUploadPrimises.push(fileUpload(file));
    }
    const photosUlrs = await Promise.all(fileUploadPrimises);
    console.log(photosUlrs);
    dispatch(setPhotosToActiveNote(photosUlrs));
  };
}

export const startDeletingNote = () =>{
  return async (dispatch, getState) => {
   const {uid} = getState().auth;
   const {active: note} = getState().journal; 
   const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
   const resp = await deleteDoc(docRef);
   dispatch(deleteNoteById(note.id));
  };
}