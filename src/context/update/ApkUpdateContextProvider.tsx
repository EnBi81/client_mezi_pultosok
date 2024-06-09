import {ApkUpdateContext} from './ApkUpdateContext'
import {useApkUpdaterContextHook} from "./useApkUpdatedContextHook";

export const ApkUpdateContextProvider = ({children}: {children: React.ReactNode}) =>{
    const updater = useApkUpdaterContextHook()
    return <ApkUpdateContext.Provider value={updater}>{children}</ApkUpdateContext.Provider>
}