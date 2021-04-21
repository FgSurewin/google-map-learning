// import BasicMap from "./components/BasicMap";
import Exploration from "./views/Exploration";
import { Route, Switch, Redirect } from "react-router-dom";
import Validation from "./views/Validation";
import Test from "./components/Test";
import Home from "./views/Home";

function App() {
	return (
		<div>
			<Switch>
				<Route component={Exploration} path="/streetView" />
				<Route component={Validation} path="/validation/:id" />
				<Route component={Home} path="/home" />
				<Route component={Test} path="/test" />
				<Redirect exact from="/" to="/home" />
				<Redirect to="test" />
			</Switch>
		</div>
	);
}

export default App;
