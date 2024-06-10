import React, {useState,useEffect} from 'react';
import { apiURL } from '../util/api';
import SearchInput from '../Search/SearchInput';


const AllCountries = () => {

    const [countries, setcountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const getAllCountries = async()=>{

        try {
            const res = await fetch(`${apiURL}/all`);

            if(!res.ok) throw new Error("Something went wrong!");
            
            const data = await res.json();

            console.log(data);

            setcountries(data);

            setIsLoading(false)
;
        } catch (error) {
            setIsLoading(false);
            setError(error.massage);
        }

    };

    const getCountryByName = async(countryName)=>{
        try {

            const res = await fetch(`${apiURL}/name/${countryName}`);

            if(!res.ok) throw new Error('Not found!');

            const data = await res.json();
            setcountries(data);

            setIsLoading(false);
        } catch (error) {

            setIsLoading(false);
            setError(error.massage);

        }
    };


    useEffect(() => {
        getAllCountries();
    }, []);

  return (
    <div className='all__country__wrapper'>
        <div className='country__top'>
            <div className="search">
                <SearchInput onSearch={getCountryByName}/>
                
            </div>
        </div>

        <div className="country__bottom">
            {isLoading && !error && <h4>Loading......</h4>}
            {error && !isLoading && <h4>{error}</h4>}

            {
                countries?.map(country=>(
                    <div className="country__card">
                        <div className="country__img">
                            <img src={country.flags.png} alt="" />
                        </div>
                        <div className="country__data">
                            <h3>{country.name.official}</h3>
                            <h6> CCA2: {country.cca2}</h6>
                            <h6> CCA3: {country.cca3}</h6>
                            <h6> Native Country Name: {country?.name?.nativeName?.eng?.official || 'Unknown'}</h6>
                            <h6> Alt Spelling: {country.altSpellings.join(", ")}</h6>
                            <h6> IDD: <br />
                                 <span id='country__root'>Root: {country.idd.root}</span> <br />
                                 <span id='country__root'>Suffixes: {country.idd.suffixes}</span>
                            </h6>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  );
};

export default AllCountries;