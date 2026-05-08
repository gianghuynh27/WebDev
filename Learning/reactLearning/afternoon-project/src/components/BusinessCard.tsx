import React from 'react'

type BusinessCardType = {
    name: string,
    occupation: string,
    interest: string 
}
const BusinessCard= ({name, occupation, interest}: BusinessCardType)  => {
    return (
        <div className="business-card p-4 border-2 border-gray-300 rounded-lg shadow-md">
            <h2>{name}</h2>
            <p>{occupation}</p>
            <p>{interest}</p>
        </div>
    )
}

export default BusinessCard;