import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeState } from '../store/store';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const BoardWrite = () => {
    const [searchParam, setSearchParm] = useSearchParams('');
    const seq = searchParam.get('seq');
    const [detailData, setDetailData] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const [form, setForm] = useState({
        seq: '',
        title: '',
        content: '',
        userNm: '',
        userId: '',
    });

    useEffect(() => {
        dispatch(changeState({ updateState: 'N' }));
        if (seq != null && seq != '') {
            getDetail();
        }
    }, []);

    const onInputChange = (e) => {
        const nextForm = {
            ...form,
            [e.target.name]: e.target.value,
        };
        setForm(nextForm);
    };

    const getDetail = async () => {
        try {
            axios
                .post('http://localhost:8084/board/selectBoardDetail', {
                    seq: searchParam.get('seq'),
                })
                .then((res) => {
                    setDetailData(res.data);
                    setForm({
                        seq: res.data.seq,
                        title: res.data.title,
                        content: res.data.content,
                        userId: res.data.userId,
                        userNm: res.data.userNm,
                    });
                });
        } catch (e) {
            console.log(e);
        }
    };

    const onSubmit = async () => {
        axios
            .post('http://localhost:8084/board/mergeBoard', form)
            .then((res) => {
                let cnt = res.data;
                if (cnt > 0) {
                    if (!alert('저장에 성공하였습니다.')) {
                        dispatch(changeState({ updateState: 'Y' }));
                        navigation('/');
                    }
                } else {
                    alert('저장에 실패하였습니다. 관리자에게 문의 바랍니다.');
                }
            });
    };

    return (
        <>
            <div>
                <span>제목</span>
                <input
                    type='text'
                    name='title'
                    onChange={onInputChange}
                    defaultValue={detailData && detailData.title}
                />
            </div>
            <div>
                <span>내용</span>
                <textarea
                    name='content'
                    onChange={onInputChange}
                    defaultValue={detailData && detailData.content}
                />
            </div>
            <div>
                <span>유저명</span>
                <input
                    type='text'
                    name='userNm'
                    onChange={onInputChange}
                    defaultValue={detailData && detailData.userNm}
                />
            </div>
            <div>
                <span>유저아이디</span>
                <input
                    type='text'
                    name='userId'
                    onChange={onInputChange}
                    defaultValue={detailData && detailData.userId}
                />
            </div>
            <button onClick={onSubmit}>제출</button>
            <button>
                <Link to='/'>리스트로가자</Link>
            </button>
        </>
    );
};

export default BoardWrite;
