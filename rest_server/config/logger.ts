import { Request, Response, NextFunction } from "express";
import chalk from "chalk";

export const Red = chalk.bold.red;
export const Green = chalk.bold.green;
export const Yellow = chalk.bold.yellow;

const getTimeStamp = (): string => new Date().toISOString();

export const logger = (namespace: string, message: string, object?: any) => {
	if (object) {
		console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
	} else {
		console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
	}
};

const NAMESPACE = "SERVER";
export const loggerMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logger(
		NAMESPACE,
		`[${Green("START")}] METHOD - [${req.method}], URL - [${req.url}], IP - [${
			req.socket.remoteAddress
		}]`
	);

	res.on("finish", () => {
		logger(
			NAMESPACE,
			`[${Yellow("END")}] METHOD - [${req.method}], URL - [${req.url}], IP - [${
				req.socket.remoteAddress
			}], STATUS - [${res.statusCode}]`
		);
	});

	await next();
};

export const log = (namespace: string) => (
	target: any,
	methodName: string,
	desc: PropertyDescriptor
) => {
	const _func = desc.value;
	desc.value = function (req: Request, res: Response, next: NextFunction) {
		logger(
			namespace,
			`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
		);
		_func.call(this, req, res, next);
	};
};
