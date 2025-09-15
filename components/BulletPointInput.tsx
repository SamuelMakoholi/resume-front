'use client';

import React, { useState } from 'react';

interface BulletPointInputProps {
  points: string[];
  onChange: (points: string[]) => void;
  placeholder?: string;
}

const BulletPointInput: React.FC<BulletPointInputProps> = ({ 
  points = [], 
  onChange,
  placeholder = 'Add a new bullet point...'
}) => {
  const [newPoint, setNewPoint] = useState('');

  const addPoint = () => {
    if (newPoint.trim()) {
      const updatedPoints = [...points, newPoint.trim()];
      onChange(updatedPoints);
      setNewPoint('');
    }
  };

  const removePoint = (index: number) => {
    const updatedPoints = [...points];
    updatedPoints.splice(index, 1);
    onChange(updatedPoints);
  };

  const updatePoint = (index: number, value: string) => {
    const updatedPoints = [...points];
    updatedPoints[index] = value;
    onChange(updatedPoints);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPoint();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newPoint}
          onChange={(e) => setNewPoint(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <button
          type="button"
          onClick={addPoint}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add
        </button>
      </div>

      {points.length > 0 && (
        <ul className="space-y-2 mt-3">
          {points.map((point, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="text-green-600 font-bold">•</span>
              <input
                type="text"
                value={point}
                onChange={(e) => updatePoint(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <button
                type="button"
                onClick={() => removePoint(index)}
                className="text-red-500 hover:text-red-700"
                title="Remove"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BulletPointInput;
