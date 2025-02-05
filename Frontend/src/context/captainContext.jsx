import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Create the context
export const CaptainDataContext = createContext();

// Create a provider component
const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add functions to manage captain state
  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  };
  // Value object to be provided to consumers
  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );

};

CaptainContext.propTypes = {
  children: PropTypes.node.isRequired,
};


export default CaptainContext;
