import { create } from 'zustand'

interface AuthStore{
    isAuthenticated: boolean;
    setIsAuthenticated: (value:boolean)=>void;
    logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    // state getter
    isAuthenticated: false,

    // state setter
    setIsAuthenticated: (value) => set({isAuthenticated:value}),

    // logout method
    logout: () => set({ isAuthenticated: false })

}));

export default useAuthStore