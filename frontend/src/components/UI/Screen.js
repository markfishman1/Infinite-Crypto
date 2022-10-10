import React from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/reducers/ui-reducer';
function Screen(props) {
    const dispatch = useDispatch();
    console.log('props.class', props.class);
    const toggleScreen = () => {
        if (props.location !== 'coinList') return;
        dispatch(uiActions.toggleScreen());
        props.toggleCoinList();
        console.log('toggeling');
    };

    return <div className={props.class} onClick={toggleScreen}></div>;
}

export default Screen;
