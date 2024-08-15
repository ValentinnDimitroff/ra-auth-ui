import React, { createContext } from 'react'
import PropTypes from 'prop-types'

const LayoutConfigContext = createContext({
    appBar: undefined,
    userMenu: [],
})

LayoutConfigContext.displayName = 'LayoutConfigContext'

const LayoutConfigContextProvider = ({ value, children }) => (
    <LayoutConfigContext.Provider value={value}>{children}</LayoutConfigContext.Provider>
)

LayoutConfigContextProvider.propTypes = {
    value: PropTypes.object,
    children: PropTypes.any,
}

export { LayoutConfigContext, LayoutConfigContextProvider }
