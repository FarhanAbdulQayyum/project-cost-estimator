import { RouteObject } from 'react-router-dom'
import App from './App'
import { MyProjects } from './pages/MyProjects'
import { Resources } from './pages/Resources'
import { ProjectDetails } from './pages/ProjectDetails'

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "my-projects",
                element: <MyProjects />,
            },
            {
                path: "project-details",
                element: <ProjectDetails />,
            },
            {
                path: "resources",
                element: <Resources />,
            },
        ],
    },
]