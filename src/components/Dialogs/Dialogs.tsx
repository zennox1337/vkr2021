import React from 'react'
import HeaderDialogs from './Header/HeaderDialogs'
import SearchDialogs from './Search/SearchDialogs'
import { Row } from 'antd'
import ListDialogs from './ListDialogs/ListDialogs';
import './Dialogs.scss'
import FooterDialogs from './FooterDialogs/FooterDialogs';

const Dialogs:React.FC = () => {
    return (
        <div className="dialogs">
            <Row justify="space-between" className='header__dialogs'>
                <HeaderDialogs />
            </Row>
            <Row className='SearchDialogs__dialogs'>
                <SearchDialogs />
            </Row>
            <Row className='ListDialogs__dialogs'>
                <div className="ListDialogs__dialogs__height">
                    <ListDialogs />
                </div>
            </Row>
            <Row className='FooterDialogs__dialogs'>
                <FooterDialogs />
            </Row>
        </div>
    )
}

export default Dialogs