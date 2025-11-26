import React from 'react';
import {createRoot} from 'react-dom/client';

import sentry from './sentry';

import App from './App';
import 'antd/dist/reset.css';

sentry();
function Index(): React.ReactElement {
    return <App />;
}

let root = createRoot(document.getElementById('root'));
root.render(<Index />);
