/**
 * app/page.tsx
 * 
 * This page handles the judge's side of things where they can judge different projects and we can compile all the data to find the final results
 * 
 * This also handles an admin to create projects and assign judges without need to manually edit the Firebase database
 * 
 * Author: Alex Prosser, Jack Norris
 * Date: 4/4/2024
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
        {/* ~~~~~ MLH Banner ~~~~~ */}
        <div>
            <a id="mlh-trust-badge" className='right-0 md:right-[50px]' href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=white" target="_blank"><img src="https://s3.amazonaws.com/logged-assets/trust-badge/2024/mlh-trust-badge-2024-gray.svg" alt="Major League Hacking 2024 Hackathon Season" /></a>
        </div>
        
        {/* ~~~~~ Hero Section ~~~~~ */}
        <div className={styles['hero-section']}>
            <HeroCanvas />

            <p className={'text-3xl lg:text-5xl mt-[25px] pressstart'}>HogHacks</p>
            <p className={'text-md lg:text-xl text-th-primary m-[15px] pressstart'}>UARK ACM Student Chapter presents...</p>
            <p className={'text-xl lg:text-4xl pressstart'}>{hackathonSeason} Hackathon!</p>
            <div className={styles['hero-image']}>
                <img src={`${basePath}/img/hoghacks-logo.png`} alt="HogHacks Logo" />
            </div>
            
            <button
                className={'bg-th-primary hover:bg-th-secondary transition-colors p-3 text-lg lg:text-3xl rounded-lg mb-[20px] pressstart'}
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
                            className={'bg-th-primary hover:bg-th-secondary transition-colors p-5 text-md lg:text-2xl rounded-lg mb-[20px] pressstart'}
                            onClick={goToLink(isRegistrationOpen ? registrationLink : mailingLink)}>
                            {isRegistrationOpen ? 'Register Now!' : 'Sign up for Updates!'}
                        </button>
                    </div>
                </div>
            </div>

            {/* ~~~~~ Event Schedule ~~~~~ */}
            <div className={'p-[25px] bg-th-primary'}>
                <p className={'text-2xl lg:text-4xl text-white text-center lg:text-start mb-[25px] pressstart'}>Event Schedule</p>
                <div className={'flex flex-col lg:flex-row justify-around'}>
                    <EventSchedule title={day1Name} events={day1Schedule} />
                    <EventSchedule title={day2Name} events={day2Schedule} />
                </div>
            </div>

            {/* ~~~~~ Location ~~~~~ */}
            <div className={'p-[25px]'}>
                <p className={'text-4xl mb-[10px] pressstart'}>Location</p>
                <div className={'flex flex-row items-center ml-[40px] mr-[40px]'}>
                    <div className={'text-xl'}>
                        {
                            locationInformation.map(line => {
                                return <p>{line}</p>
                            })
                        }
                        <button
                            className={'bg-th-primary hover:bg-th-secondary transition-colors p-5 text-md lg:text-2xl rounded-lg mb-[20px] pressstart'}
                            onClick={goToLink(locationLink)}>
                            Get Directions
                        </button>
                    </div>
                    <div className={styles['location-image']}>
                        <iframe className='w-full max-w-96 aspect-square' src={mapLocation} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>

            {/* ~~~~~ FAQ ~~~~~ */}
            <div className={'p-[25px] bg-th-primary mb-[25px]'}>
                <p className={'text-4xl mb-[10px] pressstart'}>FAQ</p>
                <FAQ />
            </div>

            {/* ~~~~~ Sponsors ~~~~~ */}
            <div className={'p-[25px] mb-[25px]'}>
                <p className={'text-2xl lg:text-4xl text-white text-center lg:text-start mb-[25px] pressstart'}>Thank You to our Sponsors!</p>
                <SponsorBar />
            </div>
        </div>

        {/* ~~~~~ Footer ~~~~~ */}
        <div className={'bg-th-primary text-white text-center'}>
            <p className={'text-s lg:text-xl mb-[10px] pressstart'}>For other questions, ask on the <a href={discordLink} className={'text-th-secondary'}>Discord</a>!</p>
            <p className='text-s lg:text-xl text-th-secondary pressstart'><a href='http://hackp.ac/coc'>MLH Code of Conduct</a></p>
            <a onClick={scrollToTop} className={'text-s lg:text-xl mb-[10px] hover:cursor-pointer pressstart'}>Back To Top ▲</a>
        </div>
    </>
}

export default Home;