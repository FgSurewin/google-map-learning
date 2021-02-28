import React from "react";
import axios from "axios";
// import { useLazyQuery } from "@apollo/client";
// import { QUERY_RANDOM_IMAGE_LIST } from "../../graphql/image/query";

export default function Test() {
	// console.log("COMPONENT ->", props);
	// const [count, setCount] = React.useState(0);
	// const { refetch } = useQuery(QUERY_RANDOM_IMAGE_LIST, {
	// 	fetchPolicy: "no-cache",
	// 	onCompleted: function (data) {
	// 		console.log("DATA -> ", data);
	// 	},
	// });
	React.useEffect(() => {
		async function fetchData() {
			try {
				const result = await axios.get("/api/image/getAll");
				console.log("result -> ", result);
			} catch (e) {
				console.log(new Error(e).message);
			}
		}
		fetchData();
	}, []);

	return <div>test</div>;
}
