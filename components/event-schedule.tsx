interface EventScheduleProps {
    title: string;
    events: Array<{ name: string, time: string }>;
}

const EventSchedule = ({ title, events }: EventScheduleProps) => {
    return <div className={'bg-th-tertiary p-[15px]'}>
        <h1 className={'pressstart text-md lg:text-2xl mb-[25px]'}>{title}</h1>
        {
            events.map(event => {
                return <div key={event.name}>
                    <p className={'text-sm lg:text-xl mb-[10px]'}>{event.name} - {event.time}</p>
                </div>  
            })
        }
    </div>
}

export default EventSchedule;