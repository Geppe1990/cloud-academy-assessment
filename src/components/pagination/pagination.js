import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { endpoints } from "../../variables";
import "./pagination.scss";

const Pagination = ({ id }) => {
	const [pages, setPages] = useState([]);
	const [totalCharacters, setTotalCharacters] = useState(1);

	useEffect(() => {
		getcurrentPage();
	}, [id]);

	const getcurrentPage = () => {
		const currentPage = id / 20 < 0 ? 1 : Math.ceil(id / 20);

		axios
			.get(`${endpoints.CHARACTER}?page=${currentPage}`)
			.then((response) => {
				setPages(response.data.results);
				setTotalCharacters(response.data.info.count);
			});
	};

	const _hasPrev = () => {
		return parseInt(id) - 1 <= 0;
	};

	const _hasNext = () => {
		return parseInt(id) + 1 > totalCharacters;
	};

	return (
		<ul className="pagination">
			{pages.length > 0 && _hasPrev ? (
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
			{pages.length > 0 && _hasNext ? (
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
