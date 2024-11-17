import { basicSetup, EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { indentUnit, type LanguageSupport } from "@codemirror/language";
import { python } from "@codemirror/lang-python";
import { keymap } from "@codemirror/view";

import { DefaultTheme } from "./themes/default";

export class EditorData {
    #view: EditorView | null = null;
    #lang: LanguageSupport = python();
    #tabSize: number = 4;
    #exts = [
        basicSetup,
        DefaultTheme,
        this.#lang,
        indentUnit.of(" ".repeat(this.#tabSize)),
        keymap.of([])
    ];
    #state: EditorState = EditorState.create({ extensions: this.#exts });

    #setup() {
        if (!this.#view) throw new Error("Editor view not linked");
        this.#view.setState(this.#state);
    }

    link(view: EditorView) {
        this.#view = view;
        this.#setup();
    }

    getCode() {
        if (!this.#view) throw new Error("Editor view not linked");
        return this.#view.state.doc.toString();
    }

    setCode(code: string) {
        if (!this.#view) throw new Error("Editor view not linked");
        this.#state = EditorState.create({
            doc: code,
            extensions: this.#exts
        });
        this.#view.setState(this.#state);
    }
}
