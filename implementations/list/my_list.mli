(* my_list.mli - module interface
   Defines what My_list exposes publicly. *)

val length    : 'a list -> int
val rev       : 'a list -> 'a list
val append    : 'a list -> 'a list -> 'a list
val map       : ('a -> 'b) -> 'a list -> 'b list
val iter      : ('a -> unit) -> 'a list -> unit
val filter    : ('a -> bool) -> 'a list -> 'a list
val exists    : ('a -> bool) -> 'a list -> bool
val for_all   : ('a -> bool) -> 'a list -> bool
val mem       : 'a -> 'a list -> bool
val nth        : 'a list -> int -> 'a
val find_index : 'a -> 'a list -> int
val flatten   : 'a list list -> 'a list
val fold_left : ('a -> 'b -> 'a) -> 'a -> 'b list -> 'a
val fold_right : ('a -> 'b -> 'b) -> 'a list -> 'b -> 'b
