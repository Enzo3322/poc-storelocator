import { createContext, ReactElement, ReactNode, useEffect, useState } from 'react'

interface IStoreContext {

}

export const StoreContext = createContext<IStoreContext | null>(null)

const StoreContextProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const [selectedState, setSelectedState] = useState()
    const [selectedCity, setSelectedCity] = useState()
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <StoreContext.Provider value={{}}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider