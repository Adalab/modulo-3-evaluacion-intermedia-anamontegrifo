import '../styles/App.scss';
import { useState } from 'react';
import initialClubs from '../data/clubs.json';

function App() {
	const [clubsList, setClubsList] = useState(initialClubs);

	const [newName, setNewName] = useState('');
	const [newWeek, setNewWeek] = useState(false);
	const [newWeekend, setNewWeekend] = useState(false);

	const handleAddNewName = (event) => {
		setNewName(event.currentTarget.value);
	};

	const handleAddNewWeek = (event) => {
		setNewWeek(event.currentTarget.checked);
	};

	const handleAddNewWeekend = (event) => {
		setNewWeekend(event.currentTarget.checked);
	};
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

	const handleClick = (event) => {
		event.preventDefault();
		const newClub = {
			name: newName,
			openOnWeekdays: newWeek,
			openOnWeekend: newWeekend,
		};

		setClubsList([...clubsList, newClub]);

		setNewName('');
		setNewWeek(false);
		setNewWeekend(false);
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

				<form className="form" onSubmit={handleSubmit}>
					<header className="header">
						<h2 className="header__title">Añadir un nuevo club</h2>
					</header>
					<label htmlFor="name">
						Nombre del club
						<input
							className="inputName"
							type="text"
							name="name"
							id="name"
							onChange={handleAddNewName}
							value={newName}
						/>
					</label>

					<label htmlFor="week">
						¿Abre entre semana?
						<input
							type="checkbox"
							name="week"
							id="week"
							onChange={handleAddNewWeek}
							checked={newWeek}
						/>
					</label>
					<label htmlFor="weekend">
						¿Abre los fines de semana?
						<input
							type="checkbox"
							name="weekend"
							id="weekend"
							onChange={handleAddNewWeekend}
							checked={newWeekend}
						/>
					</label>
					<input
						onClick={handleClick}
						type="submit"
						value="Añadir un nuevo club"
						className="form__btn"
					/>
				</form>
			</main>
		</div>
	);
}

export default App;
