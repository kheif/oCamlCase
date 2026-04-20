#use "my_list.ml"

let lst1 = [1; 2; 3; 4; 5; 6; 7; 8]
let lst2 = [9; 10; 11; 12; 13; 14; 15];;

let print_list label lst =
  Printf.printf "%s: " label;
  iter (fun x -> print_int x; print_char ' ') lst;
  print_newline ();;

Printf.printf "Length: %d\n" (length lst1);;
print_list "Reversed" (rev lst1);;
print_list "Appended" (append lst1 lst2);;
print_list "Doubled" (map (fun x -> x * 2) lst1);;
print_list "Evens" (filter (fun x -> x mod 2 = 0) lst1);;
Printf.printf "Exists >5: %b\n" (exists (fun x -> x > 5) lst1);;
Printf.printf "Exists >10: %b\n" (exists (fun x -> x > 10) lst1);;
Printf.printf "For all >0: %b\n" (for_all (fun x -> x > 0) lst1);;
Printf.printf "For all >5: %b\n" (for_all (fun x -> x > 5) lst1);;
Printf.printf "Mem 3: %b\n" (mem 3 lst1);;
Printf.printf "Mem 99: %b\n" (mem 99 lst1);;
Printf.printf "Nth 0: %d\n" (nth lst1 0);;
Printf.printf "Nth 4: %d\n" (nth lst1 4);;
Printf.printf "Find index 3: %d\n" (find_index lst1 3);;
Printf.printf "Find index 7: %d\n" (find_index lst1 7);;
