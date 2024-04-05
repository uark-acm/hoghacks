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
        <div className={'p-[25px] bg-th-primary text-white'}>
            <p className={'text-2xl lg:text-4xl text-center lg:text-start mb-[25px] pressstart'}>Login</p>
            Email: <input type={'email'} className={'text-black mb-[10px]'} value={email} onChange={event => setEmail(event.target.value)} /> <br />
            Password: <input type={'password'} className={'text-black'} value={password} onChange={event => setPassword(event.target.value)} /> <br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button
                className={'bg-th-secondary hover:bg-th-tertiary transition-colors p-5 text-md lg:text-xl rounded-lg mb-[20px] pressstart'}
                onClick={handleSubmit}>
                Login
            </button>
        </div>
    </>
}

export default Login;