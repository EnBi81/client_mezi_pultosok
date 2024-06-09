import {createContext} from "react";

interface ApkUpdateContextInterface {
    latestApkVersion: string | undefined,
    isUpdateAvailable: boolean,
    downloadAndInstall: () => void,
    install: () => void,
    isDownloading: boolean,
    isDownloadCompleted: boolean,
    downloadPercent: number | undefined,
}

export const DefaultApkUpdateContext: ApkUpdateContextInterface = {
    install: () => {},
    downloadAndInstall: () => {},
    downloadPercent: 0,
    isDownloadCompleted: false,
    isUpdateAvailable: false,
    isDownloading: false,
    latestApkVersion: undefined
}

export const ApkUpdateContext = createContext<ApkUpdateContextInterface>(DefaultApkUpdateContext)