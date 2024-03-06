import { faqs } from '@/EDITME';
import { basePath } from '@/helper.mjs';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export const FAQ = () => {
    const [faqOpenState, setFaqOpenState] = useState<boolean[]>(new Array(faqs.length).fill(false));
    return faqs.map((faq, index) => {
        return (
            <div key={faq.question} className={twMerge('flex flex-col w-full m-4 overflow-hidden border-black border p-2 rounded-md')}>
                <div onClick={() => {const temp = faqOpenState.slice(0); temp[index] = !temp[index]; setFaqOpenState(temp)}} className='flex flex-row w-full items-center gap-2 hover:cursor-pointer'><img className={twMerge('h-4 w-4 rotate-180 transition-all duration-300', faqOpenState[index] && 'rotate-0')} src={`${basePath}/img/chevron.png`} /><p className='lg:text-lg'>Q: {faq.question}</p></div>
                {faqOpenState[index] && <p  className='p-3 lg:text-lg'>A: {faq.answer}</p>}
            </div>
        )
    })
}

