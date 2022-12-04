import "./form.sass";
import React, { useState, useRef } from "react";
import type { FormTypes } from "../Form/FormTypes";


const Form: React.FC<FormTypes> = (props) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [tagSearchValue, setTagSearchValue] = useState("");
  const tags = noteContent.match(/\B(#[a-zA-ZА-Яа-я0-9Ёёй]+)(\s|$)/ig);
  const trimmedTags = tags?.map(item => item.trim());
  const noteData = {
    title: noteTitle,
    content: noteContent,
    tags: trimmedTags
  };

  const input1 = useRef<HTMLInputElement>(null);
  const input2 = useRef<HTMLTextAreaElement>(null);
  const input3 = useRef<HTMLInputElement>(null);

  const setTitle = (event: React.FormEvent<HTMLInputElement>) => {
    setNoteTitle((event.target as HTMLInputElement).value);
  };
  

  const setContent = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setNoteContent((event.target as HTMLTextAreaElement).value);
  };

  const saveNote = (event: React.FormEvent<HTMLFormElement>, data: any) => {
    props.addNote(event, data);
    input1.current!.value = "";
    input2.current!.value = "";
  };

  const findTag = (): void => {
    props.addSearchValue(tagSearchValue.trim());
    input3.current!.value = "";
  };

  const findTagByEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      props.addSearchValue(tagSearchValue.trim());
      input3.current!.value = "";
    }
    return;
  };

  return (
    <div className="wrapper">
      <form onSubmit={ (event) => saveNote(event, noteData) }>
        <input
          placeholder="Title"
          ref={ input1 }
          onChange={ (event) => setTitle(event) }
        />
        <textarea
          placeholder="Enter note here"
          ref={ input2 }
          onChange={ (event) => setContent(event) }
        />
        <button
          type="submit"
        >Save note
        </button>
      </form>
      <div>
        <input
          placeholder="#Search note"
          ref={ input3 }
          onChange={ (event) => setTagSearchValue(event.target.value) }
          onKeyDown={ (event) => findTagByEnter(event) }
        />
        <button
          type="submit"
          onClick={ () => findTag() }
        >Search...</button>
      </div>
    </div>
  );
};

export default Form;