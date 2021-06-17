import React, { useState, useEffect } from 'react'
import Search from 'antd/lib/input/Search'
import { Col } from 'antd'
import { connect } from 'react-redux';
import { setSearchDialogsAC } from './../../../redux/dialogsReducer';
import { getNameInDialog } from '../Helper/HelperDialog';

const SearchDialogs = (props) => {
    const [searchDialogs, setDialogs] = useState(props.filteredDialogs)
    useEffect(() => {
        if (props.filteredDialogs) {
            setDialogs(props.filteredDialogs)
        }
    }, [props.filteredDialogs])

    const handleChangeSearch = (e) => {
        if (e.target.value === '') {
            props.setSearchDialogsAC([]);
        } else {
            let result = searchDialogs && searchDialogs.filter(function (val) {
                return (getNameInDialog(
                    val.invited,
                    val.creator,
                    props.users,
                    props.myId) + "").indexOf(e.target.value) !== -1;
            });
            props.setSearchDialogsAC(result);
        }
    }
    return (
        <Col span={24}>
            <Search
                placeholder="Поиск диалога"
                onSearch={value => console.log(value)}
                style={{ width: '100%' }}
                onChange={handleChangeSearch}
            />
        </Col>
    )
}

let mapStateToProps = (state) => {
    return {
        filteredDialogs: state.filtDialogs.filteredDialogs,
        searchDialogs: state.filtDialogs.searchDialogs,
        myId: state.firebase.auth.uid,
        users: state.firestore.ordered.users
    }
}

export default connect(mapStateToProps, {
    setSearchDialogsAC
})(SearchDialogs)