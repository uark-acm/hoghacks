import { useState } from 'react';

interface LoginProps {
    onLogin: (email: string, password: string, setError: (error: string) => void) => void
}

const Login = ({ onLogin }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = () => {
        setError('');
        onLogin(email, password, setError);
    }

    return <>
        <div className={'p-[25px] bg-th-primary text-center text-white'}>
            <p className={'text-2xl lg:text-4xl mb-[25px] pressstart'}>Judging Portal</p>
            <input type={'email'} className={'text-black mb-[10px] w-[300px]'} value={email} placeholder={'Email...'} onChange={event => setEmail(event.target.value)} /> <br />
            <input type={'password'} className={'text-black w-[300px]'} value={password} placeholder={'Password...'} onChange={event => setPassword(event.target.value)} /> <br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button
                className={'bg-th-secondary hover:bg-th-tertiary transition-colors p-5 text-md lg:text-xl rounded-lg mt-[20px] pressstart'}
                onClick={handleSubmit}>
                Login
            </button>
        </div>
    </>
}

export default Login;