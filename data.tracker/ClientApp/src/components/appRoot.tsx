import * as React from 'react';
import AppRoutings from './appRoutings';
import { Container } from '@material-ui/core';
import Header from './General/Header';

const AppRoot: React.FC = (props: any) => {
    return (
        <>
            <Header />
            <div className='content_container'>
                <AppRoutings />
            </div>
        </>
    )
};

export default AppRoot;