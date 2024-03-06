'use client';

import { NextPage } from 'next';
import { basePath } from '@/helper.mjs';
import { day1Schedule, day2Schedule, isRegistrationOpen, locationLink, mailingLink, registrationLink, discordLink, startDate, endDate } from '@/EDITME';
import HeroCanvas from '@/components/hero-canvas';
import CountdownBar from '@/components/countdown-bar';
import EventSchedule from '@/components/event-schedule';
import styles from '@/styles/home.module.css';
import SponsorBar from '@/components/sponsor-bar';

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

            <p className={'text-4xl lg:text-5xl mt-[25px] pressstart'}>HogHacks</p>
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
                <div className={'flex flex-col lg:flex-row justify-around ml-[15%] mr-[15%]'}>
                    <EventSchedule title={day1Name} events={day1Schedule} />
                    <EventSchedule title={day2Name} events={day2Schedule} />
                </div>
            </div>

            <div className={'p-[25px]'}>
                <p className={'text-4xl mb-[10px] pressstart'}>Location</p>
                <div className={'flex flex-row items-center ml-[40px] mr-[40px]'}>
                    <div className={'text-xl'}>
                        <p>Hillside Auditorium (HILL) Room 206</p>
                        <p>902 W Dickson St</p>
                        <p>Fayetteville, AR 72701</p>
                        <button
                            className={'bg-th-primary hover:bg-th-secondary transition-colors p-5 text-md lg:text-2xl rounded-lg mb-[20px] pressstart'}
                            onClick={goToLink(locationLink)}>
                            Get Directions
                        </button>
                    </div>
                    <div className={styles['location-image']}>
                        <iframe className='w-full max-w-96 aspect-square' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3225.084495124262!2d-94.17564222348403!3d36.06704310868277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c96ee74061304d%3A0x5bb6345c4e6ff9cf!2sHillside%20Auditorium!5e0!3m2!1sen!2sus!4v1708554171130!5m2!1sen!2sus" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>

            {/* ~~~~~ Sponsors ~~~~~ */}
            <div className={'p-[25px] bg-th-primary mb-[25px]'}>
                <p className={'text-2xl lg:text-4xl text-white text-center lg:text-start mb-[25px] pressstart'}>Thank You to our Sponsors!</p>
                <SponsorBar />
            </div>
        </div>

        {/* ~~~~~ Footer ~~~~~ */}
        <div className={'bg-[#cccccc] text-th-background text-center'}>
            <p className={'text-s lg:text-xl mb-[10px] pressstart'}>For other questions, ask on the <a href={discordLink} className={'text-th-primary'}>Discord</a>!</p>
            <p className='text-s lg:text-xl text-blue-500 underline'><a href='http://hackp.ac/coc'>MLH Code of Conduct</a></p>
            <a onClick={scrollToTop} className={'text-s lg:text-xl mb-[10px] hover:cursor-pointer pressstart'}>Back To Top ▲</a>
        </div>
    </>
}

export default Home;