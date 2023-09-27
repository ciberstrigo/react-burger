import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type {RootState} from './store'
import {ThunkDispatch} from "redux-thunk";
import {TActionsTypes} from "./types";

export const useAppDispatch: (() => ThunkDispatch<RootState, unknown, TActionsTypes>) = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector