import React from "react";
import { useSelector } from "react-redux";
import { selectCount } from "../store/selectors";

const Counter = () => {
	const count = useSelector(selectCount);
	return <div>Current Count: {count}</div>;
};

export default Counter;
