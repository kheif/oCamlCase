(* Abstractions

   An abstraction is an expression that represents a function without
   giving it a name. Other languages call this a lambda. In OCaml
   the syntax is: fun <arg> -> <expr>

   The result is a value of a function type, just like any other value. *)


(* Single argument *)

let _ = fun x -> x * x
(* type: int -> int
   Takes x, returns x squared. No name, no binding, just a value. *)


(* Applying immediately *)

let _ = (fun x -> x * x) 7
(* = 49
   Define the function and call it with 7 in the same expression.
   Useful when you need a function once and do not want to name it. *)


(* Tuple argument *)

let _ = fun (x, y) -> x * y
(* type: int * int -> int
   Takes a pair, returns the product. The argument is a single tuple,
   not two separate arguments. *)


(* Applying immediately with a tuple *)

let _ = (fun (x, y) -> x * y) (6, 7)
(* = 42 *)


(* Relation to let bindings

   These two definitions are completely equivalent: *)

let square x = x * x
let square' = fun x -> x * x

(* The let form is just syntactic sugar. Under the hood, naming a
   function and binding an abstraction to a name are the same thing.
   The abstraction is the more fundamental form. *)


(* Why this matters

   In OCaml, functions are first-class values. They can be passed as
   arguments, returned from other functions, and stored in data structures.
   Abstractions make this natural: you can produce a function on the fly
   without going through a let binding every time.

   This is the foundation for higher-order programming. *)
