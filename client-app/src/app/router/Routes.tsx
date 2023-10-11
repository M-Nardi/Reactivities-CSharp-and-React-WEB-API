import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

// definição das rotas
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />, //topo da árvore
        children: [ //filhos da árvore
            {path: 'activities', element: <ActivityDashboard />},
            {path: 'activities/:id', element: <ActivityDetails />},
            {path: 'createActivity', element: <ActivityForm key = 'create'/>}, //adição de keys para o reset dos componentes
            {path: 'manage/:id', element: <ActivityForm key = 'manage'/>},
        ]
    }
]

export const router = createBrowserRouter(routes)