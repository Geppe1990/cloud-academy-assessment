import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { hasPrev, hasNext } from "../../helpers";
import { getcurrentPage } from "./helpers";
import "./pagination.scss";

const Pagination = ({ id }) => {
	const [pages, setPages] = useState([]);
	const [totalCharacters, setTotalCharacters] = useState(1);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		getcurrentPage(id, setPages, setTotalCharacters, setErrorMessage);
	}, [id]);

	const _arrowManager = (direction) => {
		if (!direction) {
			return;
		}

		const isPrev = direction == "prev";
		const link = isPrev ? `/${parseInt(id) - 1}` : `/${parseInt(id) + 1}`;

		return (
			<li className={`pagination__${direction}`}>
				<Link to={link}>
					{isPrev ? <FaChevronLeft /> : <FaChevronRight />}
				</Link>
			</li>
		);
	};

	if (errorMessage && errorMessage.length != 0) {
		return;
	}

	return (
		<ul className="pagination">
			{pages.length > 0 && hasPrev(id) ? _arrowManager("prev") : null}
			{pages.map((page, index) => (
				<li className={page.id == id ? "current" : null} key={index}>
					<Link to={`/${parseInt(page.id)}`}>{page.id}</Link>
				</li>
			))}
			{pages.length > 0 && hasNext(id, totalCharacters)
				? _arrowManager("next")
				: null}
		</ul>
	);
};

export default Pagination;
