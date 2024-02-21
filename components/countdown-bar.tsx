'use client';

import { useEffect, useState } from 'react';
import { countdownEndTime, endDate, startDate } from '../EDITME';

const CountdownBar = () => {
    const startTime = new Date(`${startDate} ${countdownEndTime}`).getTime();

    const calculateTimeLeft = (): string => {
        const diff = startTime - new Date().getTime();

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return 'Currently Happening!';
        }
    }

    const [timestamp, setTimestamp] = useState<string>(calculateTimeLeft());
    const dateRange = (new Date(startDate)).toLocaleDateString("en-us", {
        month: 'long',
        day: 'numeric'
    }) + ' & ' + new Date(endDate).getDate();

    useEffect(() => {
        setTimeout(() => {
            setTimestamp(calculateTimeLeft());
        }, 1000);
    });

    let percentage = (startTime - new Date().getTime()) / (1000 * 60 * 60 * 24 * 64); // how close over 64 days
    const backgroundGradient = {
        background: `linear-gradient(to right, var(--tertiary) ${percentage * 100}%, var(--secondary) 0%)`
    };

    return <div suppressHydrationWarning style={backgroundGradient} className={'h-[15vh] lg:pl-[10%] flex flex-col justify-center items-center text-center text-xl lg:text-3xl text-white lg:items-start pressstart'}>
        <p suppressHydrationWarning>{timestamp}</p>
        <p>{dateRange} <span className={'text-th-primary'}>{new Date(startDate).getFullYear()}</span></p>  
    </div>
}

export default CountdownBar;