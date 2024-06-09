import React from 'react';

export function NoteCard({ 
  title, 
  body
}) {
  return (
    <div className="bg-gray-400 shadow-md rounded p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p>{body}</p>
    </div>
  );
}
