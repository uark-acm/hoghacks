/**
 * components/sponsor-bar.tsx
 * 
 * Allows the addition of sponsor tiers and sponsor as well as information to reach out for sponsorships
 * 
 * Author: Alex Prosser, Jordi Castro
 * Date: 2/25/2025
 */

'use client';

import { sponsors } from '@/EDITME';
import { basePath } from '@/helper.mjs';

const SponsorBar = () => {
    return <div className={'flex flex-col text-white text-center'}>
        {
            sponsors.map(tier => {
                return <div key={tier.name.toLowerCase()}>
                    <p style={{ color: tier.color}} className={`text-lg lg:text-2xl pressstart`}>{tier.name}</p>
                    <div className={'flex flex-col lg:flex-row items-center lg:justify-center p-[25px]'}>
                        {
                            tier.images.map(image => {
                                let width = 'max-w-[66%] lg:max-w-[33%]'
                                if (tier.name == 'Bronze') width = 'max-w-[25%] lg:max-w-[15%]'
                                return <img className={width} src={`${basePath}/${image}`} key={`image-${image}`} /> 
                            })
                        }
                    </div>
                </div>
            })
        }
        <p className={'text-xl lg:text-3xl text-white text-center mb-[25px] pressstart'}>Interested In Sponsoring This Event?</p>
        <div
            className='flex flex-row items-center justify-center gap-x-2' 
        >
            <p
                className='text-white text-center'
            >
                Reach out to alprosse@uark.edu!
            </p>
        </div>
    </div>
}

export default SponsorBar;