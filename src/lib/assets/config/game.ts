import {
    MatchDecorator,
    Decoration,
    ViewPlugin,
    ViewUpdate,
    type EditorView,
    type DecorationSet
} from "@codemirror/view";
import { Prec } from "@codemirror/state";
import { O_1, OLogn, ON, ONLogn, ONSquared, O_2n, ONFac } from "$assets/images/ranks";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";

export const Ranks = [
    {
        name: "O(n!)",
        rating: 0,
        nextRating: 100,
        class: "bg-gradient-to-br from-neutral-700 to-neutral-600",
        badge: ONFac
    },
    {
        name: "O(2^n)",
        rating: 100,
        nextRating: 200,
        class: "bg-gradient-to-br from-green-400 to-green-300 text-green-950",
        badge: O_2n
    },
    {
        name: "O(n²)",
        rating: 200,
        nextRating: 500,
        class: "bg-gradient-to-br from-blue-600 to-blue-500",
        badge: ONSquared
    },
    {
        name: "O(nlog(n))",
        rating: 500,
        nextRating: 1200,
        class: "bg-gradient-to-br from-purple-500 to-purple-400",
        badge: ONLogn
    },
    {
        name: "O(n)",
        rating: 1200,
        nextRating: 1600,
        class: "bg-gradient-to-br from-yellow-300 to-yellow-200 text-amber-800",
        badge: ON
    },
    {
        name: "O(log(n))",
        rating: 1600,
        nextRating: 2400,
        class: "bg-gradient-to-br from-orange-800 to-orange-700",
        badge: OLogn
    },
    {
        name: "O(1)",
        rating: 2400,
        nextRating: 10000,
        class: "bg-gradient-to-br from-slate-200 to-slate-400 text-slate-950",
        badge: O_1
    }
];

export const Abilities = [
    {
        name: "healio",
        desc: "Heal your HP by 20",
        class: "bg-green-300 text-green-950 rounded-[1px] px-px font-bold",
        sp: 10,
        mp: 20
    },
    {
        name: "freezio",
        desc: "Freeze your opponent's editor. They can't code for 15 seconds",
        class: "bg-blue-300 text-blue-700 rounded-[1px] px-px font-bold",
        sp: 10,
        mp: 10
    },
    {
        name: "deletio",
        desc: "Delete a random line of your opponent's code",
        class: "bg-rose text-rose-foreground rounded-[1px] px-px font-bold",
        sp: 10,
        mp: 5
    },
    {
        name: "syntaxio",
        desc: "Turn off your opponent's syntax highlighting for 30 seconds",
        class: "bg-slate-900 text-green-400 rounded-[1px] px-px font-bold",
        sp: 10,
        mp: 5
    },
    {
        name: "lightio",
        desc: "Turn your opponent's editor to light mode for 30 seconds",
        class: "bg-neutral-100 text-amber-600 rounded-[1px] px-px font-bold",
        sp: 10,
        mp: 5
    },
    {
        name: "hugio",
        desc: "Make your opponent's code 2 times bigger for 30 seconds",
        class: "bg-pale-gold text-navy-blue rounded-[1px] px-px font-bold",
        sp: 10,
        mp: 5
    },
    {
        name: "smallio",
        desc: "Make your opponent's code 2 times smaller for 30 seconds",
        class: "bg-navy-blue text-pale-gold rounded-[1px] px-px font-bold",
        sp: 10,
        mp: 5
    },
    {
        name: "rickrollio",
        desc: 'Force your opponent to watch "Never Gonna Give You Up" for 60 seconds',
        class: "bg-gradient-to-r from-orange-200 to-blue-200 text-amber-700 rounded-[1px] px-px font-bold",
        sp: 20,
        mp: 30
    }
];

export const AbilitiesDecorators = Abilities.map((ability) => {
    const regexp = new RegExp(`\\b${ability.name}\\b`, "g");
    const decoration = Decoration.mark({
        class: `ability ${ability.class}`,
        tagName: "span",
        attributes: { title: ability.desc }
    });
    return new MatchDecorator({ regexp, decoration });
});

export const AbilitiesHighlighters = AbilitiesDecorators.map((decorator) =>
    Prec.highest(
        ViewPlugin.fromClass(
            class {
                decorations: DecorationSet;

                constructor(view: EditorView) {
                    this.decorations = decorator.createDeco(view);
                }
                update(update: ViewUpdate) {
                    this.decorations = decorator.updateDeco(update, this.decorations);
                }
            },
            {
                decorations: (v) => v.decorations
            }
        )
    )
);

export const DifficultiesStyle = {
    easy: "text-green-400",
    medium: "text-amber-400",
    hard: "text-red-400"
};

export const LanguageConfig = {
    python: {
        name: "Python",
        support: python
    },
    java: {
        name: "Java",
        support: java
    },
    cpp: {
        name: "C++",
        support: cpp
    }
};
