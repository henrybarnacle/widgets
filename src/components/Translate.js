import React, { useState } from 'react'
import Dropdown from './Dropdown';
import Convert from './Convert';

// AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM
const options = [
    {
        label: 'French',
        value: 'fr'
    },
    {
        label: 'Arabic',
        value: 'ar'
    }, 
    {   
        label: 'Hindi',
        value: 'hi'
    }
];
const Translate = () => {
    const [ language, setLanguage ] = useState(options[0]);
    const translateLabel = 'Select a language';
    const [ text, setText ] = useState('');
    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Text</label>
                    <input value={text} onChange={(e) => setText(e.target.value)} />
                </div>
            </div>
            <Dropdown options={options} 
            selected={language}
            onSelectedChange={setLanguage}
            label={translateLabel} />
            <hr></hr>
            <h3 className="ui header">Output</h3>
            <Convert text={text} language={language}/>
        </div>
    )
}
export default Translate;