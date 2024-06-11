/* // PrivateRoute.jsx

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/AuthProvider'; // Asegúrate de importar tu contexto de autenticación

const PrivateRoute = ({ element: Element, ...rest }) => {
    const { user } = useAuth(); // Obtén el estado de autenticación del contexto

    return (
        <Route
            {...rest}
            element={user ? <Element /> : <Navigate to="/auth" replace />} // Redirige a la página de autenticación si el usuario no está autenticado
        />
    );
};

export default PrivateRoute;
 */