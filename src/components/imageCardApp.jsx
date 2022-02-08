import React from "react";
import { Col, Card, Avatar } from "antd";

const { Meta } = Card;

function MovieCard({ id, image, title, imdbRating, rank, year }) {
	return (
		<Col
            xs={24}
            sm={6}
            xl={4}
            style={{ padding: 5 }}
        >
			<Card
				hoverable
				style={{ width: "100%" }}
				cover={<img src={image} />}
				actions={[
					<span>{rank}</span>,
					<span>{imdbRating}</span>,
					<span>{year}</span>,
				]}
			>
				<Meta title={title} />
			</Card>
		</Col>
	);
}

export default MovieCard;
