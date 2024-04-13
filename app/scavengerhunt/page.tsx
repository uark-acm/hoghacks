'use client';

import { basePath } from '@/helper.mjs';
import { useEffect, useState } from 'react';

const ScavengerHuntPage = () => {
    const [letter, setLetter] = useState<string>('notloaded');

    useEffect(() => {
        const params = new URL(document.location.href).searchParams;
        if (params.get('fd') !== null) setLetter(params.get('fd') as unknown as any);
    }, []);

    const getUnobfuscated = () => {
        if (letter == 'JKFKEJHFLKJDN') return 'S';
        if (letter == 'DJFUJHLKCHEUD') return 'P';
        if (letter == 'YBDMNESPDKEKN') return 'O';
        if (letter == 'HBATWHFDBDVMC') return 'R';
        if (letter == 'POEOEJDNNEJDA') return 'T';
        return '';
    }

    const getImageLink = () => {
        if (getUnobfuscated() == 'S') return 'https://media.tenor.com/IQQVfdxyOIQAAAAi/dancing-letter-letter.gif';
        if (getUnobfuscated() == 'P') return 'https://media.tenor.com/i9amW8b9cLgAAAAi/dancing-letter-letter.gif';
        if (getUnobfuscated() == 'O') return 'https://media.tenor.com/dkCwZF-ltCQAAAAi/dancing-letter-letter.gif';
        if (getUnobfuscated() == 'R') return 'https://media.tenor.com/C24-QePdofIAAAAi/dancing-letter-letter.gif';
        if (getUnobfuscated() == 'T') return 'https://media.tenor.com/4A0Nel-xOFYAAAAi/dancing-letter-letter.gif';
        return 'https://media1.tenor.com/m/yheo1GGu3FwAAAAd/rick-roll-rick-ashley.gif';
    }

    const getHint = () => {
        if (getUnobfuscated() == 'S') return <p>&quot;it will only take x steps to get to me&quot; - P</p>;
        if (getUnobfuscated() == 'P') return <p>&quot;(x, y + 10) marks the spot&quot; - O</p>;
        if (getUnobfuscated() == 'O') return <p>&quot;harry potter wants his rent&quot; - R</p>;
        if (getUnobfuscated() == 'R') return <p><img src={`${basePath}/img/chevron.png`}/> - T</p>;
        if (getUnobfuscated() == 'T') return <p>now go take a picture with all the qr codes and come find me - alex prosser</p>;
        return <p>this doesn&apos;t seem to help you...</p>
    }

    return <>
        <div className={'flex flex-col gap-y-5 justify-center items-center h-screen text-white'}>
            {
                (letter != 'notloaded') && <>
                    <img src={getImageLink()}/>{getHint()}
                </>
            }
        </div>
    </>
}

export default ScavengerHuntPage;