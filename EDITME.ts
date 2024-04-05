/**
 * EDITME.ts
 * 
 * For editing information on the homepage of the Hackathon website, do it here before doing it in the page
 * This will be expanded further when most aspects of the pages needs to be customized.
 * 
 * Currently customizable stuff includes:
 * - Colors to website
 * - Links to all the external pages
 * - Dates and times
 * - Location
 * - Schedule
 * - Sponsors
 * - FAQs
 * 
 * Author: Alex Prosser, Jack Norris
 * Date: 4/4/2024
 */

/**
 * These control the colors seen on the website
 * 
 * You should see each of these names in the Tailwind classes, so you can see how they are edited
 */
export const colors = {
    primary: '#51b2a6',
    secondary: '#2a6370',
    tertiary: '#418e84',
    background: '#333333'
};

/**
 * These are the external links to different aspects of the site 
 */
export const discordLink = 'https://discord.gg/shVphSrXe2';
export const registrationLink = 'https://forms.gle/YambmVKF5ZLQjKYo8';
export const mailingLink = 'https://forms.gle/gFwrFeArJmq1YCMH9';
export const isRegistrationOpen = false;

/**
 * These are the starting and ending dates and times, which is controlled by the countdown timer and bar
 */
export const startDate = '04/12/2024';
export const endDate = '04/13/2024';
export const countdownEndTime = '17:30:00';

/**
 * Here is information for the location
 */
export const mapLocation = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3225.084495124262!2d-94.17564222348403!3d36.06704310868277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c96ee74061304d%3A0x5bb6345c4e6ff9cf!2sHillside%20Auditorium!5e0!3m2!1sen!2sus!4v1708554171130!5m2!1sen!2sus';
export const locationLink = 'https://maps.app.goo.gl/Sk4qGu88Sn4H5koB7';
export const locationInformation = ['Hillside Auditorium (HILL) Room 206', '902 W Dickson St', 'Fayetteville, AR 72701'];

/**
 * Here is the schedules, which are just listed as a title and time. Separated by the day which they occur
 */
export const day1Schedule = [
    {
        name: 'Opening Ceremony',
        time: '5:30 PM',
    },
    {
        name: 'Dinner',
        time: '8:00 PM',
    },
    {
        name: 'Using GitHub and Github Copilot Workshop',
        time: '7:00 PM'
    },
    {
        name: 'Web and Mobile Dev 101 Workshop',
        time: '9:00 PM'
    },
    {
        name: 'Mini Programming Competition',
        time: '10:00 PM'
    }
];

export const day2Schedule = [
    {
        name: 'Midnight Snack',
        time: '12:00 AM',
    },
    {
        name: '3 AM Trivia',
        time: '3:00 AM'
    },
    {
        name: 'Breakfast',
        time: '8:00 AM'
    },
    {
        name: 'Scavenger Hunt',
        time: '9:00 AM'
    },
    {
        name: 'Bob Ross Workshop',
        time: '11:00 AM'
    },
    {
        name: 'Lunch',
        time: '12:30 PM'
    },
    {
        name: 'Presentation Workshop',
        time: '1:00 PM'
    },
    {
        name: 'Projects Stop!',
        time: '4:00 PM'
    },
    {
        name: 'Judging',
        time: '4:30 PM'
    },
    {
        name: 'Closing Ceremony',
        time: '6:00 PM'
    },
];


/**
 * The sponsors can either be just an image url, or take the format of { src: <image_url>, link: <sponsor_link> } depending on what the sponsors want
 */
export const sponsors = [
    {
        name: 'Platinum',
        color: '#e5e4e2',
        images: ['img/sponsors/jbhunt.png']
    },
    {
        name: 'Gold',
        color: '#ffd700',
        images: ['img/sponsors/supplypike.png', 'img/sponsors/arcbest.png']
    },
    {
        name: 'Silver',
        color: '#c0c0c0',
        images: ['img/sponsors/oei.png']
    },
    {
        name: 'Bronze',
        color: '#cd7f32',
        images: ['img/sponsors/netsmart.png', 'img/sponsors/garmin.png']
    },
    {
        name: 'Partners',
        color: '#000000',
        images: [
            { src: 'img/sponsors/stand-out-stickers-logo.png', link: 'http://hackp.ac/mlh-StandOutStickers-hackathons' },
            'img/sponsors/mlh.png'
        ]
    },
];

/**
 * These are just a bunch of questions that may come up, so if anything is missing, please add it!
 */
export const faqs = [
    {
        question: 'When do signups close?',
        answer: 'Around April 1st @ 11:59 PM or after we get 200 participants, whichever comes first.',
    },
    {
        question: 'Do I need to come in with a team?',
        answer: 'Nope! Whether you are going solo or have an incomplete team, we can match you with some folks at the event!'
    },
    {
        question: 'Who can participate?',
        answer: 'The hackathon is open to all high school and college students!',
    },
    {
        question: 'Does it cost anything?',
        answer: 'Nope. The event is completely free to you!',
    },
    {
        question: 'Will there be food?',
        answer: 'Yep! We will provide your meals and snacks, which will be announced at the event. Food accommodations will try to be met as much as possible, such as vegan and allergen-free options.',
    },
    {
        question: 'Will there be swag and prizes?',
        answer: 'Plenty of free swag for everyone (t-shirts, stickers, etc.) and prizes for the top projects!'
    },
    {
        question: 'How many people per team?',
        answer: 'There can be 4-6 people per team.',
    },
    {
        question: 'Can I have grad students on my team?',
        answer: 'Yes, but only 1-2 people per team.',
    },
    {
        question: 'Do I need to know how to make specific projects like a website?',
        answer: 'Strongly encouraged, but we will have a TON of workshops to teach you!',
    },
    {
        question: 'Can I use a pre-existing project?',
        answer: 'For hackathons, try to write at least 90% of the code at the time of the event!',
    },
    {
        question: 'Where will I sleep?',
        answer: 'The building for the hackathon is open 24 hours, but you do NOT have to be present the entirety of the event. Feel free to book a local hotel if you would like.',
    },
    {
        question: 'Do I have to go to the workshops/minigames?',
        answer: 'They are all optional! We want to give everybody a good time, whether it is by learning a new skill, playing a game, or just letting them compete.',
    },
]