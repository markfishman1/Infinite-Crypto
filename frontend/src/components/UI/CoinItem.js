import React from 'react';
import { utilService } from '../../services/util.service';
import { useNavigate } from 'react-router-dom';
import { fetchCoinData } from '../../store/actions/app-actions';
import { useDispatch } from 'react-redux';
function CoinItem(props) {
    const navigate = useNavigate();
    // console.log(props);
    const dispatch = useDispatch();
    const handleNavigate = async () => {
        // await dispatch(fetchCoinData(props.coin.id));
        navigate(`/coin/${props.coin.id.toLowerCase()}`);
    };
    return (
        <li
            className={`coin-item ${props.isModal && props.checkFavCoinExistance(props.coin) ? 'fadeout' : ''} ${
                props.isCoinList ? 'flex-space-between bg-transpearant' : ''
            }`}
            key={props.name}
            //    {isCoinList && onClick=props.onClickHandler)}
            {...(props.isCoinList && {
                onClick: () => {
                    props.onClickHandler(props.coin.id);
                    props.resetInputValue();
                },
            })}
        >
            <div className={`coin-item__name ${props.isModal ? 'modal-list-name' : ''} `}>
                {props.isMarketList && (
                    <svg
                        className={`coin-item__name__star__icon ${props.isFavoriteCoin(props) ? 'active' : ''}`}
                        onClick={() => props.togglefavorite(props.coin)}
                    >
                        <use xlinkHref="images/sprite.svg#.iconstar31"></use>
                        <use xlinkHref="images/sprite.svg#.iconstar31"></use>
                    </svg>
                )}
                <img src={props.image} alt={props.name}></img>
                <div>
                    <p>{props.symbol.toUpperCase()}</p>
                    <p>{props.name}</p>
                </div>
            </div>
            <div
                className={`coin-item__price ${
                    props.isModal || props.isCoinList ? 'modal-list-price flex-column justify-center' : ''
                } ${props.isCoinList ? 'margin-right-m' : ''}`}
            >
                <p>${utilService.numberWithCommas(props.price, 'price')}</p>
                <p className={props.change > 0 ? 'gaining' : 'losing'}>
                    {props.change > 0 ? '+' : ''}
                    {props.change ? props.change.toFixed(2) : '0.00'}%
                </p>
            </div>
            {!props.isCoinList && (
                <div className={`coin-item__marketcap ${props.isModal ? 'modal-list-marketcap' : ''}`}>
                    ${utilService.numberWithCommas(props.marketCap, 'marketCap')}
                </div>
            )}
            {!props.isCoinList && (
                <div className={`coin-item__actions ${props.isModal ? 'modal-list-action ' : ''}`}>
                    {props.isModal && !props.checkFavCoinExistance(props.coin) && (
                        <button
                            onClick={() => {
                                props.onClickHandler(props.coin);
                            }}
                        >
                            Add
                        </button>
                    )}
                    {props.isMarketList && (
                        <>
                            <button onClick={handleNavigate}>Detail</button>
                            <button>Trade</button>
                        </>
                    )}
                </div>
            )}
        </li>
    );
}

export default CoinItem;
