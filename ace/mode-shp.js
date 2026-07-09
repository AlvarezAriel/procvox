// Ace syntax-highlighting mode for the .shp shape grammar.
// Tracks the lexer/parser in src/shp/ and the modifier/terminal/builtin
// dispatch tables in src/shp/interpreter.odin and src/shp/eval.odin.
// The autocomplete symbol table lives in shp_completions.js; keep both
// in sync when ops/builtins change.

ace.define("ace/mode/shp_highlight_rules",
    ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"],
    function(require, exports, module) {
        "use strict";
        var oop = require("../lib/oop");
        var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

        var ShpHighlightRules = function() {
            // Built-in identifier sets; keep in sync with src/shp/ if
            // new names are added.

            // Top-level structural keywords.
            var keywords =
                "param|const|else";

            // Built-in expression functions (eval.odin).
            var builtinFns =
                "sin|cos|tan|asin|acos|atan|sqrt|abs|floor|ceil|round|log|exp|" +
                "sign|deg2rad|rad2deg|atan2|pow|min|max|mod|clamp|lerp|" +
                "rand|rand_int|rand_range|noise_2d|noise_3d|pick";

            // Predeclared scope getters available inside any rule body.
            var scopeVars =
                "index|depth|sx|sy|sz|px|py|pz";

            var keywordMapper = this.createKeywordMapper({
                "keyword.control":    keywords,
                "support.function":   builtinFns,
                "support.constant":   scopeVars,
            }, "identifier", false);

            this.$rules = {
                "start": [
                    // Comments. `//` to end of line; `/* */` may span
                    // lines (the lexer does not support nested block
                    // comments and we don't either).
                    {token: "comment.line",  regex: "\\/\\/.*$"},
                    {token: "comment.block", regex: "\\/\\*", next: "block_comment"},

                    // String literal. The shp lexer doesn't recognise
                    // escape sequences and forbids embedded newlines, so
                    // a single-line match is faithful.
                    {token: "string", regex: '"[^"\\n]*"'},
                    {token: "string.invalid", regex: '"[^"\\n]*$'},

                    // Number: integer or decimal. No exponent or hex
                    // in the shp lexer.
                    {token: "constant.numeric", regex: "\\b\\d+(?:\\.\\d+)?\\b"},
                    {token: "constant.numeric", regex: "\\.\\d+\\b"},

                    // `@modifier_name` (and `@import`): sigil + name as
                    // one token so the user sees them as a single visual
                    // unit. Styled by .ace_shp-modifier in index.html.
                    {
                        token: "shp-modifier",
                        regex: "@[A-Za-z_][A-Za-z0-9_]*",
                    },

                    // `$terminal_name`: same single-token approach,
                    // distinct color via .ace_shp-terminal.
                    {
                        token: "shp-terminal",
                        regex: "\\$[A-Za-z_][A-Za-z0-9_]*",
                    },

                    // `\layout_name`: subdivision/composition ops (\split,
                    // \repeat, ...). Distinct color via .ace_shp-layout.
                    {
                        token: "shp-layout",
                        regex: "\\\\[A-Za-z_][A-Za-z0-9_]*",
                    },

                    // `::` rule-variant separator. Match before `:`.
                    {token: "keyword.operator", regex: "::"},

                    // Rule names: any CamelCase identifier. The parser
                    // treats a leading-uppercase ident as a rule
                    // reference, so we tag the same shape here.
                    {token: "entity.name.function", regex: "\\b[A-Z][A-Za-z0-9_]*\\b"},

                    // Operators, longest first.
                    {token: "keyword.operator", regex: "==|!=|<=|>=|&&|\\|\\|"},
                    {token: "keyword.operator", regex: "[+\\-*/%<>!=?]"},

                    // Braces / parens / brackets.
                    {token: "paren.lparen", regex: "[\\[({]"},
                    {token: "paren.rparen", regex: "[\\])}]"},

                    // Comma, semicolon, single colon.
                    {token: "punctuation.operator", regex: "[,;:]"},

                    // Remaining idents through the keyword mapper.
                    {token: keywordMapper, regex: "[A-Za-z_][A-Za-z0-9_]*"},
                ],

                "block_comment": [
                    {token: "comment.block", regex: "\\*\\/", next: "start"},
                    {defaultToken: "comment.block"},
                ],
            };
            this.normalizeRules();
        };

        oop.inherits(ShpHighlightRules, TextHighlightRules);
        exports.ShpHighlightRules = ShpHighlightRules;
    });

ace.define("ace/mode/shp",
    ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/shp_highlight_rules"],
    function(require, exports, module) {
        "use strict";
        var oop = require("../lib/oop");
        var TextMode = require("./text").Mode;
        var ShpHighlightRules = require("./shp_highlight_rules").ShpHighlightRules;

        var Mode = function() {
            this.HighlightRules = ShpHighlightRules;
            this.$behaviour = this.$defaultBehaviour;
        };
        oop.inherits(Mode, TextMode);

        (function() {
            this.lineCommentStart = "//";
            this.blockComment = {start: "/*", end: "*/"};
            this.$id = "ace/mode/shp";
        }).call(Mode.prototype);

        exports.Mode = Mode;
    });

(function() {
    ace.require(["ace/mode/shp"], function(m) {
        if (typeof module == "object" && typeof exports == "object" && module) {
            module.exports = m;
        }
    });
})();
