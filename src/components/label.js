/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';

const Label = ({label, data, tag, additionalData}) => {
	switch (tag) {
		case "h1":
			return <h1>{data}</h1>;
		default:
			return(
				data && label && !tag ?
					<p>
						<span>{label}</span>
						{additionalData}
						{data}
					</p>
				: null
			)
	}
}

export default Label;