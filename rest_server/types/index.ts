import { Request, Response, NextFunction } from "express";
import { LabelInterface } from "../database/models/image";

export interface ImageParams {
	panoId?: string;
	Id?: string;
}

export interface AppContext {
	req: Request;
	res: Response;
	next: NextFunction;
}

export type ImageField = "user_one" | "user_two" | "user_three";

export interface ImageBody {
	labeled?: boolean;
	id?: string;
	labelArea?: LabelInterface[];
	field?: ImageField;
}

export interface UserBody {
	nickname: string;
	password: string;
	email: string;
	role: string;
	institution: string;
}
