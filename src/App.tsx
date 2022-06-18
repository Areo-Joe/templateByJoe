import Access from './views/Access/Access'
import { Routes, Route, Navigate } from 'react-router-dom'
import { routes } from './router'
import Layout from './layout/Layout'
import './App.css'
import AccessControl from './utils/AccessControl'

function App() {
    return (
      <Routes>
        <Route
          path='/'
          element={
            <AccessControl fallback={<Navigate to='/access'/>}>
              <Layout></Layout>
            </AccessControl>
          }>
            {routes.map(route => <Route key={`route-${route.path}`} path={route.path} element={<route.component/>}/>)}
            <Route index element={<Navigate to={routes[0].path}/>}/>
        </Route>
        <Route path='/access' element={<Access/>}/>
        <Route path='*' element={<Navigate to={routes[0].path}/>}/>
      </Routes>
    )
}

export default App
