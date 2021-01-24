import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {
	ApolloClient,
	InMemoryCache,
	HttpLink,
	from,
	ApolloProvider,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors }) => {
	if (graphqlErrors) {
		graphqlErrors.map(({ message }) =>
			console.log(`Graphql error: ${message}`)
		);
	}
});

const link = from([
	errorLink,
	new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
	connectToDevTools: true,
});

ReactDOM.render(
	<Router>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</Router>,
	document.getElementById("root")
);
