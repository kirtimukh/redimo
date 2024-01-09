import React from 'react'

const Navbar = ({ props }) => {
    const changeCalendarView = (e) => {
        props.setSelectedView(e.target.value);
    }
    return (
        <nav className="flex items-center justify-between py-4 px-6 w-full hidden" id='navbar'>
            <div className="flex items-center">
                <div className="text-slate-900 font-semibold text-lg">Home</div>
                <div className="ml-4 text-slate-900">View</div>
                <select
                    className="py-2 px-4 appearance-none ml-4 text-slate-900 border border-gray-300 shadow-md"
                    onChange={changeCalendarView}
                    id="calendar-view"
                    value={props.selectedView}
                >
                    <option>Week</option>
                    <option>Month</option>
                </select>
            </div>
            <div className="relative">
                <div className="text-slate-900">Profile</div>
            </div>
        </nav>
    );
};

export default Navbar;
