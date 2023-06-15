import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { routes } from '../router';


function AppRouter() {
    return (
        <Routes>
            {routes.map((route) =>
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component />}
                />
            )}

            <Route path='*' element={<Navigate to="/home" replace />} />
        </Routes>

    );
}


export default AppRouter;