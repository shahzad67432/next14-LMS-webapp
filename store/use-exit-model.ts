import {create} from 'zustand'

type exitModelState = {
    isOpen: boolean
    open: () => void
    close: () => void
}

export const useExitModel = create<exitModelState>((set)=>({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false})
}))