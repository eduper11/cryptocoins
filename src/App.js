import React, { useState, useEffect } from 'react';
import axios from 'axios';

import image from '../src/assets/cryptomonedas.png';

import Form from './components/Form';
import Spinner from './components/Spinner/Spinner';
import { setTimeout } from 'timers';
import Result from './components/Result';

function App() {
    const [currency, setCurrency] = useState('');
    const [cryptocoin, setCryptocoin] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState({});

    useEffect(() => {
        const searchValueCrypto = async () => {
            //bloqueo para que no busque con el initialState('')
            if (currency === '') return;

            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocoin}&tsyms=${currency}`;
            const dataSearch = await axios.get(url);

            //muestra el spinner
            setLoading(true);

            //ocultar spinner y guardar resultado en el state
            setTimeout(() => {
                setLoading(false);
                setResult(dataSearch.data.DISPLAY[cryptocoin][currency]);
            }, 2000);
        };

        searchValueCrypto();
    }, [cryptocoin, currency]);

    const loaderOrResult = loading ? <Spinner /> : <Result result={result} />;

    return (
        <div className='container'>
            <div className='row'>
                <div className='one-half column'>
                    <img src={image} alt='criptomonedas' className='logotipo' />
                </div>
                <div className='one-half column'>
                    <h1>Cotiza criptomonedas al instante</h1>
                    <Form
                        setCurrency={setCurrency}
                        setCryptocoin={setCryptocoin}
                    />
                    {loaderOrResult}
                </div>
            </div>
        </div>
    );
}

export default App;
