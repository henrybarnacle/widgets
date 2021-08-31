import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('');
    const [debounceTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);



    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(term);
        }, 1000);
        return() => {
            clearTimeout(timerId)
        };
    }, [term]);

    useEffect( () => {
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                 params: {
                     action: 'query',
                     list: 'search',
                     origin: '*',
                     format: 'json',
                     srsearch: debounceTerm
                 },
             });
             if (data.query) {
                setResults(data.query.search);

             }
            };
            search();
    }, [debounceTerm])

    const list = results.map((item) => {
    return <div key={item.pageid} className="item">
                <div className="right floated content">
                    <a className="ui button" href={`https://en.wikipedia.org?curid=${item.pageid}`}>Go</a>
                </div>
                <div className="content">
                    <h1 className="header">{item.title}</h1>
                    <span dangerouslySetInnerHTML={{ __html: item.snippet }}></span>
                </div>
            </div>
});
return (
    <div className="ui form">
        <div className="field">
            <label>Enter Search Term</label>
            <input value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"></input>
            <div>{list}</div>
        </div>
    </div>

    )
}

export default Search;