import { basicSetup, EditorView } from "codemirror";
import { EditorState, StateEffect, Prec } from "@codemirror/state";
import { acceptCompletion } from "@codemirror/autocomplete";
import { indentWithTab } from "@codemirror/commands";
import { indentUnit, type LanguageSupport } from "@codemirror/language";
import { python } from "@codemirror/lang-python";
import { keymap } from "@codemirror/view";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";

import { DefaultTheme, LightTheme } from "./themes";
import { Abilities, AbilitiesHighlighters } from "$assets/config/game";

export class EditorData {
    #view: EditorView | null = null;
    #lang: LanguageSupport = python();
    #tabSize: number = 4;
    #useAbility: (ability: string) => void = (ability: string) => ability !== "";
    #exts = [
        basicSetup,
        DefaultTheme,
        this.#lang,
        indentUnit.of(" ".repeat(this.#tabSize)),
        indentationMarkers(),
        keymap.of([{ key: "Tab", run: acceptCompletion }, indentWithTab]),
        EditorView.lineWrapping,
        EditorView.theme({
            "&.cm-focused": {
                outline: "none",
            },
        }),
        EditorView.editorAttributes.of({
            "spellcheck": "false",
            "data-enable-grammarly": "false"
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
    #state: EditorState = EditorState.create({ extensions: this.#exts });

    #setup() {
        if (!this.#view) throw new Error("Editor view not linked");
        this.#view.setState(this.#state);
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

    setCode(code: string) {
        if (!this.#view) throw new Error("Editor view not linked");
        this.#state = EditorState.create({
            doc: code,
            extensions: this.#exts
        });
        this.#view.setState(this.#state);
    }

    triggerAbility(ability: string) {
        if (!this.#view) throw new Error("Editor view not linked");
        if (ability === "deletio") {
            // Delete a random line of my code
            const doc = this.#view.state.doc;
            const lineCount = doc.lines;

            if (lineCount === 0) return;

            const randomLine = Math.floor(Math.random() * lineCount) + 1;
            const linePos = doc.line(randomLine);
            this.#view.dispatch({
                changes: { from: linePos.from, to: linePos.to }
            });
        } else if (ability === "syntaxio") {
            // Turn off syntax highlighting for 30 seconds
            const originalExts = this.#exts;
            this.#exts = this.#exts.filter((ext) => ext !== this.#lang);
            this.#view.dispatch({
                effects: StateEffect.reconfigure.of(this.#exts)
            });
            setTimeout(() => {
                this.#exts = originalExts;
                this.#view?.dispatch({
                    effects: StateEffect.reconfigure.of(this.#exts)
                });
            }, 30000);
        } else if (ability === "lightio") {
            // Turn editor to light mode for 30 seconds
            this.#exts = this.#exts.filter((ext) => ext !== DefaultTheme);
            this.#exts.push(LightTheme);
            this.#view.dispatch({
                effects: StateEffect.reconfigure.of(this.#exts)
            });
            setTimeout(() => {
                this.#exts = this.#exts.filter((ext) => ext !== LightTheme);
                this.#exts.push(DefaultTheme);
                this.#view?.dispatch({
                    effects: StateEffect.reconfigure.of(this.#exts)
                });
            }, 30000);
        }
    }
}
