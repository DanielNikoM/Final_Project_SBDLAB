import React from 'react';

const Card = ({ title, body, image }) => {
    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg mx-auto my-4">
            <img className="w-full" src={image} alt="Card" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-black text-base">{body}</p>
            </div>
        </div>
    );
};

export default Card;
