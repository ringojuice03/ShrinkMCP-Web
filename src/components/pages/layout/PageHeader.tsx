import React from 'react';

interface PageHeaderProps {
    title: string;
    description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
    return (
        <div className="section-header">
            <h2 className="section-title">{title}</h2>
            <p className="section-description">{description}</p>
        </div>
    );
};

export default PageHeader;
