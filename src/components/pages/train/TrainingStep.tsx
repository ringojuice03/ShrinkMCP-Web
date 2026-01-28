import React from 'react';

interface TrainingDetail {
    label: string;
    value: string | number;
    total?: string | number;
}

interface TrainingStepProps {
    title: string;
    icon: React.ReactNode;
    iconColor: 'purple' | 'orange' | 'green' | 'blue';
    details: TrainingDetail[];
    isLast?: boolean;
}

const TrainingStep: React.FC<TrainingStepProps> = ({ title, icon, iconColor, details, isLast }) => {
    return (
        <div className="timeline-event">
            <div className="timeline-icon-wrapper">
                <div className={`timeline-icon ${iconColor}`}>
                    {icon}
                </div>
                {!isLast && <div className="timeline-line"></div>}
            </div>
            <div className="timeline-content">
                <div className="timeline-title">{title}</div>
                {details.map((detail, index) => (
                    <div key={index} className="timeline-detail">
                        {detail.label}: {detail.value}{detail.total ? `/${detail.total}` : ''}
                    </div>
                ))}
                <div className="timeline-meta">
                </div>
            </div>
        </div>
    );
};

export default TrainingStep;
