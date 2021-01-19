import { Field, Float, InputType, ObjectType } from "type-graphql";

@ObjectType({ description: "Information of bounding box" })
@InputType("InputLabel")
export class Label {
	@Field({ nullable: true })
	id?: string;

	@Field()
	label_id!: string;

	@Field({ description: "Category: {1: Door, 2: Knob, 3: Stairs, 4: Ramp}" })
	label!: number;

	@Field(() => [Float], { description: "[x0, y0, x1, y1]" })
	box!: number[];

	@Field({ nullable: true })
	create_at?: string;

	@Field()
	score!: number;
}

@ObjectType({ description: "Image document" })
export class Image {
	@Field({ nullable: true })
	id?: string;

	@Field()
	image_id!: string;

	@Field()
	pano!: string;

	@Field({ nullable: true })
	create_at?: string;

	@Field(() => [Float])
	image_size!: number[];

	@Field()
	url!: string;

	@Field()
	lat!: number;

	@Field()
	lon!: number;

	@Field()
	isChecked!: boolean;

	@Field()
	isLabeled!: boolean;

	@Field()
	isReviewed!: boolean;

	@Field(() => [Label], { nullable: true })
	labeled_area!: Label[];

	@Field({ nullable: true })
	name?: string;
}

let numArr: number[];

numArr = [];
