import React from 'react';
import {createRoot} from 'react-dom/client';

// import * as Sentry from '@sentry/browser';

import App from './App';
import 'antd/dist/reset.css';


Sentry.init({
    dsn: 'http://bdfad8fb24be4f40bdbbd3ddba028ded@localhost:9200/2',
});

function Index(): React.ReactElement {
    return <App />;
}

let root = createRoot(document.getElementById('root'));
root.render(<Index />);

