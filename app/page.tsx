'use client';

import { NextPage } from 'next';
import HeroCanvas from '@/components/hero-canvas';
import CountdownBar from '@/components/countdown-bar';
import styles from '@/styles/home.module.css';

const Home: NextPage = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return <>
        {/** ~~~~~ Hero Section ~~~~~ */}
        <div className={styles['hero-section']}>
            <HeroCanvas />

            <p className={'text-2xl lg:text-5xl mt-[25px] pressstart'}>HogHacks</p>
            <p className={'text-md lg:text-xl text-th-primary m-[15px] pressstart'}>UARK ACM Student Chapter presents...</p>
            <p className={'text-xl lg:text-4xl pressstart'}>Spring 2024 Hackathon!</p>
            <div className={styles['hero-image']}>
                <img src="/img/hoghacks-logo.png" />
            </div>
            
            <button className={'bg-th-primary hover:bg-th-secondary p-5 text-lg lg:text-3xl rounded-lg mb-[20px] pressstart'}>Register Now!</button>
        </div>

        <CountdownBar />

        {/** ~~~~~ HogHacks Explanation Section ~~~~~ */}
        <div className={'p-[25px]'}>
            <p className={'text-4xl text-center lg:text-left mb-[10px] pressstart'}>What is HogHacks?</p>
            <div className={'flex flex-row items-center justify-start ml-[40px] mr-[40px]'}>
                <div className={'text-lg text-right'}>
                    <p className={'mb-[10px]'}>HogHacks is a hack-a-thon hosted by the Association for Computing Machinery (ACM) at the University of Arkansas. It's an overnight software engineering competition that takes place every semester.</p>
                    <p className={'mb-[10px]'}>All students are welcome to take part regardless of school, education level, or major. All majors and backgrounds are welcome! Students have a chance to use their skills to create a collaborative project within 24 hours.</p>
                    <p className={'mb-[10px]'}>Teams compete to develop a working prototype to present in front of a panel of judges. Judges from different technical backgrounds are sourced from different companies across NWA.</p>
                    <button className={'bg-th-primary hover:bg-th-secondary p-5 text-2xl text-white rounded-lg mt-[20px] pressstart'}>Register Now!</button>
                </div>
            </div>
        </div>

        <div className={'p-[25px] bg-th-primary'}>
            <p className={'text-4xl text-white mb-[10px] pressstart'}>Event Schedule</p>
            <div className={'flex flex-row items-center ml-[40px] mr-[40px]'}>
                <div className={'text-xl'}>
                    TBD
                </div>
            </div>
        </div>

        <div className={'p-[25px]'}>
            <p className={'text-4xl mb-[10px] pressstart'}>Location</p>
            <div className={'flex flex-row items-center ml-[40px] mr-[40px]'}>
                <div className={'text-xl'}>
                    <p>J.B. Hunt Transport Services Inc. Center for Academic Excellence (JBHT) - Room 216</p>
                    <p>227 N. Harmon Ave.</p>
                    <p>Fayetteville, AR 72701</p>
                    <button className={'bg-th-primary hover:bg-th-secondary p-5 text-2xl text-white rounded-lg mt-[20px] pressstart'}>Get Directions</button>
                </div>
                <div className={styles['location-image']}>
                    <img src="/img/jbht-location.png" />
                </div>
            </div>
        </div>

        {/** ~~~~~ Footer ~~~~~ */}
        <div className={styles['footer']}>
            <p className={'text-s lg:text-xl mb-[10px] pressstart'}>For questions, ask on the Discord!</p>
            <a onClick={scrollToTop} className={'text-s lg:text-xl mb-[10px] hover:cursor-pointer pressstart'}>Back To Top ▲</a>
        </div>
    </>
}

export default Home;