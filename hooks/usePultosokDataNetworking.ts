import {useEffect, useState} from "react";
import {WorkingDaySchedule} from "../interfaces/WorkingDaySchedule";

export const usePultosokDataNetworking = () => {
    const [workingDays, setWorkingDays] = useState<WorkingDaySchedule[]>();
    const [error, setError] = useState<{isError: boolean, errorMessage: string | undefined, isNetworkError: boolean}>({
        errorMessage: undefined,
        isError: false,
        isNetworkError: false
    });
    const [counter, setCounter] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        setIsRefreshing(true);

        fetch('https://kisvesszosi-munka-beosztas.mypremiumhost.tech/spreadsheet-data')
            // catch network error
            .catch(() => {
                setError({
                    isError: true,
                    errorMessage: 'Could not connect to the server.',
                    isNetworkError: true
                })
            })
            // set is refreshing to false
            .then((data) => {
                setIsRefreshing(false)
                return data;
            })
            // handle response error
            .then(data => {
                if(!data)
                    return;

                if(!('ok' in data))
                    return;

                if(!data.ok)
                    throw new Error('Error: ' + data.statusText);

                return data.json();
            })
            // handle success response
            .then(data => {
                if(data === undefined)
                    return;

                let arr = data.data;
                if(!Array.isArray(arr))
                    throw new Error('Invalid data format from server.')

                const schedules: WorkingDaySchedule[] = arr.map((d) : WorkingDaySchedule=> {
                    const date = new Date(d.date);

                    return {
                        ...d,
                        isNew: false,
                        dateStringShort: date.toLocaleDateString(undefined, { dateStyle: 'short' }),
                        dateStringLong: date.toLocaleDateString(undefined, { weekday: 'long' })
                    };
                })

                setWorkingDays(schedules);
                setError({
                    isError: false,
                    errorMessage: undefined,
                    isNetworkError: false,
                })
            })
            // handle error response
            .catch(err => {
                console.error(err);
                setError({
                    isError: true,
                    errorMessage: err,
                    isNetworkError: false
                })
            })
    }, [counter])

    function refresh() {
        setCounter(prev => prev + 1)
    }

    return {
        data: workingDays,
        isRefreshing,
        error,
        refresh: refresh,
    };
}