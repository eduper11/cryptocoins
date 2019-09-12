import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Criptocoin from './Cryptocoin';
import Error from './Error';

function Form({ setCurrency, setCryptocoin }) {
    const [cryptocoins, setCryptocoins] = useState([]);
    const [currentCurrency, setCurrentCurrency] = useState('');
    const [currentCrypto, setCrypto] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const consultAPI = async () => {
            const url =
                'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=EUR';

            const dataSearch = await axios.get(url);

            console.log(dataSearch.data.Data);

            setCryptocoins(dataSearch.data.Data);
        };

        consultAPI();
    }, []);

    const handleSubmit = event => {
        event.preventDefault();

        //validar la entrada de datos
        if (currentCurrency === '' || currentCrypto === '') {
            setError(true);
            return;
        }

        //datos al state principal
        setCurrency(currentCurrency);
        setCryptocoin(currentCrypto);
        setError(false);
    };

    const componentError = error ? (
        <Error message='Ambos campos son obligatorios' />
    ) : null;

    return (
        <form onSubmit={handleSubmit}>
            {componentError}
            <div className='row'>
                <label>Elige tu moneda</label>
                <select
                    className='u-full-width'
                    onChange={event => setCurrentCurrency(event.target.value)}
                >
                    <option value=''>- Elige tu Moneda -</option>
                    <option value='USD'>- Dolar EEUU -</option>
                    <option value='MXN'>- Peso Mexicano -</option>
                    <option value='GBP'>- Libra -</option>
                    <option value='EUR'>- Euro -</option>
                </select>
            </div>
            <div className='row'>
                <label>Elige la Cryptomoneda</label>
                <select
                    className='u-full-width'
                    onChange={event => setCrypto(event.target.value)}
                >
                    <option value=''>- Elige tu Cryptomoneda -</option>
                    {cryptocoins.map(cryptocoin => (
                        <Criptocoin
                            key={cryptocoin.CoinInfo.Id}
                            cryptocoin={cryptocoin}
                        />
                    ))}
                </select>
            </div>
            <input
                type='submit'
                className='button-primary u-full-width'
                value='Calcular'
            />
            >
        </form>
    );
}

export default Form;
