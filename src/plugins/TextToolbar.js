import {$createCodeNode, $isCodeNode} from '@lexical/code';
import {$isLinkNode, TOGGLE_LINK_COMMAND} from '@lexical/link';
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';

import './ToolbarPlugin.css';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$isDecoratorBlockNode} from '@lexical/react/LexicalDecoratorBlockNode';
import {INSERT_HORIZONTAL_RULE_COMMAND} from '@lexical/react/LexicalHorizontalRuleNode';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  HeadingTagType,
} from '@lexical/rich-text';

import {
    $getSelectionStyleValueForProperty,
    $isAtNodeEnd,
    $isParentElementRTL,
    $patchStyleText,
    $selectAll,
    $wrapLeafNodesInElements,
  } from '@lexical/selection';
  import {
    $getNearestBlockElementAncestorOrThrow,
    $getNearestNodeOfType,
    mergeRegister,
  } from '@lexical/utils';

  import {
    $createParagraphNode,
    $getNodeByKey,
    $getRoot,
    $getSelection,
    $isRangeSelection,
    $isTextNode,
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    COMMAND_PRIORITY_CRITICAL,
    COMMAND_PRIORITY_LOW,
    ElementNode,
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
    INDENT_CONTENT_COMMAND,
    NodeKey,
    OUTDENT_CONTENT_COMMAND,
    REDO_COMMAND,
    SELECTION_CHANGE_COMMAND,
    TextNode,
    UNDO_COMMAND,
  } from 'lexical';

import * as React from 'react';
import {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
// Create a shared folder 
import {IS_APPLE} from 'shared/environment';

import useModal from '../hooks/useModal';

import Button from '../ui/Button';
import ColorPicker from '../ui/ColorPicker';
import DropDown, {DropDownItem} from '../ui/DropDown';
import FileInput from '../ui/FileInput.jsx';
import LinkPreview from '../ui/LinkPreview';
import TextInput from '../ui/TextInput';
import {INSERT_IMAGE_COMMAND} from './ImagesPlugin';

const blockTypeToBlockName = {
    bullet: 'Bulleted List',
    check: 'Check List',
    code: 'Code Block',
    h1: 'Heading 1',
    h2: 'Heading 2',
    h3: 'Heading 3',
    h4: 'Heading 4',
    h5: 'Heading 5',
    h6: 'Heading 6',
    number: 'Numbered List',
    paragraph: 'Normal',
    quote: 'Quote',
  };

  const CODE_LANGUAGE_OPTIONS = [
    ['', '- Select language -'],
    ['c', 'C'],
    ['clike', 'C-like'],
    ['css', 'CSS'],
    ['html', 'HTML'],
    ['js', 'JavaScript'],
    ['markdown', 'Markdown'],
    ['objc', 'Objective-C'],
    ['plain', 'Plain Text'],
    ['py', 'Python'],
    ['rust', 'Rust'],
    ['sql', 'SQL'],
    ['swift', 'Swift'],
    ['xml', 'XML'],
  ];

const CODE_LANGUAGE_MAP = {
    javascript: 'js',
    md: 'markdown',
    plaintext: 'plain',
    python: 'py',
    text: 'plain',
  };

  function getSelectedNode(selection){
    const anchor = selection.anchor;
    const focus = selection.focus;
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();
    if (anchorNode === focusNode) {
      return anchorNode;
    }
    const isBackward = selection.isBackward();
    if (isBackward) {
      return $isAtNodeEnd(focus) ? anchorNode : focusNode;
    } else {
      return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
    }
  }

  function positionEditorElement(editor,rect,rootElement){
    if (rect === null) {
      editor.style.opacity = '0';
      editor.style.top = '-1000px';
      editor.style.left = '-1000px';
    } else {
      editor.style.opacity = '1';
      editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
      const left = rect.left - editor.offsetWidth / 2 + rect.width / 2;
      const rootElementRect = rootElement.getBoundingClientRect();
      if (rootElementRect.left > left) {
        editor.style.left = `${rect.left + window.pageXOffset}px`;
      } else if (left + editor.offsetWidth > rootElementRect.right) {
        editor.style.left = `${
          rect.right + window.pageXOffset - editor.offsetWidth
        }px`;
      }
    }
  }


  function FloatingLinkEditor({editor}){
    const editorRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [linkUrl, setLinkUrl] = useState('');
    const [isEditMode, setEditMode] = useState(false);
    const [lastSelection, setLastSelection] = useState<
      RangeSelection | GridSelection | NodeSelection | null
    >(null);
  
    const updateLinkEditor = useCallback(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const node = getSelectedNode(selection);
        const parent = node.getParent();
        if ($isLinkNode(parent)) {
          setLinkUrl(parent.getURL());
        } else if ($isLinkNode(node)) {
          setLinkUrl(node.getURL());
        } else {
          setLinkUrl('');
        }
      }
      const editorElem = editorRef.current;
      const nativeSelection = window.getSelection();
      const activeElement = document.activeElement;
  
      if (editorElem === null) {
        return;
      }
  
      const rootElement = editor.getRootElement();
      if (
        selection !== null &&
        nativeSelection !== null &&
        !nativeSelection.isCollapsed &&
        rootElement !== null &&
        rootElement.contains(nativeSelection.anchorNode)
      ) {
        const domRange = nativeSelection.getRangeAt(0);
        let rect;
        if (nativeSelection.anchorNode === rootElement) {
          let inner = rootElement;
          while (inner.firstElementChild != null) {
            inner = inner.firstElementChild as HTMLElement;
          }
          rect = inner.getBoundingClientRect();
        } else {
          rect = domRange.getBoundingClientRect();
        }
  
        positionEditorElement(editorElem, rect, rootElement);
        setLastSelection(selection);
      } else if (!activeElement || activeElement.className !== 'link-input') {
        if (rootElement !== null) {
          positionEditorElement(editorElem, null, rootElement);
        }
        setLastSelection(null);
        setEditMode(false);
        setLinkUrl('');
      }
  
      return true;
    }, [editor]);
  
    useEffect(() => {
      const onResize = () => {
        editor.getEditorState().read(() => {
          updateLinkEditor();
        });
      };
      window.addEventListener('resize', onResize);
  
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }, [editor, updateLinkEditor]);
  
    useEffect(() => {
      return mergeRegister(
        editor.registerUpdateListener(({editorState}) => {
          editorState.read(() => {
            updateLinkEditor();
          });
        }),
  
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            updateLinkEditor();
            return true;
          },
          COMMAND_PRIORITY_LOW,
        ),
      );
    }, [editor, updateLinkEditor]);
  
    useEffect(() => {
      editor.getEditorState().read(() => {
        updateLinkEditor();
      });
    }, [editor, updateLinkEditor]);
  
    useEffect(() => {
      if (isEditMode && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isEditMode]);
  
    return (
      <div ref={editorRef} className="link-editor">
        {isEditMode ? (
          <input
            ref={inputRef}
            className="link-input"
            value={linkUrl}
            onChange={(event) => {
              setLinkUrl(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                if (lastSelection !== null) {
                  if (linkUrl !== '') {
                    editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
                  }
                  setEditMode(false);
                }
              } else if (event.key === 'Escape') {
                event.preventDefault();
                setEditMode(false);
              }
            }}
          />
        ) : (
          <>
            <div className="link-input">
              <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                {linkUrl}
              </a>
              <div
                className="link-edit"
                role="button"
                tabIndex={0}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setEditMode(true);
                }}
              />
            </div>
            <LinkPreview url={linkUrl} />
          </>
        )}
      </div>
    );
  }

  export function InsertImageUriDialogBody({onClick}) {
    const [src, setSrc] = useState('');
    const [altText, setAltText] = useState('');
  
    const isDisabled = src === '';
  
    return (
      <>
        <TextInput
          label="Image URL"
          placeholder="i.e. https://source.unsplash.com/random"
          onChange={setSrc}
          value={src}
          data-test-id="image-modal-url-input"
        />
        <TextInput
          label="Alt Text"
          placeholder="Random unsplash image"
          onChange={setAltText}
          value={altText}
          data-test-id="image-modal-alt-text-input"
        />
        <div className="ToolbarPlugin__dialogActions">
          <Button
            data-test-id="image-modal-confirm-btn"
            disabled={isDisabled}
            onClick={() => onClick({altText, src})}>
            Confirm
          </Button>
        </div>
      </>
    );
  }

 
  export function InsertImageUploadedDialogBody({onClick}) {
    const [src, setSrc] = useState('');
    const [altText, setAltText] = useState('');
  
    const isDisabled = src === '';
  
    const loadImage = (files) => {
      const reader = new FileReader();
      reader.onload = function () {
        if (typeof reader.result === 'string') {
          setSrc(reader.result);
        }
        return '';
      };
      if (files !== null) {
        reader.readAsDataURL(files[0]);
      }
    };
  
    return (
      <>
        <FileInput
          label="Image Upload"
          onChange={loadImage}
          accept="image/*"
          data-test-id="image-modal-file-upload"
        />
        <TextInput
          label="Alt Text"
          placeholder="Descriptive alternative text"
          onChange={setAltText}
          value={altText}
          data-test-id="image-modal-alt-text-input"
        />
        <div className="ToolbarPlugin__dialogActions">
          <Button
            data-test-id="image-modal-file-upload-btn"
            disabled={isDisabled}
            onClick={() => onClick({altText, src})}>
            Confirm
          </Button>
        </div>
      </>
    );
  }

  export function InsertImageDialog({activeEditor,onClose}) {
    const [mode, setMode] = useState<null | 'url' | 'file'>(null);
  
    const onClick = (payload) => {
      activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
      onClose();
    };
  
    return (
      <>
        {!mode && (
          <div className="ToolbarPlugin__dialogButtonsList">
            <Button
              data-test-id="image-modal-option-sample"
              onClick={() =>
                onClick({
                  altText: 'Yellow flower in tilt shift lens',
                  src: yellowFlowerImage,
                })
              }>
              Sample
            </Button>
            <Button
              data-test-id="image-modal-option-url"
              onClick={() => setMode('url')}>
              URL
            </Button>
            <Button
              data-test-id="image-modal-option-file"
              onClick={() => setMode('file')}>
              File
            </Button>
          </div>
        )}
        {mode === 'url' && <InsertImageUriDialogBody onClick={onClick} />}
        {mode === 'file' && <InsertImageUploadedDialogBody onClick={onClick} />}
      </>
    );
  }


  export function InsertTableDialog({activeEditor, onClose}) {
    const [rows, setRows] = useState('5');
    const [columns, setColumns] = useState('5');
  
    const onClick = () => {
      activeEditor.dispatchCommand(INSERT_TABLE_COMMAND, {columns, rows});
      onClose();
    };
  
    return (
      <>
        <TextInput label="No of rows" onChange={setRows} value={rows} />
        <TextInput label="No of columns" onChange={setColumns} value={columns} />
        <div
          className="ToolbarPlugin__dialogActions"
          data-test-id="table-model-confirm-insert">
          <Button onClick={onClick}>Confirm</Button>
        </div>
      </>
    );
  }

  function BlockFormatDropDown({editor,blockType}) {
  
    const formatParagraph = () => {
      if (blockType !== 'paragraph') {
        editor.update(() => {
          const selection = $getSelection();
  
          if ($isRangeSelection(selection)) {
            $wrapLeafNodesInElements(selection, () => $createParagraphNode());
          }
        });
      }
    };
  
    const formatHeading = (headingSize) => {
      if (blockType !== headingSize) {
        editor.update(() => {
          const selection = $getSelection();
  
          if ($isRangeSelection(selection)) {
            $wrapLeafNodesInElements(selection, () =>
              $createHeadingNode(headingSize),
            );
          }
        });
      }
    };
  
    const formatBulletList = () => {
      if (blockType !== 'bullet') {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      } else {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      }
    };
  
    const formatCheckList = () => {
      if (blockType !== 'check') {
        editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
      } else {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      }
    };
  
    const formatNumberedList = () => {
      if (blockType !== 'number') {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      } else {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      }
    };
  
    const formatQuote = () => {
      if (blockType !== 'quote') {
        editor.update(() => {
          const selection = $getSelection();
  
          if ($isRangeSelection(selection)) {
            $wrapLeafNodesInElements(selection, () => $createQuoteNode());
          }
        });
      }
    };
  
    const formatCode = () => {
      if (blockType !== 'code') {
        editor.update(() => {
          const selection = $getSelection();
  
          if ($isRangeSelection(selection)) {
            if (selection.isCollapsed()) {
              $wrapLeafNodesInElements(selection, () => $createCodeNode());
            } else {
              const textContent = selection.getTextContent();
              const codeNode = $createCodeNode();
              selection.insertNodes([codeNode]);
              selection.insertRawText(textContent);
            }
          }
        });
      }
    };
  
    return (
      <DropDown
        buttonClassName="toolbar-item block-controls"
        buttonIconClassName={'icon block-type ' + blockType}
        buttonLabel={blockTypeToBlockName[blockType]}
        buttonAriaLabel="Formatting options for text style">
        <DropDownItem
          className={'item ' + dropDownActiveClass(blockType === 'paragraph')}
          onClick={formatParagraph}>
          <i className="icon paragraph" />
          <span className="text">Normal</span>
        </DropDownItem>
        <DropDownItem
          className={'item ' + dropDownActiveClass(blockType === 'h1')}
          onClick={() => formatHeading('h1')}>
          <i className="icon h1" />
          <span className="text">Heading 1</span>
        </DropDownItem>
        <DropDownItem
          className={'item ' + dropDownActiveClass(blockType === 'h2')}
          onClick={() => formatHeading('h2')}>
          <i className="icon h2" />
          <span className="text">Heading 2</span>
        </DropDownItem>
        <DropDownItem
          className={'item ' + dropDownActiveClass(blockType === 'h3')}
          onClick={() => formatHeading('h3')}>
          <i className="icon h3" />
          <span className="text">Heading 3</span>
        </DropDownItem>
        <DropDownItem
          className={'item ' + dropDownActiveClass(blockType === 'bullet')}
          onClick={formatBulletList}>
          <i className="icon bullet-list" />
          <span className="text">Bullet List</span>
        </DropDownItem>
        <DropDownItem
          className={'item ' + dropDownActiveClass(blockType === 'number')}
          onClick={formatNumberedList}>
          <i className="icon numbered-list" />
          <span className="text">Numbered List</span>
        </DropDownItem>
        <DropDownItem
          className={'item ' + dropDownActiveClass(blockType === 'check')}
          onClick={formatCheckList}>
          <i className="icon check-list" />
          <span className="text">Check List</span>
        </DropDownItem>
        <DropDownItem
          className={'item ' + dropDownActiveClass(blockType === 'quote')}
          onClick={formatQuote}>
          <i className="icon quote" />
          <span className="text">Quote</span>
        </DropDownItem>
        <DropDownItem
          className={'item ' + dropDownActiveClass(blockType === 'code')}
          onClick={formatCode}>
          <i className="icon code" />
          <span className="text">Code Block</span>
        </DropDownItem>
      </DropDown>
    );
  }

  function Divider(){
    return <div className="divider" />;
  }

  function Select({onChange,className,options,value,}) {
    return (
      <select className={className} onChange={onChange} value={value}>
        {options.map(([option, text]) => (
          <option key={option} value={option}>
            {text}
          </option>
        ))}
      </select>
    );
  }


  export default function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();
    const [activeEditor, setActiveEditor] = useState(editor);
    const [blockType, setBlockType] =useState('paragraph');
    const [selectedElementKey, setSelectedElementKey] = useState(null);
    const [fontSize, setFontSize] = useState('15px');
    const [fontColor, setFontColor] = useState('#000');
    const [bgColor, setBgColor] = useState('#fff');
    const [fontFamily, setFontFamily] = useState('Arial');
    const [isLink, setIsLink] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isSubscript, setIsSubscript] = useState(false);
    const [isSuperscript, setIsSuperscript] = useState(false);
    const [isCode, setIsCode] = useState(false);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [modal, showModal] = useModal();
    const [isRTL, setIsRTL] = useState(false);
    const [codeLanguage, setCodeLanguage] = useState('');
  
    const updateToolbar = useCallback(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchorNode = selection.anchor.getNode();
        const element =
          anchorNode.getKey() === 'root'
            ? anchorNode
            : anchorNode.getTopLevelElementOrThrow();
        const elementKey = element.getKey();
        const elementDOM = activeEditor.getElementByKey(elementKey);
  
        // Update text format
        setIsBold(selection.hasFormat('bold'));
        setIsItalic(selection.hasFormat('italic'));
        setIsUnderline(selection.hasFormat('underline'));
        setIsStrikethrough(selection.hasFormat('strikethrough'));
        setIsSubscript(selection.hasFormat('subscript'));
        setIsSuperscript(selection.hasFormat('superscript'));
        setIsCode(selection.hasFormat('code'));
        setIsRTL($isParentElementRTL(selection));
  
        // Update links
        const node = getSelectedNode(selection);
        const parent = node.getParent();
        if ($isLinkNode(parent) || $isLinkNode(node)) {
          setIsLink(true);
        } else {
          setIsLink(false);
        }
  
        if (elementDOM !== null) {
          setSelectedElementKey(elementKey);
          if ($isListNode(element)) {
        const parentList = $getNearestNodeOfType(anchorNode,ListNode);
            const type = parentList
              ? parentList.getListType()
              : element.getListType();
            setBlockType(type);
          } else {
            const type = $isHeadingNode(element)
              ? element.getTag()
              : element.getType();
            if (type in blockTypeToBlockName) {
              setBlockType(type);
            }
            if ($isCodeNode(element)) {
              const language =
                element.getLanguage();
              setCodeLanguage(
                language ? CODE_LANGUAGE_MAP[language] || language : '',
              );
              return;
            }
          }
        }
        // Handle buttons
        setFontSize(
          $getSelectionStyleValueForProperty(selection, 'font-size', '15px'),
        );
        setFontColor(
          $getSelectionStyleValueForProperty(selection, 'color', '#000'),
        );
        setBgColor(
          $getSelectionStyleValueForProperty(
            selection,
            'background-color',
            '#fff',
          ),
        );
        setFontFamily(
          $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial'),
        );
      }
    }, [activeEditor]);
  
    useEffect(() => {
      return editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          setActiveEditor(newEditor);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      );
    }, [editor, updateToolbar]);
  
    useEffect(() => {
      return mergeRegister(
        activeEditor.registerUpdateListener(({editorState}) => {
          editorState.read(() => {
            updateToolbar();
          });
        }),
        activeEditor.registerCommand(
          CAN_UNDO_COMMAND,
          (payload) => {
            setCanUndo(payload);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL,
        ),
        activeEditor.registerCommand(
          CAN_REDO_COMMAND,
          (payload) => {
            setCanRedo(payload);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL,
        ),
      );
    }, [activeEditor, updateToolbar]);
  
    const applyStyleText = useCallback(
      (styles) => {
        activeEditor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $patchStyleText(selection, styles);
          }
        });
      },
      [activeEditor],
    );
  
    const clearFormatting = useCallback(() => {
      activeEditor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $selectAll(selection);
          selection.getNodes().forEach((node) => {
            if ($isTextNode(node)) {
              node.setFormat(0);
              node.setStyle('');
              $getNearestBlockElementAncestorOrThrow(node).setFormat('');
            }
            if ($isDecoratorBlockNode(node)) {
              node.setFormat('');
            }
          });
        }
      });
    }, [activeEditor]);
  
    const onFontSizeSelect = useCallback(
      (e) => {
        applyStyleText({'font-size': (e.target).value});
      },
      [applyStyleText],
    );
  
    const onFontColorSelect = useCallback(
      (value) => {
        applyStyleText({color: value});
      },
      [applyStyleText],
    );
  
    const onBgColorSelect = useCallback(
      (value) => {
        applyStyleText({'background-color': value});
      },
      [applyStyleText],
    );
  
    const onFontFamilySelect = useCallback(
      (e) => {
        applyStyleText({'font-family': (e.target).value});
      },
      [applyStyleText],
    );
  
    const insertLink = useCallback(() => {
      if (!isLink) {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
      } else {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
      }
    }, [editor, isLink]);
  
    const onCodeLanguageSelect = useCallback(
      (e) => {
        activeEditor.update(() => {
          if (selectedElementKey !== null) {
            const node = $getNodeByKey(selectedElementKey);
            if ($isCodeNode(node)) {
              node.setLanguage((e.target).value);
            }
          }
        });
      },
      [activeEditor, selectedElementKey],
    );
    const insertGifOnClick = (payload) => {
      activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    };
  
    return (
      <div className="toolbar">
        <button
          disabled={!canUndo}
          onClick={() => {
            activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          title={IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)'}
          className="toolbar-item spaced"
          aria-label="Undo">
          <i className="format undo" />
        </button>
        <button
          disabled={!canRedo}
          onClick={() => {
            activeEditor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          title={IS_APPLE ? 'Redo (⌘Y)' : 'Undo (Ctrl+Y)'}
          className="toolbar-item"
          aria-label="Redo">
          <i className="format redo" />
        </button>
        <Divider />
        {blockType in blockTypeToBlockName && activeEditor === editor && (
          <>
            <BlockFormatDropDown blockType={blockType} editor={editor} />
            <Divider />
          </>
        )}
        {blockType === 'code' ? (
          <>
            <Select
              className="toolbar-item code-language"
              onChange={onCodeLanguageSelect}
              options={CODE_LANGUAGE_OPTIONS}
              value={codeLanguage}
            />
            <i className="chevron-down inside" />
          </>
        ) : (
          <>
            <>
              <Select
                className="toolbar-item font-family"
                onChange={onFontFamilySelect}
                options={[
                  ['Arial', 'Arial'],
                  ['Courier New', 'Courier New'],
                  ['Georgia', 'Georgia'],
                  ['Times New Roman', 'Times New Roman'],
                  ['Trebuchet MS', 'Trebuchet MS'],
                  ['Verdana', 'Verdana'],
                ]}
                value={fontFamily}
              />
              <i className="chevron-down inside" />
            </>
            <>
              <Select
                className="toolbar-item font-size"
                onChange={onFontSizeSelect}
                options={[
                  ['10px', '10px'],
                  ['11px', '11px'],
                  ['12px', '12px'],
                  ['13px', '13px'],
                  ['14px', '14px'],
                  ['15px', '15px'],
                  ['16px', '16px'],
                  ['17px', '17px'],
                  ['18px', '18px'],
                  ['19px', '19px'],
                  ['20px', '20px'],
                ]}
                value={fontSize}
              />
              <i className="chevron-down inside" />
            </>
            <Divider />
            <button
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
              }}
              className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
              title={IS_APPLE ? 'Bold (⌘B)' : 'Bold (Ctrl+B)'}
              aria-label={`Format text as bold. Shortcut: ${
                IS_APPLE ? '⌘B' : 'Ctrl+B'
              }`}>
              <i className="format bold" />
            </button>
            <button
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
              }}
              className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
              title={IS_APPLE ? 'Italic (⌘I)' : 'Italic (Ctrl+I)'}
              aria-label={`Format text as italics. Shortcut: ${
                IS_APPLE ? '⌘I' : 'Ctrl+I'
              }`}>
              <i className="format italic" />
            </button>
            <button
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
              }}
              className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
              title={IS_APPLE ? 'Underline (⌘U)' : 'Underline (Ctrl+U)'}
              aria-label={`Format text to underlined. Shortcut: ${
                IS_APPLE ? '⌘U' : 'Ctrl+U'
              }`}>
              <i className="format underline" />
            </button>
            <button
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
              }}
              className={'toolbar-item spaced ' + (isCode ? 'active' : '')}
              title="Insert code block"
              aria-label="Insert code block">
              <i className="format code" />
            </button>
            <button
              onClick={insertLink}
              className={'toolbar-item spaced ' + (isLink ? 'active' : '')}
              aria-label="Insert link"
              title="Insert link">
              <i className="format link" />
            </button>
            {isLink &&
              createPortal(
                <FloatingLinkEditor editor={activeEditor} />,
                document.body,
              )}
            <ColorPicker
              buttonClassName="toolbar-item color-picker"
              buttonAriaLabel="Formatting text color"
              buttonIconClassName="icon font-color"
              color={fontColor}
              onChange={onFontColorSelect}
              title="text color"
            />
            <ColorPicker
              buttonClassName="toolbar-item color-picker"
              buttonAriaLabel="Formatting background color"
              buttonIconClassName="icon bg-color"
              color={bgColor}
              onChange={onBgColorSelect}
              title="bg color"
            />
            <Divider />
            <DropDown
              buttonClassName="toolbar-item spaced"
              buttonLabel="Insert"
              buttonAriaLabel="Insert specialized editor node"
              buttonIconClassName="icon plus">
              <DropDownItem
                onClick={() => {
                  activeEditor.dispatchCommand(
                    INSERT_HORIZONTAL_RULE_COMMAND,
                    undefined,
                  );
                }}
                className="item">
                <i className="icon horizontal-rule" />
                <span className="text">Horizontal Rule</span>
              </DropDownItem>
              <DropDownItem
                onClick={() => {
                  showModal('Insert Image', (onClose) => (
                    <InsertImageDialog
                      activeEditor={activeEditor}
                      onClose={onClose}
                    />
                  ));
                }}
                className="item">
                <i className="icon image" />
                <span className="text">Image</span>
              </DropDownItem>
              <DropDownItem
                onClick={() => {
                  showModal('Insert Table', (onClose) => (
                    <InsertTableDialog
                      activeEditor={activeEditor}
                      onClose={onClose}
                    />
                  ));
                }}
                className="item">
                <i className="icon table" />
                <span className="text">Table</span>
              </DropDownItem>
            </DropDown>
          </>
        )}
        <Divider />
        <DropDown
          buttonLabel="Align"
          buttonIconClassName="icon left-align"
          buttonClassName="toolbar-item spaced alignment"
          buttonAriaLabel="Formatting options for text alignment">
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
            }}
            className="item">
            <i className="icon left-align" />
            <span className="text">Left Align</span>
          </DropDownItem>
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
            }}
            className="item">
            <i className="icon center-align" />
            <span className="text">Center Align</span>
          </DropDownItem>
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
            }}
            className="item">
            <i className="icon right-align" />
            <span className="text">Right Align</span>
          </DropDownItem>
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
            }}
            className="item">
            <i className="icon justify-align" />
            <span className="text">Justify Align</span>
          </DropDownItem>
          <Divider />
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
            }}
            className="item">
            <i className={'icon ' + (isRTL ? 'indent' : 'outdent')} />
            <span className="text">Outdent</span>
          </DropDownItem>
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
            }}
            className="item">
            <i className={'icon ' + (isRTL ? 'outdent' : 'indent')} />
            <span className="text">Indent</span>
          </DropDownItem>
        </DropDown>
  
        {modal}
      </div>
    );
  }