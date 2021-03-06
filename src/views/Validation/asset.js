import { Target } from "../../components/Box/utils";

export const URL =
	"https://storage.labelbox.com/cjvii2o9ehvtw0804li72x0u9%2F4411b861-8b53-a4ee-620b-b64a223b7e1d-EMEv52RKk7jsOJscC_SrHA_0.jpg?Expires=1604433761529&KeyName=labelbox-assets-key-1&Signature=uMPR1Ei5gNZoSEijTFb_BTSnqug";

export const WIDTH = 3584;
export const RATIO = 800 / WIDTH;

export const targetConvertor = (target) => {
	let result;
	const { DOOR, KNOB, RAMP, STAIRS } = Target;
	switch (target) {
		case 1:
			result = DOOR;
			break;
		case 2:
			result = KNOB;
			break;
		case 3:
			result = STAIRS;
			break;
		case 4:
			result = RAMP;
			break;
		default:
			break;
	}

	return result;
};

export const boxDecorator = (box) => {
	return box.map((item) => ({
		id: item.label_id,
		target: targetConvertor(item.label),
		isClick: false,
		startPoint: {
			x: item.box[0],
			y: item.box[1],
		},
		endPoint: {
			x: item.box[2],
			y: item.box[3],
		},
	}));
};

export const boxes = [
	{
		id: "one",
		target: "door",
		isClick: false,
		startPoint: {
			x: 2077.0,
			y: 13.0,
		},
		endPoint: {
			x: 2794.0,
			y: 1203.0,
		},
	},
	{
		id: "two",
		target: "stairs",
		isClick: false,
		startPoint: {
			x: 1638.0,
			y: 1114.0,
		},
		endPoint: {
			x: 3478.0,
			y: 1878.0,
		},
	},
	{
		id: "three",
		target: "knob",
		isClick: false,
		startPoint: {
			x: 2378.0,
			y: 829.0,
		},
		endPoint: {
			x: 2483.0,
			y: 944.0,
		},
	},
];
