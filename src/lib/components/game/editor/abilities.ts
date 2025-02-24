import { EditorView } from "codemirror";
import { Compartment } from "@codemirror/state";
import { LanguageConfig } from "$assets/config/game";
import { DefaultTheme, LightTheme } from "./themes";
import type { Languages } from "$lib/models/game";

export const processAbility = (
    ability: string,
    view: EditorView,
    exts: any[],
    lang: Languages,
    langExt: any,
    langComp: Compartment,
    themeComp: Compartment,
    fontSizeComp: Compartment,
    setExts: (exts: any[]) => void,
    setClass: (classNames: string) => void,
    setReadonly: (isReadonly: boolean) => void,
    setRickroll: (on: boolean) => void
) => {
    switch (ability) {
        case "deletio":
            handleDeletio(view);
            break;
        case "syntaxio":
            handleSyntaxio(view, exts, langExt, langComp, lang, setExts);
            break;
        case "lightio":
            handleLightio(view, themeComp);
            break;
        case "hugio":
            handleSizeChange(view, fontSizeComp, 2);
            break;
        case "smallio":
            handleSizeChange(view, fontSizeComp, 0.5);
            break;
        case "freezio":
            setReadonly(true);
            setClass("opacity-50");
            setTimeout(() => {
                setReadonly(false);
                setClass("opacity-100");
            }, 15000);
            break;
        case "rickrollio":
            setRickroll(true);
            setClass("opacity-50");
            setTimeout(() => {
                setRickroll(false);
                setClass("opacity-100");
            }, 62000);
    }
};

export const handleDeletio = (view: EditorView) => {
    // Delete a random line of my code
    const doc = view.state.doc;
    const lineCount = doc.lines;

    if (lineCount === 0) return;
    if (doc.toString().trim() === "") return;
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

const handleSyntaxio = (
    view: EditorView,
    exts: any[],
    langExt: any,
    langComp: Compartment,
    currentLang: Languages,
    setExts: (exts: any[]) => void,
    time = 30000
) => {
    const originalExts = [...exts];
    const newExts = exts.filter((ext) => ext !== langExt);
    setExts(newExts);

    setTimeout(() => {
        if (!view) throw new Error("Editor view not linked");
        setExts(originalExts);
        view.dispatch({
            effects: langComp.reconfigure(LanguageConfig[currentLang].support())
        });
    }, time);
};

const handleLightio = (view: EditorView, themeComp: Compartment, time = 30000) => {
    view.dispatch({
        effects: themeComp.reconfigure(LightTheme)
    });

    setTimeout(() => {
        view.dispatch({
            effects: themeComp.reconfigure(DefaultTheme)
        });
    }, time);
};

const handleSizeChange = (
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
