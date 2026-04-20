(* my_list.ml
   When compiled, this file becomes the My_list module.
   Access functions as: My_list.map, My_list.filter, etc. *)

(* length : 'a list -> int *)
let length lst =
  let rec helper acc = function
    | [] -> acc
    | _ :: tail -> helper (acc + 1) tail
  in
  helper 0 lst

(* rev : 'a list -> 'a list *)
let rev lst =
  let rec helper acc = function
    | [] -> acc
    | head :: tail -> helper (head :: acc) tail
  in
  helper [] lst

(* append : 'a list -> 'a list -> 'a list *)
let append lst1 lst2 =
  let rec helper acc = function
    | [] -> acc
    | head :: tail -> helper (head :: acc) tail
  in
  helper lst2 (rev lst1)

(* map : ('a -> 'b) -> 'a list -> 'b list *)
let map f lst =
  let rec helper acc = function
    | [] -> rev acc
    | head :: tail -> helper (f head :: acc) tail
  in
  helper [] lst

(* iter : ('a -> unit) -> 'a list -> unit *)
let rec iter f = function
  | [] -> ()
  | head :: tail -> f head; iter f tail

(* filter : ('a -> bool) -> 'a list -> 'a list *)
let filter pred lst =
  let rec helper acc = function
    | [] -> rev acc
    | head :: tail ->
      if pred head then helper (head :: acc) tail
      else helper acc tail
  in
  helper [] lst

(* exists : ('a -> bool) -> 'a list -> bool *)
let rec exists pred = function
  | [] -> false
  | head :: tail -> pred head || exists pred tail

(* for_all : ('a -> bool) -> 'a list -> bool *)
let rec for_all pred = function
  | [] -> true
  | head :: tail -> pred head && for_all pred tail

(* mem : 'a -> 'a list -> bool *)
let rec mem x = function
  | [] -> false
  | head :: tail -> head = x || mem x tail

(* nth : 'a list -> int -> 'a *)
let rec nth lst n =
  match lst with
  | [] -> failwith "index out of bounds"
  | head :: tail -> if n = 0 then head else nth tail (n - 1)

(* find_index : 'a -> 'a list -> int *)
let find_index x lst =
  let rec helper i = function
    | [] -> failwith "not found"
    | head :: tail -> if head = x then i else helper (i + 1) tail
  in
  helper 0 lst

(* flatten : 'a list list -> 'a list *)
let flatten lst =
  let rec helper acc = function
    | [] -> rev acc
    | head :: tail -> helper (append (rev head) acc) tail
  in
  helper [] lst

(* fold_left : ('a -> 'b -> 'a) -> 'a -> 'b list -> 'a *)
let rec fold_left f acc = function
  | [] -> acc
  | head :: tail -> fold_left f (f acc head) tail

(* fold_right : ('a -> 'b -> 'b) -> 'a list -> 'b -> 'b *)
let rec fold_right f lst acc =
  match lst with
  | [] -> acc
  | head :: tail -> f head (fold_right f tail acc)
