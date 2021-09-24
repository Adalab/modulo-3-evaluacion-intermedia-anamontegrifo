import '../styles/App.scss';
import { useState } from 'react';
import initialClubs from '../data/clubs.json';

function App() {
	const [clubsList, setClubsList] = useState(initialClubs);

	const htmlClubsList = () => {
		return clubsList.map((oneClub, index) => {
			return (
				<li key={index} className="clubsList__item">
					<h2>{`#${index}: ${oneClub.name}`}</h2>
					<p>{`Abierto entre semana: ${
						oneClub.openOnWeekdays ? 'Sí' : 'No'
					}`}</p>
					<p>{`Abierto el fin de semana: ${
						oneClub.openOnWeekend ? 'Sí' : 'No'
					}`}</p>
				</li>
			);
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<div>
			<header className="header">
				<h1 className="header__title">Mis clubs</h1>
			</header>
			<main className="main">
				<ul className="clubsList">{htmlClubsList()}</ul>

				<form onSubmit={handleSubmit}></form>
			</main>
		</div>
	);
}

export default App;
