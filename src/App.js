import React, {useState} from 'react';

import Accordion from './components/Accordion';
import Search from './components/Search';
import DropDown from './components/Dropdown';
import Translate from './components/Translate';
import axios from 'axios';
import Route from './components/Route';
import Header from './components/Header';




export default () => {
const [result, setResult] = useState('');


function onGetResults(value) {
    axios.post('https://jsonplaceholder.typicode.com/posts',
    {value})
    .then(function (response) {
        setResult(response.data.id);
    });
}

function onGetResultsFetch(value) {
    fetch('https://jsonplaceholder.typicode.com/posts',
    {
        method: "POST",
        body: JSON.stringify(value)})
    .then(response => response.json())
    .then(response => setResult(response.id))
    }

    const items = [
        {
          title: "What is React?",
          content: "React is a front end javascript framework",
        },
        {
          title: "Why use React?",
          content: "React is a favorite JS library among engineers",
        },
        {
          title: "How do you use React?",
          content: "You use React by creating components",
        },
      ];
      
      const options = [
        {
          label: "The Color Red",
          value: "red",
        },
        {
          label: "The Color Green",
          value: "green",
        },
        {
          label: "A Shade of Blue",
          value: "blue",
        },
      ];
      const [selected, setSelected] = useState(options[0]);

    return (
        <div>
            <Header />
            <Route path="/">
                <Accordion items={items} />
            </Route>
            <Route path="/list">
                <Search />
            </Route>
            <Route path="/dropdown">
                <DropDown           
                label="Select a color"
                options={options}
                selected={selected}
                onSelectedChange={setSelected}>
                </DropDown>
            </Route>
            <Route path="/translate">
                <Translate />
            </Route>
        </div>

    )
}
