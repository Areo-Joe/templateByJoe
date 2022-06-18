import { ReactNode } from "react";
import { userState  } from "../store/userState";
import { useRecoilState } from 'recoil';

interface AccessControlInterface {
    children: ReactNode,
    fallback: ReactNode
}

export default function AccessControl({children, fallback}: AccessControlInterface) {
    const [auth, setAuth] = useRecoilState(userState);
    if (auth.isLogin) {
        return <>{children}</>
    }
    const possibleStr = sessionStorage.getItem('user');
    if (possibleStr) {
        const possibleUser = JSON.parse(possibleStr) as {
            id: number,
            userName: string,
            isLogin: boolean,
            account: string
        }
        setAuth(possibleUser);
        return possibleUser.isLogin ? <>{children}</> : <>{fallback}</>;
    }
    return <>{fallback}</>;
}