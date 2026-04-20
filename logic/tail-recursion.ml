(* Tail Recursion

   A recursive function is tail recursive if the recursive call
   is the very last thing it does. The result is returned directly,
   with no further work on top of it.

   Tail recursive example: countdown *)

let rec countdown (n : int) : unit =
  if n = 0 then print_endline "done"
  else countdown (n - 1)

(* countdown(n-1) is called and nothing happens after it.
   The last operation is the recursive call itself -> tail recursive. *)


(* Not tail recursive: factorial *)

let rec factorial (n : int) : int =
  if n = 0 then 1 else n * factorial (n - 1)

(* factorial(n-1) is called, but then its result gets multiplied by n.
   The recursive call must finish first, and then a multiplication happens on top.
   The last operation is the multiplication, not the call -> not tail recursive. *)


(* Why does it matter?

   In a normal recursive call, each invocation adds a new frame
   to the call stack. For large n, this risks a stack overflow.

   In a tail recursive call, the compiler can reuse the current
   stack frame instead of creating a new one. This is `called
   tail call optimization`. Memory usage stays constant regardless
   of how deep the recursion goes.

   Rule of thumb: if you return the recursive call's result untouched,
   it is tail recursive. If you do anything with that result before
   returning, it is not. *)
