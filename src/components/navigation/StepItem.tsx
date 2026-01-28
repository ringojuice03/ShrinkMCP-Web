import React from 'react';
import { NavLink } from 'react-router-dom';

interface StepItemProps {
    label: string;
    to: string;
}

const StepItem: React.FC<StepItemProps> = ({ label, to }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
            }
        >
            {label}
        </NavLink>
    );
};

export default StepItem;
