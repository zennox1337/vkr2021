import React from 'react'
import { Emoji, getEmojiDataFromNative } from 'emoji-mart';
import data from 'emoji-mart/data/all.json'
import { MultiLineParser } from '../../Assets/ParserEmoji/ParserEmoji';

export const ParsingLastMessage = (props) => {
    return MultiLineParser(props.lastMessage,
        {
            SplitLinesTag: 'a',
            Rule: /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
        },
        (EmojiTextMatchingRule, ruleNumber) => {
            const emojiData = getEmojiDataFromNative(EmojiTextMatchingRule, 'apple', data)
            if (emojiData) {
                return <Emoji emoji={emojiData.colons} size={16} />
            } else {
                return <Emoji emoji={EmojiTextMatchingRule} size={16} />
            }
        });
}


export const getNameInDialog = (invited, creator, users, myId) => {
    if (users.length !== 0) {
        if (invited === myId) {
            let result = users.filter((id) => {
                return id.id === creator
            })
            return result[0] ? result[0].firstName : ''
        } else {
            let result = users.filter((id) => {
                return id.id === invited
            })
            return result[0] ? result[0].firstName : ''
        }
    }
}

export const getImageAvatarUser = (invited, creator, users, myId) => {
    if (users.length !== 0) {
        if (invited === myId) {
            let result = users.filter((id) => {
                return id.id === creator
            })
            return result[0] ? result[0].photoURL : ''
        } else {
            let result = users.filter((id) => {
                return id.id === invited
            })
            return result[0] ? result[0].photoURL : ''
        }
    }
}



export const userIsOnline = (invited, creator, users, myId, usersOnlineArray) => {
    const userIsOnline = (userId) => {
        let result = usersOnlineArray ? usersOnlineArray.filter((u) => {
            return u.key === userId
        }) : []
        if (result.length >= 1) {
            return 'online'
        } else {
            return 'offline'
        }
    }
    if (users.length !== 0) {
        if (invited === myId) {
            let result = users.filter((id) => {
                return id.id === creator
            })
            return result[0] && userIsOnline(result[0].id)
        } else {
            let result = users.filter((id) => {
                return id.id === invited
            })
            return result[0] && userIsOnline(result[0].id)
        }
    }
}