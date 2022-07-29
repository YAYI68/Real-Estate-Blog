

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import React from 'react'
import { exampleTheme } from './ThemeExample';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import ToolbarPlugin from '../plugins/ToolbarPlugin';
import TextFormatFloatingToolbarPlugin from '../plugins/TextFormatFloatingToolbarPlugin';
import {HashtagNode} from '@lexical/hashtag';
import {OverflowNode} from '@lexical/overflow';
import {HorizontalRuleNode} from '@lexical/react/LexicalHorizontalRuleNode';
import {MarkNode} from '@lexical/mark';
import TabFocusPlugin from '../plugins/TabFocusPlugin';


const initialEditorState = {}



const initialConfig = {
    namespace: 'MyEditor', 

    theme: exampleTheme,

    onError(error) {
        throw error;
      },
    //   editorState: initialEditorState,
      nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode,
        OverflowNode,
        HorizontalRuleNode,
        HashtagNode,
        MarkNode,
      ]
};



export const TextArea = () => {
  return (
    <div>
        <LexicalComposer initialConfig={initialConfig}>
         <div className=" overflow-y-scroll h-[50rem] w-[80%] mx-auto rounded shadow border-2 border-blue-800 relative text-left">
         <ToolbarPlugin />
            <div>
            <RichTextPlugin
            contentEditable={<ContentEditable className=' bg-white outline-[0] text-left w-full min-h-[50rem] resize-none text-[1.5rem] caret-[#50d71e] relative py-[1.5rem] px-[1rem]' />}
            // placeholder={<div className='absolute top-[50px] left-[20px]'> Enter </div>}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <LinkPlugin />
            <ListPlugin />
            <MarkdownShortcutPlugin  transformers={TRANSFORMERS} />
            <TextFormatFloatingToolbarPlugin/>
            <TabFocusPlugin />
            </div>
         </div>
       </LexicalComposer>
    </div>
  )
}



// export default function Editor() {
//     return (
//       <LexicalComposer initialConfig={initialConfig}>
//         <div className="editor-container">...</div>
//       </LexicalComposer>
//     );
//   }