/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable-next-line react/prop-types */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Label from "./label.js";
import Badges from "./badges.js";
import "../style/_character.scss";

const Character = props => {
	const [character, setCharacter] = useState({});
	const [episodes, setEpisodes] = useState([]);
	const [totalCharacters, setTotalCharacters] = useState(1);

	const _fetchAPI = async () => {
		try{
			const { data: res } = await axios.get(`https://rickandmortyapi.com/api/character/${props.match.params.id}`);
			setCharacter(res)
	
			res.episode.map(async (url) => {
				const { data: res } = await axios.get(url);
				setEpisodes(episodes => [...episodes, res]);
			})
		} catch(error) {
			console.log(error.response.data.error)
			_redirectHome();
		}
	};

	const _redirectHome = () => {
		window.location.replace("/");
	}

	const _getTotalCharacters = async () => {
		try{
			const { data: { info: {count} } } = await axios.get("https://rickandmortyapi.com/api/character");
			setTotalCharacters(count)
		} catch(error) {
			console.log(error.response.data.error)
		}
	}

	const _statusManager = (data) => {
		if(data == "Alive") { return <span className="status alive"></span> }
		if(data == "Dead") { return <span className="status dead"></span> }
		if(data == "unknown") { return <span className="status unknown"></span> }
		return null
	}

	useEffect(() => {
		_getTotalCharacters()
	}, []);
	
	useEffect(() => {
		setEpisodes([])
		_fetchAPI(props.match.params.id);
	}, [props.match.params.id]);

	if (Object.keys(character).length == 0) {
		return <div className="loading">Loading...</div>;
	}
	
	return(
		<div className="container">
			<div className="character">
			
				<Label 
					data={character.name}
					tag={"h1"}
				/>

				<div className="character__wrapper">
					<Link 
						className={"character__prev " + (parseInt(props.match.params.id) - 1 <= 0 ? "hidden" : "")}
						to={`/character/${parseInt(props.match.params.id) - 1}`}>
							<FaChevronLeft />
					</Link>
					<Link 
						className={"character__next " + (parseInt(props.match.params.id) + 1 > totalCharacters ? "hidden" : "")}
						to={`/character/${parseInt(props.match.params.id) + 1}`}
					>
						<FaChevronRight />
					</Link>
					<img src={character.image} alt={character.name} />
					<div className="character__data">
						<Label 
							label={"Status: "} 
							data={character.status}
							additionalData={_statusManager(character.status)}
						/>
						<Label 
							label={"Species: "} 
							data={character.species}
						/>
						<Label 
							label={"Type: "} 
							data={character.type}
						/>
						<Label 
							label={"Gender: "} 
							data={character.gender}
						/>
						<Label 
							label={"Origin: "} 
							data={character.origin.name}
						/>
						<Label 
							label={"Location: "} 
							data={character.location.name}
						/>
					</div>
				</div>
				<Badges keys={episodes} title={"Appears in: "} />
			</div>
		</div>
	)
}

export default Character;