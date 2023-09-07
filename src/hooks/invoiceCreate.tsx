import {useEffect, useState} from "react";
import httpClient from "../services/httpClient";
import {invoicesUrl} from "../constants/endpoints";

interface UseInvoiceCreationInterface {
    updateInProgress: boolean,
    updateResult: any,
    updateError: Error | undefined
    createNewInvoice: (invoiceData) => Promise<any>
}

export const useInvoiceCreate = (): UseInvoiceCreationInterface => {
    const [updateInProgress, setUpdateInProgress] = useState(false)
    const [updateResult, setUpdateResult] = useState()
    const [updateError, setUpdateError] = useState<Error>()

    useEffect(() => {
        if (updateError) {
            setUpdateResult(undefined)
        }
    }, [updateError])


    useEffect(() => {
        if (updateResult) {
            setUpdateError(undefined)
        }
    }, [updateResult])

    const createNewInvoice = async (invoiceData: any) => {
        setUpdateInProgress(true)
        try {
            const response = await httpClient.post(invoicesUrl, invoiceData);
            setUpdateResult(response)
        } catch (e) {
            setUpdateError(e as Error)
        }
        setUpdateInProgress(false)
    }

    return {
        createNewInvoice, updateInProgress, updateError, updateResult
    }
}