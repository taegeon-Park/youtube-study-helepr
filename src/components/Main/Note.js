import React, { Component } from 'react';
import NoteDetail from './Note/NoteDetail';
import './Note.css';

export default class Note extends Component {
  state = {
    onClickNoteExtend: false
  }

  render() {
    let onClickNoteExtendButton = (e) => {
      const NoteContent = e.target.parentElement.parentElement.lastElementChild;
      const Note = e.target.parentElement.parentElement;
      let button = e.target;
      
      // if click thumbnail
      if(e.target.innerHTML === "") {
          button = e.target.parentElement.parentElement.firstChild.lastElementChild;
      }

      if (button.innerHTML === "▼") {
        NoteContent.style.flexDirection="column";
        button.innerHTML = "▲";
       Note.style.height = "450px";
        this.setState({ onClickNoteExtend: true });
      } else {
        NoteContent.style.flexDirection="row";
        button.innerHTML = "▼";
        Note.style.height = "150px";
        this.setState({ onClickNoteExtend: false });
      }
    }


    return (
      <div className="Note">
        <div className="Note-header">
          <div className="Note-header-title">{this.props.Note.noteTitle} </div>
          <button id="Note-extend-button-id1" className="Note-button" onClick={onClickNoteExtendButton}>▼</button>
        </div>
        <div className="Note-content">
          {this.state.onClickNoteExtend ? <NoteDetail note={this.props.Note} key={this.props.Note.noteCode} noteCode={this.props.Note.noteCode}></NoteDetail> : 
            <img className="Note-content-thumbnail" src={this.props.Note.noteThumbnail} alt="thumbnail" onClick={onClickNoteExtendButton}/>}
          <div className="Note-content-desc">
            <div className="Note-content-desc-info">{this.props.Note.noteContent}</div>
            <div className="Note-content-time">
              <div>{this.props.Note.noteVideoName} {this.props.Note.noteVideoTime} </div>
              <div className="Note-content-time-updated">{this.props.Note.noteUpdateDate}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}