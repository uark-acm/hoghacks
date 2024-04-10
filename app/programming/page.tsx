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

const imageData = 'W1s3OTI1ODQsNzk3NzI3LDc5Mjk2NCw3OTI1MzQsNzkyMDg4LDc5MzgwMyw3OTI1MTgsNzkyNjAxLDc5NDg4NCw3OTY0OTEsNzk0MzgwLDc5NDM1Nyw3OTUxMTAsNzk0MzY5LDc5Mjc3OCw3OTY0MjAsNzk1MzE0LDc5MjYxOSw3OTU1MTAsNzkyNjY0LDc5MzIyMyw3OTQ2OTcsNzk0OTQ0LDc5MjE0Niw3OTUyMTMsNzkwMjI0LDc5NDAxMSw3OTUxMzcsNzkzNjcyLDc5NDk5MSw3OTUxNjAsNzk0MDIwLDc5MzM3NCw3OTQyNDgsNzk0ODgxLDc5MTYyMSw3OTU1NTMsNzkzOTM1LDc5NjU3Niw3OTI4MDcsNzk3MDA3LDc5NTg5Myw3OTYyMTksNzk0ODU3LDc5MzUyOSw3OTI1MDQsNzkxMjk5LDc5NDkwNSw3OTY2ODcsNzk1MjU4LDc5NDI3NCw3OTI0MjMsNzk0MTE1LDc5NDk5OCw3OTIzMDQsNzkzODA0LDc5NDU5Myw3OTYzNTcsNzk1ODIxLDc5MzczOSw3OTQxOTksNzk1Nzk4LDc5NDg4NCw3OTU4NzcsNzk0Nzg4LDc5NDEwMCw3OTM3OTMsNzkxNjA1LDc5NTc0MCw3OTU5MDQsNzkxNTcxLDc5NjEyOSw3OTUzMzQsNzkxNjY3LDc5MTk4NCw3OTMyMzQsNzkyMzU3LDc5MzY5Nyw3OTIxOTQsNzkyMzY4LDc5NTE2MSw3OTQwNTYsNzk3NjY0LDc5MDQ5OCw3OTI4NTYsNzk0ODg0LDc5NzM4NCw3OTAyMDEsNzk0NjY4LDc5MzExNyw3OTM2NTMsNzkzMjEzLDc5NTQ1NSw3OTMzODUsNzk1NjA4LDc5NDkxMyw3OTU0NDEsNzk1NDM5LDc5MzkwMCw3OTQ3NDJdLFsiYWVyb2JpY3MiLCJiYXNlYmFsbCIsImNyb3NzZml0IiwiZHVtYmJlbGwiLCJmb290YmFsbCIsImhhbmRiYWxsIiwiaW50ZXJ2YWwiLCJrYXlha2luZyIsIm1hcmF0aG9uIiwib2x5bXBpY3MiLCJzd2ltbWluZyIsInNwcmludGVyIiwidGFja2xpbmciLCJzdHJldGNoeSIsImJhY2toYW5kIiwib3ZlcmhhbmQiLCJzaWRla2ljayIsImZyZWVraWNrIiwiaGVhZGdlYXIiLCJvdXRmaWVsZCIsImV4ZXJjaXNlIiwiYmFyYmVsbHMiLCJkaXN0YW5jZSIsImFjdGl2aXR5IiwicmVhY3Rpb24iLCJzdGFuZG91dCIsInN0cmF0ZWd5IiwidHJhaW5lcnMiLCJzaG9vdGluZyIsInBhc3NwbGF5Iiwic2xhbWR1bmsiLCJiYWNrc3BpbiIsImZyb250bWFuIiwiZ29hbHBvc3QiLCJob21lYmFzZSIsImp1bXByb3BlIiwia2lja2ZsaXAiLCJsaW5lc21hbiIsIm1hdGNoZGF5Iiwib3ZlcmdyaXAiLCJyZWJvdW5kcyIsImp1bXBzaG90IiwiZ29hbGtlZXAiLCJ5b2dhbGluZSIsInJpbmdzaWRlIiwiYWVyb2JpY3MiLCJiYXNlYmFsbCIsImNyb3NzZml0IiwiZHVtYmJlbGwiLCJmb290YmFsbCIsImhhbmRiYWxsIiwiaW50ZXJ2YWwiLCJrYXlha2luZyIsIm1hcmF0aG9uIiwib2x5bXBpY3MiLCJzd2ltbWluZyIsInNwcmludGVyIiwidGFja2xpbmciLCJzdHJldGNoeSIsImJhY2toYW5kIiwib3ZlcmhhbmQiLCJzaWRla2ljayIsImZyZWVraWNrIiwiaGVhZGdlYXIiLCJvdXRmaWVsZCIsImV4ZXJjaXNlIiwiYmFyYmVsbHMiLCJkaXN0YW5jZSIsImFjdGl2aXR5IiwicmVhY3Rpb24iLCJzdGFuZG91dCIsInN0cmF0ZWd5IiwidHJhaW5lcnMiLCJzaG9vdGluZyIsInBhc3NwbGF5Iiwic2xhbWR1bmsiLCJiYWNrc3BpbiIsImZyb250bWFuIiwiZ29hbHBvc3QiLCJob21lYmFzZSIsImp1bXByb3BlIiwia2lja2ZsaXAiLCJsaW5lc21hbiIsIm1hdGNoZGF5Iiwib3ZlcmdyaXAiLCJyZWJvdW5kcyIsImp1bXBzaG90IiwiZ29hbGtlZXAiLCJ5b2dhbGluZSIsInJpbmdzaWRlIiwiaG9tZWJhc2UiLCJqdW1wcm9wZSIsImtpY2tmbGlwIiwibGluZXNtYW4iLCJtYXRjaGRheSIsIm92ZXJncmlwIiwicmVib3VuZHMiLCJqdW1wc2hvdCIsImdvYWxrZWVwIiwieW9nYWxpbmUiXSxbImJhc2ViYWxsIiwiY3Jvc3NmaXQiLCJkdW1iYmVsbCIsImZvb3RiYWxsIiwiaGFuZGJhbGwiLCJpbnRlcnZhbCIsImtheWFraW5nIiwibWFyYXRob24iLCJvbHltcGljcyIsInN3aW1taW5nIiwic3ByaW50ZXIiLCJ0YWNrbGluZyIsInN0cmV0Y2h5IiwiYmFja2hhbmQiLCJvdmVyaGFuZCIsInNpZGVraWNrIiwiZnJlZWtpY2siLCJoZWFkZ2VhciIsIm91dGZpZWxkIiwiZXhlcmNpc2UiLCJiYXJiZWxscyIsImRpc3RhbmNlIiwiYWN0aXZpdHkiLCJyZWFjdGlvbiIsInN0YW5kb3V0Iiwic3RyYXRlZ3kiLCJ0cmFpbmVycyIsInNob290aW5nIiwicGFzc3BsYXkiLCJzbGFtZHVuayIsImJhY2tzcGluIiwiZnJvbnRtYW4iLCJnb2FscG9zdCIsImhvbWViYXNlIiwianVtcHJvcGUiLCJraWNrZmxpcCIsImxpbmVzbWFuIiwibWF0Y2hkYXkiLCJvdmVyZ3JpcCIsInJlYm91bmRzIiwianVtcHNob3QiLCJnb2Fsa2VlcCIsInlvZ2FsaW5lIiwicmluZ3NpZGUiLCJhZXJvYmljcyIsImJhc2ViYWxsIiwiY3Jvc3NmaXQiLCJkdW1iYmVsbCIsImZvb3RiYWxsIiwiaGFuZGJhbGwiLCJpbnRlcnZhbCIsImtheWFraW5nIiwibWFyYXRob24iLCJvbHltcGljcyIsInN3aW1taW5nIiwic3ByaW50ZXIiLCJ0YWNrbGluZyIsInN0cmV0Y2h5IiwiYmFja2hhbmQiLCJvdmVyaGFuZCIsInNpZGVraWNrIiwiZnJlZWtpY2siLCJoZWFkZ2VhciIsIm91dGZpZWxkIiwiZXhlcmNpc2UiLCJiYXJiZWxscyIsImRpc3RhbmNlIiwiYWN0aXZpdHkiLCJyZWFjdGlvbiIsInN0YW5kb3V0Iiwic3RyYXRlZ3kiLCJ0cmFpbmVycyIsInNob290aW5nIiwicGFzc3BsYXkiLCJzbGFtZHVuayIsImJhY2tzcGluIiwiZnJvbnRtYW4iLCJnb2FscG9zdCIsImhvbWViYXNlIiwianVtcHJvcGUiLCJraWNrZmxpcCIsImxpbmVzbWFuIiwibWF0Y2hkYXkiLCJvdmVyZ3JpcCIsInJlYm91bmRzIiwianVtcHNob3QiLCJnb2Fsa2VlcCIsInlvZ2FsaW5lIiwicmluZ3NpZGUiLCJob21lYmFzZSIsImp1bXByb3BlIiwia2lja2ZsaXAiLCJsaW5lc21hbiIsIm1hdGNoZGF5Iiwib3ZlcmdyaXAiLCJyZWJvdW5kcyIsImp1bXBzaG90IiwiZ29hbGtlZXAiLCJ5b2dhbGluZSIsImFlcm9iaWNzIl1d';

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
            if (userData !== undefined && JSON.parse(atob(imageData))[stage][userData.id] == parseInt(answer)) {
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
                we contracted decided to send 1000 packets per message to the screen and the message sent is decided by searching each position
                for the most common letter. This is <abbr title={'why did we even contract another company, we could do it ourselves!'}>confusing</abbr> so
                we have attached an example request. To confirm the connections work, you need to make sure the right message shows up. For example:</p>
                <br />

                <ul className={'text-center'}>
                    <li>pjrl</li>
                    <li>tall</li>
                    <li>fulx</li>
                    <li>mjha</li>
                    <li>brmn</li>
                    <li>yakl</li>
                    <li>sjut</li>
                    <li>bzlx</li>
                    <li>kacd</li>
                    <li>badp</li>
                </ul>
                <br />

                <p>The first column has a letter frequency of [p: 1, t: 1, f: 1, m: 1, b: 3: y: 1, s: 1, k: 1], which means that the first letter is b.
                If you were to do the same for the next three columns, shown below, you would get the word &apos;ball&apos;:</p>
                <p>Column 2: [j: 3, a: 4, u: 1, r: 1, z: 1] -&gt; a</p>
                <p>Column 3: [r: 1, l: 3, h: 1, m: 1, k: 1, u: 1, c: 1, d: 1] -&gt; l</p>
                <p>Column 4: [l: 3, x: 1, a: 1, n: 1, t: 1, x: 1, d: 1, p: 1] -&gt; l</p>
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
            The test checks for a screen of <abbr title={'what an odd size for a screen to be, I wonder why?'}>56 bulbs by 7 bulbs</abbr> which
            has all the bulbs off to start with, and it all runs automatically. Using the controller API specified below, you can also check to
            see if the screen is working or not. The test consists of a list of commands telling to turn on or off a specific bulb. The first command
            is &apos;turn on (x, y)&apos;, which turns the bulb at point (x, y) on. The second command is &apos;turn off (x, y)&apos;, which turns the bulb at (x, y)
            off. The grid is laid out where the top left is the origin, positive x is right, and positive y is down.
            For example (assuming the grid is 6x6 for now):</p>
            <br />

            <ul className={'text-center'}>
                <li>turn on (4,1)</li>
                <li>turn on (5,5)</li>
                <li>turn on (0,5)</li>
                <li>turn on (2,2)</li>
                <li>turn on (3,2)</li>
                <li>turn on (0,0)</li>
                <li>turn on (5,0)</li>
                <li>turn off (1,3)</li>
                <li>turn on (4,5)</li>
                <li>turn off (4,5)</li>
                <li>turn on (1,1)</li>
                <li>turn on (3,3)</li>
                <li>turn on (2,3)</li>
                <li>turn on (4,4)</li>
                <li>turn on (1,4)</li>
                <li>turn on (1,3)</li>
                <li>turn on (1,0)</li>
                <li>turn off (1,0)</li>
            </ul>
            <br />

            <p>Running these commands will produce this output:</p>
            <br />

            <ul className={'text-center'}>
                <li>X....X</li>
                <li>.X..X.</li>
                <li>..XX..</li>
                <li>..XX..</li>
                <li>.X..X.</li>
                <li>X....X</li>
            </ul>
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