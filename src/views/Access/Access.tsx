import logo from '../../assets/logo.png'
import { TextField, MaskedTextField, DefaultButton, PrimaryButton, MessageBar, Layer, MessageBarType } from '@fluentui/react'
import { login, signin } from '../../api/modules/user';
import { message } from 'antd';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/userState';
import { useNavigate } from 'react-router-dom';
import { FormEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import './Access.scss'

export default function Access() {
    const navigate = useNavigate();
    const [auth, setAuth] = useRecoilState(userState);
    const [isLogin, setIsLogin] = useState(true);
    const [account ,setAccount] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    type onchange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
    const accountChange:onchange  = useCallback((e, v) => {
        setAccount(v || '');
    }, [])
    const userNameChange:onchange  = useCallback((e, v) => {
        setUserName(v || '');
    }, [])
    const passwordChange:onchange  = useCallback((e, v) => {
        setPassword(v || '');
    }, [])
    const confirmPasswordChange:onchange  = useCallback((e, v) => {
        setConfirmPassword(v || '');
    }, [])
    const handleSumbit:FormEventHandler = useCallback(e => {
        e.preventDefault();
        if (isLogin) {
            login({
                account, 
                password
            }).then(e => {
                type tmp = {
                    id: number,
                    name: string,
                    username: string
                }
                const res = e.data as tmp;
                message.success('登陆成功！');
                setAuth({
                    id: res.id,
                    isLogin: true,
                    userName: res.name,
                    account
                });
                sessionStorage.setItem('user', JSON.stringify({
                    id: res.id,
                    isLogin: true,
                    userName: res.name,
                    account
                }))
                navigate('/', {replace: true});
            }).catch(() => {
                setErrorMessage(' ');
                message.error('登陆失败！');
            });
        } else {
            if (password !== confirmPassword) {
                setErrorMessage('两次输入的密码不一致！');
                return;
            } else {
                signin({
                    account,
                    password,
                    userName
                }).then(() => {
                    message.success('注册成功！');
                    toggleLogin();
                }).catch(() => {
                    message.error('注册失败！');
                })
            }
        }
    }, [isLogin, account, userName, password, confirmPassword])
    const toggleLogin = useCallback(() => {
        setIsLogin(b => !b);
        setAccount('');
        setUserName('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
    }, [])
    useEffect(() => {
        if (auth.isLogin) {
            navigate('/', {replace: true});
        }
    }, [auth]);
    return (
        <div className="access-container flex justify-center items-center h-screen">
            <div className="split-container">
                <div className='logo-container shadow-2xl'>
                    <img src={logo} className="w-48 block" />
                </div>
                <div className="
                    form-container 
                    w-[392px] 
                    bg-white 
                    px-6 
                    py-6 
                    shadow-2xl 
                    flex
                    flex-col
                    gap-5"
                >
                    <form
                        className='flex flex-col gap-5' 
                        onSubmit={handleSumbit}>
                        <div className='text-black'>FICAS</div>
                        <div className='text-2xl text-black font-semibold'>登录</div>
                        <TextField label='账号：' value={account} onChange={accountChange} underlined required/>
                        {!isLogin && <TextField label='昵称：' value={userName} onChange={(e, v) => setUserName(v || '')} underlined required/>}
                        <TextField
                            label="密码："
                            type="password"
                            canRevealPassword
                            underlined
                            required
                            revealPasswordAriaLabel="Show password"
                            errorMessage={errorMessage}
                            value={password} onChange={passwordChange}
                        />
                        {!isLogin && (
                            <TextField
                                label="确认密码："
                                type="password"
                                canRevealPassword
                                underlined
                                required
                                revealPasswordAriaLabel="Show password"
                                value={confirmPassword} onChange={confirmPasswordChange}
                                errorMessage={errorMessage}
                            />
                        )}
                        <div className="button-container flex justify-end gap-4">
                            <DefaultButton onClick={toggleLogin}>转到{isLogin ? '注册' : '登录'}</DefaultButton>
                            <PrimaryButton type='submit'>{isLogin ? '登录' : '注册'}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}