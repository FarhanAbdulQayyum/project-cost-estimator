import { RouteObject } from 'react-router-dom'
import App from './App'
import { MyProjects } from './pages/MyProjects'

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "my-projects",
                element: <MyProjects />,
            },
        ],
    },
]