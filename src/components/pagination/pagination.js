import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { hasPrev, hasNext } from "../../helpers";
import { getcurrentPage } from "./helpers";
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
			return <></>;
		}

		const isPrev = direction == "prev";
		const isNext = direction == "next";
		const cls = isPrev || isNext ? `pagination__${direction}` : "";

		return (
			<li className={cls} key={key}>
				<NavLink to={`/${link}`} activeClassName="current">
					{isPrev ? <FaChevronLeft /> : null}
					{isNext ? <FaChevronRight /> : null}
					{!isPrev && !isNext ? link : null}
				</NavLink>
			</li>
		);
	};

	if (errorMessage && errorMessage.length != 0) {
		return <></>;
	}

	return pages && pages.length > 0 ? (
		<ul className="pagination">
			{hasPrev(id) ? _pageManager("prev", `${parseInt(id) - 1}`) : null}
			{pages.map((page, index) => _pageManager(null, page.id, index))}
			{hasNext(id, totalCharacters)
				? _pageManager("next", `${parseInt(id) + 1}`)
				: null}
		</ul>
	) : null;
};

export default Pagination;
