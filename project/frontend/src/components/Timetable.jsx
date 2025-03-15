import React, { useState, useEffect, useContext } from "react";
import "../css/Timetable.css";
import { PageContext } from "../contexts/PageContext";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { getAllClasses } from "../utility/fetchClasses.js";
import { FilterContext } from "../contexts/FilterContext";
/**
 * const data = [
	{
		offering: {

			classTypes: [
				{
					type: "seminar",
					classes: [
						{
							day: "MON",
							duration: 2,
							time: 18,
						},
						{
							day: "WED",
							duration: 2,
							time: 12,
						},
						{
							day: "FRI",
							duration: 1,
							time: 9,
						},
						{
							day: "TUE",
							duration: 3,
							time: 14,
						},
					],
				},
				{
					type: "lab",
					classes: [
						{
							day: "FRI",
							duration: 2,
							time: 13,
						},
						{
							day: "THU",
							duration: 1,
							time: 8,
						},
						{
							day: "MON",
							duration: 2,
							time: 16,
						},
						{
							day: "TUE",
							duration: 3,
							time: 10,
						},
					],
				},
			],
		},
	},
];
 * 
 */

const data = [
	{
		day: "MON",
		duration: 2,
		time: 18,
	},
	{
		day: "WED",
		duration: 2,
		time: 12,
	},
	{
		day: "FRI",
		duration: 2,
		time: 13,
	},
];

// Function to get the dates for the current week
const getCurrentWeekDates = (startDate) => {
	const dates = [];
	for (let i = 0; i < 5; i++) {
		// Only Monday to Friday
		const date = new Date(startDate);
		date.setDate(startDate.getDate() + i);
		dates.push(date);
	}
	return dates;
};

const formatDate = (date) => {
	const day = String(date.getDate()).padStart(2, "0"); // Pad day with zero
	const month = date.getMonth() + 1;
	return `${day}/${month}`;
};

// Function to calculate the week number starting from March 3rd
const getWeekNumber = (date) => {
	const startDate = new Date(date.getFullYear(), 2, 3); // March 3rd of the current year
	const timeDiff = date - startDate;
	const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	const weekNumber = Math.floor(daysDiff / 7) + 1;
	if (weekNumber == 8) {
		return "BREAK";
	}
	if (weekNumber > 8) {
		return "Week " + (weekNumber - 1);
	}
	return "Week " + weekNumber;
};

const hours = Array.from({ length: 14 }, (_, i) => 8 + i); // 8AM to 9PM

const Timetable = () => {
	const [currentWeekStart, setCurrentWeekStart] = useState(new Date()); // Start of the current week (Monday)
	const [days, setDays] = useState([]); // Dynamically generated days array
	// const [clickedCells, setClickedCells] = useState({}); // State to track clicked cells
	const { clickedCells, setClickedCells } = useContext(FilterContext);
	const [isDragging, setIsDragging] = useState(false); // State to track if mouse is being dragged
	const [dragStartState, setDragStartState] = useState(null); // State to track the initial state of the starting cell
	const { editUnit, unitInfo } = useContext(PageContext);
	const [classData, setClassData] = useState([]);

	useEffect(() => {
		async function getData() {
			try {
				const data = await getAllClasses(10000000, 2025, 1);
				setClassData(classData);
				console.log(data);
			} catch (err) {
				console.log("error");
			}
		}
		getData();
	}, []);

	// Update the days array whenever the current week changes
	useEffect(() => {
		const startOfWeek = new Date(currentWeekStart);
		startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Set to Monday of the current week
		const weekDates = getCurrentWeekDates(startOfWeek);
		const updatedDays = weekDates.map((date, index) => ({
			name: ["MON", "TUE", "WED", "THU", "FRI"][index],
			date: formatDate(date),
		}));
		setDays(updatedDays);
	}, [currentWeekStart]);

	//get the data of the unit
	useEffect(() => {
		if (editUnit !== -1) {
			setClickedCells({});
			const c = classData.filter((unit) => unit.unitcode === unitCode);
			setClickedCells((prev) => {
				const updatedCells = { ...prev };
				console.log(c);
				c.forEach((classItem) => {
					for (
						let hour = classItem.time;
						hour < classItem.time + classItem.duration;
						hour++
					) {
						const cellKey = `${classItem.day}-${hour}`;
						updatedCells[cellKey] = "class";
					}
				});

				return updatedCells;
			});
		} else {
			setClickedCells({});
		}
	}, [editUnit]);

	// Function to handle cell clicks
	const handleCellClick = (day, hour, isSelecting, event) => {
		const cellKey = `${day.name}-${hour}`;
		if (clickedCells[cellKey] !== "class") {
			setClickedCells((prev) => ({
				...prev,
				[cellKey]: isSelecting,
			}));
		} else if (clickedCells[cellKey] === "class") {
			const rect = event.target.getBoundingClientRect();
			console.log(rect);
		}
	};

	// Function to handle mouse down event
	const handleMouseDown = (day, hour) => {
		const cellKey = `${day.name}-${hour}`;
		const isClicked = clickedCells[cellKey];
		setDragStartState(!isClicked); // Set the initial state (true for selecting, false for deselecting)
		setIsDragging(true);
		handleCellClick(day, hour, !isClicked); // Toggle the state of the starting cell
	};

	// Function to handle mouse over event
	const handleMouseOver = (day, hour) => {
		if (isDragging) {
			handleCellClick(day, hour, dragStartState); // Set the state based on the initial drag state
		}
	};

	// Function to handle mouse up event
	const handleMouseUp = () => {
		setIsDragging(false);
		setDragStartState(null); // Reset the drag start state
	};

	// Function to navigate to the previous week
	const goToPreviousWeek = () => {
		const newStartDate = new Date(currentWeekStart);
		newStartDate.setDate(newStartDate.getDate() - 7);
		setCurrentWeekStart(newStartDate);
	};

	// Function to navigate to the next week
	const goToNextWeek = () => {
		const newStartDate = new Date(currentWeekStart);
		newStartDate.setDate(newStartDate.getDate() + 7);
		setCurrentWeekStart(newStartDate);
	};

	// Add a global mousemove listener to handle the dragging behavior
	const handleMouseMove = (e) => {
		if (isDragging) {
			// Track mouse movement and handle cell click accordingly
			const targetElement = e.target;
			if (
				targetElement &&
				targetElement.dataset.day &&
				targetElement.dataset.hour
			) {
				handleCellClick(
					{ name: targetElement.dataset.day },
					parseInt(targetElement.dataset.hour, 10),
					dragStartState
				);
			}
		}
	};

	const handleMouseUpGlobal = () => {
		setIsDragging(false);
		setDragStartState(null);
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUpGlobal);
	};

	// Attach the global mousemove event listener and mouseup event listener
	document.addEventListener("mousemove", handleMouseMove);
	document.addEventListener("mouseup", handleMouseUpGlobal);

	// Calculate the week number
	const weekNumber = getWeekNumber(currentWeekStart);

	return (
		<div className="timetable-container" onMouseLeave={handleMouseUp}>
			<div className="week-header">
				<p onClick={goToPreviousWeek}>
					<IconArrowNarrowLeft />
				</p>
				<span>{weekNumber} </span>
				<p onClick={goToNextWeek}>
					<IconArrowNarrowRight />
				</p>
			</div>
			<table className="timetable">
				<thead>
					<tr>
						<th></th>
						{days.map((day) => (
							<th key={day.name}>
								{day.name} <br /> {day.date}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{hours.map((hour) => (
						<tr key={hour}>
							<td>
								{hour <= 11
									? `${hour} AM`
									: hour === 12
										? "12 PM"
										: `${hour - 12} PM`}
							</td>
							{days.map((day) => {
								const cellKey = `${day.name}-${hour}`;
								const isClicked = clickedCells[cellKey];

								return (
									<td
										key={cellKey}
										className={`empty-slot ${isClicked && isClicked !== "class" ? "clicked" : ""
											} ${isClicked === "class" ? "class-time" : ""}`}
										onMouseDown={(e) => handleMouseDown(day, hour, e)}
										onMouseOver={() => handleMouseOver(day, hour, cellKey)}
										onMouseUp={handleMouseUp}
									></td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Timetable;
