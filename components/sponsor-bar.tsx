'use client';

import { sponsors } from '@/EDITME';
import { basePath } from '@/helper.mjs';

// TODO: add in some scaling for the images

const SponsorBar = () => {
    return <div className={'flex flex-col text-white text-center'}>
        {
            sponsors.map(tier => {
                return <div key={tier.name.toLowerCase()}>
                    <p style={{ color: tier.color}} className={`text-lg lg:text-2xl pressstart`}>{tier.name}</p>
                    <div className={'flex flex-col lg:flex-row items-center lg:justify-center p-[25px]'}>
                        {
                            tier.images.map(image => {
                                if (typeof image === 'string') {
                                    return <img className={'max-w-[66%] lg:max-w-[33%]'} src={`${basePath}/${image}`} key={`image-${image}`} /> 
                                } else {
                                    return <a className={'max-w-[66%] lg:max-w-[33%]'} href={image.link} key={`image-${image.src}`}>
                                        <img src={`${basePath}/${image.src}`} />
                                    </a>
                                }
                            })
                        }
                    </div>
                </div>
            })
        }
        <p className={'text-lg'}>For any sponsorship inquiries, please contact jtn006@uark.edu.</p>
    </div>
}

export default SponsorBar;