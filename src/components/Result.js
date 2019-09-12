import React from 'react';

const Result = ({ result }) => {
    if (Object.keys(result).length === 0) return null;

    return (
        <div className='resultado'>
            <h2>Resultado</h2>
            <p className='precio'>
                El precio es <span>{result.PRICE}</span>
            </p>
            <p>
                Precio más alto del día: <span>{result.HIGHDAY}</span>
            </p>
            <p>
                Precio más bajo del día: <span>{result.LOWDAY}</span>
            </p>
            <p>
                Variación de las últimas 24h:{' '}
                <span>{result.CHANGEPCT24HOUR}</span>
            </p>
            <p>
                Ultima actualización: <span>{result.LASTUPDATE}%</span>
            </p>
        </div>
    );
};

export default Result;
