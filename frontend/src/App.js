
import React, { useState } from "react";

import Calendar from "./components/calendar/Calendar";
import Navbar from "./components/Navbar";


export default function App() {
	const [selectedView, setSelectedView] = useState("Month");
	const navbarProps = {
		selectedView, setSelectedView
	}
	const calendarProps = {
		selectedView
	}

	return (
		<>
			<div className="flex items-center justify-center h-screen flex-col">
				<Navbar props={navbarProps} />
				<Calendar props={calendarProps} />
			</div>
		</>
	);
}