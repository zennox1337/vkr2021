import React from 'react';
import { Alert } from 'antd';


const ShowErrors = React.memo(props => {
    if(props.error.length === 0){
        return ''
    }
    return <Alert message={props.error.message} type="error" />
    
})



export default ShowErrors