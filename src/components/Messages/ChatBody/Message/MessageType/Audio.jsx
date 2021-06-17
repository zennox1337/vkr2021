import React, { useState} from 'react';
import './Audio.scss'
import { useFirebase } from 'react-redux-firebase';




const Audio = (props) => {
    const [audio, setAudioLink] = useState(undefined);
 
    //Получение ссылки на аудио, так как ссылка через какое-то время
    //недействительна
    const firebase = useFirebase();
    if (props.srcAudio) {
        const storageRef = firebase.storage().ref()
        storageRef.child(props.srcAudio).getDownloadURL().then((resp) => {
            setAudioLink(resp)
        })
    }
    if (!audio) {
        return ''
    }
    return (
        <div className={'voicemessage container'}>
            <audio src={audio} controls controlsList="nodownload">
            </audio>
        </div>
    )
}

export default Audio;