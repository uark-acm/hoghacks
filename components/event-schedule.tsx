'use client';
import { motion } from "motion/react";
// import * as motion from "motion/react-client";

interface EventScheduleProps {
    title: string;
    events: Array<{ name: string, time: string }>;
}

const EventSchedule = ({ title, events }: EventScheduleProps) => {
    return <div className={'p-[15px] w-[100%]'}>
        <h1 className={'pressstart text-md lg:text-2xl mb-[25px]'}>{title}</h1>
        <hr />
        {
            events.map(event => {
                return <motion.div
                initial={{ 
                    opacity: 0,
                    y: -50

                }}
                whileInView={{ 
                    opacity: 1,
                    y: 0
                }}
                transition={{ duration: 0.6, type: "tween" }}
                key={event.name}
            >
                    <div className="text-sm lg:text-xl mt-[10px] mb-[10px] flex justify-between items-center">
                        <span>{event.name}</span>
                        <span>{event.time}</span>
                    </div>
                    <hr />
                </motion.div>    
            })
        }
    </div>
}

export default EventSchedule;