/**
 * app/page.tsx
 * 
 * The main page with the registration content, sponsors, map information, and a FAQ 
 * 
 * Author: Alex Prosser, Jack Norris, Jordi Castro
 * Date: 2/25/2025
 */

'use client';

import { NextPage } from 'next';
import { basePath } from '@/helper.mjs';
import { day1Schedule, day2Schedule, isRegistrationOpen, locationLink, mailingLink, registrationLink, discordLink, startDate, endDate, mapLocation, locationInformation } from '@/EDITME';
import HeroCanvas from '@/components/hero-canvas';
import CountdownBar from '@/components/countdown-bar';
import EventSchedule from '@/components/event-schedule';
import styles from '@/styles/home.module.css';
import SponsorBar from '@/components/sponsor-bar';
import { FAQ } from '@/components/faq';
import Link from 'next/link';

const Home: NextPage = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const goToLink = (link: string) => {
        return () => window.open(link, '_blank');
    }

    const currentDate = new Date();
    const hackathonSeason = `${currentDate.getMonth() <= 6 ? 'Spring' : 'Fall'} ${currentDate.getFullYear()}`;

    const day1Name = (new Date(startDate)).toLocaleDateString("en-us", {
        month: 'long',
        day: 'numeric'
    });

    const day2Name = (new Date(endDate)).toLocaleDateString("en-us", {
        month: 'long',
        day: 'numeric'
    });

    return <>        
        {/* ~~~~~ Hero Section ~~~~~ */}
        <div className={styles['hero-section']}>
            <HeroCanvas />

            <p className={'text-3xl lg:text-5xl mt-[25px] pressstart'}>HogHacks</p>
            <p className={'text-md lg:text-xl text-th-primary m-[15px] pressstart'}>UARK ACM Student Chapter presents...</p>
            <p className={'text-xl lg:text-4xl pressstart'}>{hackathonSeason} Hackathon!</p>
            <div className={`${styles['hero-image']} transition-all duration-500 ease-in-out`}>
                <img src={`${basePath}/img/hoghacks-logo.png`} alt="HogHacks Logo" />
            </div>
            
            <button
                className={'bg-th-primary hover:bg-th-secondary transition-all duration-300 p-5 text-lg lg:text-2xl rounded-lg mb-[20px] pressstart'}
                onClick={goToLink(isRegistrationOpen ? registrationLink : mailingLink)}>
                {isRegistrationOpen ? 'Register Now!' : 'Sign up for Updates!'}
            </button>
        </div>

        <CountdownBar />

        <div className={'lg:ml-[10%] lg:mr-[10%] text-white'}>
            {/* ~~~~~ Explanation and Registration  ~~~~~ */}
            <div className={'p-[25px]'}>
                <p className={'text-4xl text-center lg:text-left mb-[10px] pressstart'}>What is HogHacks?</p>
                <div className={'flex flex-row items-center justify-start ml-[40px] mr-[40px]'}>
                    <div className={'text-lg text-right'}>
                        <p className={'mb-[10px]'}>HogHacks is a hack-a-thon hosted by the Association for Computing Machinery (ACM) at the University of Arkansas. It&apos;s an overnight software engineering competition that takes place every semester.</p>
                        <p className={'mb-[10px]'}>All students are welcome to take part regardless of school, education level, or major. All majors and backgrounds are welcome! Students have a chance to use their skills to create a collaborative project within 24 hours.</p>
                        <p className={'mb-[10px]'}>Teams compete to develop a working prototype to present in front of a panel of judges. Judges from different technical backgrounds are sourced from different companies across NWA.</p>
                        <button
                            className={'bg-th-primary hover:bg-th-secondary transition-all duration-300 sm:p-5 p-3 text-md lg:text-2xl rounded-lg mb-[20px] pressstart'}
                            onClick={goToLink(isRegistrationOpen ? registrationLink : mailingLink)}>
                            {isRegistrationOpen ? 'Register Now!' : 'Sign up for Updates!'}
                        </button>
                    </div>
                </div>
            </div>

            {/* ~~~~~ Event Schedule ~~~~~ */}
            <div className={'p-[25px] bg-th-primary rounded-xl'}>
                <p className={'text-2xl lg:text-4xl text-white text-center lg:text-start mb-[25px] pressstart'}>Event Schedule</p>
                <div className={'flex flex-col items-center md:flex-row justify-around md:items-start'}>
                    <EventSchedule title={day1Name} events={day1Schedule} />
                    <EventSchedule title={day2Name} events={day2Schedule} />
                </div>
            </div>

            {/* ~~~~~ Location ~~~~~ */}
            <div className={'p-[25px]'}>
                <p className={'text-4xl mb-[10px] pressstart'}>Location</p>
                <div className={'flex flex-row items-center sm:ml-[40px] sm:mr-[40px] gap-x-6'}>
                    <div className={'text-sm sm:text-xl'}>
                        {
                            locationInformation.map(line => {
                                return <p key={line.substring(0, 10)}>{line}</p>
                            })
                        }
                        <button
                            className={'bg-th-primary hover:bg-th-secondary transition-colors px-2 py-3 sm:p-5 text-xs sm:text-md lg:text-xl rounded-lg mb-[20px] pressstart mt-4'}
                            onClick={goToLink(locationLink)}>
                            Get Directions
                        </button>
                    </div>
                    <div className={styles['location-image']}>
                        <iframe className='w-full max-w-96 aspect-square rounded-lg' src={mapLocation} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>

            {/* ~~~~~ FAQ ~~~~~ */}
            <div className={'p-[25px] bg-th-primary mb-[25px] rounded-xl'}>
                <p className={'text-4xl mb-[10px] pressstart'}>FAQ</p>
                <FAQ />
            </div>

            {/* ~~~~~ Sponsors ~~~~~ */}
            <div className={'p-[25px] mb-[25px]'}>
                <SponsorBar />
            </div>
        </div>

        {/* ~~~~~ Footer ~~~~~ */}
        <div className={'bg-th-primary text-white text-center py-2'}>
            <p className={'text-sm lg:text-lg mb-[10px] pressstart'}>For other questions, ask on the <a href={discordLink} className={'text-th-secondary hover:text-lilac-800 transition-all'}>Discord</a>!</p>
            <a onClick={scrollToTop} className={'text-xs lg:text-md mb-[10px] hover:cursor-pointer pressstart hover:text-th-secondary transition duration-500 ease-in-out delay-75'}>Back To Top ▲</a>
        </div>

        {/* ~~~~~ Discord ~~~~~ */}
        <Link
            className='group/discord fixed right-4 bottom-4 w-12 h-12 rounded-full transition-all'
            href={discordLink}
        >
            <img className='rounded-full sm:group-hover/discord:animate-wobble group-hover/discord:scale-100 transition ease-out' src={`${basePath}/img/discord.png`} alt="Discord Logo" />
            <div
                className='fixed right-20 bottom-4 w-36 h-12 bg-neutral-700/60 rounded-xl opacity-0 transform translate-x-4 sm:group-hover/discord:opacity-100 group-hover/discord:translate-x-0 transition-all duration-500 ease-in-out flex justify-center items-center'
            >
                <p
                    className='text-white/90 text-sm'
                >
                    Join the Discord!
                </p>
            </div>
        </Link>


    </>
}

export default Home;