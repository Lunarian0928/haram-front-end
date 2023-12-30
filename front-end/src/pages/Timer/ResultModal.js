import Modal from 'react-modal';
import { MdClose } from "react-icons/md";

import './ResultModal.scss';

function ResultModal({modalIsOpen, closeModal}) {
  class Image {
    constructor(name, extension, alt) {
      this.name = name;
      this.extension = extension;
      this.alt = alt;
    }
    
    getUrl() {
      return process.env.PUBLIC_URL + "/img/" + this.name + "." + this.extension;
    }

    getAlt() {
      return this.alt;
    }
  }

  const images = [
    // new Image("고생한_나_칭찬해", "jpg", "고생한 나 칭찬해"),
    // new Image("님짱", "jpg", "님짱"),
  ];

  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div id="result-modal">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Result Setting Modal"
        appElement={document.getElementById('root')}
        className="result-setting-modal glass" 
      >
        <header>
          <h2>짤 획득!</h2>
          <button onClick={closeModal}><MdClose size={24}/></button>
        </header>
        {/* <div id="loopy-img">
          <img src={randomImage.getUrl()} alt={randomImage.getAlt()} />
        </div> */}
        <p></p>
      </Modal>
    </div>
  );
}

export default ResultModal; 
