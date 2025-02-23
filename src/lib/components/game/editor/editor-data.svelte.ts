import { basicSetup, EditorView } from "codemirror";
import { Compartment, EditorState, StateEffect, Prec, type Extension } from "@codemirror/state";
import { acceptCompletion } from "@codemirror/autocomplete";
import { indentWithTab } from "@codemirror/commands";
import { lintGutter, setDiagnostics, type Diagnostic } from "@codemirror/lint";
import { indentUnit } from "@codemirror/language";
import { keymap } from "@codemirror/view";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import { vim } from "@replit/codemirror-vim";

import { DefaultTheme } from "./themes";
import { processAbility } from "./abilities";
import { Abilities, AbilitiesHighlighters, LanguageConfig } from "$assets/config/game";
import type { Languages } from "$lib/models/game";

const fontSizeComp = new Compartment();
const langComp = new Compartment();
const readonlyComp = new Compartment();
const classComp = new Compartment();
const themeComp = new Compartment();
const bindingComp = new Compartment();

export class EditorData {
    #view: EditorView | null = null;
    #lang: Languages = "python";
    #langExt: Extension = langComp.of(LanguageConfig[this.#lang].support());
    #tabSize: number = 4;
    #useAbility: (ability: string) => void = (ability: string) => ability !== "";
    #defaultExts = [
        basicSetup,
        bindingComp.of([]),
        this.#langExt,
        indentUnit.of(" ".repeat(this.#tabSize)),
        indentationMarkers(),
        lintGutter(),
        fontSizeComp.of([]),
        readonlyComp.of([]),
        themeComp.of(DefaultTheme),
        keymap.of([{ key: "Tab", run: acceptCompletion }, indentWithTab]),
        classComp.of([]),
        EditorView.lineWrapping,
        EditorView.theme({
            "&": {
                transition: "font-size 300ms ease-in-out"
            },
            "&.cm-focused": {
                outline: "none"
            }
        }),
        EditorView.editorAttributes.of({
            spellcheck: "false",
            "data-enable-grammarly": "false"
        }),
        EditorView.updateListener.of((update) => {
            if (update.docChanged) {
                localStorage.setItem(`${this.#lang}CachedCode`, update.state.doc.toString());
            }
        }),
        ...AbilitiesHighlighters,
        Prec.highest(
            // For using abilities
            keymap.of([
                {
                    key: "Enter",
                    run: (view: EditorView) => {
                        const state = view.state;
                        const content = state.doc.toString();
                        for (const ability of Abilities) {
                            if (content.includes(ability.name)) {
                                console.log(ability.name);
                                this.#useAbility(ability.name);

                                // Remove the word from editor
                                const start = content.indexOf(ability.name);
                                const end = start + ability.name.length;
                                view.dispatch({
                                    changes: {
                                        from: start,
                                        to: end,
                                        insert: ""
                                    }
                                });

                                return true;
                            }
                        }
                        return false;
                    }
                }
            ])
        )
    ];
    #exts = this.#defaultExts;
    #state: EditorState = EditorState.create({ extensions: this.#exts });
    setRickroll = (on: boolean) => console.log(`Got rickrolled: ${on}`);

    #setup() {
        if (!this.#view) throw new Error("Editor view not linked");
        this.#lang = "python";
        this.#view.setState(this.#state);
        this.setLang(this.#lang);
    }

    link(view: EditorView, useAbility: (ability: string) => void) {
        this.#view = view;
        this.#useAbility = useAbility;
        this.#setup();
    }

    getCode() {
        if (!this.#view) throw new Error("Editor view not linked");
        return this.#view.state.doc.toString();
    }

    setCode(code: string, title: string, force?: boolean) {
        if (!this.#view) throw new Error("Editor view not linked");
        const cachedCode = localStorage.getItem(`${this.#lang}CachedCode`) || "";
        const cachedTitle = localStorage.getItem("cachedTitle") || "";
        this.#state = EditorState.create({
            doc: !force && title === cachedTitle && cachedCode.trim() !== "" ? cachedCode : code,
            extensions: this.#exts
        });
        if (title !== cachedTitle) {
            localStorage.setItem("cachedTitle", title);
        }
        this.#view.setState(this.#state);
        this.#view.dispatch({
            effects: langComp.reconfigure(LanguageConfig[this.#lang].support())
        });
    }

    processError(error: string, lineOffset: number) {
        if (!this.#view) return;

        const matchError = (error: string): number | null => {
            let match: RegExpMatchArray | null;
            if (this.#lang === "python") {
                match = error.match(/line\s+(\d+)/);
            } else if (this.#lang === "java") {
                match = error.match(/\.java:(\d+):/);
            } else if (this.#lang === "cpp") {
                match = error.match(/(\d+)\s*\|/);
            } else {
                match = error.match(/line\s+(\d+)/);
            }
            return match ? +match[1] : null;
        };

        let lineNum = matchError(error);
        if (!lineNum) return;

        lineNum -= lineOffset;
        const docLines = this.#view.state.doc.lines;
        if (lineNum < 1) lineNum = 1;
        if (lineNum > docLines) lineNum = docLines;

        let lineInfo = this.#view.state.doc.line(lineNum);
        if (!lineInfo) return;
        let from = lineInfo.from;
        let to = lineInfo.to;

        if (error.toLowerCase().includes("traceback")) {
            const lineMatches = [...error.matchAll(/line\s+(\d+)/g)];
            if (lineMatches.length > 0) {
                const lastMatch = lineMatches[lineMatches.length - 1];
                lineNum = +lastMatch[1] - lineOffset;
                if (lineNum < 1) lineNum = 1;
                if (lineNum > docLines) lineNum = docLines;
                lineInfo = this.#view.state.doc.line(lineNum);

                from = lineInfo.from;
                to = lineInfo.to;
            }
        }

        const diagnostics: Diagnostic[] = [
            {
                from,
                to,
                severity: "error",
                message: error
            }
        ];

        this.#view.dispatch(setDiagnostics(this.#view.state, diagnostics));
    }

    resetEditor() {
        if (!this.#view) return;
        this.setExts(this.#defaultExts);
    }

    resetError() {
        if (!this.#view) return;
        this.#view.dispatch(setDiagnostics(this.#view.state, []));
    }

    setExts(exts: Extension[]) {
        if (!this.#view) throw new Error("Editor view not linked");
        this.#exts = exts;
        this.#view.dispatch({
            effects: StateEffect.reconfigure.of(exts)
        });
    }

    setLang(lang: Languages) {
        if (!this.#view) throw new Error("Editor view not linked");
        this.#lang = lang;
        this.setCode("", localStorage.getItem("cachedTitle") || "");
    }

    setClass(classNames: string) {
        if (!this.#view) return;
        this.#view.dispatch({
            effects: classComp.reconfigure(
                EditorView.editorAttributes.of({
                    class: classNames
                })
            )
        });
    }

    setVim(enabled: boolean) {
        if (!this.#view) return;
        this.#view.dispatch({
            effects: bindingComp.reconfigure(enabled ? vim() : [])
        });
    }

    setReadonly(isReadonly: boolean) {
        if (!this.#view) return;
        this.#view.dispatch({
            effects: readonlyComp.reconfigure(EditorState.readOnly.of(isReadonly))
        });
    }

    triggerAbility(ability: string) {
        if (!this.#view) throw new Error("Editor view not linked");
        processAbility(
            ability,
            this.#view,
            this.#exts,
            this.#lang,
            this.#langExt,
            langComp,
            themeComp,
            fontSizeComp,
            this.setExts.bind(this),
            this.setClass.bind(this),
            this.setReadonly.bind(this),
            this.setRickroll.bind(this)
        );
    }
}
