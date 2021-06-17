import React from 'react';
import './MainBlock.scss'
import classnames from 'classnames'

const MainBlock = ({children,className}) => {
    return(
     <div className={classnames('mainBlock',className)}>
         {children}
     </div>
    )
}

export default MainBlock