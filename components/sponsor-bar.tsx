'use client';

import { sponsors } from '@/EDITME';
import { basePath } from '@/helper.mjs';

//TODO: pretty hacky fix for images with links, might want to add something else

//TODO: add in some scaling for the images

const SponsorBar = () => {
    return <div className={'flex flex-col text-white text-center'}>
        {
            sponsors.map(tier => {
                return <div key={tier.name.toLowerCase()}>
                    <p style={{ color: tier.color}} className={`text-lg lg:text-2xl pressstart`}>{tier.name}</p>
                    <div className={'flex flex-col lg:flex-row items-center lg:justify-center p-[25px]'}>
                        {
                            tier.images.map(image => {
                                return typeof image === 'string' ? <img className={'max-w-[66%] lg:max-w-[33%]'} src={`${basePath}/${image}`} key={`image-${image}`} /> :  <a className={'max-w-[66%] lg:max-w-[33%]'} href={image.link}><img src={`${basePath}/${image.src}`} key={`image-${image.src}`} /></a>
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