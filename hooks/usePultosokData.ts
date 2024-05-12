import {useEffect, useState} from "react";
import {WorkingDaySchedule} from "../interfaces/WorkingDaySchedule";


export const usePultosokData = () => {
    const [workingDays, setWorkingDays] = useState<WorkingDaySchedule[]>([]);
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        fetch('http://176.31.93.249:25566/spreadsheet-data')
            .then(data => {
                if(!data.ok)
                    throw new Error('Response Failed');

                return data.json();
            })
            .then(data => {
                const arr = data;
                if(!Array.isArray(arr))
                    throw new Error('Invalid Response (err 12425)')

                setWorkingDays(arr)
            })
            .catch(err => {
                console.error(err)
            })
    }, [counter])

    return {workingDays};
}