import { atom } from "recoil";

type userStateDefault = {
    isLogin: boolean,
    userName: null | string,
    id: null | number,
    account: null | string
}

export const userState = atom<userStateDefault>({
    key: 'user',
    default: {
        isLogin: false,
        userName: null,
        id: null,
        account: null
    }
})