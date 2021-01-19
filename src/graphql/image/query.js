import { gql } from "@apollo/client";

export const QUERY_ALL_IMAGES = gql`
	query getAllImages {
		getAllImages {
			image_id
			pano
			create_at
			image_size
			url
		}
	}
`;

export const QUERY_RANDOM_IMAGE_LIST = gql`
	query getRandomImageList {
		getRandomImageList {
			id
			name
			image_id
			pano
			create_at
			image_size
			url
			lat
			lon
			isChecked
			isLabeled
			isReviewed
			labeled_area {
				id
				label_id
				label
				box
				create_at
				score
			}
		}
	}
`;
