'use client'

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align'
import { Bold, Code, Heading2, Heading3, Italic, List, ListOrdered, Quote, Redo, Strikethrough, UnderlineIcon, Undo } from 'lucide-react';


const TipTap = ({content, onChange}:any) => {

  const handleChange = (newContent:string) => {
    onChange(newContent)
  }

  const editor = useEditor({
    extensions: [StarterKit, Underline, TextAlign],
    editorProps: {
      attributes: {
        class: 'flex flex-col px-4 py-3 min-h-44 lg:min-h-52 justify-start border-b border-r border-l dark:border-white/60 items-start w-full gap-3 font-medium text-base pt-4 rounded-bl rounded-br outline-none'
      },
    },
    onUpdate : ({editor}) => {
      handleChange(editor.getHTML());
    },

  });

  const ToolBar = () => {

    if (!editor) {
      return null;
    }

    return (
      <div className="px-4 py-3 flex rounded-tl rounded-tr items-center justify-around w-full flex-wrap border dark:border-white/60">
        <button onClick={
          (e) => {e.preventDefault(); editor.chain().focus().toggleBold().run();}} 
          className={editor.isActive('bold') ? 'bg-primary text-white lg:p-2 p-1 rounded': 'p-2'}>
          <Bold className='size-5 hidden lg:block'/>
          <Bold className='size-4 sm:hidden'/>
        </button>
        <button onClick={
          (e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run();}} 
          className={editor.isActive('italic') ? 'bg-primary text-white lg:p-2 p-1 rounded': 'p-1 lg:p-2'}>
          <Italic className='size-5 hidden lg:block'/>
          <Italic className='size-4 sm:hidden'/>
        </button>
        <button onClick={
          (e) => { e.preventDefault(); editor.chain().focus().toggleStrike().run();}} 
          className={editor.isActive('strike') ? 'bg-primary text-white lg:p-2 p-1 rounded': 'p-1 lg:p-2'}>
          <Strikethrough className='size-5 hidden lg:block'/>
          <Strikethrough className='size-4 sm:hidden'/>
        </button>
        <button onClick={
          (e) => { e.preventDefault(); editor.chain().focus().toggleUnderline().run();}} 
          className={editor.isActive('underline') ? 'bg-primary text-white lg:p-2 p-1 rounded': 'p-1 lg:p-2'}>
          <UnderlineIcon className='size-5 hidden lg:block'/>
          <UnderlineIcon className='size-4 sm:hidden'/>
        </button>
        <button onClick={
          (e) => { e.preventDefault(); editor.chain().focus().toggleHeading({level: 2}).run();}} 
          className={editor.isActive('heading', {level: 2}) ? 'bg-primary text-white p-1 lg:p-2 rounded': 'p-1 lg:p-2'}>
          <Heading2 className='size-5 hidden lg:block'/>
          <Heading2 className='size-4 sm:hidden'/>
        </button>
        <button onClick={
          (e) => { e.preventDefault(); editor.chain().focus().toggleHeading({level: 3}).run();}} 
          className={editor.isActive('heading', {level: 3}) ? 'bg-primary text-white p-1 lg:p-2 rounded': 'p-1 lg:p-2'}>
          <Heading3 className='size-5 hidden lg:block'/>
          <Heading3 className='size-4 sm:hidden'/>
        </button>
        <button onClick={
          (e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run();}} 
          className={editor.isActive('bulletList') ? 'bg-primary text-white p-1 lg:p-2 rounded': 'p-1 lg:p-2'}>
          <List className='size-5 hidden lg:block'/>
          <List className='size-4 sm:hidden'/>
        </button>
        <button onClick={
          (e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run();}} 
          className={editor.isActive('orderedList') ? 'bg-primary text-white p-1 lg:p-2 rounded': 'p-1 lg:p-2'}>
          <ListOrdered className='size-5 hidden lg:block'/>
          <ListOrdered className='size-4 sm:hidden'/>
        </button>
        <button onClick={
          (e) => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run();}} 
          className={editor.isActive('blockquote') ? 'bg-primary text-white p-1 lg:p-2 rounded': 'p-1 lg:p-2'}>
          <Quote className='size-5 hidden lg:block'/>
          <Quote className='size-4 sm:hidden'/>
        </button>
        <button onClick={
          (e) => { e.preventDefault(); editor.chain().focus().setCode().run();}} 
          className={editor.isActive('code') ? 'bg-primary text-white p-1 lg:p-2 rounded': 'p-1 lg:p-2'}>
          <Code className='size-5 hidden lg:block'/>
          <Code className='size-4 sm:hidden'/>
        </button>
        <button onClick={
          (e) => { e.preventDefault(); editor.chain().focus().undo().run();}} 
          className={editor.isActive('undo') ? 'bg-primary text-white p-1 lg:p-2 rounded': 'p-1 lg:p-2 hover:bg-primary hover:text-white rounded'}>
          <Undo className='size-5 hidden lg:block'/>
          <Undo className='size-4 sm:hidden'/>
        </button>
        <button onClick={
          (e) => { e.preventDefault(); editor.chain().focus().redo().run();}} 
          className={editor.isActive('redo') ? 'bg-primary text-white p-1 lg:p-2 rounded': 'p-1 lg:p-2 hover:bg-primary hover:text-white rounded'}>
          <Redo className='size-5 hidden lg:block'/>
          <Redo className='size-4 sm:hidden'/>
        </button>
      </div>
    )
  }

  return (
    <div className="w-full">
      <ToolBar />
      <EditorContent editor={editor} style={{whiteSpace: 'pre-line', wordWrap: 'break-word'}} />
    </div>
  )
};

export default TipTap