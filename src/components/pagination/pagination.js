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

	const _arrowManager = (direction) => {
		if (!direction) {
			return;
		}

		const isPrev = direction == "prev";
		const link = isPrev ? `/${parseInt(id) - 1}` : `/${parseInt(id) + 1}`;

		return (
			<li className={`pagination__${direction}`}>
				<NavLink to={link} activeClassName="current">
					{isPrev ? <FaChevronLeft /> : <FaChevronRight />}
				</NavLink>
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
				<li key={index}>
					<NavLink
						to={`/${parseInt(page.id)}`}
						activeClassName="current"
					>
						{page.id}
					</NavLink>
				</li>
			))}
			{pages.length > 0 && hasNext(id, totalCharacters)
				? _arrowManager("next")
				: null}
		</ul>
	);
};

export default Pagination;
