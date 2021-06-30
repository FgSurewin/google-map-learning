import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

export default function ProtectedRoute({
	isAuth,
	component: Component,
	path,
	...rest
}) {
	const location = useLocation();
	console.log(" -> ", location);
	if (isAuth)
		return <Route path={path} render={() => <Component {...rest} />} />;
	else return <Redirect from={location.pathname} to="/login" />;
}
