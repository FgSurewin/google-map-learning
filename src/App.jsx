// import BasicMap from "./components/BasicMap";
import StreetViewRest from "./views/StreetView/StreetViewRest";
import { Route, NavLink as Link, Switch, Redirect } from "react-router-dom";
import Validation from "./views/Validation";
import Test from "./components/Test";

function App() {
	return (
		<div
			style={{
				display: "flex",
				width: "100vw",
				height: "100vh",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<nav
				style={{
					marginBottom: "60px",
				}}
			>
				<Link to="/streetView">Street View Page</Link> |{" "}
				<Link to="/validation/1">Validation Page</Link> |{" "}
				<Link to="/test">Test Page</Link>
			</nav>
			<Switch>
				<Route component={StreetViewRest} path="/streetView" />
				<Route component={Validation} path="/validation/:id" />
				<Route component={Test} path="/test" />
				<Redirect from="/" to="/streetView" />
			</Switch>
			{/* <BasicMap api={process.env.REACT_APP_API_KEY} center={center} /> */}
		</div>
	);
}

export default App;
