import React from 'react';

interface ProgressBarProps {
  progress: number;
  total: number;
  label?: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, total, label, className = '' }) => {
  const percentage = Math.min(Math.round((progress / total) * 100), 100);

  return (
    <div className={`w-full ${className}`}>
      {label && <div className="text-sm font-medium text-gray-700 mb-1">{label}</div>}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {progress} of {total} ({percentage}%)
      </div>
    </div>
  );
};

export default ProgressBar;