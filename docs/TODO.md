5\. Egzersiz sistemi: iyi başlangıç ama öğrenmeyi kilitlemek için yetmez



Ana sayfa 6 coding challenge ve 33 drag-and-drop mini exercise söylüyor. Bu iyi, ama şu risk var:



Drag-and-drop egzersizler recognition üretir; ama production becerisi üretmeyebilir.



Yani öğrenci doğru parçayı doğru yere sürükleyebilir ama boş dosyada aynı kodu yazamayabilir.



Bu yüzden egzersizleri 5 tipe ayırmanı öneririm:



5.1. Predict egzersizi



Kod ver:



let x = 1

let f () = x

let x = 2

f ()



Sor:



Sonuç ne?

Neden?

Closure hangi x’i capture etti?



Bu, lexical scope + closure için mükemmel.



5.2. Type prediction egzersizi



Kod ver:



let f x y = x



Sor:



Type ne?

'a -> 'b -> 'a neden?

Neden int -> int -> int değil?



Bu, type inference için çok güçlü.



5.3. Fix the compiler error



Hatalı kod ver, öğrenci düzeltsin.



let head xs =

&#x20; match xs with

&#x20; | x :: \_ -> x



Sor:



Neden warning var?

Bunu option ile nasıl güvenli yaparsın?

5.4. Complete the function



Klasik coding challenge:



let rec map f xs =

&#x20; ...



Ama hidden test olmalı. Sadece “cevabı göster” değil, gerçek test feedback’i lazım.



5.5. Refactor egzersizi



Imperative kod ver:



let total = ref 0

...



Bunu fold ile yazdır.



Bu özellikle Java/C/Python geçmişi olan biri için çok iyi olur.

