'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface SimpleRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SimpleRichTextEditor: React.FC<SimpleRichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Enter text here...'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync external value changes to editor
  useEffect(() => {
    if (editorRef.current && !isUpdating) {
      const currentContent = editorRef.current.innerHTML;
      if (currentContent !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value, isUpdating]);
  
  // Save and restore cursor position
  const saveSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && editorRef.current?.contains(selection.anchorNode)) {
      return {
        start: selection.anchorOffset,
        end: selection.focusOffset,
        anchorNode: selection.anchorNode,
        focusNode: selection.focusNode
      };
    }
    return null;
  }, []);
  
  const restoreSelection = useCallback((selectionInfo: any) => {
    if (selectionInfo && editorRef.current) {
      try {
        const selection = window.getSelection();
        if (selection && selectionInfo.anchorNode && editorRef.current.contains(selectionInfo.anchorNode)) {
          const range = document.createRange();
          range.setStart(selectionInfo.anchorNode, Math.min(selectionInfo.start, selectionInfo.anchorNode.textContent?.length || 0));
          range.setEnd(selectionInfo.focusNode || selectionInfo.anchorNode, Math.min(selectionInfo.end, (selectionInfo.focusNode || selectionInfo.anchorNode).textContent?.length || 0));
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } catch (e) {
        // Ignore selection restoration errors
      }
    }
  }, []);
  
  // Add CSS styles for editor content
  useEffect(() => {
    // Add a style element to the document head
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      .rich-text-content ul {
        list-style-type: disc !important;
        padding-left: 1.5rem !important;
        margin: 0.5rem 0 !important;
      }
      .rich-text-content ol {
        list-style-type: decimal !important;
        padding-left: 1.5rem !important;
        margin: 0.5rem 0 !important;
      }
      .rich-text-content li {
        margin-bottom: 0.25rem !important;
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      // Clean up on unmount
      document.head.removeChild(styleEl);
    };
  }, []);

  // Handle toolbar button clicks
  const handleFormat = (command: string, value: string = '') => {
    if (editorRef.current) {
      editorRef.current.focus();
      const savedSelection = saveSelection();
      document.execCommand(command, false, value);
      setIsUpdating(true);
      onChange(editorRef.current.innerHTML);
      setTimeout(() => {
        setIsUpdating(false);
        if (savedSelection) {
          restoreSelection(savedSelection);
        }
      }, 10);
    }
  };

  // Handle content changes
  const handleInput = useCallback(() => {
    if (editorRef.current && !isUpdating) {
      setIsUpdating(true);
      const content = editorRef.current.innerHTML;
      onChange(content);
      setTimeout(() => setIsUpdating(false), 10);
    }
  }, [onChange, isUpdating]);

  // Handle paste events
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center p-2 bg-gray-50 border-b border-gray-300">
        <button
          type="button"
          onClick={() => handleFormat('bold')}
          className="p-1 mx-1 rounded hover:bg-gray-200"
          title="Bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
          </svg>
        </button>
        <button
          type="button"
          onClick={() => handleFormat('italic')}
          className="p-1 mx-1 rounded hover:bg-gray-200"
          title="Italic"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
          </svg>
        </button>
        <button
          type="button"
          onClick={() => handleFormat('insertUnorderedList')}
          className="p-1 mx-1 rounded hover:bg-gray-200"
          title="Bullet List"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
        </button>
        <button
          type="button"
          onClick={() => handleFormat('insertOrderedList')}
          className="p-1 mx-1 rounded hover:bg-gray-200"
          title="Numbered List"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"/>
          </svg>
        </button>
      </div>
      
      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        className={`p-4 min-h-[150px] focus:outline-none rich-text-content ${isFocused ? 'ring-2 ring-green-500' : ''} ${!value ? 'empty-editor' : ''}`}
        onInput={handleInput}
        onPaste={handlePaste}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            document.execCommand('insertHTML', false, '<br><br>');
            handleInput();
          }
        }}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
        style={{ position: 'relative', cursor: 'text' }}
      />
      <style jsx>{`
        .empty-editor:before {
          content: attr(data-placeholder);
          position: absolute;
          color: #aaa;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default SimpleRichTextEditor;
