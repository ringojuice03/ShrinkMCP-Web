import React from 'react';
import PageHeader from '../components/pages/layout/PageHeader';
import TrainingStep from '../components/pages/train/TrainingStep';

interface TrainProps {
    generatedTemplates: number;
    totalTemplates: number;
    backtranslating: number;
    totalBacktranslating: number;
    paraphrasing: number;
    totalParaphrasing: number;
    noiseInjecting: number;
    totalNoiseInjecting: number;
    labeledQueries: number;
    totalLabeledQueries: number;
    epoch: number;
    totalEpochs: number;
    steps: number;
    totalSteps: number;
    loss: number;
}

const Train: React.FC<TrainProps> = ({
    generatedTemplates,
    totalTemplates,
    backtranslating,
    totalBacktranslating,
    paraphrasing,
    totalParaphrasing,
    noiseInjecting,
    totalNoiseInjecting,
    labeledQueries,
    totalLabeledQueries,
    epoch,
    totalEpochs,
    steps,
    totalSteps,
    loss,
}) => {
    return (
        <>
            <PageHeader
                title="Training Pipeline"
                description="Monitor the training progress and activity logs in real-time."
            />

            <div className="timeline-container">
                <TrainingStep
                    title="Query Generation"
                    iconColor="purple"
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    }
                    details={[
                        { label: 'Generated templates', value: generatedTemplates, total: totalTemplates }
                    ]}
                />

                <TrainingStep
                    title="Query Augmentation"
                    iconColor="orange"
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                    }
                    details={[
                        { label: 'Backtranslated queries', value: backtranslating, total: totalBacktranslating },
                        { label: 'Paraphrased queries', value: paraphrasing, total: totalParaphrasing },
                        { label: 'Noise-injected queries', value: noiseInjecting, total: totalNoiseInjecting }
                    ]}
                />

                <TrainingStep
                    title="Knowledge Extraction"
                    iconColor="green"
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    }
                    details={[
                        { label: 'Labeled queries', value: labeledQueries, total: totalLabeledQueries }
                    ]}
                />

                <TrainingStep
                    title="Model Fine-tuning"
                    iconColor="blue"
                    isLast={true}
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5"></path>
                            <path d="M2 12l10 5 10-5"></path>
                        </svg>
                    }
                    details={[
                        { label: 'Epoch', value: epoch, total: totalEpochs },
                        { label: 'Steps', value: steps, total: totalSteps.toLocaleString() },
                        { label: 'Loss', value: loss.toFixed(2) }
                    ]}
                />
            </div>
        </>
    );
};

export default Train;
