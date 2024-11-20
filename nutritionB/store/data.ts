import { create } from 'zustand'

export type User = {
    nome: string;
    peso: string;
    altura: string;
    idade: string;
    sexo: string;
    nivel: string;
    objetivo: string;
}

type DataState = {
    user: User
    setPageOne: (data: Omit<User, "sexo" | "objetivo" | "nivel">) => void;
    setPageTwo: (data: Pick<User, "sexo" | "objetivo" | "nivel">) => void;
}

export const useDataStore = create<DataState>((set) => ({
    user: {
        nome: '',
        peso: '',
        altura: '',
        idade: '',
        sexo: '',
        nivel: '',
        objetivo: '',
    }, 
    setPageOne: (data) => set((state) => ({user: {...state.user, ...data}})),
    setPageTwo: (data) => set((state) => ({user: {...state.user, ...data}}))
}))