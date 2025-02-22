import { EditorView } from "codemirror";
import { Compartment } from "@codemirror/state";
import { LanguageConfig } from "$assets/config/game";
import { DefaultTheme, LightTheme } from "./themes";
import type { Languages } from "$lib/models/game";

export const handleDeletio = (view: EditorView) => {
    // Delete a random line of my code
    const doc = view.state.doc;
    const lineCount = doc.lines;

    if (lineCount === 0) return;
    console.log(lineCount);

    let randomLine = Math.floor(Math.random() * lineCount) + 1;
    // If empty reroll line until a non-empty line is found
    while (doc.line(randomLine).text.trim() === "") {
        randomLine = Math.floor(Math.random() * lineCount) + 1;
    }
    const linePos = doc.line(randomLine);
    view.dispatch({
        changes: { from: linePos.from, to: linePos.to }
    });
};

export const handleSyntaxio = (
    view: EditorView,
    exts: any[],
    langExt: any,
    language: Compartment,
    currentLang: Languages,
    setExts: (exts: any[]) => void
) => {
    const originalExts = [...exts];
    const newExts = exts.filter((ext) => ext !== langExt);
    setExts(newExts);

    setTimeout(() => {
        if (!view) throw new Error("Editor view not linked");
        setExts(originalExts);
        view.dispatch({
            effects: language.reconfigure(LanguageConfig[currentLang].support())
        });
    }, 30000);
};

export const handleLightio = (
    view: EditorView,
    exts: any[],
    setExts: (exts: any[]) => void,
    time = 30000
) => {
    const originalExts = [...exts];
    const newExts = exts.filter((ext) => ext !== DefaultTheme);
    newExts.push(LightTheme);
    setExts(newExts);

    setTimeout(() => {
        const resetExts = originalExts.filter((ext) => ext !== LightTheme);
        resetExts.push(DefaultTheme);
        setExts(resetExts);
    }, time);
};

export const handleSizeChange = (
    view: EditorView,
    fontSize: Compartment,
    sizeMul: number,
    time = 30000
) => {
    const baseSize = 13;
    view.dispatch({
        effects: fontSize.reconfigure(
            EditorView.editorAttributes.of({
                style: "font-size: " + baseSize * sizeMul + "px"
            })
        )
    });
    setTimeout(() => {
        view.dispatch({
            effects: fontSize.reconfigure(
                EditorView.editorAttributes.of({
                    style: "font-size: " + baseSize + "px"
                })
            )
        });
    }, time);
};
