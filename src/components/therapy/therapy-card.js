import React from 'react';
import Link from 'next/link';

const TherapyCard = ({ therapy }) => {
  return (
    <Link href={`/therapy/${therapy.id}`}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col mb-4">
        <div className="bg-gray-200 flex-shrink-0">
          <img
            className="object-cover w-full h-56"
            src="https://images.unsplash.com/photo-1495900593237-22dc861b231d"
            alt="Card image"
          />
        </div>
        <div className="flex flex-col flex-grow p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{therapy.name}</h2>
          <p className="text-gray-700 mb-2">{therapy.description}</p>
          <div className="flex justify-between items-end">
            <p className="text-gray-500 text-sm">{therapy.city}, {therapy.state}</p>
            <p className="text-gray-500 text-sm">{therapy.therapyType}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TherapyCard;
