import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getcurrentPage, hasPrev, hasNext } from "./helpers";

import "./pagination.scss";

const Pagination = ({ id }) => {
	const [pages, setPages] = useState([]);
	const [totalCharacters, setTotalCharacters] = useState(1);

	useEffect(() => {
		getcurrentPage(id, setPages, setTotalCharacters);
	}, [id]);

	return (
		<ul className="pagination">
			{pages.length > 0 && hasPrev(id) ? (
				<li className={"pagination__prev"}>
					<Link to={`/character/${parseInt(id) - 1}`}>
						<FaChevronLeft />
					</Link>
				</li>
			) : null}
			{pages.map((page, index) => (
				<li className={page.id == id ? "current" : null} key={index}>
					<Link to={`/character/${parseInt(page.id)}`}>
						{page.id}
					</Link>
				</li>
			))}
			{pages.length > 0 && hasNext(id, totalCharacters) ? (
				<li>
					<Link
						className={"pagination__next"}
						to={`/character/${parseInt(id) + 1}`}
					>
						<FaChevronRight />
					</Link>
				</li>
			) : null}
		</ul>
	);
};

export default Pagination;
