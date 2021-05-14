import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getcurrentPage, hasPrev, hasNext } from "./helpers";

import "./pagination.scss";

const Pagination = ({ id }) => {
	const [pages, setPages] = useState([]);
	const [totalCharacters, setTotalCharacters] = useState(1);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		getcurrentPage(id, setPages, setTotalCharacters, setErrorMessage);
	}, [id]);

	return errorMessage && errorMessage.length != 0 ? (
		<div className="error">{errorMessage}</div>
	) : (
		<ul className="pagination">
			{pages.length > 0 && hasPrev(id) ? (
				<li className={"pagination__prev"}>
					<Link to={`/${parseInt(id) - 1}`}>
						<FaChevronLeft />
					</Link>
				</li>
			) : null}
			{pages.map((page, index) => (
				<li className={page.id == id ? "current" : null} key={index}>
					<Link to={`/${parseInt(page.id)}`}>{page.id}</Link>
				</li>
			))}
			{pages.length > 0 && hasNext(id, totalCharacters) ? (
				<li>
					<Link
						className={"pagination__next"}
						to={`/${parseInt(id) + 1}`}
					>
						<FaChevronRight />
					</Link>
				</li>
			) : null}
		</ul>
	);
};

export default Pagination;
