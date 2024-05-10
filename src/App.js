import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/card/Card';

function App() {
    const [countries, setCountries] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const fetchCountries = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://restcountries.com/v3.1/all');
            if (response.status === 200) {
                const countryList = await response.json();
                setCountries(() => [...countryList]);
            } else throw new Error(response.statusText);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);
    return (
        <section className='main-container'>
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                countries.map((country) => (
                    <section className='cards' key={country.name.common}>
                        <Card flag={country.flags.png} name={country.name.common} alt={country.flags.alt} />
                    </section>
                ))
            )}
        </section>
    );
}

export default App;
