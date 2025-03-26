"use client";
import { useEffect } from "react";

export const useInterval = (callback: () => void, delay: number): void => {
	useEffect(() => {
		const interval = setInterval(() => {
			callback();
		}, delay);
		return () => clearInterval(interval);
	}, [callback, delay]);
};
