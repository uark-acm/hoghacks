import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import app from '@/src/firebase_utils';

const firestore = getFirestore(app);

interface ProjectPanelProps {
    projectID: string;
};

const ProjectPanel = ({ projectID }: ProjectPanelProps) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [authors, setAuthors] = useState<string[]>([]);
    const [teamName, setTeamName] = useState<string>('');
    const [githubLink, setGithubLink] = useState<string>('');
    const [isEditing, setEditing] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isUpdated, setUpdated] = useState<boolean>(false);
    const cutoffLength = 75;

    const projectRef = doc(firestore, 'projects', projectID);

    const saveChanges = () => {
        setEditing(false);

        if (!isUpdated) return;

        updateDoc(projectRef, {
            name: title,
            teamName: teamName,
            githubLink: githubLink,
            description: description,
            authors: authors
        });
    }

    const updateTitle = (title: string) => {
        setUpdated(true);
        setTitle(title);
    }

    const updateGithubLink = (link: string) => {
        setUpdated(true);
        setGithubLink(link);
    }

    const updateDescription = (description: string) => {
        setUpdated(true);
        setDescription(description);
    }

    const updateTeamName = (name: string) => {
        setUpdated(true);
        setTeamName(name);
    }

    const addAuthor = () => {
        setUpdated(true);
        const updatedAuthors = [...authors];
        updatedAuthors.push('New Author');
        setAuthors(updatedAuthors);
    }

    const updateAuthor = (index: number, author: string) => {
        setUpdated(true);
        const updatedAuthors = [...authors];
        updatedAuthors[index] = author;
        setAuthors(updatedAuthors);
    }

    const deleteAuthor = (index: number) => {
        setUpdated(true);
        let updatedAuthors = [...authors];
        updatedAuthors.splice(index, 1);
        setAuthors(updatedAuthors);
    }

    const outsideModal = (event: any) => {
        return (event.target?.id == 'outside');
    }

    useEffect(() => {
        // Fetch data from Firestore
        const fetchData = async () => {
            const projectData = (await getDoc(projectRef)).data();
            
            setTitle(projectData?.name);
            setTeamName(projectData?.teamName);
            setDescription(projectData?.description);
            setAuthors(projectData?.authors);
            setGithubLink(projectData?.githubLink);
            setLoading(false);
        };

        setLoading(true);
        fetchData();
    }, [projectID]);

    return <>
        <div className={'bg-th-primary w-[90%] flex flex-row justify-between p-3 items-center m-5 cursor-pointer'} onClick={() => { setEditing(true); setUpdated(false); }}>
            {
                isLoading && <p>Loading...</p>
            }
            <p>{title}</p>
            <p>{(description.length < cutoffLength) ? description : (description.slice(0, cutoffLength) + '...')}</p>
            <p>{teamName}</p>
            <a className={'underline'} href={githubLink}>Github Link</a>
        </div>

        {
            isEditing && <div id={'outside'} className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={e => { if (outsideModal(e)) saveChanges() }}>
                <div className="bg-th-primary p-4 w-[80%] h-[80%] flex flex-col justify-between items-center text-white">
                    <p className={'pressstart text-2xl text-center'}>Project Editor</p>
                    
                    <div className={'flex flex-row flex-1 items-center justify-between w-[90%] h-full'}>
                        <div className={'flex flex-col flex-1 items-center justify-between h-[50%]'}>
                            <input type={'text'} className={'text-black mb-[10px] w-[300px]'} value={title} placeholder={'Project Title...'} onChange={event => updateTitle(event.target.value)} />
                            <input type={'text'} className={'text-black mb-[10px] w-[300px]'} value={githubLink} placeholder={'Github Link...'} onChange={event => updateGithubLink(event.target.value)} />
                            <textarea className={'w-[80%] flex-1 text-black resize-none'} placeholder={'Description...'} value={description} onChange={event => updateDescription(event.target.value)}></textarea>
                        </div>
                        <div className={'flex flex-col flex-1 items-center justify-between'}>
                            <input type={'text'} className={'text-black mb-[10px] w-[300px]'} value={teamName} placeholder={'Team Name...'} onChange={event => updateTeamName(event.target.value)} />
                            <p className={'pressstart text-lg text-center'}>Authors<button onClick={() => addAuthor()}>+</button></p>
                            
                            <ul>
                                {
                                    authors.map((author, index) => {
                                        return <li key={`author-${index}`}>
                                            <input type={'text'} className={'text-black mb-[10px] w-[300px]'} value={author} placeholder={'Author...'} onChange={event => updateAuthor(index, event.target.value)} />
                                            <button onClick={() => deleteAuthor(index)}>X</button>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    
                    <button
                        className={'bg-th-secondary hover:bg-th-tertiary transition-colors p-2 text-lg rounded-lg pressstart flex-none'}
                        onClick={saveChanges}>
                        Save
                    </button>
                </div>
            </div>
        }
    </>
}

export default ProjectPanel;