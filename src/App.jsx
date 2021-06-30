// import BasicMap from "./components/BasicMap";
import Exploration from "./views/Exploration";
import { Route, Switch, Redirect } from "react-router-dom";
import Validation from "./views/Validation";
import Test from "./components/Test";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import "antd/dist/antd.css";

function App() {
	return (
		<div>
			<Switch>
				<ProtectedRoute
					component={Exploration}
					path="/streetView"
					isAuth={false}
				/>
				<ProtectedRoute
					component={Validation}
					path="/validation/:id"
					isAuth={false}
				/>
				<Route component={Home} path="/home" />
				<Route component={SignUp} path="/signUp" />
				<Route component={Login} path="/login" />
				<Route component={Test} path="/test" />
				<Redirect exact from="/" to="/home" />
			</Switch>
		</div>
	);
}

export default App;
