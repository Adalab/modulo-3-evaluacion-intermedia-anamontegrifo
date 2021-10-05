import '../styles/App.scss';
import { useState } from 'react';
import initialClubs from '../data/clubs.json';

function App() {
	const [clubsList, setClubsList] = useState(initialClubs);

	const [newName, setNewName] = useState('');
	const [newWeek, setNewWeek] = useState(false);
	const [newWeekend, setNewWeekend] = useState(false);

	const [scheduleFilter, setScheduleFilter] = useState('OpenAllDays');

	const handleAddNewName = (event) => {
		setNewName(event.currentTarget.value);
	};

	const handleAddNewWeek = (event) => {
		setNewWeek(event.currentTarget.checked);
	};

	const handleAddNewWeekend = (event) => {
		setNewWeekend(event.currentTarget.checked);
	};

	const handleScheduleFilter = (event) => {
		setScheduleFilter(event.currentTarget.value);
	};

	const handleDeleteClub = (event) => {
		const selectItem = event.currentTarget.id;
		clubsList.splice(selectItem, 1);
		setClubsList([...clubsList]);
	};

	const htmlClubsList = (event) => {
		return clubsList
			.filter((oneClub) => {
				if (scheduleFilter === 'openOnWeekDays') {
					return oneClub.openOnWeekdays === true;
				} else if (scheduleFilter === 'openOnWeekend') {
					return oneClub.openOnWeekend === true;
				}
				return true;
			})

			.map((oneClub, index) => {
				return (
					<li key={index} id={index} className="clubsList__item">
						<button className="clubsList__button" onClick={handleDeleteClub}>
							<i className="fas fa-times-circle clubsList__icon"></i>
						</button>

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
				<form action="" className="header__form">
					<select
						className="header__form--select"
						value={scheduleFilter}
						onChange={handleScheduleFilter}
					>
						<option value="openAllDays">Abierto todos los días</option>
						<option value="openOnWeekDays">Abierto entre semana</option>
						<option value="openOnWeekend">Abierto los fines de semana</option>
					</select>
				</form>
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
