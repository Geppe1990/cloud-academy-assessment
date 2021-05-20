import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getcurrentPage, hasPrev, hasNext } from "./helpers";
import { Link, useLocation } from "react-router-dom";
import "./pagination.scss";

const Pagination = (props, { id }) => {
	const [pages, setPages] = useState([]);
	const [totalCharacters, setTotalCharacters] = useState(1);
	const [errorMessage, setErrorMessage] = useState("");
	const { pathname } = useLocation();

	useEffect(() => {
		getcurrentPage(id, setPages, setTotalCharacters, setErrorMessage);
	}, [id]);

	const _pageManager = (direction, link, key) => {
		if (!link) {
			return null;
		}

		const isPrev = direction == "prev";
		const isNext = direction == "next";
		const isActive = pathname === `/${link}`;

		return (
			<li key={key} className={`page-item ${isActive ? "active" : ""}`}>
				<Link to={`/${link}`} className="page-link">
					{isPrev ? <FaChevronLeft /> : null}
					{isNext ? <FaChevronRight /> : null}
					{!isPrev && !isNext ? link : null}
				</Link>
			</li>
		);
	};

	if (errorMessage && errorMessage.length != 0) {
		return null;
	}

	//TODO: SISTEMA LE FRECCE CHE SONO ROTTE

	return (
		<nav aria-label="Page navigation example" className="mt-2">
			<ul id="pagination" className="pagination justify-content-center">
				{hasPrev(id)
					? _pageManager("prev", `${parseInt(id) - 1}`)
					: null}
				{pages.map((page, index) => _pageManager(null, page.id, index))}
				{hasNext(id, totalCharacters)
					? _pageManager("next", `${parseInt(id) + 1}`)
					: null}
			</ul>
		</nav>
	);
};

export default Pagination;
