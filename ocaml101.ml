(* ============================================================ *)
(*                     OCaml 101 - Cheat Sheet                  *)
(* ============================================================ *)
 
 
(* ===== 1. BINDINGS ===== *)
 
(* Variables are immutable bindings — not boxes, but labels.
   Once bound, the value never changes. *)
let x = 42
let name = "Mehmet"
 
(* With explicit type annotation: *)
let y : int = 42
let pi : float = 3.14
 
(* Shadowing: you can re-bind a name, the old value is not destroyed,
   just hidden. x below is a NEW binding, not a mutation. *)
let x = 100
 
 
(* ===== 2. BASIC TYPES ===== *)
 
(* int, float, bool, string, char *)
let a : int    = 10
let b : float  = 3.14
let c : bool   = true
let d : string = "hello"
let e : char   = 'A'
 
(* IMPORTANT: int and float are strictly separate.
   You cannot mix them without explicit conversion. *)
let result = float_of_int a *. b   (* int -> float, then multiply *)
let back   = int_of_float b        (* float -> int *)
 
 
(* ===== 3. ARITHMETIC OPERATORS ===== *)
 
(* int operators:   +   -   *   /   mod  *)
let sum  = 3 + 4
let diff = 10 - 3
let prod = 4 * 5
let div  = 10 / 3    (* integer division, result: 3 *)
let rem  = 10 mod 3  (* remainder, result: 1 *)
 
(* float operators: +.  -.  *.  /.  *)
let fsum  = 3.0 +. 4.0
let fprod = 3.0 *. 4.0
 
 
(* ===== 4. COMPARISON OPERATORS ===== *)
 
(* =   equal          (not == like Java) *)
(* <>  not equal      (not != like Java) *)
(* <   less than                         *)
(* >   greater than                      *)
(* <=  less or equal                     *)
(* >=  greater or equal                  *)
let is_equal    = 3 = 3    (* true *)
let is_notequal = 3 <> 4   (* true *)
 
 
(* ===== 5. IF / ELSE ===== *)
 
(* if is an EXPRESSION, not a statement — it always returns a value.
   else is mandatory. Both branches must return the same type. *)
let abs_val x = if x >= 0 then x else -x
 
(* Can be used inline: *)
let label = if a > 5 then "big" else "small"
 
 
(* ===== 6. FUNCTIONS ===== *)
 
(* Basic function declaration: *)
let square x = x * x
 
(* With type annotations: *)
let square (x : int) : int = x * x
 
(* Functions are values too. Their type is written as: input -> output *)
(* val square : int -> int = <fun> *)
 
(* Multiple arguments — each separated by space, not comma: *)
let add x y = x + y
(* val add : int -> int -> int = <fun> *)
 
(* Calling a function — no parentheses needed unless grouping: *)
let result = square 5
let result = add 3 4
let result = add (square 3) 4   (* parentheses for grouping *)
 
 
(* ===== 7. ANONYMOUS FUNCTIONS (LAMBDA) ===== *)
 
(* fun <arg> -> <body> *)
let double = fun x -> x * 2
 
(* Commonly used inline: *)
(* List.map (fun x -> x * 2) [1;2;3] *)
 
 
(* ===== 8. LOCAL DECLARATIONS ===== *)
 
(* let <name> = <expr> in <expr>
   The binding only exists inside the 'in' part. *)
let power8 x =
  let a = x * x in    (* a is only visible below this line *)
  let b = a * a in    (* b is only visible below this line *)
  b * b
 
 
(* ===== 9. RECURSIVE FUNCTIONS ===== *)
 
(* Must use 'let rec' keyword.
   Return type annotation is required to help the compiler. *)
let rec factorial (n : int) : int =
  if n = 0 then 1
  else n * factorial (n - 1)
 
(* 'rec' tells OCaml: "this function refers to itself,
    not a previous binding with the same name." *)
 
 
(* ===== 10. TUPLES ===== *)
 
(* A fixed-size collection of values, can have different types.
   Separated by commas, type written with * between types. *)
let point = (3, 4)              (* type: int * int *)
let person = ("Mehmet", 25)     (* type: string * int *)
let mixed = (1, true, "hello")  (* type: int * bool * string *)
 
(* Destructuring with Cartesian pattern: *)
let (px, py) = point            (* px = 3, py = 4 *)
 
(* In function arguments: *)
let distance (x, y) = x * x + y * y
 
(* With type annotations in arguments: *)
let greet ((name : string), (age : int)) =
  name ^ " is " ^ string_of_int age
 
 
(* ===== 11. LISTS ===== *)
 
(* Ordered collection of values — all elements must be the same type.
   Elements separated by semicolons. *)
let nums  = [1; 2; 3; 4; 5]
let names = ["Alice"; "Bob"; "Charlie"]
 
(* :: is the "cons" operator — prepend an element to a list *)
let more = 0 :: nums    (* [0; 1; 2; 3; 4; 5] *)
 
(* Lists are made of head (first element) and tail (rest of list):
   [1; 2; 3]  =  1 :: 2 :: 3 :: []   *)
 
(* Accessing elements — NO index access like list[0].
   Use pattern matching instead: *)
let rec sum_list = function
  | []           -> 0
  | head :: tail -> head + sum_list tail
 
 
(* ===== 12. PATTERN MATCHING ===== *)
 
(* match <expr> with
   | <pattern> -> <expr>
   | <pattern> -> <expr>
   ...
   All cases must be covered (exhaustive). *)
 
let describe n =
  match n with
  | 0 -> "zero"
  | 1 -> "one"
  | _ -> "many"    (* _ is wildcard — matches anything *)
 
(* Shorthand: 'function' = match on the implicit last argument *)
let describe = function
  | 0 -> "zero"
  | 1 -> "one"
  | _ -> "many"
 
 
(* ===== 13. SUM TYPES (ALGEBRAIC DATA TYPES) ===== *)
 
(* Define a type that can be ONE OF several variants.
   Each variant can carry different data. *)
type shape =
  | Circle    of float
  | Rectangle of float * float
  | Triangle  of float * float
 
(* Pattern match on variants — compiler enforces exhaustiveness: *)
let area = function
  | Circle r        -> 3.14 *. r *. r
  | Rectangle (w, h) -> w *. h
  | Triangle (b, h)  -> 0.5 *. b *. h
 
(* Adding a new variant? Every match must handle it — compile error if not. *)
 
 
(* ===== 14. GENERIC TYPES (POLYMORPHISM) ===== *)
 
(* 'a is a type parameter — like <T> in Kotlin/Java.
   The function works for any type. *)
 
(* Example from standard library: *)
(* type 'a option = Some of 'a | None *)
 
let safe_div a b =
  if b = 0 then None
  else Some (a / b)
(* val safe_div : int -> int -> int option *)
 
(* Unwrap with pattern matching: *)
let result = match safe_div 10 2 with
  | None   -> "division by zero"
  | Some v -> "result: " ^ string_of_int v
 
 
(* ===== 15. FUNCTION TYPES & HIGHER-ORDER FUNCTIONS ===== *)
 
(* Functions have types too: int -> int, float -> float -> float, etc.
   A function that takes another function is called higher-order. *)
 
(* apply takes a function f and a value x, returns f(x) *)
let apply f x = f x
(* val apply : ('a -> 'b) -> 'a -> 'b *)
 
(* Pass a function as argument: *)
let result = apply square 5       (* 25 *)
let result = apply (fun x -> x * 3) 5   (* 15 *)
 
(* Common higher-order functions on lists: *)
(* List.map    : ('a -> 'b) -> 'a list -> 'b list  *)
(* List.filter : ('a -> bool) -> 'a list -> 'a list *)
(* List.fold_left : ('a -> 'b -> 'a) -> 'a -> 'b list -> 'a *)
 
let doubled  = List.map (fun x -> x * 2) [1;2;3]       (* [2;4;6] *)
let evens    = List.filter (fun x -> x mod 2 = 0) [1;2;3;4];;  (* [2;4] *)
 
 
(* ===== 16. PRINTING ===== *)
 
(* Basic print functions: *)
print_int 42;;
print_float 3.14;;
print_string "hello";;
print_newline ();;
 
(* Formatted print (like printf in C): *)
Printf.printf "Name: %s, Age: %d, Score: %.2f\n" "Mehmet" 25 98.5;;
(* %s = string, %d = int, %f = float, %.2f = float with 2 decimal places *)