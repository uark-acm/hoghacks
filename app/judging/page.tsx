/**
 * app/judging/page.tsx
 * 
 * This page handles the judge's side of things where they can judge different projects and we can compile all the data to find the final results
 * 
 * This also handles an admin to create projects and assign judges without need to manually edit the Firebase database
 * 
 * TODO: Make the final judging scores automatically calculate
 * TODO: Create a leaderboard to allow the public to see the final scores
 * TODO: Allow admins to create admin and judge accounts (all of it is handled through database rn)
 * 
 * Author: Alex Prosser
 * Date: 4/4/2024
 */

'use client';

import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { User, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, collection, getDoc, getDocs, DocumentData } from 'firebase/firestore';
import app from '@/src/firebase_utils';
import JudgingPanel from '@/components/judging-panel';
import Login from '@/components/login';

const auth = getAuth(app);
const firestore = getFirestore(app);

const JudgingPage: NextPage = () => {
    // The user auth data such as the UID and the other info that comes with it (mostly unnecessary as we can use the Firestore to attach user data)
    const [user, setUser] = useState<User>();

    // The data attached to the user stored in the Firestore
    const [userData, setUserData] = useState<Record<string, any>>();

    const [loaded, setLoaded] = useState(false);

    // Callback to be ran when a user attempts to login, just tries to authorize with email and password
    const onLogin = (email: string, password: string, setError: (error: string) => void) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setUser(userCredential.user);
            })
            .catch(error => {
                setError(error.message);
            });
    }

    const updateUserData = async (uid: string) => {
        const snapshot = await getDoc(doc(firestore, 'accounts', uid));
        let userData: DocumentData = {};    
        let data = snapshot.data();

        if (data !== undefined) {
            userData = data;
            userData.projects = {};
            if (!userData.isAdmin) {
                // if user is not an admin, that means that we need to display
                // the projects assigned to the judge as well as the scores assigned
                const judgingDocuments = await getDocs(collection(firestore, 'accounts', uid, 'projects'));
                for (const document of judgingDocuments.docs) {
                    const projectDoc = await getDoc(doc(firestore, 'projects', document.id));
                    userData.projects[document.id] = { 
                        judging: document.data(),
                        information: projectDoc.data()
                    };
                }
            } else {
                // if user is an admin, that means that we need to display all the projects
                // and all the judges, as well as sorting the scores correctly
                userData.judges = {};
                const judgesDocuments = await getDocs(collection(firestore, 'accounts'));
                for (const document of judgesDocuments.docs) {
                    const judgeData = document.data(); 
                    if (!judgeData.isAdmin) {
                        userData.judges[document.id] = { 
                            information: judgeData,
                            projects: {}
                        };
    
                        const judgingDocuments = await getDocs(collection(firestore, 'accounts', document.id, 'projects'));
                        for (const projectDocument of judgingDocuments.docs) {
                            userData.judges[document.id].projects[projectDocument.id] = projectDocument.data();
                        }
                    }
                }
                
                const projectDocs = await getDocs(collection(firestore, 'projects'));
                projectDocs.forEach(doc => {
                    userData.projects[doc.id] = doc.data();
                });
            }

            setLoaded(true);
            setUserData(data);
            console.log(data);
        } else {
            // if no data was found (that means account wasn't created properly), there is an error, so just sign out for now
            auth.signOut();
        }
    }

    // when client loaded, check to see if currently signed in or not
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
            // if no user is found, we have signed out, so update state
            if (!user) {
                setUser(undefined);
                setLoaded(true);
                return;
            }
            
            // else, we have data to display
            setUser(user);
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
        if (user !== undefined) {
            // you are logged in
            return <>
                {/* ~~~~~ Account Bar ~~~~~ */}
                <div className={'flex text-white items-center justify-end p-5'}>
                    <p>{userData?.name}</p>
                    <button
                        className={'bg-th-primary hover:bg-th-secondary transition-colors p-2 text-lg rounded-lg pressstart'}
                        onClick={() => { auth.signOut() }}>
                        Sign Out
                    </button>
                </div>

                {/* ~~~~~ Main View ~~~~~ */}
                <div className={'flex flex-col text-white items-center justify-center p-5 w-[80%] m-auto'}>
                    <p className={'lg:text-3xl mb-[25px] pressstart'}>Projects</p>
                    <JudgingPanel title={'Example Project'} description={'This is a small description that could be cutoff if needed to'} scores={[1, 2, 3, 4]}/>
                </div>
            </>
        } else {
            // you are not logged in
            return <>
                <div className={'flex justify-center items-center h-screen'}>
                    <Login onLogin={onLogin} />
                </div>
            </>
        }
    }
}

export default JudgingPage;