import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Convert = ({language, text}) => {
    const [translated, setTranslated] = useState('');
    const [debounceText, setDebouncedText] = useState(text);


    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedText(text);
        }, 500);
        return () => {
            clearTimeout(timerId);
        };
    }, [text]);

    useEffect(() => {
        axios.post('https://translation.googleapis.com/language/translate/v2', 
        {}, 
        {params: {
            q: debounceText,
            target: language.value,
            key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
        }
        }).then(function(response) {
            if (response.data.data.translations) {
                setTranslated(response.data.data.translations[0].translatedText);
            }
        } )
    }, [language, debounceText]);
    
return (
    <div>
       <h1 className="ui header"> {translated}</h1>
    </div>
)
}
export default Convert;