import React from 'react';
import StepItem from './StepItem';

interface StepSidebarProps {
    sections: string[];
}

const StepSidebar: React.FC<StepSidebarProps> = ({ sections }) => {
    return (
        <div className="sidebar">
            <nav className="nav-menu">
                {sections.map((section) => (
                    <StepItem
                        key={section}
                        label={section}
                        to={`/${section.toLowerCase()}`}
                    />
                ))}
            </nav>
        </div>
    );
};

export default StepSidebar;
