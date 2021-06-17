import React from 'react'
import './ImageLoader.scss'
import { FileImageOutlined } from '@ant-design/icons';
const ImageUpload = (props) => {
  //загрузка
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      props.setImageFileAC(file);
      props.setImagePreviewUrlAC(reader.result);
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }
  //удаление
  if (props.removeImage) {
    props.setImageFileAC(null);
    props.setImagePreviewUrlAC(null);
    props.removeImageAC(false);
  }
  //onClick={e => (e.target.value = null)} делаем
  //для того чтобы работала загрузка одного и того же файла повторно
  return (
    <div className="inputImageComponent">
      <FileImageOutlined style={{ fontSize: '20px' }} />
      <div className='fileInputButton'>
        <input className="fileInput"
          type="file"
          onChange={(e) => handleImageChange(e)}
          onClick={e => (e.target.value = null)}
        />
      </div>


    </div>
  )
}
export default ImageUpload