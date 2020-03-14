import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import undo from '../../assets/images/undo.png';
import { calculate } from '../math/compute';

const Calculator = () => {
	const [params, setParams] = useState({
		purpose: 'конкретное',
		recovery: 'восст',
		techService: 'обслуживаемые',
		applicationMode: 'ндп',
	});
	const [output, setOutput] = useState('');
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
		handleCalculateClick();
		console.log('111', localStorage.getItem('json'));
	};

	const changeInputDropdown = async id => {
		const e = document.getElementById(id);
		const val = e.value;
		await setParams({ ...params, [id]: val });
	};

	const handleCalculateClick = async () => {
		const { purpose, recovery, techService, applicationMode } = params;
		setOutput(calculate(JSON.parse(localStorage.getItem('json'))));
		/*
		let param;
		switch (recovery) {
			case 'восст':
				if (techService === 'обслуживаемые') {
					switch (purpose) {
						case 'конкретное':
							param =
								applicationMode === 'ндп'
									? 'Кг, Кти, То, Тв,'
									: applicationMode === 'мцп'
									? 'Kг*Р(tбр), Тв,'
									: 'Ктиож, Р(tбр), Твож,';
							await setOutput(`${output} ${param}`);
							break;
						default:
							param =
								applicationMode === 'ндп' || applicationMode === 'мцп'
									? 'Кти, То, Тв'
									: '';
							await setOutput(`${output} ${param}`);
							break;
					}
				} else {
					switch (purpose) {
						case 'конкретное':
							param =
								applicationMode === 'ндп'
									? 'Кг, То, Тв,'
									: applicationMode === 'мцп'
									? 'Kг*Р(tбр), Тв,'
									: 'Кгож, Р(tбр), Твож,';
							await setOutput(`${output} ${param}`);
							break;
						default:
							param =
								applicationMode === 'ндп' || applicationMode === 'мцп'
									? 'Кг, То, Тв,'
									: '';
							await setOutput(`${output} ${param}`);
							break;
					}
				}
				break;
			default:
				switch (purpose) {
					case 'конкретное':
						param =
							applicationMode === 'ндп'
								? 'Р(tбр) или Тср'
								: applicationMode === 'мцп'
								? 'Р0(вкл), Тср'
								: 'Р(tож), Р(tбр)';
						await setOutput(`${output} ${param}`);
						break;
					default:
						param =
							applicationMode === 'ндп' || applicationMode === 'мцп'
								? 'Ту, Тср, Р0(вкл)'
								: '';
						await setOutput(`${output} ${param}`);
						break;
				}
		}*/
	};

	const data = {
		applicationMode: [
			{ value: 'ндп', text: 'Непрерывное длительное применение' },
			{ value: 'мцп', text: 'Многократное циклическое применение' },
			{ value: 'оп', text: 'Однократное применение' },
		],
		techService: [
			{ value: 'обслуживаемые', text: 'Обслуживаемые' },
			{ value: 'необслуживаемые', text: 'Необслуживаемые' },
		],
		recovery: [
			{ value: 'восстанавливаемые', text: 'Восстанавливаемые' },
			{ value: 'невосстанавливаемые', text: 'Невосстанавливаемые' },
		],
		purpose: [
			{ value: 'конкретное', text: 'Конкретное' },
			{ value: 'общее', text: 'Общее' },
		],
	};

	const Selector = ({ id }) => {
		return (
			<>
				<br />
				<select
					className="form-control"
					id={id}
					onChange={() => changeInputDropdown(id)}
				>
					{data[id].map(({ value, text }) => (
						<option value={value} key={value}>
							{text}
						</option>
					))}
				</select>
			</>
		);
	};

	return (
		<div style={{ margin: '0 40px' }}>
			<Link to={'/mxgraph'}>
				<Button
					variant="warning"
					style={{ fontSize: '14px', padding: '3px 6px', margin: '15px 0px' }}
				>
					<img
						src={undo}
						alt="back"
						style={{ height: '20px', width: '20px' }}
					/>{' '}
					Назад
				</Button>
			</Link>
			<div className="form-group">
				<div className="form-item">
					Назначение:
					<select
						className="form-control"
						id={'purpose'}
						onChange={() => changeInputDropdown('purpose')}
					>
						{data['purpose'].map(({ value, text }) => (
							<option value={value} key={value}>
								{text}
							</option>
						))}
					</select>
					<br />
				</div>

				<div className="form-item">
					Восстановление работоспособного состояния после отказа:
					<select
						className="form-control"
						id={'recovery'}
						onChange={() => changeInputDropdown('recovery')}
					>
						{data['recovery'].map(({ value, text }) => (
							<option value={value} key={value}>
								{text}
							</option>
						))}
					</select>
					<br />
				</div>

				<div className="form-item">
					Техническое обслуживание в процессе эксплуатации:
					<select
						className="form-control"
						id={'techService'}
						onChange={() => changeInputDropdown('techService')}
					>
						{data['techService'].map(({ value, text }) => (
							<option value={value} key={value}>
								{text}
							</option>
						))}
					</select>
					<br />
				</div>
				<div className="form-item">
					Режим применения (функционирования):
					<select
						className="form-control"
						id={'applicationMode'}
						onChange={() => changeInputDropdown('applicationMode')}
					>
						{data['applicationMode'].map(({ value, text }) => (
							<option value={value} key={value}>
								{text}
							</option>
						))}
					</select>
					<br />
				</div>
				<br />
			</div>
			<Button
				variant="secondary"
				onClick={handleShow}
				style={{ width: '100%' }}
			>
				Рассчитать
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<input
						type="text"
						className="output"
						placeholder="result"
						disabled
						value={output}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Calculator;
