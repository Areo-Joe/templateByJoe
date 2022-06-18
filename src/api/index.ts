import {mock} from "mockjs";
import axios, { AxiosInstance } from "axios";

// 是否开启mock
const isMockOpen = false;

export interface mockItInterface {
    url: string | RegExp,
    rtype: string, 
    func: (p: any) => any
}

function mockIt({url, rtype, func}: mockItInterface) {
    mock(url, rtype, func);
}

const instance = axios.create({
    baseURL: isMockOpen ? '' : '/api' 
})

instance.interceptors.request.use(c => c, err => Promise.reject(err));

instance.interceptors.response.use(res => {
    const {code} = res.data as {code: number};
    if (code === 200) {
        return res.data as any;
    } else {
        if (code === 199) {
            return Promise.reject('用户未登录');
        } else {
            return Promise.reject('unknown error');
        }
    }
}, err => {
    console.log(err);
    return Promise.reject(err)
})

interface handleApiInterface {
    requestFunc: (ins: AxiosInstance) => any,
    mock: mockItInterface
}

// 导出处理API的函数，给不同模块下的API处理
export function handleApi<T>({requestFunc, mock}: handleApiInterface): T {
    mockIt(mock);
    return requestFunc(instance);
}