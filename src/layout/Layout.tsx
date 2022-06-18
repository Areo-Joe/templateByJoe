import { Nav, INavLinkGroup } from '@fluentui/react'
import { Outlet, useNavigate } from 'react-router-dom';
import { routes } from '../router';
import './Layout.scss'

const myGroups: INavLinkGroup[] = [
  {
    links: routes.map(route => {
      return {
        name: route.title,
        url: route.path,
        key: route.path
      }
    })
  }
]


export default function Layout() {
    const navigate = useNavigate();
    return (
        <div className="all-container">
            <div className="header-container">
                Header
            </div>
            <div className="bulk-container">
                <div className="aside-container">
                    <Nav
                        initialSelectedKey={routes[0].path}
                        ariaLabel="Nav basic example"
                        groups={myGroups}
                        onLinkClick={(e, i) => {
                            e?.preventDefault();
                            i?.url && navigate(i.url);
                        }}
                    />
                </div>
                <div className="content-container bg-neutral-100">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}