export const Ratings = [
    { name: "O(n!)", class: "bg-gradient-to-br from-neutral-700 to-neutral-600" },
    { name: "O(2^n)", class: "bg-gradient-to-br from-green-400 to-green-300 text-green-950" },
    { name: "O(n²)", class: "bg-gradient-to-br from-blue-600 to-blue-500" },
    { name: "O(nlog(n))", class: "bg-gradient-to-br from-purple-500 to-purple-400" },
    { name: "O(n)", class: "bg-gradient-to-br from-yellow-300 to-yellow-200 text-amber-800" },
    { name: "O(log(n))", class: "bg-gradient-to-br from-orange-800 to-orange-700" },
    { name: "O(1)", class: "bg-gradient-to-br from-slate-200 to-slate-400 text-slate-950" }
];

export const Abilities = [
    { name: "healio", desc: "Heal your HP by 20", class: "bg-green-300 text-green-950" },
    {
        name: "deletio",
        desc: "Delete a random line of your opponent's code",
        class: "bg-rose text-rose-foreground"
    },
    {
        name: "syntaxio",
        desc: "Turn off your opponent's syntax highlighting for 30 seconds",
        class: "bg-slate-900 text-green-400"
    },
    {
        name: "lightio",
        desc: "Turn your opponent's editor to light mode for 30 seconds",
        class: "bg-neutral-100 text-amber-600"
    }
];
