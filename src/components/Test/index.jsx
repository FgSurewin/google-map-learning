import React from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_RANDOM_IMAGE_LIST } from "../../graphql/image/query";

export default function Test(props) {
	// console.log("COMPONENT ->", props);
	const [count, setCount] = React.useState(0);
	// const { refetch } = useQuery(QUERY_RANDOM_IMAGE_LIST, {
	// 	fetchPolicy: "no-cache",
	// 	onCompleted: function (data) {
	// 		console.log("DATA -> ", data);
	// 	},
	// });
	const [loadData, { data }] = useLazyQuery(QUERY_RANDOM_IMAGE_LIST, {
		fetchPolicy: "no-cache",
	});

	React.useEffect(() => {
		if (data) {
			console.log("DATA -> ", data);
		}
	}, [data]);

	return (
		<div>
			<p>{count}</p>
			<button
				onClick={() => {
					loadData();
					setCount(count + 1);
				}}
			>
				ADD
			</button>
		</div>
	);
}
