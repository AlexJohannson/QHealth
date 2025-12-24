import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {router} from "./routers/router";
import './index.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className={'index'}>
        <RouterProvider router={router}/>
    </div>
);


