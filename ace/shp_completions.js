// Autocomplete symbol table + completers for the .shp shape grammar.
// Loaded after ace/ext-language_tools.js; index.html installs
// window.shpCompleters on the editor.
//
// The signatures here mirror the interpreter's binding tables; keep in
// sync with:
//   src/shp/interpreter.odin  (OP_PARAMS_* + execute_terminal/modifier/layout)
//   src/shp/eval.odin         (BUILTIN_SIGS + scope getters in resolve_ident)
// Parameter names matter: every op accepts named arguments using exactly
// these names (`@size(x: 1)`, `\repeat(axis: 0, size: 40, rule: Bay)`).
// A trailing "?" marks an optional parameter, "..." a variadic tail.
(function () {
	"use strict";

	// --- terminals ($) --------------------------------------------------
	var TERMINALS = [
		["cube",     ["density?"], "Solid box filling the scope.",
			[["density", "voxel fill density in [0, 1]; default 1. Material comes from @color."]]],
		["prism",    ["density?"], "Triangular prism filling the scope.",
			[["density", "voxel fill density in [0, 1]; default 1."]]],
		["quad",     ["density?"], "Flat tile (zero-thickness plane); what \\comp_box_faces children stamp.",
			[["density", "voxel fill density in [0, 1]; default 1."]]],
		["sphere",   ["density?"], "Ellipsoid inscribed in the scope.",
			[["density", "voxel fill density in [0, 1]; default 1."]]],
		["cylinder", ["density?"], "Cylinder inscribed in the scope.",
			[["density", "voxel fill density in [0, 1]; default 1."]]],
		["cone",     ["density?"], "Cone inscribed in the scope.",
			[["density", "voxel fill density in [0, 1]; default 1."]]],
		["roof_pyramid", ["height", "density?"], "Pyramid roof over the scope footprint (sets scope height).",
			[["height", "roof height in world units"],
			 ["density", "voxel fill density in [0, 1]; default 1."]]],
		["roof_hip", ["angle", "density?"], "Hip roof; height derives from the shorter footprint side.",
			[["angle", "roof pitch in degrees (clamped 1-89)"],
			 ["density", "voxel fill density in [0, 1]; default 1."]]],
		["roof_shed", ["angle", "density?"], "Shed (single-slope) roof rising along Z.",
			[["angle", "roof pitch in degrees (clamped 1-89)"],
			 ["density", "voxel fill density in [0, 1]; default 1."]]],
		["vox", ["name"], "Stamp a preloaded .vox asset into the scope (see the Vox tab).",
			[["name", "asset name string, e.g. \"tree\""]]],
	];

	// --- modifiers (@) --------------------------------------------------
	var AXIS_1 = function (family, axis, doc) {
		return [family + "_" + axis, [axis], doc, [[axis, "value for the " + axis.toUpperCase() + " axis"]]];
	};
	var MODIFIERS = [
		["size", ["x?", "y?", "z?"], "Set scope dimensions. Unset axes keep their current size.",
			[["x", "new X size"], ["y", "new Y size"], ["z", "new Z size"]]],
		AXIS_1("size", "x", "Set the scope's X size."),
		AXIS_1("size", "y", "Set the scope's Y size."),
		AXIS_1("size", "z", "Set the scope's Z size."),
		["translate", ["x?", "y?", "z?"], "Move the scope in its local space. Unset axes default to 0.",
			[["x", "X offset"], ["y", "Y offset"], ["z", "Z offset"]]],
		AXIS_1("translate", "x", "Move the scope along local X."),
		AXIS_1("translate", "y", "Move the scope along local Y."),
		AXIS_1("translate", "z", "Move the scope along local Z."),
		["rotate", ["x?", "y?", "z?"], "Rotate around the local axes (degrees), applied X → Y → Z. Unset axes don't rotate.",
			[["x", "degrees around X"], ["y", "degrees around Y"], ["z", "degrees around Z"]]],
		["rotate_x", ["degrees"], "Rotate around local X (degrees).", [["degrees", "rotation angle"]]],
		["rotate_y", ["degrees"], "Rotate around local Y (degrees).", [["degrees", "rotation angle"]]],
		["rotate_z", ["degrees"], "Rotate around local Z (degrees).", [["degrees", "rotation angle"]]],
		["scale", ["x?", "y?", "z?"], "Multiply the scope size per axis. Unset axes default to 1.",
			[["x", "X factor"], ["y", "Y factor"], ["z", "Z factor"]]],
		AXIS_1("scale", "x", "Multiply the scope's X size."),
		AXIS_1("scale", "y", "Multiply the scope's Y size."),
		AXIS_1("scale", "z", "Multiply the scope's Z size."),
		["scale_center", ["x?", "y?", "z?"], "Scale about the scope center (position shifts to keep the center fixed). Unset axes default to 1.",
			[["x", "X factor"], ["y", "Y factor"], ["z", "Z factor"]]],
		AXIS_1("scale_center", "x", "Scale X about the scope center."),
		AXIS_1("scale_center", "y", "Scale Y about the scope center."),
		AXIS_1("scale_center", "z", "Scale Z about the scope center."),
		["scale_uniform", ["factor"], "Multiply all three scope dimensions by one factor.",
			[["factor", "uniform scale factor"]]],
		["extrude", ["axis", "amount"], "Grow the scope along an axis.",
			[["axis", "0 = X, 1 = Y, 2 = Z"], ["amount", "units to grow by"]]],
		["extrude_x", ["amount"], "Grow the scope along X.", [["amount", "units to grow by"]]],
		["extrude_y", ["amount"], "Grow the scope along Y.", [["amount", "units to grow by"]]],
		["extrude_z", ["amount"], "Grow the scope along Z.", [["amount", "units to grow by"]]],
		["color", ["index"], "Set the material palette index used by following terminals (Materials tab).",
			[["index", "palette slot 0-255; use pick(...) for a random choice"]]],
		["set_palette", ["index"], "Alias of @color.",
			[["index", "palette slot 0-255"]]],
		["set", ["name", "value"], "Set a named attribute on this shape; children inherit it and read it as a bare identifier.",
			[["name", "attribute name: bare identifier or string literal (taken literally)"],
			 ["value", "numeric value"]]],
		["hide", [], "Mark the shape invisible (it still expands children).", []],
		["show", [], "Mark the shape visible again.", []],
		["discard", [], "Drop the shape: no geometry, no children.", []],
		["trim_plane", ["nx", "ny", "nz", "distance"], "Add a scope-local clipping plane; voxels beyond it are trimmed.",
			[["nx", "plane normal X"], ["ny", "plane normal Y"], ["nz", "plane normal Z"],
			 ["distance", "plane distance along the normal"]]],
		["camera", ["x?", "y?", "z?", "yaw?", "pitch?", "fov?"], "Scene-global camera override (not a shape transform). Only the fields you pass are applied; the rest keep the host's auto-framing.",
			[["x", "camera X position"], ["y", "camera Y position"], ["z", "camera Z position"],
			 ["yaw", "degrees; 0 looks toward +Z"], ["pitch", "degrees; negative looks down"],
			 ["fov", "vertical field of view, degrees"]]],
		["print", ["values..."], "Print values without a newline. A named arg prints as name=value.", []],
		["println", ["values..."], "Log values to the console/log panel. A named arg prints as name=value.", []],
		["import", ["\"path\""], "Top level only: inline another grammar file (`@import \"lib.shp\"`) or enable a native module (`@import \"presets\"`).", []],
	];

	// --- layout ops (\) --------------------------------------------------
	var LAYOUTS = [
		["split", ["axis", "slots..."], "Subdivide the scope along an axis into \\s / \\f slots.",
			[["axis", "0 = X, 1 = Y, 2 = Z"],
			 ["slots", "one or more \\s(value, rule) / \\f(value, rule) constructors"]]],
		["split_x", ["slots..."], "Subdivide along X into \\s / \\f slots.", []],
		["split_y", ["slots..."], "Subdivide along Y into \\s / \\f slots.", []],
		["split_z", ["slots..."], "Subdivide along Z into \\s / \\f slots.", []],
		["s", ["value", "rule"], "Stretch slot for \\split: takes a `value`-weighted share of the space left after fixed slots.",
			[["value", "relative weight"], ["rule", "rule name, Rule(args), or { ... } block"]]],
		["f", ["value", "rule"], "Fixed slot for \\split: exactly `value` units.",
			[["value", "size in units"], ["rule", "rule name, Rule(args), or { ... } block"]]],
		["repeat", ["axis", "size", "rule"], "Tile the scope into `size`-sized segments along an axis.",
			[["axis", "0 = X, 1 = Y, 2 = Z"], ["size", "segment size"],
			 ["rule", "rule name, Rule(args), or { ... } block"]]],
		["repeat_x", ["size", "rule"], "Tile the scope along X.",
			[["size", "segment size"], ["rule", "rule for each segment"]]],
		["repeat_y", ["size", "rule"], "Tile the scope along Y.",
			[["size", "segment size"], ["rule", "rule for each segment"]]],
		["repeat_z", ["size", "rule"], "Tile the scope along Z.",
			[["size", "segment size"], ["rule", "rule for each segment"]]],
		["comp_box_faces", ["face: Rule, ..."], "Spawn a flat tile per box face. Named form: \\comp_box_faces(top: Roof, vertical: Wall). Pair form: (\"top\", Roof, \"front\", Wall).",
			[["face", "PosX/NegX/PosY/NegY/PosZ/NegZ or top/bottom/front/back/left/right; `vertical` = the four side faces"]]],
		["split_face", ["face: Rule, ..."], "Alias of \\comp_box_faces.", []],
		["distribute_voronoi_xz", ["count", "rules..."], "Scatter children over the XZ footprint as relaxed Voronoi cells; each child gets its cell's AABB.",
			[["count", "number of cells"], ["rules", "one or more rules, picked uniformly per cell"]]],
		["distribute_poisson_xz", ["min_r", "edge_falloff", "cell_size", "rules..."], "Poisson-disk scatter over the XZ footprint.",
			[["min_r", "minimum distance between points"],
			 ["edge_falloff", "density falloff toward the footprint edge"],
			 ["cell_size", "size of each spawned child's footprint"],
			 ["rules", "one or more rules, picked uniformly per point"]]],
	];

	// --- presets (need @import "presets"; called like rules) -------------
	var PRESETS = [
		["Grass", ["top?", "bottom?", "flowerMaterials?"], "Noise-driven grass plain over the scope footprint (needs @import \"presets\"). Blades are two-tone: the bottom colour fills the lower half, the top colour the upper half.",
			[["top", "material index for the blade tips; default MAT_GRASS_TOP (vibrant, slightly darker)"],
			 ["bottom", "material index for the blade base; default MAT_GRASS_BOTTOM (brighter, desaturated)"],
			 ["flowerMaterials", "material list for the flower accents, e.g. [MAT_FLOWER_RED]"]]],
		["Crater", [], "Crater terrain over the scope footprint (needs @import \"presets\").", []],
		["Mountain", [], "Rock mountain over the scope footprint (needs @import \"presets\").", []],
	];

	// --- builtin functions (mirrors BUILTIN_SIGS in eval.odin) -----------
	var BUILTINS = [
		["sin",  ["x"], "Sine (radians; use deg2rad for degrees)."],
		["cos",  ["x"], "Cosine (radians)."],
		["tan",  ["x"], "Tangent (radians)."],
		["asin", ["x"], "Arcsine → radians."],
		["acos", ["x"], "Arccosine → radians."],
		["atan", ["x"], "Arctangent → radians."],
		["sqrt", ["x"], "Square root."],
		["abs",  ["x"], "Absolute value."],
		["floor", ["x"], "Round down."],
		["ceil",  ["x"], "Round up."],
		["round", ["x"], "Round to nearest."],
		["log",  ["x"], "Natural logarithm."],
		["exp",  ["x"], "e^x."],
		["sign", ["x"], "-1, 0, or 1."],
		["deg2rad", ["degrees"], "Degrees → radians."],
		["rad2deg", ["radians"], "Radians → degrees."],
		["atan2", ["y", "x"], "Angle of (x, y) → radians."],
		["pow",  ["base", "exponent"], "base^exponent."],
		["min",  ["a", "b"], "Smaller of two values."],
		["max",  ["a", "b"], "Larger of two values."],
		["mod",  ["a", "b"], "Floating-point remainder of a / b."],
		["clamp", ["x", "lo", "hi"], "Clamp x into [lo, hi]."],
		["lerp",  ["a", "b", "t"], "Linear interpolation a + (b - a) * t."],
		["rand", [], "Uniform random in [0, 1). Re-rolls per rule expansion."],
		["rand_int", ["n"], "Uniform random integer in 0 .. n-1."],
		["rand_range", ["lo", "hi"], "Uniform random in [lo, hi)."],
		["noise_2d", ["x", "y", "seed?"], "2D simplex noise in [-1, 1]."],
		["noise_3d", ["x", "y", "z", "seed?"], "3D simplex noise in [-1, 1]."],
		["pick", ["a", "b", "..."], "Pick one argument uniformly at random; the other branches aren't evaluated. Positional only."],
	];

	// --- scope getters + keywords ----------------------------------------
	var SCOPE_VARS = [
		["index", "Sibling index of this shape (slot / segment number from the spawning layout op)."],
		["depth", "Derivation depth of this shape (axiom = 0)."],
		["sx", "Scope size along X."],
		["sy", "Scope size along Y."],
		["sz", "Scope size along Z."],
		["px", "Scope position X."],
		["py", "Scope position Y."],
		["pz", "Scope position Z."],
	];
	var KEYWORDS = [
		["const",  "const NAME = expr: fixed named value, evaluated at parse time."],
		["param",  "param NAME = expr: like const, but the host can override it (UI sliders, presets)."],
		["random", "random { { ... } { ... } }: run one nested block, picked uniformly."],
		["else",   ":: else { ... }: always-matching guard variant (place it last)."],
	];
	var FACES = [
		"top", "bottom", "front", "back", "left", "right", "vertical",
		"PosX", "NegX", "PosY", "NegY", "PosZ", "NegZ",
	];

	function esc(s) {
		return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}

	function docHTML(display, params, doc, argDocs) {
		var sig = params && params.length ? display + "(" + params.join(", ") + ")" : display;
		var html = "<b>" + esc(sig) + "</b><hr>" + esc(doc);
		if (argDocs && argDocs.length) {
			html += "<ul style='margin:4px 0 0;padding-left:16px'>";
			for (var i = 0; i < argDocs.length; i++) {
				html += "<li><b>" + esc(argDocs[i][0]) + "</b>: " + esc(argDocs[i][1]) + "</li>";
			}
			html += "</ul>";
		}
		return html;
	}

	var completions = [];
	function addAll(list, sigil, meta, score) {
		for (var i = 0; i < list.length; i++) {
			var name = list[i][0], params = list[i][1], doc = list[i][2], argDocs = list[i][3];
			completions.push({
				value:   sigil + name,
				caption: sigil + name,
				meta:    meta,
				score:   score,
				docHTML: docHTML(sigil + name, params, doc, argDocs),
			});
		}
	}
	addAll(TERMINALS, "$",  "terminal", 500);
	addAll(MODIFIERS, "@",  "modifier", 500);
	addAll(LAYOUTS,   "\\", "layout",   500);
	addAll(PRESETS,   "",   "preset",   450);
	addAll(BUILTINS,  "",   "builtin",  400);
	for (var i = 0; i < SCOPE_VARS.length; i++) {
		completions.push({
			value: SCOPE_VARS[i][0], caption: SCOPE_VARS[i][0], meta: "scope", score: 450,
			docHTML: "<b>" + esc(SCOPE_VARS[i][0]) + "</b><hr>" + esc(SCOPE_VARS[i][1]),
		});
	}
	for (var i = 0; i < KEYWORDS.length; i++) {
		completions.push({
			value: KEYWORDS[i][0], caption: KEYWORDS[i][0], meta: "keyword", score: 300,
			docHTML: "<b>" + esc(KEYWORDS[i][0]) + "</b><hr>" + esc(KEYWORDS[i][1]),
		});
	}
	for (var i = 0; i < FACES.length; i++) {
		completions.push({value: FACES[i], caption: FACES[i], meta: "face", score: 100});
	}

	// Identifier characters for prefix matching: include the op sigils so
	// "@si" completes to "@size" and "\spl" to "\split".
	var IDENT_RE = [/[a-zA-Z_0-9$@\\]/];

	// Static symbol completer: the language surface.
	var symbolCompleter = {
		identifierRegexps: IDENT_RE,
		getCompletions: function (editor, session, pos, prefix, callback) {
			callback(null, completions);
		},
	};

	// Dynamic completer: rules, consts/params, rule parameters, and @set
	// attributes scraped from the current buffer.
	var docSymbolCompleter = {
		identifierRegexps: IDENT_RE,
		getCompletions: function (editor, session, pos, prefix, callback) {
			var text = session.getValue();
			var out = [];
			var seen = Object.create(null);
			function add(name, meta, score) {
				var key = meta + ":" + name;
				if (seen[key]) return;
				seen[key] = true;
				out.push({value: name, caption: name, meta: meta, score: score});
			}
			var m;
			// Rule declarations: Name(params) { ... } / Name :: guard { ... }
			var ruleRe = /^[ \t]*([A-Z][A-Za-z0-9_]*)[ \t]*(\(([^)]*)\))?[ \t]*(::|\{)/gm;
			while ((m = ruleRe.exec(text))) {
				add(m[1], "rule", 600);
				if (m[3]) {
					var ps = m[3].split(",");
					for (var i = 0; i < ps.length; i++) {
						var p = ps[i].trim();
						if (/^[a-z_][A-Za-z0-9_]*$/.test(p)) add(p, "rule param", 350);
					}
				}
			}
			// const / param declarations.
			var declRe = /^[ \t]*(const|param)[ \t]+([A-Za-z_][A-Za-z0-9_]*)/gm;
			while ((m = declRe.exec(text))) add(m[2], m[1], 550);
			// @set attributes (bare-ident or string first arg).
			var setRe = /@set[ \t]*\([ \t]*(?:name[ \t]*:[ \t]*)?"?([A-Za-z_][A-Za-z0-9_]*)"?/g;
			while ((m = setRe.exec(text))) add(m[1], "attr", 350);
			callback(null, out);
		},
	};

	window.shpCompleters = [symbolCompleter, docSymbolCompleter];

	// ------------------------------------------------------------------
	// Fallback autocomplete popup, installed by index.html ONLY when the
	// vendored ace/ext-language_tools.js is missing. Minimal but complete:
	// live trigger on identifier/sigil chars, Ctrl+Space, arrow-key
	// navigation, Tab/Enter accept, Esc dismiss, doc panel on the right.
	// Once ext-language_tools.js is vendored the real popup is used and
	// this never runs.
	window.shpFallbackAutocomplete = function (editor) {
		var Range = ace.require("ace/range").Range;
		var PREFIX_RE = /[A-Za-z0-9_$@\\]+$/;
		var MAX_ITEMS = 50;

		var style = document.createElement("style");
		style.textContent =
			"#shp-ac{position:absolute;z-index:1000;display:none;background:#1e222a;" +
			"border:1px solid #3a4150;border-radius:4px;box-shadow:0 4px 14px rgba(0,0,0,.5);" +
			"font:12px ui-monospace,monospace;color:#d0d6e0;max-width:560px}" +
			"#shp-ac .wrap{display:flex;align-items:stretch}" +
			"#shp-ac ul{list-style:none;margin:0;padding:2px;max-height:220px;overflow-y:auto;min-width:200px}" +
			"#shp-ac li{padding:2px 8px;border-radius:3px;cursor:pointer;display:flex;gap:12px;justify-content:space-between;white-space:nowrap}" +
			"#shp-ac li.sel{background:#2c3644}" +
			"#shp-ac li .meta{color:#6b7280;font-size:11px}" +
			"#shp-ac .doc{border-left:1px solid #3a4150;padding:6px 8px;max-width:300px;max-height:220px;" +
			"overflow-y:auto;font:11px system-ui,sans-serif;color:#aeb6c2;white-space:normal}" +
			"#shp-ac .doc hr{border:none;border-top:1px solid #3a4150;margin:4px 0}" +
			"#shp-ac .doc b{color:#d0d6e0}";
		document.head.appendChild(style);

		var box = document.createElement("div");
		box.id = "shp-ac";
		box.innerHTML = "<div class='wrap'><ul></ul><div class='doc'></div></div>";
		document.body.appendChild(box);
		var listEl = box.querySelector("ul");
		var docEl = box.querySelector(".doc");

		var state = {open: false, items: [], sel: 0, prefix: ""};

		function close() {
			state.open = false;
			box.style.display = "none";
		}

		function currentPrefix() {
			var pos = editor.getCursorPosition();
			var line = editor.session.getLine(pos.row).slice(0, pos.column);
			var m = PREFIX_RE.exec(line);
			return m ? m[0] : "";
		}

		function gather(prefix) {
			var pos = editor.getCursorPosition();
			var all = [];
			(window.shpCompleters || []).forEach(function (c) {
				c.getCompletions(editor, editor.session, pos, prefix, function (_, list) {
					if (list) all = all.concat(list);
				});
			});
			var p = prefix.toLowerCase();
			var out = [];
			for (var i = 0; i < all.length; i++) {
				var cap = (all[i].caption || all[i].value).toLowerCase();
				var rank;
				if (!p) rank = 1;
				else if (cap.indexOf(p) === 0) rank = 0;
				else if (cap.indexOf(p) > 0) rank = 1;
				else continue;
				if (cap === p) continue; // already typed in full
				out.push({rank: rank, item: all[i]});
			}
			out.sort(function (a, b) {
				if (a.rank !== b.rank) return a.rank - b.rank;
				var sa = a.item.score || 0, sb = b.item.score || 0;
				if (sa !== sb) return sb - sa;
				return (a.item.caption || "").localeCompare(b.item.caption || "");
			});
			return out.slice(0, MAX_ITEMS).map(function (r) { return r.item; });
		}

		function render() {
			listEl.textContent = "";
			state.items.forEach(function (item, i) {
				var li = document.createElement("li");
				if (i === state.sel) li.className = "sel";
				var name = document.createElement("span");
				name.textContent = item.caption || item.value;
				var meta = document.createElement("span");
				meta.className = "meta";
				meta.textContent = item.meta || "";
				li.appendChild(name);
				li.appendChild(meta);
				li.addEventListener("mousedown", function (e) {
					e.preventDefault(); // keep editor focus
					accept(item);
				});
				listEl.appendChild(li);
			});
			var sel = state.items[state.sel];
			docEl.innerHTML = (sel && sel.docHTML) || "";
			docEl.style.display = sel && sel.docHTML ? "" : "none";
			var selEl = listEl.children[state.sel];
			if (selEl) selEl.scrollIntoView({block: "nearest"});
		}

		function place() {
			var pos = editor.getCursorPosition();
			var coords = editor.renderer.textToScreenCoordinates(pos.row, pos.column - state.prefix.length);
			box.style.left = coords.pageX + "px";
			box.style.top = (coords.pageY + editor.renderer.lineHeight) + "px";
		}

		function refresh(openIfClosed) {
			if (!state.open && !openIfClosed) return;
			var prefix = currentPrefix();
			if (!prefix && !openIfClosed) {close(); return;}
			var items = gather(prefix);
			if (!items.length) {close(); return;}
			state.open = true;
			state.items = items;
			state.sel = 0;
			state.prefix = prefix;
			box.style.display = "block";
			place();
			render();
		}

		function accept(item) {
			var pos = editor.getCursorPosition();
			editor.session.replace(
				new Range(pos.row, pos.column - state.prefix.length, pos.row, pos.column),
				item.value);
			close();
			editor.focus();
		}

		// Live trigger: identifier/sigil chars open or refresh; backspace
		// refreshes while open (and closes when the prefix vanishes).
		editor.commands.on("afterExec", function (e) {
			if (e.command.name === "insertstring" && typeof e.args === "string" &&
			    e.args.length === 1 && /[A-Za-z0-9_$@\\]/.test(e.args)) {
				refresh(true);
			} else if (state.open && (e.command.name === "backspace" || e.command.name === "insertstring")) {
				refresh(false);
			}
		});

		editor.commands.addCommand({
			name: "shpAutocompleteOpen",
			bindKey: {win: "Ctrl-Space", mac: "Ctrl-Space"},
			exec: function () { refresh(true); },
		});

		// Keyboard navigation while open (capture phase beats Ace's own
		// handlers; stopPropagation so Enter/Tab don't also edit).
		editor.container.addEventListener("keydown", function (e) {
			if (!state.open) return;
			switch (e.key) {
			case "ArrowDown":
				state.sel = (state.sel + 1) % state.items.length;
				render(); break;
			case "ArrowUp":
				state.sel = (state.sel - 1 + state.items.length) % state.items.length;
				render(); break;
			case "Enter": case "Tab":
				accept(state.items[state.sel]); break;
			case "Escape":
				close(); break;
			default:
				return; // unhandled; let the editor see it
			}
			e.preventDefault();
			e.stopPropagation();
		}, true);

		document.addEventListener("mousedown", function (e) {
			if (state.open && !box.contains(e.target)) close();
		});
		editor.on("blur", function () {
			// Delay: a popup mousedown refocuses the editor right after.
			setTimeout(function () { if (!editor.isFocused()) close(); }, 60);
		});
		editor.session.on("changeScrollTop", close);
	};
})();
