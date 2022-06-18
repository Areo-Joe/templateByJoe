import { AxiosInstance, AxiosResponse } from "axios";
import QuertString from 'qs';
import { handleApi } from "..";

interface loginInterface {
    account: string,
    password: string
}
type loginFunc = (p: loginInterface) => Promise<AxiosResponse>

export const login = handleApi<loginFunc>({   
    requestFunc(ins:AxiosInstance) {
        return ({account, password}: loginInterface) => ins.post('/login', QuertString.stringify({
            username: account,
            password
        }), {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
    },
    mock: {
        url: '/login',
        rtype: 'post',
        func() {
            return {
                code: 200,
                data: {
                    id: 1,
                    username: '1234566',
                    name: 'user1'
                },
                msg: '登陆成功',
                success: true
            }
        }
    }
})

type logoutFunc = () => Promise<AxiosResponse>;

export const logout = handleApi<logoutFunc>({
    requestFunc(ins:AxiosInstance) {
        return () => ins.post('/logout');
    },
    mock: {
        url: '/logout',
        rtype: 'post',
        func() {
            return {
                code: 200,
                msg: '注销成功',
                success: true
            }
        }
    }
})

interface signinInterface {
    account: string,
    userName: string,
    password: string
}

type signinFunc = (p:signinInterface) => Promise<AxiosResponse>;

export const signin = handleApi<signinFunc>({
    requestFunc(ins:AxiosInstance) {
        return ({account, userName, password}: signinInterface) => {
            let data = new FormData();
            data.append('username', account);
            data.append('password', password);
            data.append('name', userName);
            // QuertString.stringify(
            //     {
            //         username: account,
            //         password,
            //         name: userName
            //     })
            return ins.post('/user/signin', );
        }
    },
    mock: {
        url: '/user/signin',
        rtype: 'post',
        func() {
            return {
                code:200,
                data: {
                    id: 1,
                    username: '123',
                    name: 'user1'
                }
            }
        }
    }
})