import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { endpoints } from "../../variables";
import { get } from "../../helpers";
import "./pagination.scss";

const Pagination = ({ id }) => {
	const [pages, setPages] = useState([]);
	const [totalCharacters, setTotalCharacters] = useState(1);
	const [errorMessage, setErrorMessage] = useState("");
	const { pathname } = useLocation();

	useEffect(() => {
		getcurrentPage();
	}, [id]);

	const _pageManager = (direction, link, key) => {
		if (!link) {
			return null;
		}

		const isPrev = direction == "prev";
		const isNext = direction == "next";
		const isActive = pathname === `/${link}`;

		return (
			<li
				key={key}
				className={`page-item ${
					isActive && !direction ? "active" : ""
				}`}
			>
				<Link to={`/${link}`} className="page-link">
					{isPrev ? <FaChevronLeft /> : null}
					{isNext ? <FaChevronRight /> : null}
					{!isPrev && !isNext ? link : null}
				</Link>
			</li>
		);
	};

	const getcurrentPage = () => {
		const currentPage = id / 20 < 0 ? 1 : Math.ceil(id / 20);

		get(
			`${endpoints.CHARACTER}?page=${currentPage}`,
			(response) => {
				setPages(response.data.results);
				setTotalCharacters(response.data.info.count);
			},
			setErrorMessage
		);
	};

	const hasPrev = (id) => !(parseInt(id) <= 1);
	const hasNext = (id, characters) => !(parseInt(id) == characters);

	if (errorMessage && errorMessage.length != 0) {
		return null;
	}

	return (
		<nav aria-label="Page navigation example" className="mt-2">
			<ul id="pagination" className="pagination justify-content-center">
				{hasPrev(id) ? _pageManager("prev", `${id - 1}`) : null}
				{pages.map((page, index) => _pageManager(null, page.id, index))}
				{hasNext(id, totalCharacters)
					? _pageManager("next", `${id + 1}`)
					: null}
			</ul>
		</nav>
	);
};

export default Pagination;
