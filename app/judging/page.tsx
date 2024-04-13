/**
 * app/judging/page.tsx
 * 
 * This page handles the judge's side of things where they can judge different projects and we can compile all the data to find the final results
 * 
 * This also handles an admin to create projects and assign judges without need to manually edit the Firebase database
 * 
 * TODO: Make the final judging scores automatically calculate
 * TODO: Create a leaderboard to allow the public to see the final scores
 * TODO: Add warning to project deletion
 * 
 * Author: Alex Prosser
 * Date: 4/11/2024
 */

'use client';

import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { User, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, collection, getDoc, addDoc, deleteDoc, getDocs, setDoc,   } from 'firebase/firestore';
import { initializeApp, deleteApp } from 'firebase/app';
import { basePath } from '@/helper.mjs';
import app, { firebaseConfig } from '@/src/firebase_utils';
import Login from '@/components/judging/login';
import JudgingPanel from '@/components/judging/judging-panel';
import ProjectPanel from '@/components/judging/project-panel';
import JudgePanel from '@/components/judging/judge-panel';

const auth = getAuth(app);
const firestore = getFirestore(app);

const JudgingPage: NextPage = () => {
    const [userID, setUserID] = useState<string>('');
    const [isAdmin, setAdmin] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [projects, setProjects] = useState<string[]>([]);
    const [judges, setJudges] = useState<string[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [judgeName, setJudgeName] = useState<string>('');
    const [judgeCreation, setJudgeCreation] = useState<boolean>(false);
    const [judgeError, setJudgeError] = useState<string>('');

    // Callback to be ran when a user attempts to login, just tries to authorize with email and password
    const onLogin = (email: string, password: string, setError: (error: string) => void) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setUserID(userCredential.user.uid);
            })
            .catch(error => {
                setError(error.message);
            });
    }

    const outsideModal = (event: any) => {
        return (event.target?.id == 'dialog-outside');
    }

    const updateUserData = async (userID: string) => {
        const snapshot = await getDoc(doc(firestore, 'accounts', userID)); 
        let data = snapshot.data();

        if (data !== undefined) {
            setName(data.name);
            setAdmin(data.isAdmin);

            if (!data.isAdmin) {
                // if user is not an admin, that means that we need to display
                // the projects assigned to the judge as well as the scores assigned
                const judgingDocuments = await getDocs(collection(firestore, 'accounts', userID, 'projects'));
                setProjects(judgingDocuments.docs.map(doc => doc.id));
            } else {
                // if user is an admin, that means that we need to display all the projects
                // and all the judges, as well as sorting the scores correctly
                const judgesDocuments = await getDocs(collection(firestore, 'accounts'));
                setJudges(judgesDocuments.docs.filter(doc => !doc.data().isAdmin).map(doc => doc.id));
                
                const projectDocs = await getDocs(collection(firestore, 'projects'));
                setProjects(projectDocs.docs.map(doc => doc.id));
            }

            setLoaded(true);
        } else {
            // if no data was found (that means account wasn't created properly), there is an error, so just sign out for now
            auth.signOut();
        }
    }

    const addProject = () => {
        if (!loaded) return;

        const projectData = {
            name: 'New Project',
            description: 'Example Description',
            githubLink: 'https://github.com',
            teamName: 'New Team',
            authors: ['New Author']
        };

        addDoc(collection(firestore, 'projects'), projectData)
            .then(newProject => {
                const updatedProjects = [...projects];
                updatedProjects.push(newProject.id);
                setProjects(updatedProjects);
            });
    }

    const removeProject = (index: number) => {
        if (!loaded) return;

        deleteDoc(doc(firestore, 'projects', projects[index]))
            .then(() => {
                const updatedProjects = [...projects];
                updatedProjects.splice(index, 1);
                setProjects(updatedProjects);
            });
    }

    const addJudge = () => {
        if (!loaded) return;
        setJudgeError('');
        const passwordCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFJHIGJKLMNOPQRSTUVWYXZ0123456789';

        if (judgeName === '') setJudgeError('Please enter a name!');
        const names = judgeName.toLowerCase().split(' ');
        const email = names[0][0] + names.at(-1)?.slice(0, 4) + Math.floor(Math.random() * 10000).toString().padStart(4, '0') + '@hoghacks.com';
        const password = new Array(12).fill(0).map(_ => passwordCharacters[Math.floor(Math.random() * passwordCharacters.length)]).join('');

        // create instance for new auth
        const newApp = initializeApp(firebaseConfig, 'createJudge');
        const newAuth = getAuth(newApp);

        createUserWithEmailAndPassword(newAuth, email, password)
            .then(credential => {
                const judgeID = credential.user?.uid;

                if (judgeID !== undefined) {
                    setDoc(doc(firestore, 'accounts', judgeID), { name: judgeName, isAdmin: false })
                        .then(() => {
                            const updatedJudges = [...judges];
                            updatedJudges.push(judgeID);
                            setJudges(updatedJudges);

                            console.log(email, password);

                            deleteApp(newApp);
                        });
                }
            })
            .catch(error => {
                console.log(error);
                deleteApp(newApp);
            });

        setJudgeCreation(false);
    }

    const removeJudge = (index: number) => {
        if (!loaded) return;

        // Currently not implemented as I would need to have something server side, but I'll look into it for next hackathon
    }

    // when client loaded, check to see if currently signed in or not
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
            // if no user is found, we have signed out, so update state
            if (!user) {
                setUserID('');
                setLoaded(true);
                return;
            }
            
            // else, we have data to display
            setUserID(user.uid);
            setLoaded(false);
            updateUserData(user.uid);
        });
        return unsubscribe;
    }, []);

    // ~~~~~ the actual JSX ~~~~~
    if (!loaded) {
        return <>
            <div className={'flex justify-center items-center h-screen'}>
                <p className={'text-3xl pressstart text-white'}>Loading...</p>
            </div>
        </>
    } else {
        if (userID !== '') {
            // you are logged in
            return <>
                {/* ~~~~~ Account Bar ~~~~~ */}
                <div className={'flex text-white items-center justify-end p-5'}>
                    <p>{name}</p>
                    <button
                        className={'bg-th-primary hover:bg-th-secondary transition-colors p-2 text-lg rounded-lg pressstart'}
                        onClick={() => { auth.signOut() }}>
                        Sign Out
                    </button>
                </div>

                {/* ~~~~~ Main View ~~~~~ */}
                <div className={'flex flex-col text-white items-center justify-center p-5 w-[80%] m-auto'}>
                    {
                        !isAdmin && <>
                            <p className={'lg:text-3xl mb-[25px] pressstart'}>Projects</p>
                            {
                                projects.map((projectID: string) => {
                                    return <JudgingPanel key={projectID} userID={userID} projectID={projectID}/>
                                })
                            }
                        </>
                    }
                    {
                        isAdmin && <>
                            <p className={'lg:text-3xl mb-[25px] pressstart'}>Projects<button onClick={addProject}>+</button></p>
                            {
                                projects.map((projectID, index) => {
                                    return <div key={projectID} className={'flex flex-row items-center justify-center w-full'}>
                                        <ProjectPanel projectID={projectID}/>
                                        <button onClick={() => removeProject(index)}>X</button>
                                    </div>
                                })
                            }

                            <p className={'lg:text-3xl mb-[25px] pressstart'}>Judges<button onClick={() => setJudgeCreation(true)}>+</button></p>
                            {
                                judges.map((judgeID, index) => {
                                    return <div key={judgeID} className={'flex flex-row items-center justify-center w-full'}>
                                        <JudgePanel judgeID={judgeID}/>
                                        <button onClick={() => removeJudge(index)}>X</button>
                                    </div>
                                })
                            }
                        </>
                    }
                </div>

                {/* ~~~~~ Judge Creation Dialog ~~~~~ */}
                {
                    judgeCreation && <div id={'dialog-outside'} className={'fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center'} onClick={event => { if (outsideModal(event)) setJudgeCreation(false) }}>
                        <div className={'bg-th-primary p-4 w-[50%] h-[50%] flex flex-col justify-between items-center text-white'}>
                            <p className={'pressstart text-2xl text-center'}>Judge Creation</p>
                            
                            <div className={'flex flex-row flex-1 items-center justify-center'}>
                                <input type={'text'} className={'text-black mb-[10px] w-[300px]'} value={judgeName} placeholder={'Judge Name...'} onChange={event => setJudgeName(event.target.value)} />
                                <p className={'text-red-500'}>{judgeError}</p>
                            </div>
                            
                            <button
                                className={'bg-th-secondary hover:bg-th-tertiary transition-colors p-2 text-lg rounded-lg pressstart flex-none'}
                                onClick={addJudge}>
                                Add Judge
                            </button>
                        </div>
                    </div>
                }
            </>
        } else {
            // you are not logged in
            return <>
                <div className={'flex flex-col gap-y-5 justify-center items-center h-screen'}>
                    <Login onLogin={onLogin} />
                </div>
            </>
        }
    }
}

export default JudgingPage;