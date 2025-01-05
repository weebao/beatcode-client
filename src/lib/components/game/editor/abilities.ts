import { EditorView } from "codemirror";
import { StateEffect } from "@codemirror/state";
import type { LanguageSupport } from "@codemirror/language";
import { DefaultTheme, LightTheme } from "./themes";

export const handleDeletio = (view: EditorView) => {
    // Delete a random line of my code
    const doc = view.state.doc;
    const lineCount = doc.lines;

    if (lineCount === 0) return;

    // Only start from the third line since the first 2 lines are starter code
    let randomLine = Math.floor(Math.random() * (lineCount - 2)) + 3;
    // If empty reroll line
    while (doc.line(randomLine).text.trim() === "") {
        randomLine = Math.floor(Math.random() * (lineCount - 2)) + 3;
    }
    const linePos = doc.line(randomLine);
    view.dispatch({
        changes: { from: linePos.from, to: linePos.to }
    });
};

export const handleSyntaxio = (view: EditorView, lang: LanguageSupport, exts: any[]) => {
    // Turn off syntax highlighting for 30 seconds
    const originalExts = exts;
    exts = exts.filter((ext) => ext !== lang);
    view.dispatch({
        effects: StateEffect.reconfigure.of(exts)
    });
    setTimeout(() => {
        exts = originalExts;
        view?.dispatch({
            effects: StateEffect.reconfigure.of(exts)
        });
    }, 30000);
};

export const handleLightio = (view: EditorView, exts: any[]) => {
    // Turn editor to light mode for 30 seconds
    exts = exts.filter((ext) => ext !== DefaultTheme);
    exts.push(LightTheme);
    view.dispatch({
        effects: StateEffect.reconfigure.of(exts)
    });
    setTimeout(() => {
        exts = exts.filter((ext) => ext !== LightTheme);
        exts.push(DefaultTheme);
        view.dispatch({
            effects: StateEffect.reconfigure.of(exts)
        });
    }, 30000);
};
