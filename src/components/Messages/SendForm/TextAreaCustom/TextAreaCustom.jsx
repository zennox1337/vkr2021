import React from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import editorStyles from 'draft-js-emoji-plugin/lib/plugin.css';
import './TextAreaCustom.scss'
import ImageUpload from './../ImageLoader/ImageLoader';
import { SmileOutlined } from '@ant-design/icons';
import { StyledEmojiSelectWrapper, GlobalStyleForEmojiSelect, theme } from './DraftEmojiStyles';
const emojiPlugin = createEmojiPlugin({
    selectButtonContent: <SmileOutlined style={{ fontSize: '20px' }} />,
    theme: theme
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin];



export default class TextAreaCustom extends React.Component {
    state = {
        editorState: createEditorStateWithText(this.props.typingValue),
    };

    clear = () => {
        this.setState({
            editorState: createEditorStateWithText(this.props.typingValue),
        })
    }
    onChange = (editorState) => {
        this.setState({
            editorState,
        });
        this.props.setValue(editorState.getCurrentContent().getPlainText('\u0001'));
    };
    focus = () => {
        this.editor.focus();
    };
    //если мы делаем submit, то очищаем поле
    componentDidUpdate(prevProps) {
        if (this.props.submitTextMessage !== prevProps.submitTextMessage) {
            if (this.props.submitTextMessage) {
                this.clear();
            }
        }
    }

    render() {

        return (
            <div className='wrapper__textAreaCustom'>
                <div className='TextAreaCustom'>
                    <div className={editorStyles.editor} onClick={this.focus}>
                        <Editor
                            editorState={this.state.editorState}
                            onChange={this.onChange}
                            plugins={plugins}
                            ref={(element) => { this.editor = element; }}
                        />
                        <EmojiSuggestions />
                    </div>
                </div>
                <div className="sendMethods">
                    <div className="sendMethods-items">
                        <ImageUpload
                            sendImageMessageTC={this.props.sendImageMessageTC}
                            dialogId={this.props.dialogId}
                            myId={this.props.myId}
                            setImagePreviewUrlAC={this.props.setImagePreviewUrlAC}
                            setImageFileAC={this.props.setImageFileAC}
                            removeImage={this.props.removeImage}
                            removeImageAC={this.props.removeImageAC}
                        />
                        <div className={editorStyles.test}>
                            <StyledEmojiSelectWrapper >
                                <GlobalStyleForEmojiSelect />
                                <EmojiSelect />
                            </StyledEmojiSelectWrapper>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}