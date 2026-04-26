// ── Intellisense — from BetterOCaml editor_change.js ─
const COMMENT_REGEX   = /[(][*][\s\S]*?[*][)][\s]*/g;
const VARIABLE_1_REGEX = /((let rec \w+)|(let \w+)|(and \w+))/g;
const VARIABLE_2_REGEX = /(let )|(rec )|(and )/g;

const MODULE_HINT = {
  'Base': ["and","as","assert","asr","begin","class","constraint","decr","Division_by_zero","do","done","downto","else","end","epsilon_float","exception","external","Failure","failwith","false","for","fst","function","functor","if","in","include","incr","inherit","initializer","Invalid_argument","land","lazy","let","lor","lsl","lsr","lxor","match","max_float","max_int","method","min_float","min_int","mod","module","mutable","new","nonrec","not","object","of","open","or","Out_of_memory","private","raise","rec","ref","sig","snd","struct","then","to","true","try","type","val","virtual","when","while","with","prerr_endline","print_int","print_float","print_string","print_endline","print_newline","int_of_float","float_of_int","int_of_string","float_of_string","bool_of_string","string_of_int","string_of_float","string_of_bool","int_of_char","char_of_int","sqrt","max","min","exp","log","log10","cos","acos","sin","asin","tan","atan","atan2","hypot","cosh","sinh","tanh","floor","ceil","truncate","abs_float","abs","ignore","exit","read_line","read_int","read_float","succ","pred","compare","(=)","(<>)","(<)","(>)","(<=)","(>=)","(+)","(-)","( * )","(/)","(mod)","(land)","(lor)","(lxor)","(lsl)","(lsr)","(asr)","(^)","(@)"],
  'Array': ["length","get","set","make","create","init","make_matrix","append","concat","sub","copy","fill","blit","to_list","of_list","iter","iteri","map","mapi","fold_left","fold_right","iter2","map2","for_all","exists","mem","memq","sort","stable_sort","fast_sort","to_seq","to_seqi","of_seq","fold_left_map","find_opt","find_map","split","combine","for_all2","exists2"],
  'Buffer': ["create","contents","to_bytes","sub","blit","nth","length","clear","reset","output_buffer","truncate","add_char","add_string","add_bytes","add_substring","add_subbytes","add_substitute","add_buffer","add_channel"],
  'Bytes': ["length","get","set","create","make","init","empty","copy","of_string","to_string","sub","sub_string","extend","fill","blit","blit_string","concat","cat","iter","iteri","map","mapi","trim","escaped","index","index_opt","rindex","rindex_opt","contains","compare","equal","to_seq","to_seqi","of_seq","fold_left","fold_right","for_all","exists","starts_with","ends_with","split_on_char"],
  'Char': ["code","chr","escaped","lowercase_ascii","uppercase_ascii","compare","equal"],
  'Filename': ["current_dir_name","parent_dir_name","dir_sep","concat","is_relative","is_implicit","check_suffix","chop_suffix","extension","remove_extension","chop_extension","basename","dirname","temp_file","quote","null"],
  'Float': ["neg","add","sub","mul","div","rem","abs","infinity","neg_infinity","nan","pi","max_float","min_float","epsilon","of_int","to_int","of_string","of_string_opt","to_string","pow","sqrt","exp","log","log10","cos","sin","tan","acos","asin","atan","atan2","hypot","cosh","sinh","tanh","ceil","floor","copy_sign","frexp","ldexp","modf","compare","equal","hash","zero","one","minus_one","fma","succ","pred","is_finite","is_infinite","is_nan","is_integer","trunc","round","min","max"],
  'Format': ["printf","sprintf","eprintf","fprintf","kasprintf","pp_print_string","pp_print_int","pp_print_float","pp_print_bool","pp_print_list","pp_print_text","pp_print_option"],
  'Hashtbl': ["create","clear","reset","copy","add","find","find_opt","find_all","mem","remove","replace","iter","filter_map_inplace","fold","length","randomize","stats","hash","to_seq","of_seq"],
  'Int': ["zero","one","minus_one","neg","add","sub","mul","div","rem","succ","pred","abs","max_int","min_int","logand","logor","logxor","lognot","shift_left","shift_right","equal","compare","to_float","of_float","to_string","min","max"],
  'List': ["length","compare_lengths","cons","hd","tl","nth","nth_opt","rev","init","append","rev_append","concat","flatten","iter","iteri","map","mapi","rev_map","fold_left","fold_right","iter2","map2","for_all","exists","for_all2","exists2","mem","memq","find","find_opt","filter","find_all","partition","assoc","assoc_opt","mem_assoc","remove_assoc","split","combine","sort","stable_sort","fast_sort","sort_uniq","merge","to_seq","of_seq","filter_map","concat_map","find_map","fold_left_map","filteri","equal","compare","partition_map"],
  'Map': ["empty","is_empty","mem","add","update","singleton","remove","merge","union","compare","equal","iter","fold","for_all","exists","filter","filter_map","partition","cardinal","bindings","min_binding","min_binding_opt","max_binding","max_binding_opt","choose","choose_opt","split","find","find_opt","find_first","find_first_opt","find_last","find_last_opt","map","mapi","to_seq","to_rev_seq","to_seq_from","add_seq","of_seq"],
  'Option': ["none","some","value","get","bind","join","map","fold","iter","is_none","is_some","equal","compare","to_result","to_list","to_seq"],
  'Printf': ["fprintf","printf","eprintf","sprintf","bprintf","ifprintf","kfprintf","ksprintf","kbprintf"],
  'Queue': ["create","add","push","take","pop","peek","top","clear","copy","is_empty","length","iter","fold","transfer","to_seq","add_seq","of_seq","take_opt","peek_opt"],
  'Random': ["init","self_init","bits","int","full_int","int32","int64","float","bool","get_state","set_state"],
  'Result': ["ok","error","value","get_ok","get_error","bind","join","map","map_error","fold","iter","iter_error","is_ok","is_error","equal","compare","to_option","to_list","to_seq"],
  'Scanf': ["bscanf","sscanf","scanf","kscanf","ksscanf","fscanf"],
  'Seq': ["empty","return","map","filter","filter_map","flat_map","fold_left","iter","cons","append","unfold","concat","concat_map"],
  'Set': ["empty","is_empty","mem","add","singleton","remove","union","inter","diff","compare","equal","subset","iter","map","fold","for_all","exists","filter","filter_map","partition","cardinal","elements","min_elt","min_elt_opt","max_elt","max_elt_opt","choose","choose_opt","split","find","find_opt","find_first","find_first_opt","find_last","find_last_opt","of_list","to_seq","to_rev_seq","to_seq_from","add_seq","of_seq"],
  'Stack': ["create","push","pop","top","clear","copy","is_empty","length","iter","fold","to_seq","add_seq","of_seq","pop_opt","top_opt"],
  'String': ["make","init","length","get","concat","equal","compare","contains","sub","split_on_char","map","mapi","trim","escaped","uppercase_ascii","lowercase_ascii","capitalize_ascii","uncapitalize_ascii","iter","iteri","index","index_opt","rindex","rindex_opt","starts_with","ends_with","for_all","exists","empty","of_bytes","to_bytes","cat","fold_left","fold_right","to_seq","to_seqi","of_seq"],
  'Sys': ["argv","file_exists","is_directory","remove","rename","getenv","getenv_opt","command","time","chdir","getcwd","readdir","interactive","os_type","word_size","max_string_length","max_array_length","ocaml_version","mkdir","rmdir"],
};
MODULE_HINT['Base'].push(...Object.keys(MODULE_HINT).filter(k => k !== 'Base'));

const includer = (l, w) => l.filter(s => s.startsWith(w));

// ── Type signatures ───────────────────────────────────
const MODULE_HINT_TYPES = {
  'Base': {
    'print_string': 'string -> unit', 'print_int': 'int -> unit',
    'print_float': 'float -> unit', 'print_endline': 'string -> unit',
    'print_newline': 'unit -> unit', 'prerr_endline': 'string -> unit',
    'int_of_float': 'float -> int', 'float_of_int': 'int -> float',
    'int_of_string': 'string -> int', 'float_of_string': 'string -> float',
    'bool_of_string': 'string -> bool', 'string_of_int': 'int -> string',
    'string_of_float': 'float -> string', 'string_of_bool': 'bool -> string',
    'int_of_char': 'char -> int', 'char_of_int': 'int -> char',
    'sqrt': 'float -> float', 'exp': 'float -> float', 'log': 'float -> float',
    'log10': 'float -> float', 'cos': 'float -> float', 'sin': 'float -> float',
    'tan': 'float -> float', 'acos': 'float -> float', 'asin': 'float -> float',
    'atan': 'float -> float', 'atan2': 'float -> float -> float',
    'floor': 'float -> float', 'ceil': 'float -> float', 'truncate': 'float -> int',
    'abs': 'int -> int', 'abs_float': 'float -> float',
    'max': '\'a -> \'a -> \'a', 'min': '\'a -> \'a -> \'a',
    'not': 'bool -> bool', 'ref': '\'a -> \'a ref',
    'fst': '\'a * \'b -> \'a', 'snd': '\'a * \'b -> \'b',
    'incr': 'int ref -> unit', 'decr': 'int ref -> unit',
    'raise': 'exn -> \'a', 'failwith': 'string -> \'a',
    'ignore': '\'a -> unit', 'exit': 'int -> \'a',
    'succ': 'int -> int', 'pred': 'int -> int',
    'read_line': 'unit -> string', 'read_int': 'unit -> int',
    'read_float': 'unit -> float',
  },
  'Printf': {
    'fprintf': 'out_channel -> (\'a, out_channel, unit) format -> \'a',
    'printf':  '(\'a, out_channel, unit) format -> \'a',
    'eprintf': '(\'a, out_channel, unit) format -> \'a',
    'sprintf': '(\'a, unit, string) format -> \'a',
    'bprintf': 'Buffer.t -> (\'a, Buffer.t, unit) format -> \'a',
    'ifprintf': 'out_channel -> (\'a, out_channel, unit) format -> \'a',
    'kfprintf': '(out_channel -> \'b) -> out_channel -> (\'a, out_channel, \'b) format -> \'a',
    'ksprintf': '(string -> \'b) -> (\'a, unit, string, \'b) format4 -> \'a',
    'kbprintf': '(Buffer.t -> \'b) -> Buffer.t -> (\'a, Buffer.t, \'b) format -> \'a',
  },
  'List': {
    'length': '\'a list -> int', 'hd': '\'a list -> \'a', 'tl': '\'a list -> \'a list',
    'nth': '\'a list -> int -> \'a', 'nth_opt': '\'a list -> int -> \'a option',
    'rev': '\'a list -> \'a list', 'cons': '\'a -> \'a list -> \'a list',
    'init': 'int -> (int -> \'a) -> \'a list',
    'append': '\'a list -> \'a list -> \'a list',
    'concat': '\'a list list -> \'a list', 'flatten': '\'a list list -> \'a list',
    'iter': '(\'a -> unit) -> \'a list -> unit',
    'iteri': '(int -> \'a -> unit) -> \'a list -> unit',
    'map': '(\'a -> \'b) -> \'a list -> \'b list',
    'mapi': '(int -> \'a -> \'b) -> \'a list -> \'b list',
    'filter': '(\'a -> bool) -> \'a list -> \'a list',
    'filter_map': '(\'a -> \'b option) -> \'a list -> \'b list',
    'find': '(\'a -> bool) -> \'a list -> \'a',
    'find_opt': '(\'a -> bool) -> \'a list -> \'a option',
    'find_map': '(\'a -> \'b option) -> \'a list -> \'b option',
    'fold_left': '(\'a -> \'b -> \'a) -> \'a -> \'b list -> \'a',
    'fold_right': '(\'a -> \'b -> \'b) -> \'a list -> \'b -> \'b',
    'for_all': '(\'a -> bool) -> \'a list -> bool',
    'exists': '(\'a -> bool) -> \'a list -> bool',
    'mem': '\'a -> \'a list -> bool',
    'sort': '(\'a -> \'a -> int) -> \'a list -> \'a list',
    'stable_sort': '(\'a -> \'a -> int) -> \'a list -> \'a list',
    'rev_map': '(\'a -> \'b) -> \'a list -> \'b list',
    'partition': '(\'a -> bool) -> \'a list -> \'a list * \'a list',
    'split': '(\'a * \'b) list -> \'a list * \'b list',
    'combine': '\'a list -> \'b list -> (\'a * \'b) list',
    'assoc': '\'a -> (\'a * \'b) list -> \'b',
    'assoc_opt': '\'a -> (\'a * \'b) list -> \'b option',
  },
  'String': {
    'length': 'string -> int', 'get': 'string -> int -> char',
    'make': 'int -> char -> string', 'init': 'int -> (int -> char) -> string',
    'sub': 'string -> int -> int -> string',
    'concat': 'string -> string list -> string',
    'split_on_char': 'char -> string -> string list',
    'trim': 'string -> string', 'escaped': 'string -> string',
    'uppercase_ascii': 'string -> string', 'lowercase_ascii': 'string -> string',
    'capitalize_ascii': 'string -> string', 'uncapitalize_ascii': 'string -> string',
    'contains': 'string -> char -> bool',
    'equal': 'string -> string -> bool', 'compare': 'string -> string -> int',
    'iter': '(char -> unit) -> string -> unit',
    'map': '(char -> char) -> string -> string',
    'index': 'string -> char -> int', 'index_opt': 'string -> char -> int option',
    'rindex': 'string -> char -> int', 'rindex_opt': 'string -> char -> int option',
    'starts_with': 'prefix:string -> string -> bool',
    'ends_with': 'suffix:string -> string -> bool',
    'cat': 'string -> string -> string',
    'for_all': '(char -> bool) -> string -> bool',
    'exists': '(char -> bool) -> string -> bool',
  },
  'Array': {
    'length': '\'a array -> int', 'get': '\'a array -> int -> \'a',
    'set': '\'a array -> int -> \'a -> unit', 'make': 'int -> \'a -> \'a array',
    'init': 'int -> (int -> \'a) -> \'a array',
    'iter': '(\'a -> unit) -> \'a array -> unit',
    'iteri': '(int -> \'a -> unit) -> \'a array -> unit',
    'map': '(\'a -> \'b) -> \'a array -> \'b array',
    'mapi': '(int -> \'a -> \'b) -> \'a array -> \'b array',
    'fold_left': '(\'a -> \'b -> \'a) -> \'a -> \'b array -> \'a',
    'fold_right': '(\'a -> \'b -> \'b) -> \'a array -> \'b -> \'b',
    'for_all': '(\'a -> bool) -> \'a array -> bool',
    'exists': '(\'a -> bool) -> \'a array -> bool',
    'mem': '\'a -> \'a array -> bool',
    'sort': '(\'a -> \'a -> int) -> \'a array -> unit',
    'stable_sort': '(\'a -> \'a -> int) -> \'a array -> unit',
    'to_list': '\'a array -> \'a list', 'of_list': '\'a list -> \'a array',
    'copy': '\'a array -> \'a array',
    'append': '\'a array -> \'a array -> \'a array',
    'sub': '\'a array -> int -> int -> \'a array',
    'fill': '\'a array -> int -> int -> \'a -> unit',
    'blit': '\'a array -> int -> \'a array -> int -> int -> unit',
    'make_matrix': 'int -> int -> \'a -> \'a array array',
  },
  'Option': {
    'none': '\'a option', 'some': '\'a -> \'a option',
    'value': '\'a option -> default:\'a -> \'a', 'get': '\'a option -> \'a',
    'bind': '\'a option -> (\'a -> \'b option) -> \'b option',
    'map': '(\'a -> \'b) -> \'a option -> \'b option',
    'fold': 'none:\'b -> some:(\'a -> \'b) -> \'a option -> \'b',
    'iter': '(\'a -> unit) -> \'a option -> unit',
    'is_none': '\'a option -> bool', 'is_some': '\'a option -> bool',
    'join': '\'a option option -> \'a option',
    'to_list': '\'a option -> \'a list',
  },
  'Result': {
    'ok': '\'a -> (\'a, \'e) result', 'error': '\'e -> (\'a, \'e) result',
    'value': '(\'a, \'e) result -> default:\'a -> \'a',
    'get_ok': '(\'a, \'e) result -> \'a', 'get_error': '(\'a, \'e) result -> \'e',
    'bind': '(\'a, \'e) result -> (\'a -> (\'b, \'e) result) -> (\'b, \'e) result',
    'map': '(\'a -> \'b) -> (\'a, \'e) result -> (\'b, \'e) result',
    'map_error': '(\'e -> \'f) -> (\'a, \'e) result -> (\'a, \'f) result',
    'is_ok': '(\'a, \'e) result -> bool', 'is_error': '(\'a, \'e) result -> bool',
  },
  'Hashtbl': {
    'create': 'int -> (\'a, \'b) t',
    'add': '(\'a, \'b) t -> \'a -> \'b -> unit',
    'find': '(\'a, \'b) t -> \'a -> \'b',
    'find_opt': '(\'a, \'b) t -> \'a -> \'b option',
    'mem': '(\'a, \'b) t -> \'a -> bool',
    'remove': '(\'a, \'b) t -> \'a -> unit',
    'replace': '(\'a, \'b) t -> \'a -> \'b -> unit',
    'iter': '(\'a -> \'b -> unit) -> (\'a, \'b) t -> unit',
    'fold': '(\'a -> \'b -> \'c -> \'c) -> (\'a, \'b) t -> \'c -> \'c',
    'length': '(\'a, \'b) t -> int', 'clear': '(\'a, \'b) t -> unit',
    'copy': '(\'a, \'b) t -> (\'a, \'b) t',
  },
  'Map': {
    'empty': '\'a t', 'is_empty': '\'a t -> bool',
    'mem': 'key -> \'a t -> bool', 'add': 'key -> \'a -> \'a t -> \'a t',
    'remove': 'key -> \'a t -> \'a t', 'find': 'key -> \'a t -> \'a',
    'find_opt': 'key -> \'a t -> \'a option',
    'iter': '(key -> \'a -> unit) -> \'a t -> unit',
    'fold': '(key -> \'a -> \'b -> \'b) -> \'a t -> \'b -> \'b',
    'map': '(\'a -> \'b) -> \'a t -> \'b t',
    'filter': '(key -> \'a -> bool) -> \'a t -> \'a t',
    'cardinal': '\'a t -> int', 'bindings': '\'a t -> (key * \'a) list',
    'for_all': '(key -> \'a -> bool) -> \'a t -> bool',
    'exists': '(key -> \'a -> bool) -> \'a t -> bool',
    'union': '(key -> \'a -> \'a -> \'a option) -> \'a t -> \'a t -> \'a t',
  },
  'Set': {
    'empty': 't', 'is_empty': 't -> bool', 'mem': 'elt -> t -> bool',
    'add': 'elt -> t -> t', 'remove': 'elt -> t -> t', 'singleton': 'elt -> t',
    'union': 't -> t -> t', 'inter': 't -> t -> t', 'diff': 't -> t -> t',
    'iter': '(elt -> unit) -> t -> unit',
    'fold': '(elt -> \'a -> \'a) -> t -> \'a -> \'a',
    'for_all': '(elt -> bool) -> t -> bool', 'exists': '(elt -> bool) -> t -> bool',
    'filter': '(elt -> bool) -> t -> t', 'cardinal': 't -> int',
    'elements': 't -> elt list', 'of_list': 'elt list -> t',
    'subset': 't -> t -> bool', 'equal': 't -> t -> bool',
  },
  'Random': {
    'init': 'int -> unit', 'self_init': 'unit -> unit',
    'bits': 'unit -> int', 'int': 'int -> int', 'float': 'float -> float',
    'bool': 'unit -> bool', 'full_int': 'int -> int',
  },
  'Seq': {
    'empty': '\'a t', 'return': '\'a -> \'a t',
    'cons': '\'a -> \'a t -> \'a t',
    'map': '(\'a -> \'b) -> \'a t -> \'b t',
    'filter': '(\'a -> bool) -> \'a t -> \'a t',
    'filter_map': '(\'a -> \'b option) -> \'a t -> \'b t',
    'fold_left': '(\'a -> \'b -> \'a) -> \'a -> \'b t -> \'a',
    'iter': '(\'a -> unit) -> \'a t -> unit',
    'append': '\'a t -> \'a t -> \'a t',
    'flat_map': '(\'a -> \'b t) -> \'a t -> \'b t',
  },
  'Queue': {
    'create': 'unit -> \'a t', 'add': '\'a -> \'a t -> unit',
    'push': '\'a -> \'a t -> unit', 'take': '\'a t -> \'a',
    'pop': '\'a t -> \'a', 'peek': '\'a t -> \'a',
    'is_empty': '\'a t -> bool', 'length': '\'a t -> int',
    'iter': '(\'a -> unit) -> \'a t -> unit',
    'fold': '(\'a -> \'b -> \'a) -> \'a -> \'b t -> \'a',
  },
  'Stack': {
    'create': 'unit -> \'a t', 'push': '\'a -> \'a t -> unit',
    'pop': '\'a t -> \'a', 'top': '\'a t -> \'a',
    'is_empty': '\'a t -> bool', 'length': '\'a t -> int',
    'iter': '(\'a -> unit) -> \'a t -> unit',
    'fold': '(\'a -> \'b -> \'a) -> \'a -> \'b t -> \'a',
  },
};

function renderHintItem(el, _data, cur) {
  const name = document.createElement('span');
  name.className = 'cm-hint-name';
  name.textContent = cur.text;
  el.appendChild(name);
  if (cur.typeStr) {
    const type = document.createElement('span');
    type.className = 'cm-hint-type';
    type.textContent = cur.typeStr;
    el.appendChild(type);
  }
}

function makeHintItem(text, mod) {
  const typeStr = mod && MODULE_HINT_TYPES[mod] && MODULE_HINT_TYPES[mod][text]
    ? MODULE_HINT_TYPES[mod][text] : null;
  if (!typeStr) return text;
  return { text, render: renderHintItem, typeStr };
}

// Cached local variable names — rebuilt on every editor change, not on every keystroke
let _localVars = [];
function rebuildLocalVars() {
  if (!_editor) return;
  _localVars = [...new Set(
    (_editor.getValue().replace(COMMENT_REGEX, '').match(VARIABLE_1_REGEX) || [])
      .map(x => x.replace(VARIABLE_2_REGEX, ''))
  )];
}

// Synchronous hint function
function hint_prediction(cm) {
  const cursor = cm.getCursor();
  const line   = cm.getLine(cursor.line);
  let start = cursor.ch, end = cursor.ch;
  while (start && /\w/.test(line[start - 1])) --start;
  while (end < line.length && /\w/.test(line[end])) ++end;
  const word = line.slice(start, end);

  // Module.member completion (e.g. List.f → filter, fold_left …)
  if (line[start - 1] === '.') {
    let ms = start - 1;
    while (ms && /\w/.test(line[ms - 1])) --ms;
    const mod = line.slice(ms, start - 1);
    if (MODULE_HINT[mod]) {
      const raw = word ? includer(MODULE_HINT[mod], word) : MODULE_HINT[mod];
      if (raw.length) return {
        list: raw.map(t => makeHintItem(t, mod)),
        from: CodeMirror.Pos(cursor.line, start),
        to:   CodeMirror.Pos(cursor.line, end),
      };
    }
  }

  if (!word) return null;

  const candidates = [...new Set([..._localVars, ...MODULE_HINT['Base']])];
  const matches = includer(candidates, word).filter(s => s !== word).slice(0, 8);
  if (matches.length) return {
    list: matches.map(t => makeHintItem(t, 'Base')),
    from: CodeMirror.Pos(cursor.line, start),
    to:   CodeMirror.Pos(cursor.line, end),
  };
  return null;
}

// ── Exercises ─────────────────────────────────────────
const EXERCISES = {
  bank: {
    label: 'E1 · Bank Account',
    filename: 'bank.ml',
    starterCode:
`(* ===== TYPES ===== *)

(* These types are provided. Study them before writing any functions. *)

type transaction =
  | Deposit    of float
  | Withdrawal of float

type account = {
  owner   : string;
  history : transaction list;
}

(* ===== FUNCTIONS ===== *)

(* 1. create: takes an owner name (string), returns an account
      with an empty history list *)
let create owner = failwith "TODO"


(* 2. deposit: takes an amount (float) and an account, returns a new account
      with a Deposit transaction prepended to history
      Hint: use { acct with history = Deposit amount :: acct.history } *)
let deposit amount acct = failwith "TODO"


(* 3. withdraw: takes an amount (float) and an account, returns a new account
      with a Withdrawal transaction prepended to history *)
let withdraw amount acct = failwith "TODO"


(* 4. balance: takes an account, returns the current balance as float
      Fold over history: start at 0.0, add for Deposit, subtract for Withdrawal
      Hint: List.fold_left (fun acc tx -> match tx with ...) 0.0 acct.history *)
let balance acct = failwith "TODO"


(* 5. statement: takes an account, returns a (string * float) list
      One entry per transaction in chronological order (oldest first)
      Each entry is ("Deposit", amount) or ("Withdrawal", amount)
      Hint: reverse history first with List.rev, then use List.map *)
let statement acct = failwith "TODO"`,
    tests: [
      { name: '01  create - owner field is set correctly',                   expected: 'Alice'      },
      { name: '02  create - history starts empty',                           expected: '0'          },
      { name: '03  deposit - adds one entry to history',                     expected: '1'          },
      { name: '04  withdraw - adds one entry to history',                    expected: '2'          },
      { name: '05  balance - fresh account is 0.00',                         expected: '0.00'       },
      { name: '06  balance - single deposit of 100.00',                      expected: '100.00'     },
      { name: '07  balance - 100.00 deposit then 40.00 withdrawal',          expected: '60.00'      },
      { name: '08  balance - 500 + 250 deposits, 100 withdrawal = 650.00',   expected: '650.00'     },
      { name: '09  statement - empty account yields empty list',             expected: '0'          },
      { name: '10  statement - two transactions yield two entries',          expected: '2'          },
      { name: '11  statement - oldest entry comes first (label)',            expected: 'Deposit'    },
      { name: '12  statement - second entry label',                          expected: 'Withdrawal' },
      { name: '13  statement - first entry amount matches deposit',          expected: '100.00'     },
    ],
    testCode: `
let () =
  let a = create "Alice" in
  Printf.printf "%s\\n%!" a.owner;
  Printf.printf "%d\\n%!" (List.length a.history);
  let b = deposit 100.0 a in
  Printf.printf "%d\\n%!" (List.length b.history);
  let c = withdraw 40.0 b in
  Printf.printf "%d\\n%!" (List.length c.history);
  Printf.printf "%.2f\\n%!" (balance a);
  Printf.printf "%.2f\\n%!" (balance b);
  Printf.printf "%.2f\\n%!" (balance c);
  let d = create "T" |> deposit 500.0 |> deposit 250.0 |> withdraw 100.0 in
  Printf.printf "%.2f\\n%!" (balance d);
  Printf.printf "%d\\n%!" (List.length (statement a));
  Printf.printf "%d\\n%!" (List.length (statement c));
  Printf.printf "%s\\n%!" (fst (List.nth (statement c) 0));
  Printf.printf "%s\\n%!" (fst (List.nth (statement c) 1));
  Printf.printf "%.2f\\n%!" (snd (List.nth (statement c) 0))
;;
`,
  },

  playlist: {
    label: 'E2 · Playlist',
    filename: 'playlist.ml',
    starterCode:
`type genre = Rock | Jazz | Classical | Pop

(* A track is a tuple: (title: string, artist: string, duration_sec: int, genre) *)

let duration (_, _, d, _) = d

let rec total_duration = function
  | [] -> 0
  | head :: tail -> duration head + total_duration tail

let filter_by_genre g tracks =
  (* TODO *)
  []

let filter_by_artist artist tracks =
  (* TODO *)
  []

let track_titles tracks =
  (* TODO *)
  []

let long_tracks threshold tracks =
  (* TODO *)
  []

let format_track (title, artist, dur, _) =
  (* TODO: "Title by Artist (m:ss)" *)
  ""

let print_playlist tracks =
  (* TODO *)
  ()`,
    tests: [
      { name: '01  duration - 3-minute track returns 180',         expected: '180'                },
      { name: '02  total_duration - two tracks summed correctly', expected: '180'                },
      { name: '03  filter_by_genre - returns only matching genre', expected: '1'                },
      { name: '04  filter_by_artist - returns only matching artist', expected: '1'              },
      { name: '05  track_titles - titles in order',               expected: 'Song1,Song2'       },
      { name: '06  long_tracks - filters by threshold',           expected: '1'                 },
      { name: '07  format_track - formats as "Title by Artist (m:ss)"', expected: 'Hey by Queen (5:54)' },
    ],
    testCode: '\nlet () =\n  Printf.printf "%d\\n%!" (duration ("A", "B", 180, Rock));\n  Printf.printf "%d\\n%!" (total_duration [("A","B",100,Rock);("C","D",80,Jazz)]);\n  Printf.printf "%d\\n%!" (List.length (filter_by_genre Rock [("A","B",100,Rock);("C","D",80,Jazz)]));\n  Printf.printf "%d\\n%!" (List.length (filter_by_artist "Bob" [("A","Bob",100,Rock);("C","Alice",80,Jazz)]));\n  Printf.printf "%s\\n%!" (String.concat "," (track_titles [("Song1","A",100,Rock);("Song2","B",80,Jazz)]));\n  Printf.printf "%d\\n%!" (List.length (long_tracks 90 [("A","B",100,Rock);("C","D",80,Jazz)]));\n  Printf.printf "%s\\n%!" (format_track ("Hey", "Queen", 354, Rock))\n;;\n',
  },

  search: {
    label: 'E3 · Search',
    filename: 'search.ml',
    starterCode:
`(* Definite iteration *)
let rec iter (f : int -> int) (n : int) (start : int) =
  (* TODO *)
  start

let double_n_times n =
  (* TODO: partial application of iter *)
  iter (fun x -> x) n

let add_step step =
  (* TODO: partial application of iter *)
  iter (fun x -> x) step

let count_by_3 =
  (* TODO: partial application of add_step *)
  add_step 0

(* Indefinite iteration *)
let rec first (pred : int -> bool) (start : int) =
  (* TODO *)
  start

let first_divisible_by n start =
  (* TODO *)
  0

let first_perfect_square start =
  (* TODO: use int_of_float (sqrt (float_of_int x)) *)
  0

let natural_sqrt n =
  (* TODO: use first to find the first k where k*k > n *)
  0`,
    tests: [
      { name: '01  iter - doubles 1 four times → 16',            expected: '16'  },
      { name: '02  double_n_times - 1 doubled 4 times → 16',     expected: '16'  },
      { name: '03  count_by_3 - 5 steps from 0 → 15',            expected: '15'  },
      { name: '04  first - first x ≥ 1 where x mod 7 = 0 → 7',  expected: '7'   },
      { name: '05  first_divisible_by - by 7 from 50 → 56',      expected: '56'  },
      { name: '06  first_perfect_square - from 20 → 25',         expected: '25'  },
      { name: '07  natural_sqrt - floor(sqrt(50)) → 7',          expected: '7'   },
    ],
    testCode: `
let () =
  Printf.printf "%d\\n%!" (iter (fun x -> x * 2) 4 1);
  Printf.printf "%d\\n%!" (double_n_times 4 1);
  Printf.printf "%d\\n%!" (count_by_3 5 0);
  Printf.printf "%d\\n%!" (first (fun x -> x mod 7 = 0) 1);
  Printf.printf "%d\\n%!" (first_divisible_by 7 50);
  Printf.printf "%d\\n%!" (first_perfect_square 20);
  Printf.printf "%d\\n%!" (natural_sqrt 50)
;;
`,
  },
};

let _editor = null;

function editorTheme() {
  return document.documentElement.getAttribute('data-pg-theme') === 'dark'
    ? 'ocamlcase'
    : 'ocamlcase-light';
}

function initEditor() {
  const textarea = document.getElementById('pg-editor');
  if (!textarea || typeof CodeMirror === 'undefined') return;

  _editor = CodeMirror.fromTextArea(textarea, {
    mode: 'text/x-ocaml',
    theme: editorTheme(),
    lineNumbers: true,
    indentUnit: 2,
    tabSize: 2,
    indentWithTabs: false,
    autoCloseBrackets: true,
    matchBrackets: true,
    styleActiveLine: true,
    extraKeys: {
      'Enter':       cm => smartEnter(cm),
      'Tab':         cm => cm.execCommand('insertSoftTab'),
      'Shift-Tab':   cm => cm.execCommand('indentLess'),
      'Ctrl-Enter':  () => runCode(),
      'Shift-Alt-F': () => prettifyCode(),
      'Ctrl-/':      cm => toggleComment(cm),
      'Alt-Shift-D': cm => duplicateLine(cm),
      'Alt-Up':      cm => moveLineUp(cm),
      'Alt-Down':    cm => moveLineDown(cm),
      'Ctrl-F':      cm => cm.execCommand('find'),
      'Ctrl-H':      cm => cm.execCommand('replace'),
      'Ctrl-Space':  cm => CodeMirror.commands.autocomplete(cm, hint_prediction, { completeSingle: false }),
    },
    hintOptions: { hint: hint_prediction, completeSingle: false },
  });

  _editor.setSize('100%', '100%');
  window.addEventListener('resize', () => _editor && _editor.refresh());

  // Show type of word under cursor in the header bar
  _editor.on('cursorActivity', cm => {
    const cur  = cm.getCursor();
    const line = cm.getLine(cur.line) || '';
    let start = cur.ch, end = cur.ch;
    while (start && /\w/.test(line[start - 1])) --start;
    while (end < line.length && /\w/.test(line[end])) ++end;
    const word = line.slice(start, end);
    setTypeStatus(word && _typeMap[word] ? word + ' : ' + _typeMap[word] : '');
  });

  // Rebuild local-var cache + auto-dedent + background type-check on each edit
  let _bgTypeTimer = null;
  _editor.on('change', (cm, change) => {
    rebuildLocalVars();
    if (change.origin === '+input' || change.origin === 'paste') {
      autoAdjustIndent(cm);
    }
    clearTimeout(_bgTypeTimer);
    _bgTypeTimer = setTimeout(() => {
      if (_ocamlReady) backgroundTypeCheck();
    }, 700);
  });

  // Auto-trigger after typing a word character or '.' (100ms for snappiness)
  let _hintTimer = null;
  _editor.on('keyup', (cm, e) => {
    if (!_autocompleteEnabled) return;
    if (cm.state.completionActive) return;
    if (e.key === 'Enter' || e.key === 'Escape') return;
    clearTimeout(_hintTimer);
    _hintTimer = setTimeout(() => {
      const cur  = cm.getCursor();
      const ch   = cm.getLine(cur.line)[cur.ch - 1];
      if (ch && (/\w/.test(ch) || ch === '.')) {
        CodeMirror.commands.autocomplete(cm, hint_prediction, { completeSingle: false });
      }
    }, 100);
  });
}

function getEditorValue() {
  return _editor ? _editor.getValue() : document.getElementById('pg-editor').value;
}

function setEditorValue(value) {
  if (_editor) {
    _editor.setValue(value);
    _editor.refresh();
    return;
  }
  document.getElementById('pg-editor').value = value;
}

// ── State ────────────────────────────────────────────
let _currentEx    = null;   // null = free mode, string = exercise id
let _ocamlReady   = false;
let _ocamlLoading = false;
let _pendingCb    = null;   // queued callback if Run clicked during load

// ── Multi-tab state ───────────────────────────────────
let _tabs      = [];  // [{id, name, content}]
let _activeTab = 0;

const LS_TABS_KEY   = 'pg-tabs';
const LS_ACTIVE_KEY = 'pg-active-tab';
function tabKey(id) { return 'pg-tab-' + id; }

function saveTabs() {
  localStorage.setItem(LS_TABS_KEY, JSON.stringify(_tabs.map(t => ({ id: t.id, name: t.name }))));
  localStorage.setItem(LS_ACTIVE_KEY, String(_activeTab));
}

function saveCurrentTabContent() {
  if (_currentEx || !_tabs.length) return;
  _tabs[_activeTab].content = getEditorValue();
  localStorage.setItem(tabKey(_tabs[_activeTab].id), _tabs[_activeTab].content);
}

function renderTabBar() {
  const bar = document.getElementById('pg-tab-bar');
  if (!bar) return;
  bar.innerHTML = '';
  _tabs.forEach((tab, idx) => {
    const pill = document.createElement('div');
    pill.className = 'pg-tab' + (idx === _activeTab ? ' active' : '');

    const nameSpan = document.createElement('span');
    nameSpan.textContent = tab.name;
    nameSpan.addEventListener('dblclick', () => {
      const newName = prompt('Rename tab:', tab.name);
      if (newName && newName.trim()) {
        tab.name = newName.trim().endsWith('.ml') ? newName.trim() : newName.trim() + '.ml';
        saveTabs();
        renderTabBar();
        if (idx === _activeTab) document.getElementById('editor-label').textContent = tab.name;
      }
    });
    pill.appendChild(nameSpan);

    if (_tabs.length > 1) {
      const close = document.createElement('button');
      close.className = 'pg-tab-close';
      close.textContent = '×';
      close.title = 'Close tab';
      close.addEventListener('click', e => { e.stopPropagation(); closeTab(idx); });
      pill.appendChild(close);
    }

    pill.addEventListener('click', () => switchTab(idx));
    bar.appendChild(pill);
  });

  const addBtn = document.createElement('button');
  addBtn.className = 'pg-tab-add';
  addBtn.textContent = '+';
  addBtn.title = 'New tab';
  addBtn.addEventListener('click', () => addTab('untitled.ml', ''));
  bar.appendChild(addBtn);
}

function switchTab(idx) {
  if (idx === _activeTab) return;
  saveCurrentTabContent();
  _activeTab = idx;
  const tab = _tabs[_activeTab];
  setEditorValue(tab.content);
  document.getElementById('editor-label').textContent = tab.name;
  clearTypeWidgets();
  clearErrorHighlights();
  renderTabBar();
  saveTabs();
}

function addTab(name, content) {
  saveCurrentTabContent();
  const id = Date.now();
  _tabs.push({ id, name, content });
  _activeTab = _tabs.length - 1;
  localStorage.setItem(tabKey(id), content);
  setEditorValue(content);
  document.getElementById('editor-label').textContent = name;
  clearTypeWidgets();
  clearErrorHighlights();
  renderTabBar();
  saveTabs();
  if (_editor) _editor.focus();
}

function closeTab(idx) {
  if (_tabs.length <= 1) return;
  localStorage.removeItem(tabKey(_tabs[idx].id));
  _tabs.splice(idx, 1);
  if (_activeTab >= _tabs.length) _activeTab = _tabs.length - 1;
  else if (idx < _activeTab) _activeTab--;
  const tab = _tabs[_activeTab];
  setEditorValue(tab.content);
  document.getElementById('editor-label').textContent = tab.name;
  clearTypeWidgets();
  clearErrorHighlights();
  renderTabBar();
  saveTabs();
}

function restoreTabs() {
  try {
    const raw = localStorage.getItem(LS_TABS_KEY);
    if (!raw) return false;
    const meta = JSON.parse(raw);
    if (!Array.isArray(meta) || !meta.length) return false;
    _tabs = meta.map(t => ({
      id: t.id,
      name: t.name,
      content: localStorage.getItem(tabKey(t.id)) || '',
    }));
    _activeTab = Math.min(parseInt(localStorage.getItem(LS_ACTIVE_KEY) || '0', 10), _tabs.length - 1);
    return true;
  } catch { return false; }
}

// ── Download ─────────────────────────────────────────
function downloadCode() {
  const filename = document.getElementById('editor-label').textContent || 'scratch.ml';
  const code = getEditorValue();
  const blob = new Blob([code], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

// ── Share ────────────────────────────────────────────
function _encodeShareCode(code) {
  const bytes = new TextEncoder().encode(code);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function _decodeShareCode(s) {
  try {
    let b64 = s.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch { return null; }
}
async function shareCode() {
  const code = getEditorValue();
  const url = new URL(window.location.href);
  url.searchParams.delete('exercise');
  url.searchParams.set('code', _encodeShareCode(code));
  const link = url.toString();
  let copied = false;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(link);
      copied = true;
    }
  } catch {}
  const btn = document.getElementById('pg-share-btn');
  if (copied) {
    if (btn) {
      const oldTitle = btn.title;
      btn.title = 'Link copied!';
      btn.classList.add('pg-share-copied');
      setTimeout(() => { btn.title = oldTitle; btn.classList.remove('pg-share-copied'); }, 1500);
    }
  } else {
    window.prompt('Copy this share link:', link);
  }
}

// ── Theme ────────────────────────────────────────────
function toggleTheme() {
  const html   = document.documentElement;
  const isDark = html.getAttribute('data-pg-theme') === 'dark';
  html.setAttribute('data-pg-theme', isDark ? 'light' : 'dark');
  if (_editor) _editor.setOption('theme', editorTheme());
  const btn = document.getElementById('settings-theme-btn');
  if (btn) {
    btn.textContent = isDark ? 'Off' : 'On';
    btn.classList.toggle('pg-toggle-on', !isDark);
  }
}

// ── Settings panel ────────────────────────────────────
function openSettings() {
  document.getElementById('pg-settings-overlay').classList.add('open');
  const isDark = document.documentElement.getAttribute('data-pg-theme') === 'dark';
  const themeBtn = document.getElementById('settings-theme-btn');
  if (themeBtn) { themeBtn.textContent = isDark ? 'On' : 'Off'; themeBtn.classList.toggle('pg-toggle-on', isDark); }
  const ev = document.getElementById('editor-zoom-val');
  const cv = document.getElementById('console-zoom-val');
  if (ev) ev.textContent = _editorFontSize  + 'px';
  if (cv) cv.textContent = _consoleFontSize + 'px';
}
function closeSettings() {
  document.getElementById('pg-settings-overlay').classList.remove('open');
}
function closeSettingsOverlay(e) {
  if (e.target === document.getElementById('pg-settings-overlay')) closeSettings();
}

// ── Autocomplete toggle ───────────────────────────────
let _autocompleteEnabled = true;
function toggleAutocomplete() {
  _autocompleteEnabled = !_autocompleteEnabled;
  const btn = document.getElementById('settings-autocomplete-btn');
  if (btn) { btn.textContent = _autocompleteEnabled ? 'On' : 'Off'; btn.classList.toggle('pg-toggle-on', _autocompleteEnabled); }
}

// ── OCaml formatter ───────────────────────────────────
// mllike has no indent() function, so we implement our own indenter.
function formatOCaml(src) {
  const N = 2;
  const saved = [];
  const P = m => '\x00' + (saved.push(m) - 1) + '\x00';

  // Protect block comments and string literals before touching whitespace
  let s = src
    .replace(/\(\*[^]*?\*\)/g, P)          // block comments (including multiline)
    .replace(/"(?:[^"\\]|\\.)*"/g, P);      // string literals

  // Normalise each line: strip leading indent (we'll re-add it), fix spacing
  const lines = s.split('\n').map(raw => {
    if (!raw.trim()) return '';
    let c = raw.trim();
    c = c.replace(/  +/g, ' ');             // collapse internal runs of spaces
    c = c.replace(/<-/g, '\x01');           // protect <- (assignment)
    c = c.replace(/\s*->\s*/g, ' -> ');
    c = c.replace(/\x01/g, '<-');
    c = c.replace(/\s*\|>\s*/g, ' |> ');
    c = c.replace(/\s*<>\s*/g, ' <> ');
    c = c.replace(/\s*<=\s*/g, ' <= ');
    c = c.replace(/\s*>=\s*/g, ' >= ');
    c = c.replace(/\s*::\s*/g, ' :: ');
    c = c.replace(/,(?!\s)/g, ', ');
    c = c.replace(/;(?!;)(?!\s)/g, '; ');
    return c.trimEnd();
  });

  // Re-indent with a simple stack-based engine
  const out = [];
  const stk = [0];          // indent-level stack
  let bd = 0;               // bracket depth ( [ {

  const top  = ()  => stk[stk.length - 1];
  const push = n   => stk.push(Math.max(n, 0));
  const pop  = ()  => { if (stk.length > 1) stk.pop(); };

  for (const line of lines) {
    if (!line) { out.push(''); continue; }

    const opens  = (line.match(/[({[]/g) || []).length;
    const closes = (line.match(/[)}\]]/g) || []).length;

    // True top-level: no bracket nesting, stack at root, starts with a top-level keyword
    const isTLD = bd === 0 && top() === 0 &&
      /^(let|type|exception|open|module|external|include)\b/.test(line);

    // Top-level 'and': only when stack is exactly [0, N] (one let-body deep, no nesting)
    const isTLAnd = bd === 0 && stk.length === 2 && top() === N && /^and\b/.test(line);

    let ind = top();

    // Dedent before outputting this line
    if (isTLAnd) {
      pop(); ind = top();                           // and → column 0
    } else if (/^[)}\]]/.test(line)) {
      pop(); ind = top();                           // closing bracket
    } else if (/^(end|done)\b/.test(line)) {
      pop(); ind = top();
    } else if (/^in\b/.test(line)) {
      pop(); ind = top();                           // close let-body
    } else if (/^else\b/.test(line)) {
      pop(); ind = top();                           // close then-body
    } else if (/^\|(?!\|)(?!>)/.test(line) && !isTLD && !isTLAnd) {
      ind = Math.max(0, top() - N);                // match arm: one step back
    }

    out.push(ind > 0 ? ' '.repeat(ind) + line : line);
    bd = Math.max(0, bd + opens - closes);

    // Decide indentation for the NEXT line
    const next = (isTLD || isTLAnd) ? N : ind + N;
    const t = line;

    if (/\b(begin|struct|sig|object|do|try|then|else|with|function)$/.test(t)) {
      push(next);
    } else if (/[^;]=\s*$/.test(t) && /^(let|and|external|val)\b/.test(line)) {
      push(next);                                   // let x = (body on next line)
    } else if (/->\s*$/.test(t) && !/^type\b/.test(line)) {
      push(next);                                   // match arm or fun with body on next line
    } else if (/[({[]\s*$/.test(t)) {
      push(ind + N);                                // open bracket at end of line
    }

    // ;; resets to top level
    if (/;;\s*$/.test(t)) { while (stk.length > 1) pop(); bd = 0; }
  }

  return out.join('\n')
    .replace(/\x00(\d+)\x00/g, (_, i) => saved[+i])
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd() + '\n';
}

function prettifyCode() {
  if (!_editor) return;
  const cursor = _editor.getCursor();
  _editor.setValue(formatOCaml(_editor.getValue()));
  _editor.setCursor({ line: Math.min(cursor.line, _editor.lineCount() - 1), ch: cursor.ch });
  _editor.focus();
}

// ── Smart Enter ───────────────────────────────────────
// Inserts a newline and sets the correct OCaml indentation for the next line.
function smartEnter(cm) {
  const cursor  = cm.getCursor();
  const full    = cm.getLine(cursor.line);
  const before  = full.slice(0, cursor.ch).trim();
  const indent  = full.match(/^(\s*)/)[1];

  let next = indent;
  if (/\b(then|begin|do|try|struct|sig|object|function|else|with)$/.test(before) ||
      (/->\s*$/.test(before) && !/^type\b/.test(before)) ||
      (/^(let|and)\b.*[^;]=\s*$/.test(before))) {
    next = indent + '  ';
  }
  cm.replaceSelection('\n' + next);
  cm.scrollIntoView(null);
}

// ── Auto-dedent closing keywords ──────────────────────
// When a line contains ONLY a closing keyword (else/end/done/in),
// snaps it to the matching opener's indentation level.
let _adjusting = false;
function autoAdjustIndent(cm) {
  if (_adjusting) return;
  const cursor  = cm.getCursor();
  const raw     = cm.getLine(cursor.line);
  const trimmed = raw.trim();
  const m       = trimmed.match(/^(else|end|done|in)\s*$/);
  if (!m) return;
  const kw      = m[1];
  const curCol  = raw.match(/^(\s*)/)[1].length;
  const correct = findMatchingIndent(cm, cursor.line, kw);
  if (correct === null || correct === curCol) return;

  _adjusting = true;
  cm.operation(() => {
    const newLine = ' '.repeat(correct) + trimmed.trimEnd();
    cm.replaceRange(newLine,
      { line: cursor.line, ch: 0 },
      { line: cursor.line, ch: raw.length });
    cm.setCursor({ line: cursor.line, ch: correct + trimmed.trimEnd().length });
  });
  _adjusting = false;
}

// Scan backwards for the line that opened the block this keyword closes.
function findMatchingIndent(cm, fromLine, kw) {
  const openers = {
    else: /\b(then|if)\b/,
    end:  /\b(begin|struct|sig|object)\b/,
    done: /\b(for|while|do)\b/,
    in:   /\blet\b/,
  };
  const pat = openers[kw];
  if (!pat) return null;
  for (let i = fromLine - 1; i >= 0; i--) {
    const l = cm.getLine(i);
    if (!l.trim()) continue;
    if (pat.test(l)) return l.match(/^(\s*)/)[1].length;
  }
  return 0;
}

// ── Comment toggle (Ctrl+/) ───────────────────────────
function toggleComment(cm) {
  const from = cm.getCursor('from');
  const to   = cm.getCursor('to');
  cm.operation(() => {
    for (let i = from.line; i <= to.line; i++) {
      const raw    = cm.getLine(i);
      const indent = raw.match(/^(\s*)/)[1];
      const inner  = raw.trim();
      if (!inner) continue;
      const isCommented = /^\(\*\s?[\s\S]*?\s?\*\)$/.test(inner);
      const newLine = isCommented
        ? indent + inner.replace(/^\(\*\s?/, '').replace(/\s?\*\)$/, '')
        : indent + '(* ' + inner + ' *)';
      cm.replaceRange(newLine,
        { line: i, ch: 0 },
        { line: i, ch: raw.length });
    }
  });
}

// ── Duplicate line (Alt+Shift+D) ─────────────────────
function duplicateLine(cm) {
  const cursor = cm.getCursor();
  const line   = cm.getLine(cursor.line);
  cm.replaceRange('\n' + line,
    { line: cursor.line, ch: line.length });
  cm.setCursor({ line: cursor.line + 1, ch: cursor.ch });
}

// ── Move line up / down (Alt+Up / Alt+Down) ───────────
function moveLineUp(cm) {
  const c = cm.getCursor();
  if (c.line === 0) return;
  const a = cm.getLine(c.line - 1), b = cm.getLine(c.line);
  cm.operation(() => {
    cm.replaceRange(b, { line: c.line - 1, ch: 0 }, { line: c.line - 1, ch: a.length });
    cm.replaceRange(a, { line: c.line,     ch: 0 }, { line: c.line,     ch: b.length });
    cm.setCursor({ line: c.line - 1, ch: c.ch });
  });
}

function moveLineDown(cm) {
  const c = cm.getCursor();
  if (c.line >= cm.lineCount() - 1) return;
  const a = cm.getLine(c.line), b = cm.getLine(c.line + 1);
  cm.operation(() => {
    cm.replaceRange(b, { line: c.line,     ch: 0 }, { line: c.line,     ch: a.length });
    cm.replaceRange(a, { line: c.line + 1, ch: 0 }, { line: c.line + 1, ch: b.length });
    cm.setCursor({ line: c.line + 1, ch: c.ch });
  });
}

// ── Zoom ─────────────────────────────────────────────
let _editorFontSize  = parseInt(localStorage.getItem('pg-editor-zoom')  || '13', 10);
let _consoleFontSize = parseInt(localStorage.getItem('pg-console-zoom') || '13', 10);

function applyZoom() {
  if (_editor) { _editor.getWrapperElement().style.fontSize = _editorFontSize + 'px'; _editor.refresh(); }
  const logEl = document.getElementById('pg-log');
  const infoEl = document.getElementById('pg-info-content');
  if (logEl)  logEl.style.fontSize  = _consoleFontSize + 'px';
  if (infoEl) infoEl.style.fontSize = _consoleFontSize + 'px';
  const ev = document.getElementById('editor-zoom-val');
  const cv = document.getElementById('console-zoom-val');
  if (ev) ev.textContent = _editorFontSize  + 'px';
  if (cv) cv.textContent = _consoleFontSize + 'px';
}

function editorZoom(delta) {
  _editorFontSize = Math.max(9, Math.min(24, _editorFontSize + delta));
  localStorage.setItem('pg-editor-zoom', _editorFontSize);
  applyZoom();
}

function consoleZoom(delta) {
  _consoleFontSize = Math.max(9, Math.min(24, _consoleFontSize + delta));
  localStorage.setItem('pg-console-zoom', _consoleFontSize);
  applyZoom();
}

// ── Reset OCaml Interpreter ───────────────────────────
function resetOCaml() {
  if (typeof toplevelcallback !== 'undefined' && toplevelcallback.reset) {
    try { toplevelcallback.reset(); } catch(e) {}
  }
  clearTypeWidgets();
  clearErrorHighlights();
  const logEl = document.getElementById('pg-log');
  if (logEl) logEl.innerHTML = '<span class="pg-log-empty">Interpreter reset.</span>';
  const infoEl = document.getElementById('pg-info-content');
  if (infoEl) infoEl.innerHTML = '<span class="pg-info-empty">Run your code to see types.</span>';
  closeSettings();
}

// ── Escape closes settings ────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSettings();
});

// ── Output renderer ───────────────────────────────────
// Type/signature lines go to #pg-info-content; stdout/errors stay in the log.
function esc(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function renderTypeDecl(line) {
  const vm = line.match(/^(val\s+)(\S+)(\s*:\s*)(.+?)(\s*=\s*)(.*)$/);
  if (vm) return '<span class="pgo-decl"><span class="pgo-kw">val</span> <span class="pgo-name">' + esc(vm[2]) + '</span><span class="pgo-sep"> : </span><span class="pgo-ty">' + esc(vm[4].trim()) + '</span><span class="pgo-sep"> = </span><span class="pgo-val">' + esc(vm[6].trim()) + '</span></span>';
  const dm = line.match(/^(-\s*:\s*)(.+?)(\s*=\s*)(.*)$/);
  if (dm) return '<span class="pgo-decl"><span class="pgo-kw">-</span><span class="pgo-sep"> : </span><span class="pgo-ty">' + esc(dm[2].trim()) + '</span><span class="pgo-sep"> = </span><span class="pgo-val">' + esc(dm[4].trim()) + '</span></span>';
  const tm = line.match(/^(type\s+)(\S+)(\s*=\s*)(.*)$/);
  if (tm) return '<span class="pgo-decl"><span class="pgo-kw">type</span> <span class="pgo-ty">' + esc(tm[2]) + '</span><span class="pgo-sep"> = </span><span class="pgo-val">' + esc(tm[4]) + '</span></span>';
  return null;
}

function renderOutput(logEl, text) {
  const trimmed  = (text || '').trim();
  const infoEl   = document.getElementById('pg-info-content');

  if (!trimmed) {
    logEl.innerHTML = '<span class="pg-log-empty">(no output)</span>';
    if (infoEl) infoEl.innerHTML = '<span class="pg-info-empty">Run your code to see types.</span>';
    return;
  }

  const logLines  = [];
  const infoLines = [];

  trimmed.split('\n').forEach(line => {
    const decl = renderTypeDecl(line);
    if (decl) { infoLines.push(decl); return; }
    if (/^(Error|Exception|Fatal|Runtime exception|Failure|File\s+")/i.test(line)) {
      logLines.push('<span class="pgo-err">' + esc(line) + '</span>');
      return;
    }
    logLines.push(esc(line));
  });

  logEl.innerHTML  = logLines.length  ? logLines.join('\n')  : '<span class="pg-log-empty">(no output)</span>';
  if (infoEl) infoEl.innerHTML = infoLines.length ? infoLines.join('\n') : '<span class="pg-info-empty">Run your code to see types.</span>';
}

// ── Type-info panel toggle ───────────────────────────
function toggleInfoPanel() {
  const panel = document.getElementById('pg-info-panel');
  if (!panel) return;
  const collapsed = panel.classList.toggle('collapsed');
  localStorage.setItem('pg-info-collapsed', collapsed ? '1' : '0');
}

// ── Background silent type-check ─────────────────────
function backgroundTypeCheck() {
  if (!_editor || !_ocamlReady) return;
  const outputEl = document.getElementById('output');
  outputEl.innerHTML = '';
  const ok = safeExec(getEditorValue());
  if (!ok) return;
  // setTimeout(0) — let the OCaml toplevel flush its DOM writes first
  setTimeout(() => {
    const out = getRuntimeOutputText();
    outputEl.innerHTML = '';
    if (!out) return;
    if (/^\s*(Error|File\s+")/m.test(out)) return;
    _typeWidgets.forEach(w => w.clear());
    _typeWidgets = [];
    Object.keys(_typeMap).forEach(k => delete _typeMap[k]);
    const editorLines = _editor.getValue().split('\n');
    out.split('\n').forEach(line => {
      const vm = line.match(/^val\s+(\S+)\s*:\s*(.+?)\s*=\s*.*$/);
      if (!vm) return;
      const name = vm[1], type = vm[2].trim();
      _typeMap[name] = type;
      for (let i = 0; i < editorLines.length; i++) {
        const m = editorLines[i].match(/^\s*let\s+(?:rec\s+)?(\S+)/);
        if (m && m[1] === name) {
          const el = document.createElement('div');
          el.className = 'pg-type-hint';
          el.textContent = type;
          _typeWidgets.push(_editor.addLineWidget(i, el, { above: true, noHScroll: true }));
          break;
        }
      }
    });
  }, 0);
}

// ── Inline type hints + type map ─────────────────────
let _typeWidgets = [];
const _typeMap = {};  // name → type, populated after each run

function clearTypeWidgets() {
  _typeWidgets.forEach(w => w.clear());
  _typeWidgets = [];
  Object.keys(_typeMap).forEach(k => delete _typeMap[k]);
  setTypeStatus('');
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function setTypeStatus(text) {
  const el = document.getElementById('pg-type-status');
  if (el) el.textContent = text;
}

function addTypeHints(outputText) {
  if (!_editor) return;
  clearTypeWidgets();
  const editorLines = _editor.getValue().split('\n');
  outputText.split('\n').forEach(line => {
    const vm = line.match(/^val\s+(\S+)\s*:\s*(.+?)\s*=\s*.*$/);
    if (!vm) return;
    const name = vm[1];
    const type = vm[2].trim();
    _typeMap[name] = type;   // store for hover/cursor display
    // find `let [rec] name` in editor
    let targetLine = -1;
    for (let i = 0; i < editorLines.length; i++) {
      const m = editorLines[i].match(/^\s*let\s+(?:rec\s+)?(\S+)/);
      if (m && m[1] === name) { targetLine = i; break; }
    }
    if (targetLine === -1) return;
    const el = document.createElement('div');
    el.className = 'pg-type-hint';
    el.textContent = type;
    _typeWidgets.push(_editor.addLineWidget(targetLine, el, { above: true, noHScroll: true }));
  });
}

// ── Error line highlighting ───────────────────────────
function clearErrorHighlights() {
  if (!_editor) return;
  for (let i = 0; i < _editor.lineCount(); i++) {
    _editor.removeLineClass(i, 'background', 'pg-error-line');
  }
}

function highlightErrors(text) {
  clearErrorHighlights();
  if (!_editor) return;
  const m = text.match(/[Ll]ine\s+(\d+)/);
  if (!m) return;
  const lineNo = parseInt(m[1], 10) - 1;
  if (lineNo >= 0 && lineNo < _editor.lineCount()) {
    _editor.addLineClass(lineNo, 'background', 'pg-error-line');
    _editor.scrollIntoView({ line: lineNo, ch: 0 }, 60);
  }
}

// ── Exercise loading ─────────────────────────────────
function loadExercise(id) {
  const ex = EXERCISES[id];
  if (!ex) return;
  _currentEx = id;

  clearTypeWidgets();
  clearErrorHighlights();
  setEditorValue(ex.starterCode);
  document.getElementById('editor-label').textContent = ex.filename;

  const badge = document.getElementById('pg-ex-badge');
  badge.textContent = ex.label;
  badge.style.display = '';

  document.getElementById('run-btn').textContent = 'Run Tests';

  document.getElementById('pg-body').classList.remove('no-exercise');
  renderTasks(ex.tests.map(t => ({ ...t, state: 'pending' })));
  document.getElementById('pg-log').innerHTML = '<span class="pg-log-empty">Run your code to see output.</span>';
}

function renderTasks(tasks) {
  document.getElementById('pg-tasks').innerHTML = tasks.map(t => `
    <div class="pg-task ${t.state}">
      <div class="pg-task-head">
        <span class="pg-task-icon">${t.state === 'pass' ? '✓' : t.state === 'fail' ? '✗' : '○'}</span>
        <span class="pg-task-name">${t.name}</span>
      </div>
      ${t.state === 'fail' ? `<div class="pg-task-detail">expected "${t.expected}" but found "${t.got || 'nothing'}"</div>` : ''}
    </div>
  `).join('');
}

// ── OCaml runtime ────────────────────────────────────
function loadOCaml(cb) {
  if (_ocamlReady) { cb(); return; }
  _pendingCb = cb;
  if (_ocamlLoading) { return; }
  _ocamlLoading = true;
  const btn = document.getElementById('run-btn');
  const prevText = btn.textContent;
  btn.textContent = 'Loading OCaml...';
  btn.disabled = true;
  window.version = '5.1.1';
  const s = document.createElement('script');
  s.src = 'playground/toplevels/toplevel-5.1.1.js';
  s.onload = () => {
    let initError = null;
    // The toplevel JS sets window.onload to its init function.
    // Since we load the script dynamically the browser never fires it,
    // so we fire it manually to connect stdout → #output.
    if (typeof window.onload === 'function') {
      try {
        window.onload();
      } catch (err) {
        initError = err;
        console.error(err);
      }
    }
    const startedAt = Date.now();
    const timeoutMs = 10000;
    const poll = setInterval(() => {
      if (typeof executecallback !== 'undefined') {
        clearInterval(poll);
        _ocamlReady = true;
        _ocamlLoading = false;
        btn.textContent = prevText;
        btn.disabled = false;
        if (_pendingCb) { const fn = _pendingCb; _pendingCb = null; fn(); }
        return;
      }
      if (Date.now() - startedAt > timeoutMs) {
        clearInterval(poll);
        _ocamlLoading = false;
        btn.textContent = 'Failed to initialize OCaml';
        btn.disabled = false;
        console.error('OCaml runtime init timeout', initError);
      }
    }, 100);
  };
  s.onerror = () => {
    _ocamlLoading = false;
    btn.textContent = 'Failed to load OCaml';
    btn.disabled = false;
  };
  document.head.appendChild(s);
}

// ── Run ──────────────────────────────────────────────
function safeExec(code) {
  try { executecallback.execute('toplevel', code); return true; }
  catch(e) { return false; }
}

function getRuntimeOutputText() {
  const outputEl = document.getElementById('output');
  if (!outputEl) return '';
  let text = '';
  outputEl.childNodes.forEach(node => {
    // The OCaml toplevel mirrors user input into .sharp blocks.
    // Skip them so the log behaves like terminal output.
    if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('sharp')) return;
    text += node.textContent || '';
  });
  return text.replace(/\r/g, '');
}

function runCode() {
  loadOCaml(() => {
    const userCode = getEditorValue();
    const outputEl = document.getElementById('output');
    const logEl    = document.getElementById('pg-log');

    clearErrorHighlights();
    clearTypeWidgets();
    outputEl.innerHTML = '';
    const ok1 = safeExec(userCode);
    const compileOut = getRuntimeOutputText();

    if (_currentEx) {
      // Exercise mode: run tests
      const ex = EXERCISES[_currentEx];
      if (!ok1 || /error:/i.test(compileOut)) {
        renderOutput(logEl, compileOut.trim() || 'Runtime error — try reloading the page.');
        highlightErrors(compileOut);
        renderTasks(ex.tests.map(t => ({ ...t, state: 'fail', got: 'compile error' })));
        return;
      }
      addTypeHints(compileOut);
      outputEl.innerHTML = '';
      const ok2 = safeExec(ex.testCode);
      const raw = getRuntimeOutputText().trim();
      if (!ok2 && !raw) {
        renderOutput(logEl, 'Test runner crashed — try reloading the page.');
        renderTasks(ex.tests.map(t => ({ ...t, state: 'fail', got: 'runtime error' })));
        return;
      }
      renderOutput(logEl, raw);
      const lines = raw === '' ? [] : raw.split('\n').map(l => l.trim());
      renderTasks(ex.tests.map((t, i) => ({
        ...t, got: lines[i] || '',
        state: (lines[i] || '') === t.expected ? 'pass' : 'fail',
      })));
    } else {
      // Free mode: render type info in output + inline hints in editor
      if (/error:/i.test(compileOut)) {
        highlightErrors(compileOut);
      } else {
        addTypeHints(compileOut);
      }
      renderOutput(logEl, compileOut);
    }
  });
}

// ── Tab key ──────────────────────────────────────────
document.getElementById('pg-editor').addEventListener('keydown', e => {
  if (_editor) return;
  if (e.key === 'Tab') {
    e.preventDefault();
    const el = e.target, start = el.selectionStart;
    el.value = el.value.slice(0, start) + '  ' + el.value.slice(el.selectionEnd);
    el.selectionStart = el.selectionEnd = start + 2;
  }
});

// ── Upload .ml file ───────────────────────────────────
document.getElementById('ml-upload').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const name = file.name.endsWith('.ml') ? file.name : file.name + '.ml';
    addTab(name, ev.target.result);
  };
  reader.readAsText(file);
  e.target.value = '';
});

// ── Init ─────────────────────────────────────────────
initEditor();
applyZoom();
const _initParams = new URLSearchParams(window.location.search);
const _initEx = _initParams.get('exercise');
const _initSharedRaw = _initParams.get('code');
const _initShared = _initSharedRaw ? _decodeShareCode(_initSharedRaw) : null;
if (_initEx && EXERCISES[_initEx]) {
  if (!restoreTabs()) {
    _tabs = [{ id: Date.now(), name: 'scratch.ml', content: '' }];
    saveTabs();
  }
  renderTabBar();
  loadExercise(_initEx);
} else if (_initShared !== null) {
  // Shared link: load shared code into a new tab, preserving any prior tabs
  if (!restoreTabs()) {
    const did = Date.now();
    _tabs = [{ id: did, name: 'scratch.ml', content: '' }];
    _activeTab = 0;
    localStorage.setItem(tabKey(did), '');
  }
  const sid = Date.now() + 1;
  _tabs.push({ id: sid, name: 'shared.ml', content: _initShared });
  _activeTab = _tabs.length - 1;
  localStorage.setItem(tabKey(sid), _initShared);
  saveTabs();
  setEditorValue(_initShared);
  document.getElementById('editor-label').textContent = 'shared.ml';
  document.getElementById('pg-body').classList.add('no-exercise');
  renderTabBar();
  rebuildLocalVars();
  try {
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('code');
    window.history.replaceState({}, '', cleanUrl.toString());
  } catch {}
} else {
  // Free mode: restore tabs or create a default one
  if (!restoreTabs()) {
    const defaultCode = '(* Write your OCaml here *)\n\nlet () =\n  Printf.printf "Hello, OCaml!\\n"\n';
    const id = Date.now();
    _tabs = [{ id, name: 'scratch.ml', content: defaultCode }];
    _activeTab = 0;
    localStorage.setItem(tabKey(id), defaultCode);
    saveTabs();
  }
  setEditorValue(_tabs[_activeTab].content);
  document.getElementById('editor-label').textContent = _tabs[_activeTab].name;
  document.getElementById('pg-body').classList.add('no-exercise');
  renderTabBar();
  rebuildLocalVars();
}

// Restore info panel collapsed state
if (localStorage.getItem('pg-info-collapsed') === '1') {
  const panel = document.getElementById('pg-info-panel');
  if (panel) panel.classList.add('collapsed');
}

// Auto-save active tab content on every edit
if (_editor) {
  _editor.on('change', saveCurrentTabContent);
}

// Preload OCaml runtime on page load so first run is immediate.
loadOCaml(() => { backgroundTypeCheck(); });
