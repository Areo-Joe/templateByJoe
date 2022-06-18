import { AxiosInstance } from "axios";
import { handleApi } from "..";

const list = [
    {name: 'joe', age: 11},
    {name: 'ann', age: 12},
    {name: 'tim', age: 143},
    {name: 'sa', age: 13},
    {name: 'awdwa', age: 12},
    {name: 'joeawd', age: 112},
    {name: 'jose', age: 111}
]

export const getList = handleApi({
    requestFunc(ins:AxiosInstance) {
        return () => ins.get('/list');
    },
    mock: {
        url: '/list',
        rtype: 'get',
        func() {
            return {
                code: 200,
                data: {
                    list
                }
            }
        }
    }
})