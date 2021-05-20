import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getcurrentPage, hasPrev, hasNext } from "./helpers";
import { NavLink } from "react-router-dom";

import "./pagination.scss";

const Pagination = ({ id }) => {
	const [pages, setPages] = useState([]);
	const [totalCharacters, setTotalCharacters] = useState(1);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		getcurrentPage(id, setPages, setTotalCharacters, setErrorMessage);
	}, [id]);

	const _pageManager = (direction, link, key) => {
		if (!link) {
			return null;
		}

		const isPrev = direction == "prev";
		const isNext = direction == "next";

		return (
			<li key={key}>
				<NavLink to={`/${link}`} activeClassName="current">
					{isPrev ? <FaChevronLeft /> : null}
					{isNext ? <FaChevronRight /> : null}
					{!isPrev && !isNext ? link : null}
				</NavLink>
			</li>
		);
	};

	if (errorMessage && errorMessage.length != 0) {
		return null;
	}

	return (
		<ul id="pagination">
			{hasPrev(id) ? _pageManager("prev", `${parseInt(id) - 1}`) : null}
			{pages.map((page, index) => _pageManager(null, page.id, index))}
			{hasNext(id, totalCharacters)
				? _pageManager("next", `${parseInt(id) + 1}`)
				: null}
		</ul>
	);
};

export default Pagination;
