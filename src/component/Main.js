import React from 'react';
import BoardList from './BoardList';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigation = useNavigate();
    return (
        <>
            <h1>메인임</h1>
            <button
                type='button'
                onClick={() => {
                    navigation('/boardWrite');
                }}
            >
                글을써보자
            </button>
            <BoardList />
        </>
    );
};
export default Main;
