import React, { useEffect } from "react";
import { useState } from "react";
import { Input } from "antd";

const Search = Input;

function SearchMovie(props) {
	const [term, setTerm] = useState(null);

	useEffect(() => {
		const postPoner = setTimeout(() => {
				props.searchCallback(term)
		}, 500);
		return () => {
			clearTimeout(postPoner);
		};
	}, [term]);

	const onSearch = (e) => {
		setTerm(e.target.value);
	};
	return (
		<Search
			placeholder="Filter them by name"
			size="large"
			onInput={onSearch}
		/>
	);
}

export default SearchMovie;
