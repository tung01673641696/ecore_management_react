import React from "react";
import {
	Routes as ListRoute,
	BrowserRouter,
	Route,
	Navigate,
} from "react-router-dom";
import 'react-quill/dist/quill.snow.css';

import "./App.css";
import './translate/i18n'
import {useStateContext} from "./contexts/ContextProvider";
import {privateRoutes, routes} from "./routes";
import path from "./contants/path";



const App = () => {
	const {
		currentMode,
	} = useStateContext();

	return (
		<>
			<div className={currentMode === "Dark" ? "dark" : ""}>
				<BrowserRouter>
					<ListRoute>
						{routes.map((route) => (
							<Route key={route.path} element={route.component} path={route.path} exact/>
						))}
						{privateRoutes.map((it) => (
							<Route key={it.path} exact path={it.path}
								   element={
									   <RequireAuth>
										   {it.component}
									   </RequireAuth>}
							/>
						))}
					</ListRoute>
				</BrowserRouter>
			</div>
		</>
	);
};

function RequireAuth({children}) {
	const user = JSON.parse(localStorage.getItem('user'))
	if(user?.email === undefined){
		return <Navigate to={path.ADMIN_LOGIN}/>
	}
	return children
}


export default React.memo(App);
