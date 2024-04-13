import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc, getDocs, collection, deleteDoc, setDoc } from 'firebase/firestore';
import app from '@/src/firebase_utils';

const firestore = getFirestore(app);

interface JudgePanelProps {
    judgeID: string;
};

const JudgePanel = ({ judgeID }: JudgePanelProps) => {
    const [name, setName] = useState<string>('');
    const [projects, setProjects] = useState<string[]>([]);
    const [newProject, setNewProject] = useState<string>('');
    const [isEditing, setEditing] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isUpdated, setUpdated] = useState<boolean>(false);

    const judgeRef = doc(firestore, 'accounts', judgeID);

    const saveChanges = () => {
        setEditing(false);

        if (!isUpdated) return;

        updateDoc(judgeRef, {
            name: name
        });
    }

    const updateName = (name: string) => {
        setUpdated(true);
        setName(name);
    }

    const outsideModal = (event: any) => {
        return (event.target?.id == 'outside');
    }

    const addProject = () => {
        setDoc(doc(firestore, 'accounts', judgeID, 'projects', newProject), {
            comment: '',
            scores: [0, 0, 0, 0]
        }).then(() => {
            setUpdated(true);
            const updatedProjects = [...projects];
            updatedProjects.push(newProject);
            setProjects(updatedProjects);
        })
    }

    const deleteProject = (index: number) => {
        deleteDoc(doc(firestore, 'accounts', judgeID, 'projects', projects[index]))
            .then(() => {
                setUpdated(true);
                const updatedProjects = [...projects];
                updatedProjects.splice(index, 1);
                setProjects(updatedProjects);
            })
    }

    useEffect(() => {
        // Fetch data from Firestore
        const fetchData = async () => {
            const judgeData = (await getDoc(judgeRef)).data();
            setName(judgeData?.name);

            const projects = await getDocs(collection(firestore, 'accounts', judgeID, 'projects'));
            if (!projects.empty) setProjects(projects.docs.map(doc => doc.id));
            
            setLoading(false);
        };

        setLoading(true);
        fetchData();
    }, [judgeID]);

    return <>
        <div className={'bg-th-primary w-[90%] flex flex-row justify-center p-3 items-center m-5 cursor-pointer'} onClick={() => { setEditing(true); setUpdated(false); }}>
            {
                isLoading && <p>Loading...</p>
            }
            <p>{name}</p>
        </div>

        {
            isEditing && <div id={'outside'} className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={e => { if (outsideModal(e)) saveChanges() }}>
                <div className="bg-th-primary p-4 w-[80%] h-[80%] flex flex-col justify-between items-center text-white">
                    <p className={'pressstart text-2xl text-center'}>Judge Information</p>
                    
                    <div className={'flex flex-row flex-1 items-center justify-between w-[90%] h-full'}>
                        <div className={'flex flex-col flex-1 items-center justify-between h-[50%]'}>
                            <input type={'text'} className={'text-black mb-[10px] w-[300px]'} value={name} placeholder={'Judge Name...'} onChange={event => updateName(event.target.value)} />
                            <p className={'pressstart text-lg text-center'}>Projects</p>
                            <input type={'text'} className={'text-black mb-[10px] w-[300px]'} value={newProject} placeholder={'New Project ID...'} onChange={event => setNewProject(event.target.value)} />
                            <button onClick={addProject}>+</button>
                            <ul>
                                {
                                    projects.map((project, index) => {
                                        return <li key={`project-${index}`}>
                                            {project}
                                            <button onClick={() => deleteProject(index)}>X</button>
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

export default JudgePanel;