import Page1 from "../views/Page1/Page1"
import Page2 from "../views/Page2/Page2"

type route = {
    title: string,
    path: string,
    component: () => JSX.Element
}

export const routes = [
    {
        title: 'page1',
        path: '/page1',
        component: Page1
    },
    {
        title: 'page2',
        path: '/page2',
        component: Page2
    },
]