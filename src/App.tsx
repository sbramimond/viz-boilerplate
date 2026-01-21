import {Layout} from 'antd';
import React from 'react';

import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import AboutPage from '@/page/About/Index';
import Hello from '@/page/Index/component/Hello';
import IndexPage from '@/page/Index/Index';
import NotFound from '@/page/NotFound';

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
    lineHeight: '24px',
    padding: '20px',
};

let footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
};

/*<dev>*/
console.log(`mode: development`);
/*</dev>*/

/*<prod>*/
console.log(`mode: production`);
/*</prod>*/

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
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Content>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout>
        </Router>
    );
};
