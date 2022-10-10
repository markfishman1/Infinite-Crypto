import React from 'react';

function SearchInput(props) {
    return (
        <div className={`search ${props.isModal ? 'search-input__modal' : ''}`}>
            {!props.isModal && (
                <svg className="search-icon">
                    <use xlinkHref="/images/sprite.svg#.iconsearch1"></use>
                </svg>
            )}
            <input
                min={props.min}
                max={props.max}
                type={props.type}
                placeholder={props.placeholder}
                className="search-input"
                onChange={props.onChangeHandler}
                maxLength={props.maxLength}
                ref={props.inputRef}
                value={props.value}
                minLength={props.minLength}
                // onChange={props.onChange}
            ></input>
        </div>
    );
}

export default SearchInput;
