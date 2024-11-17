import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

const foreground = "#BDC3D1",
    background = "#1C2735",
    darkBackground = "#151E28",
    highlightBackground = "#ffffff0f",
    cursor = "#c6c6c6",
    selection = "#094771",
    gutter = "#7d8799",
    tooltipBackground = "#111820",
    invalid = "#ff0000",
    keyword = "#569cd6",
    controlFlowAndModuleKeywords = "#c586c0",
    functions = "#dcdcaa",
    typesAndClasses = "#4ec9b0",
    tagNames = "#569cd6",
    operators = "#d4d4d4",
    regexes = "#d16969",
    strings = "#ce9178",
    names = "#BDC3D1",
    punctuationAndSeparators = "#d4d4d4",
    angleBrackets = "#808080",
    templateStringBraces = "#569cd6",
    propertyNames = "#9cdcfe",
    booleansAndAtoms = "#569cd6",
    numbersAndUnits = "#b5cea8",
    metaAndComments = "#6a9955";

const Theme = EditorView.theme(
    {
        "&": {
            color: foreground,
            backgroundColor: background
        },

        ".cm-content": {
            caretColor: cursor
        },

        ".cm-cursor, .cm-dropCursor": { borderLeftColor: cursor },
        "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
            backgroundColor: selection
        },
        "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": { backgroundColor: selection },

        ".cm-panels": { backgroundColor: darkBackground, color: foreground },
        ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
        ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },

        ".cm-searchMatch": {
            backgroundColor: "#72a1ff59",
            outline: "1px solid #457dff"
        },
        ".cm-searchMatch.cm-searchMatch-selected": {
            backgroundColor: "#6199ff2f"
        },

        ".cm-activeLine": { backgroundColor: highlightBackground },
        ".cm-selectionMatch": { backgroundColor: "#aafe661a" },

        "&.cm-editor": {
            borderRadius: "5px"
        },

        // "&.cm-editor.cm-focused": {
        //     outline: "5px solid #808080"
        // },

        "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
            backgroundColor: "#bad0f847",
        },

        ".cm-gutters": {
            backgroundColor: background,
            color: gutter,
            border: "none",
        },

        ".cm-activeLineGutter": {
            backgroundColor: highlightBackground
        },

        ".cm-foldPlaceholder": {
            backgroundColor: "transparent",
            border: "none",
            color: "#ddd"
        },

        ".cm-tooltip": {
            border: "none",
            backgroundColor: tooltipBackground
        },
        ".cm-tooltip .cm-tooltip-arrow:before": {
            borderTopColor: "transparent",
            borderBottomColor: "transparent"
        },
        ".cm-tooltip .cm-tooltip-arrow:after": {
            borderTopColor: tooltipBackground,
            borderBottomColor: tooltipBackground
        },
        ".cm-tooltip-autocomplete": {
            "& > ul > li[aria-selected]": {
                backgroundColor: highlightBackground,
                color: foreground
            }
        }
    },
    { dark: true }
);

const Highlight = HighlightStyle.define([
    { tag: t.keyword, color: keyword },
    {
        tag: [t.controlKeyword, t.moduleKeyword],
        color: controlFlowAndModuleKeywords
    },
    {
        tag: [t.name, t.deleted, t.character, t.macroName],
        color: names
    },
    {
        tag: [t.propertyName],
        color: propertyNames
    },

    { tag: [t.variableName, t.labelName], color: names },
    {
        tag: [t.color, t.constant(t.name), t.standard(t.name)],
        color: booleansAndAtoms
    },
    { tag: [t.definition(t.name)], color: foreground },
    {
        tag: [
            t.typeName,
            t.className,
            t.number,
            t.changed,
            t.annotation,
            t.modifier,
            t.self,
            t.namespace
        ],
        color: typesAndClasses
    },
    { tag: [t.tagName], color: tagNames },
    {
        tag: [t.function(t.variableName), t.function(t.propertyName)],
        color: functions
    },
    { tag: [t.number], color: numbersAndUnits },
    {
        tag: [
            t.operator,
            t.operatorKeyword,
            t.url,
            t.escape,
            t.regexp,
            t.link,
            t.special(t.string)
        ],
        color: operators
    },
    {
        tag: [t.regexp],
        color: regexes
    },
    {
        tag: [t.special(t.string)],
        color: strings
    },
    { tag: [t.meta, t.comment], color: metaAndComments },
    { tag: [t.punctuation, t.separator], color: punctuationAndSeparators },
    { tag: [t.angleBracket], color: angleBrackets },
    { tag: t.special(t.brace), color: templateStringBraces },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.strikethrough, textDecoration: "line-through" },
    { tag: t.link, color: metaAndComments, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: names },
    {
        tag: [t.atom, t.bool, t.special(t.variableName)],
        color: booleansAndAtoms
    },
    {
        tag: [t.processingInstruction, t.string, t.inserted],
        color: strings
    },
    { tag: t.invalid, color: invalid }
]);

export const DefaultTheme = [
    Theme, 
    syntaxHighlighting(Highlight),
];
