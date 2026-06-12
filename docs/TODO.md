2\. En büyük pedagojik problem: sıralama



Bence sitenin en kritik problemi içerik sırası. Şu an ana akış şöyle gidiyor:



Bindings

Currying

Abstractions

Lexical Scope

Closures

Type Inference

Polymorphism

Pattern Matching

Lists

List Operations

Higher-Order Functions

Tail Recursion

Iteration

Derived Forms

Sorting

Constructors and Exceptions

Options and Result

Records

Trees

Mutability



Bu sıra teknik olarak “yanlış” değil, ama öğrenme psikolojisi açısından gereksiz bilişsel yük yaratıyor.



Currying çok erken geliyor



Bindings’ten hemen sonra currying gelmesi bana göre erken. Çünkü currying aslında şu kavramlara dayanıyor:



function value nedir?

anonymous function nedir?

function application nedir?

closure nedir?

function type sağa nasıl associate eder?

partial application gerçek hayatta niye işe yarar?



Currying sayfası kendi içinde iyi; ama öğrenci daha “fonksiyon bir value’dur” fikrine tam oturmadan int -> int -> int, partial application, labeled arguments, pipe ve composition görüyor.



Bu, öğrenciye şunu hissettirebilir:

“Daha let’i yeni öğrendim, şimdi neden fonksiyonlar zincir oldu, neden bir argüman verince fonksiyon dönüyor?”



Ben currying’i abstractions + lexical scope + closures’dan sonra koyardım.



Problem B: Constructors/Variants çok geç geliyor



Pattern matching 8. konsept, lists 9. konsept, options/result 17. konsept, constructors/exceptions 16. konsept. Bu biraz ters hissettiriyor.



OCaml’de pattern matching’i en iyi anlamak için “data shape” fikri erken verilmelidir. Yani:



type color = Red | Blue | Green



gibi basit variant’lar pattern matching ile birlikte öğretilirse, öğrenci match’i “if/switch alternatifi” olarak değil, veri şekline göre düşünme mekanizması olarak anlar.



Şu an pattern matching sayfası kendi içinde variant types anlatıyor; bu iyi. Ama ana sıra içinde “Constructors and Exceptions” ayrı konsept olarak çok sonra geliyor.



Bence “Constructors / Variants” exceptions’tan ayrılmalı ve pattern matching’den hemen önce/beraber gelmeli.



Problem C: Sorting 15. sırada ama data modeling konuları daha sonra



Sorting, merge sort, comparator, recursion tree gibi konular 15. konseptte geliyor; ama options/result, records, trees ve mutability daha sonra.



Sorting algoritma olarak faydalı ama öğrenme yolu açısından “capstone” gibi davranmalı. Önce öğrenci şunları rahat yapabilmeli:



variant tanımlamak

record tanımlamak

option/result kullanmak

recursive data structure okumak

pattern matching ile güvenli destructuring yapmak

fold/map/filter kullanmak



Sonra sorting gelirse çok daha anlamlı olur.

3. Benim önerdiğim yeni öğrenme sırası



Bence siteyi iki moda ayırmalısın:



Guided Path — sıfırdan öğrenenler için sıralı yol

Reference Mode — bilen kişi için hızlı konu listesi / cheat sheet



Mevcut içerik reference mode için iyi. Ama guided path ayrı düşünülmeli.



Benim önerdiğim sıra:



Phase 0 — Orientation



0\. How to learn OCaml on this site



Burada şunlar olmalı:



“Bu siteyi nasıl kullanmalısın?”

“Kodları nerede çalıştıracaksın?”

“Playground ne zaman kullanılmalı?”

“OCaml’de hata mesajları düşman değil, rehberdir.”

“Her konuda önce oku → tahmin et → çalıştır → değiştir → tekrar et.”



Bu sayfa şu an eksik. Öğrenci siteye girince içerik görüyor ama öğrenme stratejisi görmüyor.



Phase 1 — Values, expressions, bindings

Expressions and values

Let bindings

Local bindings and scope

Shadowing vs mutation



Bindings sayfası zaten iyi, ama öncesinde “OCaml’de her şey expression’dır” fikri daha açık kurulmalı. Çünkü if, match, let ... in gibi şeyleri anlamanın anahtarı bu.



Phase 2 — Functions as values

Function definitions

Anonymous functions

Function application

Lexical scope

Closures

Currying and partial application



Böyle olursa currying çok daha doğal gelir. Çünkü öğrenci önce “fonksiyon value’dur” der, sonra “fonksiyon environment capture eder” der, sonra “çok argümanlı fonksiyon aslında fonksiyon döndüren fonksiyondur” fikrine geçer.



Phase 3 — Types

Basic types

Type inference

Polymorphism

Type annotations

Reading compiler errors



Type inference sayfası güçlü bir konu; ama yanına mutlaka “type error clinic” koyardım. Çünkü OCaml öğrenen biri için asıl eğitim materyali compiler error’dur.



Phase 4 — Data modeling

Tuples

Variants / constructors

Pattern matching

Options

Results

Records



Burada amaç şu olmalı:

“OCaml’de program yazmak = data shape tasarlamak + o shape üzerinde total function yazmak.”



Bu cümle öğrenciye çok şey kazandırır.



Phase 5 — Recursion and collections

Lists

Structural recursion

List.map/filter/fold

Tail recursion

Trees

Sorting as capstone



Böylece sorting artık “havada algoritma” değil, önceki her şeyin birleştiği mini proje olur.



Phase 6 — Practical OCaml

Modules

Signatures

Functors

Dune

opam

Testing

Formatting

Small project structure



Bu kısım şu an sitede büyük ölçüde eksik. Halbuki gerçek OCaml kullanımı için çok önemli. Official OCaml docs’ta modules, değerler/fonksiyonlar ve basic data types/pattern matching sonrası gelen temel organizasyon mekanizması olarak anlatılıyor; Dune da OCaml derleme sürecinin düşük seviye detaylarını yöneten build system olarak konumlanıyor.

