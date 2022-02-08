import { useState, useEffect } from "react";
import { Row, Spin, Col, Divider, Alert } from "antd";
import imdbAPI from "./api/imdbAPI";
import MovieCard from "./components/imageCardApp";
import SearchMovie from "./components/SearchMovie";
import { Fragment } from "react/cjs/react.production.min";

function App() {
	const [movies, setMovies] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [filteredData, setFilteredData] = useState();

	useEffect(async () => {
		const response = await imdbAPI.get("Top250Movies/k_g6fmml6a");
		// const response = await imdbAPI.get("Top250Movies/k_8g3jj60q");
		const data = response.data.items.slice(0, 30);
		setMovies(data);
		setFilteredData(data);
		setIsLoading(false);
	}, []);

	if (filteredData) {
		var makeMovieItems = filteredData.map((item) => {
			return (
				<MovieCard
					id={item.id}
					key={item.id}
					image={item.image}
					title={item.title}
					imdbRating={item.imDbRating}
					rank={item.rank}
					year={item.year}
				/>
			);
		});
	}

	const qCallback = (q) => {
		if (!q && movies) {
			setFilteredData(movies);
		} else if (movies) {
			const filter = movies.filter((movie) => {
				return movie.title.toLowerCase().includes(q.toLowerCase());
			});
			setFilteredData(filter);
		}
	};
	if (!movies || isLoading) {
		return (
			<div
				style={{
					position: "absolute",
					top: "0",
					width: "100%",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Spin size="large" />
			</div>
		);
	} else if (movies.length < 1 && !isLoading) {
		return (
			<Row style={{ padding: 10 }}>
				<Col span={12} offset={6}>
					<Alert
						message="There Was something that went wrong"
						description="Sorry we've Reached Our API Limitations :("
						type="error"
						showIcon
						closable
					/>
				</Col>
			</Row>
		);
	}
	return (
		<Fragment>
			<Divider plain>Search</Divider>
			<Row>
				<Col offset={6} xs={12} sm={12}>
					<SearchMovie searchCallback={qCallback} />
				</Col>
			</Row>
			<div className="site-card-wrapper">
				<Divider plain>Top 30 Movies</Divider>
				<Row style={{ padding: 5 }}>
					{filteredData.length < 1 && (
						<Col xs={12} offset={6}>
							<Alert
								closable
								showIcon
								type="warning"
								message="Not found, try another :)"
							/>
						</Col>
					)}
					{makeMovieItems}
				</Row>
			</div>
		</Fragment>
	);
}

export default App;
