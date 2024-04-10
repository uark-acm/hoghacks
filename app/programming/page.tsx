/**
 * app/programming/page.tsx
 * 
 * Author: Alex Prosser
 * Date: 4/9/2024
 */

'use client';

import { basePath } from '@/helper.mjs';
import { parseCookies, writeCookies } from '@/src/utils';
import { NextPage } from 'next';
import { useState, useEffect, use } from 'react';

const test1Answers = [792584, 797727, 792964, 792534, 792088, 793803, 792518, 792601, 794884, 796491, 794380, 794357, 795110, 794369, 792778, 796420, 795314, 792619, 795510, 792664, 793223, 794697, 794944, 792146, 795213, 790224, 794011, 795137, 793672, 794991, 795160, 794020, 793374, 794248, 794881, 791621, 795553, 793935, 796576, 792807, 797007, 795893, 796219, 794857, 793529, 792504, 791299, 794905, 796687, 795258, 794274, 792423, 794115, 794998, 792304, 793804, 794593, 796357, 795821, 793739, 794199, 795798, 794884, 795877, 794788, 794100, 793793, 791605, 795740, 795904, 791571, 796129, 795334, 791667, 791984, 793234, 792357, 793697, 792194, 792368, 795161, 794056, 797664, 790498, 792856, 794884, 797384, 790201, 794668, 793117, 793653, 793213, 795455, 793385, 795608, 794913, 795441, 795439, 793900, 794742]; 

const ProgrammingContestPage: NextPage = () => {
    // The data attached to the user stored in the cookie
    const [userData, setUserData] = useState<Record<string, any>>();
    const [stage, setStage] = useState<number>(0);
    const [answer, setAnswer] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');
    const [completed, setCompleted] = useState<boolean>(false);

    // when client loaded, check the current data. if no data, attach default data
    useEffect(() => {
        const data = parseCookies(document.cookie);
        if (data.session === undefined) {
            // if no cookie is found, generate new default cookie
            const newData = {
                id: Math.floor(Math.random() * 100),
                completed: [false, false, false]
            };

            writeCookies(document, { session: btoa(JSON.stringify(newData)) });
            setUserData(newData);
        } else {
            // if cookie is found, load user data accordingly
            const newData = JSON.parse(atob(data.session));
            setCompleted(newData.completed.every((e: boolean) => e));
            setUserData(newData);
        }
    }, []);

    const moveStage = (direction: number) => {
        if (stage + direction >= 0 && stage + direction <= 2) {
            setAnswer('');
            setFeedback('');
            setStage(stage + direction);
        }
    }

    const submitAnswer = () => {
        setFeedback('Submitting...');
        setTimeout(() => {
            if (userData !== undefined && [test1Answers, test1Answers, test1Answers][stage][userData.id] == parseInt(answer)) {
                const completed = [userData.completed[0], userData.completed[1], userData.completed[2]];
                completed[stage] = true;
    
                if (completed.every(e => e)) setCompleted(true);
    
                const newData = {
                    id: userData.id,
                    completed
                }
    
                setFeedback('Correct Answer!');
                writeCookies(document, { session: btoa(JSON.stringify(newData)) });
                setUserData(newData);
            } else {
                setFeedback('Incorrect Answer!');
            }
        }, 750);
    }

    const tests = [
        <>
            {/* ~~~~~ Test 1 ~~~~~ */}
            <p className={'text-xl text-white text-center pressstart'}>Test #1</p>
            <br />

            <p>The first step, of course, is to build the scoreboard! Lots of technical advances means that you don&apos;t have to
            physically build the screen <abbr title={'you sadly put your crane away thinking when you will ever have a chance to use it'}>itself</abbr>.
            However, the screen sizes are not standard and overlap each other at some places, so you must figure out the total area
            that the screen takes up after installing. In the input, you have a list of rectangles that are defined by two
            points:</p>
            <p className={'text-center'}><i>(left, top) (right, bottom)</i></p>
            <br />

            <p>Each rectangle will be grid aligned and placed on positive integer spaces
            which means no floating points or rotations. Also, the grid doesn&apos;t have defined dimensions. For example:</p>
            <ul className={'text-center'}>
                <li>(2,2) (9,3)</li>
                <li>(2,0) (5,2)</li>
                <li>(1,1) (4,5)</li>
                <li>(2,6) (9,7)</li>
                <li>(3,4) (7,7)</li>
            </ul>
            <br />

            <p>will produce this grid (with each number representing which screen they belong to, with X meaning multiple screens):</p>
            <br />
            <ul className={'text-center'}>
                <li>. . 2 2 2 2 . . . . .</li>
                <li>. 3 X X X 2 . . . . .</li>
                <li>. 3 X X X X 1 1 1 1 .</li>
                <li>. 3 X X X 1 1 1 1 1 .</li>
                <li>. 3 3 X X 5 5 5 . . .</li>
                <li>. 3 3 X X 5 5 5 . . .</li>
                <li>. 3 X X X X 1 1 1 1 .</li>
                <li>. 3 X X X 1 1 1 1 1 .</li>
                <li>. . 4 X X X X X 4 4 .</li>
                <li>. . 4 X X X X X 4 4 .</li>
                <li>. . . . . . . . . . .</li>
            </ul>
            <br />
            <p className={'text-lg text-white text-center mb-[25px]'}>Given the screens&apos; dimensions, what is the total area that the scoreboard will take up?</p>
        </>,
        <>
            {/* ~~~~~ Test 2 ~~~~~ */}
            <div className={'text-white ml-[15%] mr-[15%] mt-5 bg-th-secondary p-5'}>
                <p className={'text-xl text-white text-center pressstart'}>Test #2</p>
                <br />

                <p>Great! Now that you have a big wall of pixels up, it is time to do something with them. The scoreboard uses a
                cryptic way of transporting the data from the controller to the actual screen, but luckily the code is already written
                for you. Each packet is sent as a string of letters, which can be sent and received by the system. For some reason, the company
                we contracted decided to send 10000 packets per message to the screen and the message sent is decided by searching each position
                for the least common letter. This is confusing so we have attached an example request. To confirm the connections work,
                you need to make sure the right message shows up. For example:</p>
                <br />

                <p className={'text-lg text-white text-center mb-[25px]'}>What is the word that shows up when searching for the least common letters?</p>
            </div>
        </>,
        <>
        {/* ~~~~~ Test 3 ~~~~~ */}
        <div className={'text-white ml-[15%] mr-[15%] mt-5 bg-th-secondary p-5'}>
            <p className={'text-xl text-white text-center pressstart'}>Test #3</p>
            <br />

            <p>Now that we have everything connected, it is time to run a full test on the system. This means that we need to check every
            pixel to see if any bulb or connection is busted. Thankfully, you can use the test that we have for these types of screens.
            The test checks for a screen of 100 bulbs by 80 bulbs, and it all runs automatically. Using the controller API specified below,
            you can also check to see if the screen is working or not. The test consists of a list of commands telling to turn on or off a
            specific bulb. The grid is laid out where the top left is the origin, positive x is right, and positive y is down. For example:</p>
            <br />

            <p className={'text-lg text-white text-center mb-[25px]'}>What is displayed when all the instructions are done?</p>
        </div>
    </>
    ]

    return <>
        {/* ~~~~~ Intro ~~~~~ */}
        <div className={'text-white ml-[15%] mr-[15%] mt-5'}>
            <p className={'text-3xl text-th-primary text-center pressstart'}>HogHacks Programming Contest</p>
            <p className={'text-lg text-white text-center'}>Please read everything below before you get started!</p>
            <br />

            <p>Welcome, <b>young intern</b>! You have been placed in charged of installing the local sportsball team&apos;s scoreboard.
            They have entrusted us, the <i>Abbreviated Cereal Mooples</i>, to correctly build and test the scoreboard with
            no error or mistakes. So that is why we put all the effort and responsibility on you specifically! Don&apos;t worry,
            since this isn&apos;t the first time we are doing this, we have a series of <b>3</b> tests that we run to
            make sure that you are not messing up. To make sure that we don&apos;t get in trouble with any FCC or sports league&apos;s
            rulings, here are some rules to follow:</p>
            <br />

            <ul>
                <li>- You may work with any member of your team.</li>
                <li>- You may not use any generative AI or AI-assisted tool.</li>
                <li>- You can use any language as we are only looking for final answers.</li>
                <li>- Code will be reviewed manually after all puzzles are submitted.</li>
                <li>- The company can disqualify teams for any reasonable reason.</li>
            </ul>
            <br />

            <p className={'text-lg text-white text-center'}>Without further ado, let&apos;s specify the tests!</p>
            <br />
        </div>
        
        {
            completed && <>
                <p className={'text-xl text-th-primary text-center pressstart ml-[15%] mr-[15%]'}>You have completed the contest! Please DM &quot;Programming Pancakes&quot; to Alex Prosser on Discord to claim your team&apos;s prize!</p>
            </>
        }
        
        {
            (userData === undefined) ? <>
                {/* ~~~~~ Loading ~~~~~ */}
                <div className={'flex justify-center items-center'}>
                    <p className={'text-3xl pressstart text-white'}>Loading...</p>
                </div>
            </> : <>
                {/* ~~~~~ Tests ~~~~~ */}
                <div className={'text-white ml-[15%] mr-[15%] mt-5 bg-th-secondary p-5'}>
                    {tests[stage]}
                    <div className={'flex flex-col gap-y-3 justify-center items-center'}>
                        <p className={'text-s lg:text-xl text-th-primary pressstart'}><a download={'input.txt'} href={`${basePath}/inputs/test${stage + 1}/input${userData.id.toString().padStart(2, '0')}.txt`}>Download Input</a></p>
                        <input className={'w-[300px] text-lg text-black'} type={'text'} value={answer} onChange={e => { setAnswer(e.target.value) }} placeholder={'Answer...'}/>
                        <button
                            className={'bg-th-primary hover:bg-th-tertiary transition-colors p-2 text-lg rounded-lg pressstart'}
                            onClick={submitAnswer}>
                            Submit Answer
                        </button>
                        <p>{userData.completed[stage] ? 'You have completed this test!' : 'You have not completed this test!'}</p>
                        <p>{feedback}</p>
                    </div>
                </div>

                {/* ~~~~~ Test Navigation ~~~~~ */}
                <div className={'flex flex-row gap-x-10 mt-[25px] mb-[25px] justify-center items-center text-th-primary text-2xl pressstart underline'}>
                    <a onClick={() => moveStage(-1)}>Previous</a>
                    <a onClick={() => moveStage(1)}>Next</a>
                </div>
                
            </>
        }
    </>
}

export default ProgrammingContestPage;