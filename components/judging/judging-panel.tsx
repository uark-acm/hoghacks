import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import app from '@/src/firebase_utils';

const firestore = getFirestore(app);

interface JudgingPanelProps {
    userID: string;
    projectID: string;
};

const JudgingPanel = ({ userID, projectID }: JudgingPanelProps) => {
    const [title, setTitle] = useState<string>('');
    const [teamName, setTeamName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [authors, setAuthors] = useState<string[]>([]);
    const [githubLink, setGithubLink] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [scores, setScores] = useState<number[]>([]);
    const [isEditing, setEditing] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isUpdated, setUpdated] = useState<boolean>(false);
    const cutoffLength = 75;

    const colors = ['text-black', 'text-red-800', 'text-red-500', 'text-yellow-400', 'text-green-800', 'text-lime-500'];
    const judgingRef = doc(firestore, 'accounts', userID, 'projects', projectID);

    const saveChanges = () => {
        setEditing(false);
        if (!isUpdated) return;

        updateDoc(judgingRef, {
            comment: comment,
            scores: scores
        });
    }

    const updateComment = (comment: string) => {
        setUpdated(true);
        setComment(comment);
    }

    const updateScore = (index: number, score: number) => {
        setUpdated(true);
        const updatedScores = [...scores];
        updatedScores[index] = score;
        setScores(updatedScores);
    }

    const outsideModal = (event: any) => {
        return (event.target?.id == 'outside');
    }

    useEffect(() => {
        // Fetch data from Firestore
        const fetchData = async () => {
            const judgingInfo = (await getDoc(judgingRef)).data();
            const projectData = (await getDoc(doc(firestore, 'projects', projectID.trim()))).data();
            
            setTitle(projectData?.name);
            setTeamName(projectData?.teamName);
            setDescription(projectData?.description);
            setAuthors(projectData?.authors);
            setGithubLink(projectData?.githubLink);
            setComment(judgingInfo?.comment);
            setScores(judgingInfo?.scores);
            setLoading(false);
        };

        setLoading(true);
        fetchData();
    }, [projectID]);

    return <>
        <div className={'bg-th-primary w-full flex flex-row justify-between p-3 items-center cursor-pointer'} onClick={() => { setEditing(true); setUpdated(false); }}>
            {
                isLoading && <p>Loading...</p>
            }
            <div className={'flex flex-row justify-between items-center'}>
                <p>{title}</p>
                <p className={'pl-[30px] pr-[30px]'}>|</p>
                <p>{(description.length < cutoffLength) ? description : (description.slice(0, cutoffLength) + '...')}</p>
            </div>
            <div className={'flex flex-row justify-between bg-white'}>
                {
                    scores.map((number, index) => {
                        return <p key={`score-${index}`} className={colors[number] + ' pl-[50px] pr-[50px]'}>{(number == 0) ? '-' : number}</p>
                    })
                }
            </div>
        </div>

        {
            isEditing && <div id={'outside'} className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={e => { if (outsideModal(e)) saveChanges() }}>
                <div className="bg-th-primary p-4 w-[80%] h-[80%] flex flex-col justify-between items-center text-white">
                    <div className={'text-center'}>
                        <p className={'pressstart text-2xl'}>{title}</p>
                        <p className={'text-xl'}>{description}</p>
                        <p>by {teamName} | {authors.join(', ')}</p>
                        <a className={'underline'} href={githubLink}>Github Link</a>
                    </div>
                    
                    <div className={'w-[80%] h-[50%] flex flex-col items-center justify-between'}>
                        <div className={'flex-col items-center justify-center w-[100%]'}>
                            {
                                scores.map((score, index) => (
                                    <div key={index} className="flex items-center justify-between my-2">
                                        <span className="flex-initial w-[20%] mr-2 text-sm 2xl:text-lg">{['Innovation & Creativity', 'Technical Implementation', 'Problem Identification', 'Presentation Quality'][index]}</span>
                                        <input className="flex-1 flex" type="range" min={1} max={5} step={1} value={scores[index]} onChange={e => updateScore(index, parseInt(e.target.value))} />
                                        <p className={colors[score] + ' pl-[50px] pr-[50px] bg-white'}>{(score == 0) ? '-' : score}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <textarea className={'w-[80%] flex-1 text-black resize-none'} placeholder={'Any comments here...'} value={comment} onChange={e => updateComment(e.target.value)}></textarea>
                    </div>
                    <button
                        className={'bg-th-secondary hover:bg-th-tertiary transition-colors p-2 text-lg rounded-lg pressstart'}
                        onClick={saveChanges}>
                        Save
                    </button>
                </div>
            </div>
        }
    </>
}

export default JudgingPanel;