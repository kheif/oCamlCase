(* ===== TYPES ===== *)

(* Define a sum type called account_type with 3 variants: Checking, Savings, Student *)
type account_type = Checking | Savings | Student;;


(* ===== DATA ===== *)

(* Define an account tuple: (owner: string, balance: float, account_type) *)
(* Create at least 3 accounts with different types *)
let account_saving = ("Mehmet", 900.0, Savings);;
let account_checking = ("Tuna", 1000.0, Checking);;
let account_student = ("Alp", 1100.0, Student);;


(* Create a list of all accounts *)
let accounts = [account_saving; account_checking; account_student];;


(* ===== FUNCTIONS ===== *)

(* 1. interest_rate: takes an account_type, returns the interest rate as float *)
(* Savings -> 0.05, Checking -> 0.02, Student -> 0.0 *)
(* Hint: use match *)
let interest_rate at = match at with
  | Savings -> 0.05
  | Checking -> 0.02
  | Student -> 0.0;;


(* 2. apply_interest: takes an account tuple, returns new balance after interest *)
(* Hint: use interest_rate inside, use let...in for intermediate steps *)
let apply_interest (_, balance, at) =
  let rate = interest_rate at in
  let interest = balance *. rate in
  balance +. interest;;


(* 3. deposit: takes an account tuple and an amount (float), returns new balance *)
let deposit (_, balance, _) amount = balance +. amount;;


(* 4. withdraw: takes an account tuple and an amount (float), returns new balance *)
(* If balance is sufficient, subtract amount. Otherwise return balance unchanged *)
(* Hint: use if/else *)
let withdraw (_, balance, _) amount =
  if balance >= amount then balance -. amount
  else balance;;


(* 5. total_balance: takes a list of accounts, returns sum of all balances *)
(* Hint: use let rec and match with head :: tail *)
let rec total_balance = function
  | [] -> 0.0
  | (_, balance, _) :: tail -> balance +. total_balance tail;;


(* ===== RUN ===== *)

(* Print the results of apply_interest for each account *)
Printf.printf "Mehmet after interest: %.2f\n" (apply_interest account_saving);;
Printf.printf "Tuna after interest: %.2f\n" (apply_interest account_checking);;
Printf.printf "Alp after interest: %.2f\n" (apply_interest account_student);;

(* Print total_balance of all accounts *)
Printf.printf "Total balance: %.2f\n" (total_balance accounts);;