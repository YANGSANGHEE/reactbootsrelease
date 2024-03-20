import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const BoardList = () => {
    const [data, setData] = useState('');
    const navigation = useNavigate();
    let updateState = useSelector((state) => state.updateState);

    const styles = {
        width: '200px',
        cursor: 'pointer',
    };

    useEffect(() => {
        getData();
    }, [updateState]);

    const getData = async () => {
        try {
            axios
                .get('http://localhost:8084/board/selectBoardList')
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            {data &&
                data.map((val, idx) => {
                    return (
                        <div
                            style={styles}
                            key={val.seq}
                            onClick={() => {
                                navigation('/boardDetail?seq=' + val.seq);
                            }}
                        >
                            <h1>{val.title}</h1>
                        </div>
                    );
                })}
        </>
    );
};

export default BoardList;
