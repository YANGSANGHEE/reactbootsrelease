import { Route, Routes } from 'react-router-dom';
import Main from '../component/Main';
import BoardDetail from '../component/BoardDetail';
import BoardWrite from '../component/BoardWrite';

const Router = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={Main()} />
                <Route path='/boardDetail' element={BoardDetail()} />
                <Route path='/boardWrite' element={BoardWrite()} />
            </Routes>
        </>
    );
};

export default Router;
