import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';

import {Layout} from 'antd';

import IndexPage from '@/page/Index';
import NotFound from '@/page/NotFound';

import Hello from '@/component/index/Hello';

let {Header, Footer, Content} = Layout;

let layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(100%)',
    maxWidth: 'calc(100%)',
};

let headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
};

let contentStyle: React.CSSProperties = {
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
};

let footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
};

export default (): React.ReactElement => {
    return (
        <Router>
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>
                    <Hello compiler="TypeScript" framework="React" />
                </Header>
                <Content style={contentStyle}>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<IndexPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Content>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout>
        </Router>
    );
};
