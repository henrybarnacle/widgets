import React, {useEffect, useState, useRef} from 'react';

const DropDown = ({options, selected, onSelectedChange, label}) => {
    const ref = useRef();

    useEffect(() =>  {
        const onBodyClick = (event) => {
            if (ref.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        }
        document.body.addEventListener('click', onBodyClick, { capture: true });

        return () => {
            document.body.removeEventListener('click', onBodyClick,  { capture: true });
        };
    }, []);

    const [open, setOpen] = useState(false);

    const onOptionClick = (option) => {
        onSelectedChange(option);
        setTimeout(() => {
            setOpen(false);
        }, 100);
    }

    const renderedOptions = options.map((option) => {
        if (selected === option) {return null;}
        return (
            <div key={option.value}  style={{color: option.label}} className="item" onClick={() => {onOptionClick(option)}}>
                {option.label}
            </div>
        );
    })
    return (
            <div ref={ref} className="ui form">
                <div className="field">
                    <label className="label">
                        {label}
                    </label>
                    <div onClick={() => { setOpen(true)}}
                        className={`ui selection dropdown  ${ open ? 'visible active' : ''}`}>
                        <i className="dropdown icon" onClick={() => setOpen(!open)}></i>
                        <div className="text bold" style={{color: selected.label}}>{selected.label}</div>
                        <div className={`menu ${open ? 'visible transition' : ''}`}>
                            {renderedOptions}
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>

    );
}
export default DropDown;