import React from "react";
import { useDispatch } from "react-redux";

import { increment, decrement } from "../store/actions";

const Controls = () => {
	const dispatch = useDispatch();

	return (
		<div>
			<button type="button" onClick={() => dispatch(increment())}>
				+
			</button>
			<button type="button" onClick={() => dispatch(decrement())}>
				-
			</button>
		</div>
	);
};

export default Controls;
