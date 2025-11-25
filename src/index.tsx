import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';

function Index(): React.ReactElement {
    return <App />;
}

let root = createRoot(document.getElementById('root'));

root.render(<Index />);
