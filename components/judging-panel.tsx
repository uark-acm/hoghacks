interface JudgingPanelProps {
    title: string;
    description: string;
    scores: number[];
};

const JudgingPanel = ({ title, description, scores }: JudgingPanelProps) => {
    const cutoffLength = 75;

    const colors = ['text-black', 'text-red-800', 'text-red-500', 'text-yellow-400', 'text-green-800', 'text-lime-500'];

    return <>
        <div className={'bg-th-primary w-full flex flex-row justify-between p-3'}>
            <div className={'flex flex-row justify-between items-center'}>
                <p>{title}</p>
                <p className={'pl-[30px] pr-[30px]'}>|</p>
                <p>{(description.length < cutoffLength) ? description : (description.slice(0, cutoffLength) + '...')}</p>
            </div>
            <div className={'flex flex-row justify-between items-center bg-white'}>
                {
                    scores.map((number, index) => {
                        return <p key={`score-${index}`} className={colors[number] + ' pl-[50px] pr-[50px]'}>{(number == 0) ? '-' : number}</p>
                    })
                }
            </div>
        </div>
    </>
}

export default JudgingPanel;