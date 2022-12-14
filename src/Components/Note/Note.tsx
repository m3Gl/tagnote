import "./note.sass";
import * as functions from "../services/functions";
import React from "react";

type NoteProps = {
  removeNote: (title: string) => void,
  tagClickFinder: (event: React.MouseEvent<HTMLSpanElement>) => void,
  tagRemover: (index: number, title: string, content: string) => void,
  noteEditor: (title: string, content: string) => void,
  title: string,
  content: string,
  tags: string[],
  index: number
}

const Note: React.FC<NoteProps> = (props) => {
  const editor = (title: string) => {
    const currentNote: string | any = document.querySelectorAll(".note-content")[props.index].textContent;
    props.noteEditor(title, currentNote );
  };

  return (
    <>
      <div className="note-wrapper">
        <div className="tools-wrapper">
          
          <span className="remove" onClick={ () => props.removeNote(props.title) }>Remove</span>
        </div>
        <div className="note">
          <span className="note-title">{ props.title }</span>
          <div
            className="note-content"
            dangerouslySetInnerHTML={ functions.createMarkup(functions.textContent(props.content)) }
            contentEditable="true"
            suppressContentEditableWarning={ true }
          ></div>
        </div>
        <div className="tags-wrapper">
          {props.tags !== null && props.tags.map((item, index) =>
            <div key={ item } className="tag-wrapper">
              
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Note;