import React from 'react';

const ApiStatus = ({ status }) => {
    if (status === 'healthy') {
        return null;
    }

    return (
        <div className={`border-l-4 px-4 py-3 ${status === 'error'
                ? 'bg-red-50 border-red-400 text-red-700'
                : 'bg-blue-50 border-blue-400 text-blue-700'
            }`}>
            <div className="flex items-center">
                {status === 'error' ? (
                    <>
                        <svg className="w-5 h-5 mr-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <p className="font-medium">Problème de connexion</p>
                            <p className="text-sm mt-1">
                                Impossible de se connecter à l'API. Vérifiez que le serveur backend est en cours d'exécution sur {import.meta.env.VITE_BACKEND_URL}.
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <div>
                            <p className="font-medium">Connexion en cours</p>
                            <p className="text-sm mt-1">Vérification de la connexion au serveur...</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ApiStatus;