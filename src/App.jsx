// import BasicMap from "./components/BasicMap";
import StreetView from "./views/StreetView";
import { Route, NavLink as Link, Switch, Redirect } from "react-router-dom";
import Validation from "./views/Validation";

// const center = {
// 	lat: 40.7541,
// 	lng: -73.99208,
// };

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
				<Link to="/validation">Validation Page</Link>
			</nav>
			<Switch>
				<Route component={StreetView} path="/streetView" />
				<Route component={Validation} path="/validation" />
				<Redirect from="/" to="/streetView" />
			</Switch>
			{/* <BasicMap api={process.env.REACT_APP_API_KEY} center={center} /> */}
		</div>
	);
}

export default App;
