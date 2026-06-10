1\. README’yi portfolio seviyesine getir



README’de şu bölümler olmalı:



What is oCamlCase?

Why I built it

Features

Tech stack

Learning path

Screenshots/GIFs

Local development

Roadmap



Özellikle screenshot/GIF çok önemli.

2. Ama SEO açısından şunlar eksik olabilir:



Her concept sayfasının kendi indexlenebilir HTML içeriği var mı?

İçerikler .html?raw olarak import ediliyor ve React içinde render ediliyor. Arama motorları modern JS’i işleyebilir ama statik pre-render yoksa bazı sayfalar zayıf indexlenebilir.

Canonical / Open Graph / Twitter cards var mı?

PageMeta component var gibi görünüyor ama detayını incelemeden kesin konuşamam. Eğer yoksa paylaşım preview’ları zayıf olur.

Sitemap ve robots.txt var mı?

Public klasörü var ama içeriğini görmedim. Eğitim sitesi için sitemap çok faydalı olur.

Başlıklar long-tail keyword taşımalı.

Mesela sadece “Bindings” yerine page title iyi ama H1/H2 seviyesinde şunlar yakalanmalı:

“OCaml let bindings”

“OCaml shadowing”

“OCaml pattern matching”

“OCaml type inference”

“OCaml tail recursion”

“OCaml fold examples”



Bu site özelinde SEO’nun hedefi “OCaml” genel kelimesinde yarışmak olmamalı. Orada ocaml.org, Real World OCaml ve manual çok güçlü. Senin hedefin uzun kuyruk olmalı: “ocaml pattern matching explained”, “ocaml currying example”, “ocaml type inference step by step”, “ocaml tree recursion exercise” gibi.

SEO dosyalarını tamamla

sitemap.xml

robots.txt

Open Graph image

per-page meta title/description

canonical URL



PageMeta varsa bile bunu test etmek lazım.


3. Ana sayfayı daha net yap



Şu an “Learn OCaml by example” güzel ama yeterince ayırt edici değil. Şunu öne çıkar:



OCaml’ı sadece syntax olarak değil, type system, recursion, closures ve evaluation modeliyle öğren.



Ana sayfaya 3 kart:



Concepts

Interactive Labs

Exercises

\- Labs kategorisi ekle



Static Semantics, Tree Lab ve Playground çok değerli. Bunları sidebar’da concept altına gömmek yerine “Labs” gibi ayrı konumlandırmak daha iyi olur.



\- Her sayfanın sonunda next/practice links koy



Bu öğrenme akışını çok güçlendirir.



Örnek:



You just learned pattern matching.

Next: Lists

Practice: Playlist exercise

Deep dive: Constructors and Exceptions

