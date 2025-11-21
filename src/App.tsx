import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router';

import IndexPage from '@/page/Index';
import NotFound from '@/page/NotFound';

// let IndexPage = lazy(() => import('@/page/Index'));
// let NotFound = lazy(() => import('@/page/NotFound'));

export default (): React.ReactElement => {
    return (
        <>
            <Router>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<IndexPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
};
