import React from "react";
// import axios from "axios";
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
		// async function fetchData() {
		// 	try {
		// 		const { data } = await axios.get("/api/image/getAll");
		// 		const { _id, labeled_area } = data.data[0];
		// 		const result = await axios.request({
		// 			url: "/api/image/addLabelArea",
		// 			method: "POST",
		// 			data: {
		// 				id: _id,
		// 				field: "one",
		// 				labelArea: labeled_area,
		// 			},
		// 		});
		// 		console.log(result.data);
		// 	} catch (e) {
		// 		console.log(new Error(e).message);
		// 	}
		// }
		// fetchData();
		return () => {
			// console.log("test");
			// axios.get("/api/image/test");
		};
	}, []);

	return <div>test</div>;
}
