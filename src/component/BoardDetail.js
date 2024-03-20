import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeState } from '../store/store';

const BoardDetail = () => {
    const [searchParam, setSearchParm] = useSearchParams('');
    const [detailData, setDetailData] = useState('');
    const seq = searchParam.get('seq');
    const navigation = useNavigate();
    let dispatch = useDispatch();

    useEffect(() => {
        getDetail();
        dispatch(changeState({ updateState: 'N' }));
    }, [searchParam]);

    const getDetail = async () => {
        try {
            axios
                .post('http://localhost:8084/board/selectBoardDetail', {
                    seq: searchParam.get('seq'),
                })
                .then((res) => {
                    setDetailData(res.data);
                });
        } catch (e) {
            console.log(e);
        }
    };

    const deleteSeq = async () => {
        try {
            axios
                .post('http://localhost:8084/board/mergeBoard', {
                    seq: searchParam.get('seq'),
                    delYn: 'Y',
                })
                .then((res) => {
                    if (res.data > 0) {
                        if (!alert('삭제가 완료되었습니다.')) {
                            dispatch(changeState({ updateState: 'Y' }));
                            navigation('/');
                        }
                    }
                });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <h1>{seq}번 글</h1>
            <span>{detailData && detailData.title}</span>
            <p>{detailData && detailData.content}</p>
            <button type='button' onClick={deleteSeq}>
                삭제할랭
            </button>
            <button
                type='button'
                onClick={() => {
                    navigation('/');
                }}
            >
                리스트갈랭
            </button>
            <button
                type='button'
                onClick={() => {
                    navigation(`/boardWrite?seq=${detailData.seq}`);
                }}
            >
                수정할랭
            </button>
        </>
    );
};

export default BoardDetail;
