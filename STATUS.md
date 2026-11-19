# news-image-20261119 — STATUS (19 Nov 2026, ~00:35 WIB; REVISI DESAIN 00:50 WIB)

Bounty: "Sum up 19 November's world news in one image" ($250, 50 places paid).
**Entry SIAP RENDER (news.json baru + entry.png/entry.svg terverifikasi) — BELUM SUBMIT.**
Repo GitHub + upload PNG + bundle/check/submit butuh browser, tahap berikutnya.

## REVISI DESAIN 2 — KEUNIKAN (19 Nov ~00:50 WIB, atas permintaan Gibran "berikan yang unik, ukuran font dll, pelajari tentang desain typography, seni, peletakan dll")
- Prinsip dipelajari dari sumber kredibel (condensed display: Erbar/LA Times 1936, Oswald/News Gothic; broken-grid: Samara, Brodovitch, Tarasovs) → `~/workspace/learning/news-image-design-principles.md` (bagian "Revisi 2 — keunikan").
- **4 keputusan pembeda:** (1) headline lead Noto Serif Display **Condensed Black 66px** (serif display vs body sans; masthead dikecilkan 42→34px tracking lebar = kontras skala ekstrem); (2) art lead **full-bleed 1024px** memecah grid margin; (3) **motif matahari faceted segi-8 berulang** — matahari besar di art + penanda mini di 3 judul seksi + pin peta segi-8 (bukan lingkaran); (4) kicker jadi **flag tab terra** ("GAMING · GLOBAL — LEAD", teks putih).
- **Jebakan teknis:** resvg TIDAK mengenali family "Noto Serif Display Condensed" (fallback lebar normal → headline meluber). Yang bekerja: family "Noto Serif Display" + `font-stretch="condensed"` + weight 900 (probe render membuktikan). Faktor lebar condensed Black terukur ~0,56em (bukan 0,46); tracking -1 membuat 26 karakter muat satu baris.
- **Hasil render revisi 2:** tier 1 (artH=160 mapH=60), bottom y=1016, entry.png **853 KiB** (< 1 MiB ✓), 31 cerita + 8 pin. Determinisme: **2× run sha256 identik** — `ae15df721b402e4c27a2a823a4b1c8de233b6c36a3dfa208c659cb92c809943d`. Cek visual: headline condensed Black satu baris penuh, masthead tenang, art full-bleed, pin segi-8 + penanda matahari terlihat, semua teks tetap terbaca.

## REVISI DESAIN (19 Nov ~00:50 WIB, atas kritik Gibran)
Kritik Gibran (ilustrator + mahasiswa Seni Rupa): "kurang eyecatch, ga kek desain
yang bisa dibaca, keterbacaannya kurang, ukuran kanvasnya aneh".
- **Kanvas 1024×1024 TIDAK bisa diubah** (syarat bounty) — solusinya: desain
  persegi itu seperti sampul, bukan koran lebar yang dipadatkan.
- Prinsip dipelajari dari sumber kredibel (Watson/SND, Bringhurst, Lupton, Tim Brown,
  WCAG 2.2, studentreporter.org, lemon-web.net) → `~/workspace/learning/news-image-design-principles.md`.
- Perubahan di generate.mjs: **focal point** — headline lead 46→58px, masthead
  48→42px (lead kini jelas lebih besar dari nama koran), art lead 84→160px;
  **skala tipografi modular** 58/42/20/16/15/13,5 (dulu 8 ukuran, langkah 46→48
  tidak terasa); **kontras** — tanggal TERRA→#A84E28 (2,95:1→4,5:1), dek
  MUTED→#3D2C1E (~11:1), pin/badge TERRA→#B25A30 (angka putih 4,8:1);
  **ruang napas** — gap antar seksi dilonggarkan, leading brief 17→18;
  **art lead BARU Vice City** (skyline art-deco senja, matahari rendah, palem,
  speedboat di teluk) menggantikan art jembatan lama yang tidak nyambung dengan
  lead GTA VI; pin peta di-clamp agar tidak terpotong tepi (pin 14 Alaska kini
  bersih di dalam peta); tier adaptif baru artH/mapH [160,64]/[140,58]/[120,52].
- **Hasil render revisi:** layout ok (tier artH=160 mapH=64), bottom y=1016,
  entry.png **868 KiB** (< 1 MiB ✓), 31 cerita (lead 1 + grid 12 + brief 18),
  8 pin. Determinisme: **2× run sha256 identik** —
  `1b531d1600b46cbbf4beb706a3c1ea46382237ea0b02c6e275075ce5265587ff`.
- Cek visual: mata langsung tertuju ke headline lead + blok art; semua teks
  terbaca (dek gelap, tanggal kontras, grid + brief lega); halaman tidak sesak;
  skyline Vice City terbaca (menara bervariasi + jendela menyala + beacon),
  palem + perahu terbaca; peta + 8 pin jelas tanpa tumpukan.

## Status edisi (dicek 19 Nov 00:08–00:15 WIB)
- **BELUM DIBUKA.** API: `GET https://make.fun/api/competitions/news-image-20261119`
  → `{"success":false,"error":[{"message":"no competition news-image-20261119"}]}`.
- Kit: `curl https://make.fun/c/news-image-20261119/kit` → **404** (belum tersedia).
- Perkiraan buka: **19 Nov 00:00 UTC = 07:00 WIB** (pola edisi harian).
  Deadline kemungkinan 20 Nov 07:00 WIB (pola edisi 17/18 Nov) — BELUM terverifikasi,
  cek lagi saat edisi dibuka.
- Kuota: **belum bisa dicek** (kit belum bisa di-download). Setelah edisi dibuka, dari
  `~/workspace/makefun/` jalankan `curl -sSL "https://make.fun/c/news-image-20261119/kit" | tar xz`,
  lalu `node cli/makefun.mjs status --competition news-image-20261119` di dir kit.

## Berita (31 cerita, semua terverifikasi dari laporan 19 Nov 2026)
- Lead: **GTA VI global rollout** — Reuters dateline 19 Nov ("Gamers enter Vice City…"),
  unlock tengah malam per pasar mulai Selandia Baru; ~17 jt kopi pre-sold, >$1,65 miliar
  (Sensor Tower). Art lead: "bridge" (skyline kota di atas air — generik golden-hour;
  "gulf" tidak cocok untuk lead gaming).
- Grid 12: summit Trump–Xi–Putin Shenzhen (pertama kali, fokus senjata nuklir),
  ICJ putusan Rohingya (jadwal 19 Nov 10:00 Den Haag), Siklon Akvan (red alert 19–20 Nov,
  landfall 20 Nov siang), Australia sanksi pemukim Israel (3 orang + 4 org),
  Ethiopia–Eritrea kerahkan pasukan di Badme (Reuters), Gas Husky kena 4 proyektil
  (Reuters, gubernur Varna), EU ajukan pinjaman €45 miliar untuk Ukraina,
  Inggris menang ODI di Hobart (Duckett 133), Board of Peace salahkan Israel & Hamas,
  Kanada tinjau ulang hubungan China, senator AS peringatkan ancaman siber AI,
  Voyager 1 capai satu light-day.
- Brief 18: Peltola/Alaska (Senat 56–44), India–Jepang 2+2, Saudi all-clear,
  Libya sita kokain/pil, Mélenchon, David Jones PHK 1.500, hoax bom 6.300 sekolah Italia,
  penembak Sydney ditangkap, ekspor Jepang +20,5%, EBT India 299,25 GW,
  Goldman Sachs naikkan India (Nifty 28.500), Dhoni pensiun IPL, laporan AI 171,
  bea scotch 162,5%, Reliance vs Starlink, notulen Banxico, angin Meksiko $12 miliar,
  Netflix kalahkan YouTube di LatAm.
- Benua: Asia, Eropa, Afrika, Amerika Utara, Amerika Selatan, Oseania (6 benua).
- Pin peta 8: 1 Miami, 2 Shenzhen, 3 Den Haag, 4 pantai Akvan, 5 Canberra, 6 Badme,
  7 Laut Hitam, 14 Alaska. **Pin 9 (Hobart) DIGANTI pin 14 (Alaska)** — pin Hobart
  bertumpuk dengan Canberra, de-collision mendorongnya keluar strip peta (terlihat
  di render pertama); pin Alaska bersih, tanpa tumpukan.

## ⚠️ CATATAN PENTING — refresh berita sebelum submit
news.json disusun **~00:30 WIB 19 Nov dari laporan awal hari itu**. Dua cerita besar
baru terjadi siang hari WIB dan hasilnya belum ada saat persiapan:
- **Putusan ICJ Rohingya** — dibacakan 19 Nov 10:00 Den Haag = **16:00 WIB**.
  Headline saat ini "World court to rule on Rohingya" (jadwal, terverifikasi).
  Kalau putusannya bersejarah (pertama kali ICJ nyatakan negara bersalah genosida),
  naikkan jadi LEAD atau grid atas dengan hasil sebenarnya.
- **Summit Trump–Xi–Putin** — berlangsung 19 Nov siang; hasil (kesepakatan/tidak)
  belum diketahui saat persiapan. Headline saat ini "meet in Shenzhen" (jadwal).
- Juga pantau breaking news lain sepanjang 19 Nov; kalau ada cerita lebih besar
  dari GTA VI, ganti lead dan render ulang (generator deterministik, cepat).
- Deadline (bila 20 Nov 07:00 WIB) memberi waktu seharian penuh untuk refresh ini.

## Hasil render (news.json baru, 19 Nov 00:35 WIB; DIREVISI 2× — revisi keunikan terbaru, lihat atas)
- `node generate.mjs news.json entry.png entry.svg` → **layout ok
  (tier artH=160 mapH=60), bottom y=1016** (≤1024 ✓)
- entry.png **853 KiB** (< 1 MiB ✓), 31 cerita (lead 1 + grid 12 + brief 18), 8 pin.
- Determinisme: **2× run sha256 identik** — `ae15df721b402e4c27a2a823a4b1c8de233b6c36a3dfa208c659cb92c809943d`.
- Cek visual (revisi 2): headline condensed Black satu baris penuh dan dominan,
  masthead tenang, art full-bleed, pin segi-8 + penanda matahari terlihat,
  semua teks terbaca, halaman terasa beda dari koran biasa.
- entry.png/entry.svg saat ini adalah **RENDER REVISI 2 dari news.json 19 Nov**.

## File di dir ini
- generate.mjs — generator adaptif, **DIREVISI 19 Nov 00:50 WIB** (hierarki,
  kontras, art Vice City baru; lihat "REVISI DESAIN" di atas). main.ts,
  package.json — sama seperti 18 Nov (main.ts hanya copy entry.png → /output/entry.png).
- news.json — DATA FINAL 19 Nov (31 cerita terverifikasi, lihat atas);
  `lead.art` diubah `"bridge"` → `"vice"` (art Vice City).
- entry.png / entry.svg — render final dari news.json di atas.
- node_modules → symlink ke ~/workspace/makefun/news-image-shared/node_modules
  (untuk render lokal saja; JANGAN commit ke repo).
- .git / .makefun — TERBAWA dari copy 18 Nov (histori + owner.json lama).
  Saat buat repo 19 Nov: reset git lokal (rm -rf .git && git init) dan
  pastikan .makefun/owner.json berisi wallet agent yang benar.

## Yang masih kurang untuk submit
1. Tunggu edisi dibuka (~07:00 WIB 19 Nov), verifikasi via API.
2. Download kit news-image-20261119, cek kuota (`makefun.mjs status`).
3. **Refresh news.json** dengan hasil ICJ + summit + breaking news 19 Nov (lihat ⚠️ di atas),
   render ulang + cek visual + determinisme.
4. Buat repo GitHub baru (via browser, SETELAH kompetisi dibuka), push teks + upload entry.png.
5. Bundle + check (ikuti pola 17/18 Nov) + submit — JANGAN submit sebelum langkah 3.

## Instruksi Gibran 15:43 WIB — untuk RENDER FINAL (bukan cuma art)
- Golden ratio (φ ≈ 1,618) + golden rectangle + dasar-dasar desain yang sudah dipelajari/diamati berlaku untuk BERITA SECARA KESELURUHAN (layout penuh render final), bukan cuma mahkota palem.
- Terapkan terukur: pembagian zona (art vs teks), ukuran headline vs body, posisi elemen kunci di titik φ, golden rectangle untuk modul (art zone / unit bernomor / stat boxes). Plus semua dasar yang sudah dipelajari: hierarki, Z-pattern, aksen sebagai sistem, 4 level tipe, kontras ≥4,5:1, 10 Layout Mistakes gate.
- Headline final WAJIB teks TERANG (krem/putih) karena zona headline gelap (ungu tua).
- Render final setelah refresh berita ICJ 16:00 WIB.

## Keputusan Gibran 15:52 WIB — arah RENDER FINAL (hybrid, opsi B)
- "Seperti contoh koran dan majalah yang kukirim, beberapa berita besar bisa eksis di halaman yang sama."
- Cover + art vaporwave + GTA tetap besar, TAPI summit (Shenzhen) dan berita besar lain juga eksis sebagai hero bersama di halaman yang sama — bukan satu lead tunggal.
- Cangkok perangkat broadsheet dari studi leaderboard: stat strip selebar hari, brief tail (25–30 cerita), DATE CHECK footer, sumber bernama, peta besar bernomor, hitungan per-region.
- Benerin truncasi cerita #14–15 (pemenang tidak pernah memotong).
- φ + golden rectangle + dasar desain mengatur layout penuh; headline TERANG (krem/putih) di langit gelap.
- Art final: laut gradient v11 + pelepah v10 (bentuk daun v10 sudah OK menurut Gibran 15:39; v11 kehilangan pemisahan pelepah karena warp hati).
- Render final setelah refresh berita ICJ 16:00 WIB.

## Koreksi Gibran 15:53 WIB — "usahakan sih nilai ya"
- Dalam hybrid (opsi B), TARGETNYA SKOR (kemungkinan menang lebih tinggi): dorong sedekat mungkin ke arah broadsheet TANPA meninggalkan cover + GTA.
- Summit jadi co-lead menonjol (data: summit #1 di 20/20, GTA #2 di 13/20 — summit harus #1 atau #2 yang sangat menonjol, bukan sekadar disebut).
- Semua perangkat pemenang dicangkok: stat strip selebar hari, brief tail 25–40 cerita, DATE CHECK footer, sumber bernama, peta besar bernomor, hitungan per-region.
- Breadth dimaksimalkan (31–40 cerita), truncasi diperbaiki, φ + golden rectangle + dasar desain.
- Skor = objektif; selera Gibran = batasan (bukan sebaliknya).

## FINAL RENDER — SELESAI 19 Nov 16:34 WIB (entry-final.png)
- Generator: generate-final.mjs (dari generate-rev7.mjs; rev2..rev7 + entry-rev*.png TIDAK disentuh).
- Art: v15 TERKUNCI, di-embed pixel-identik sebagai data-URI PNG (art-final-test.png) — generator TIDAK menggambar ulang art.
- News refresh (16:13–16:16 WIB, news vertical): summit Shenzhen TERKONFIRMASI (trilateral pertama, tanpa kesepakatan); GTA VI TERKONFIRMASI (17,07m / $1,65bn Sensor Tower via BBC); Anthropic IPO TERKONFIRMASI ($81,3bn, rekor, Nasdaq ANT) — ditambahkan sebagai cerita #9, menggantikan Duckett (Duckett pindah ke brief tail menggantikan Banxico); ICJ Rohingya: pembacaan putusan sedang berjalan 16:00 WIB, HASIL BELUM terkonfirmasi — headline "ICJ delivers Rohingya ruling" (peristiwa, bukan hasil), footer2 jujur soal timing. TIDAK ADA hasil yang difabrikasi.
- Struktur: 13 cerita utama (lead GTA #1 + hero summit #2 + unit bernomor #3–13) + brief tail 18 (#14–31) = 31 cerita. 13 = Fibonacci (koreksi GR 16:16 WIB).
- Konstanta: phi = 1.61803, pi = 3.14159 (5 digit, Gibran 16:16 WIB); skala tipe sqrt(phi) = 1.272 (12·15·20·26·33·42·53·68·87·110·141); stack display 110/68 = 1,6176 ~ phi; spacing ladder 8·10·13·16·21·27·34·43·55; titik phi (391,633)+(633,633) dilintasi headline hero; persegi emas 928x574 (y 150..724); sudut emas 360/phi^2 = 137,50844 deg dgn phi 5 digit (137,50776 deg memakai phi presisi penuh — selisih 0,00068 deg, tak terlihat).
- Perangkat pemenang: stat strip 6 angka se-hari, brief tail 18, DATE CHECK + sumber bernama, HOW SURE ARE WE? footer, peta besar bernomor (8 pin), hitungan per benua di strip.
- Verifikasi (verify-final.mjs): determinisme 2 render byte-identik; sha256 0345296ba8e9a606b952fb053ae96eeeeceb19f19fb236f1c0925b7ba3974bdd; 400.052 byte (391 KiB, limit 1 MiB); truncasi "…" = 0; overlap gate 0 (teks-vs-teks, teks-vs-frame, teks-vs-art); kontras headline putih: GTA VI p95 8,69:1 (terburuk 6,70), OUT NOW p95 7,32:1 (terburuk 6,49); kontras lain: MUTED 5,57 / INK 12,83 / aksen 4,87 / putih-atas-aksen 5,91 (semua >=4,5:1); benua NA 5 / SA 1 / EU 6 / AF 2 / AS 12 / OC 3, off-continent 2, unmapped 0.
- Perbaikan selama verifikasi: (1) grain halaman feTurbulence DIHAPUS — terbukti menaruh bintik putih di langit (p95 lum 1,0) dan merusak kontras render; ukuran PNG turun 982 KiB -> 391 KiB. (2) baseline OUT NOW 340 -> 338 (2px di atas ujung pelepah P2). (3) bar strip benua 1,2px -> 0,8px (angka "12" AS menempel "OC", terbaca "12OC"). (4) chip peta 293x108 -> 293x114 (rasio seragam 2,570 ~ 360/140 = 2,571; yang lama menekan peta 5,5%).
- DEVIASI JUJUR vs 7 aturan rev-3: aturan 1 & 7 SEBAGIAN — footer berakhir y=999 (margin bawah 25px, bukan >=48px/64px); hybrid 31 cerita + footer 2 baris (mandat pasca-rev-3) tidak muat di anggaran rev-3 912px; defisit diserap margin bawah karena art TERKUNCI dan cerita tidak boleh dipotong. Aturan 4 DIGANTIKAN koreksi GR 16:16 (spacing ladder sqrt-phi). Aturan 2, 3, 5, 6 LULUS. Gate 10 Layout Mistakes: 9 lulus, 1 sebagian (Uneven Margins — margin bawah 25px vs atas 48px).
- BELUM submit. main.ts masih meng-copy entry.png (bukan entry-final.png) — saat submit, ganti ke entry-final.png atau rename file. Deadline 21 Nov 07:00 WIB.

## v2 (19 Nov 17:08 WIB) — revisi atas feedback Gibran 16:39
- entry-final-v2.png sha 98608b74b7f1f24c9656d2cfd3250fa4b97765371de7acf448e0f3ed2ec81ab1, 403.428 byte, 1024x1024. v1 utuh (0345296b…) sebagai fallback.
- 4 koreksi kena: peta 0 angka (pin titik merah r=7, 8 lokasi), strip benua lega (celah terburuk 11,4px), kontras daratan 3,11–4,27:1, teks bawah dilonggarkan (pitch 33/17 + rule vertikal di tail).
- Gate lulus semua: determinisme x2, truncasi 0, overlap 0, headline 8,69/7,32:1. 10 Layout Mistakes 8 lulus 2 sebagian (Crowded, Uneven Margins).
- Batas jujur: margin bawah 21px (lantai), paruh bawah masih padat, ICJ MASIH belum terkonfirmasi (footer jujur dipertahankan).
- BELUM disubmit. Submit butuh: main.ts switch ke entry-final-v2.png, repo/bundle/check, kuota, approval Gibran. Deadline 21 Nov 07:00 WIB, target top-1.000 (garis 0,977198).

---
## v3 — SELESAI 19 Nov ~17:45 WIB (polish pass, subagent)
- **File: entry-final-v3.png — 405.808 bytes (396,3 KiB), 1024x1024, sha256 69d61eceb7af02900dc788f1c1b9aec26854d5fa31f2c287f8ddf93c7f0dc534** (render final setelah refresh berita). Generator generate-final-v3.mjs, verifier verify-final-v3.mjs, data news-v3.json (news.json v2 TIDAK disentuh).
- **Margin 32/32** (v2 48/21). Tail: judul 15px ACCENT, pitch 18, band #EDE2CC baris 0/2/4 (kontras ACCENT 4,60:1 — lulus). Semua gate lulus: determinisme 2x byte-identik, truncasi 0, overlap 0, headline 8,69/7,32:1, teks lain ≥4,87:1, 31 cerita, map 0 angka/8 dot merah, strip gap 11,4/18,1px.
- **Refresh berita (final, ~17:30-17:45):** ICJ Rohingya — judgment DISAMPAIKAN hari ini tapi hasil/full text BELUM terkonfirmasi dari sumber teks (footer2 diperbarui jujur: "ICJ delivered its Rohingya judgment today (full text not yet public)", 135 karakter). **2 kesalahan tanggal v1/v2 DIPERBAIKI:** #8 EU €45bn Ukraine loan ternyata 18 Nov → diganti "Australia jobless rate hits 4.9%" (ABS 19 Nov, Reuters); #13 Voyager 1 one light-day ternyata 18 Nov → diganti "Top court voids Han's 15-year term" (Mahkamah Agung Korea 19 Nov, Yonhap/AP). Kontinen kini NA 5 SA 1 EU 5 AF 2 AS 13 OC 4, off-continent 1 (GTA saja), unmapped 0. Pin peta TIDAK berubah.
- **φ jujur (dari koordinat aktual v3):** yang BENAR-BENAR φ: rasio display 110/68 = 1,6176 (-0,02%) + golden angle 137,5° di art (terkunci). Type ladder √φ: ukuran 15/26/42/68/110 konsisten ~+5% di ATAS step ladder (bukan di atasnya); spacing: hanya pitch unit 33 yang dekat (33,9); tail pitch 18 & margin 32 & gap footer bukan step ladder. 0 dari 4 titik φ berimpit dengan elemen (391,391 di laut; 633,391 di DALAM cakram matahari tapi bukan tepi/pusat — tepi bawah cakram terukur y=403, bukan 391; 391/633,633 di celah antara headline hero2 baseline 620 dan sub-dek 640). TIDAK ADA golden rectangle 928x574 di v3.
- **Leaderboard ~17:15 WIB:** field 6.110 (6.096 ranked); top-1.000 = 0,977797 (naik dari 0,977198); top-50 0,987584; top-100 0,986078; top-500 0,980496; #1 0,992113. Device baru: exclusion list eksplisit di footer DATE CHECK (flams #14, kien-cao-xuan #15) — TIDAK ditambahkan (tidak ada ruang untuk baris footer ke-3); perbaikan #8/#13 adalah jawaban substansial atas masalah yang sama.
- **Vonis jujur:** v3 > v2 di margin (32/32 vs 48/21), judul tail, dan FAKTA (2 cerita tanggal-salah diperbaiki — ini perbaikan terbesar untuk kriteria 1). Paruh bawah TETAP padat secara arsitektur (31 cerita tidak muat lebih longgar). v3 adalah kandidat submit; v1/v2 tetap utuh sebagai fallback.
- **BELUM submit** — menunggu pilihan Gibran v2 vs v3 + approval eksplisit. Deadline 21 Nov 07:00 WIB. main.ts masih menunjuk entry.png (ganti saat submit).

## v4 (19 Nov 17:38 WIB) — grid dilonggarkan + strip benua dihapus + trial peta bagi-2
- entry-final-v4.png sha 650580869034927d4361a5d59c702f5eb999d783ce1202edb148d25b3c5bd4f3, 403.607 byte, 1024x1024. v1/v2/v3 utuh (hash terverifikasi). Data = news-v3.json (tidak berubah). TIDAK disubmit.
- GRID (koreksi Gibran 17:29, crop grid): celah antar baris TERUKUR dari SVG v3 = 2,2px (chip bawah -> headline atas) -> v4 = 9,2px (pitch 33->39, chip 17->15px y+4..y+19). Setara celah tail (9,4px). Cek mata: baris-baris grid kini terbaca sebagai item terpisah, bukan blok padat.
- DANA grid (tanpa potong cerita, tanpa kecilkan art, margin 32/32 tetap): dek -1, stat -3, hero kicker/headline -5, sub-dek -3, label -3, celah label->grid 14,2->8,2px; tail +6px (judul 858, baris 878..968); celah grid->judul tail 7,2->5,2px dan rule tail->footer 11->5px (harga yang dibayar, dilaporkan). Tail pitch 18 TETAP (tidak dibuat lebih padat).
- BONUS jujur: chip v3 menabrak descender headline 0,75px (chip y+3 vs descender y+3,75); chip v4 y+4 memberi celah 0,25px — cacat kecil itu ikut terperbaiki.
- PETA (Gibran 17:29): strip benua "NA 5 SA 1 EU 5 AF 2 AS 13 OC 4" DIHAPUS SEPENUHNYA — 0 teks/angka di chip (terverifikasi dari SVG). Peta kini 114px penuh (dulu 92px + strip). Pin #5 OC yang setengah tertutup strip di v3 kini utuh (margin bawah 20,0px). 8/8 dot merah utuh, 0 terpotong (margin tepi min 15,0px, pin #14 atas). "SIX CONTINENTS" di masthead tetap.
- PETA BAGI-2 (Gibran 17:31, TRIAL — DITOLAK): dua panel 144x114 (barat lon -180..0 / timur 0..180, gap 5px) di-render ke /tmp/split-v4.png dan dibandingkan visual + angka. HASIL: panel TIDAK lebih tinggi dari peta tunggal (114px = 114px — tinggi chip dibatasi frame art, jadi premis "lebih tinggi" gugur); pin #3 The Hague (lon 4,3) jatuh 3,4px dari sambungan panel sehingga dot-nya berdarah ke celah + leader line; Eropa/Afrika terpotong di lon 0 (UK/Prancis/Spanyol/Aljazair terbelah celah); dot 2-vs-6 tidak seimbang; dua panel terbaca sebagai dua peta, bukan satu dunia. Prinsip studi layout yang dipakai: "you can only break a grid you have already established" — pemecahan grid harus melayani tujuan; bagi-2 tidak melayani apa pun di sini. Deliverable = peta tunggal. Kode split dipertahankan di generator (MAP_MODE=split) sebagai jejak trial.
- BUG LATEN diperbaiki di v4 (ditemukan saat kerja peta): (1) clamp pin v3 mencampur koordinat gen/rendered — pin #14 Alaska duduk di 419, bukan 410,3 yang benar; kini clamp dalam koordinat rendered; (2) facet peta v1-v3 tergeser 16px ke bawah karena poly() menambah OY ke titik yang sudah ber-OY; kini dibangun langsung; (3) leader line pin (tak pernah terpicu) akan double-OY via helper line(); kini digambar langsung.
- VERIFIKASI (verify-final-v4.mjs, semua lulus): determinisme a==b dan a==entry-final-v4; 1024x1024, 394,1 KiB ≤1 MiB; truncasi 0; overlap gate 0; headline GTA VI p95 8,69 / OUT NOW p95 7,32; teks lain INK 12,83 / MUTED 5,57 / ACCENT 4,87 / DEK 10,95 / putih-aksen 5,91; land-vs-chip 3,41/4,27/3,11; 31 cerita; benua NA 5 SA 1 EU 5 AF 2 AS 13 OC 4, off-continent 1, unmapped 0; margin 32/32; cek mata lulus (grid lega, peta utuh, tidak ada tabrakan).
- VONIS: v4 lebih baik dari v3 — grid benar-benar terasa lebih lega (bukan sekadar angka), peta bersih tanpa strip, 0 yang dikorbankan kecuali celah judul-tail dan rule-footer yang sedikit merapat (5,2px / 5px, masih layak). Rekomendasi: v4 kandidat submit. v3 tetap utuh sebagai fallback.
- MENUNGGU: pilihan Gibran + approval submit eksplisit; lalu main.ts switch ke file final terpilih -> repo -> bundle -> makefun check hijau -> submit sebelum 21 Nov 07:00 WIB. (Catatan: agen persiapan submit v3 sudah di-spawn parent sebelum v4 — file final yang disubmit HARUS diganti ke v4 bila Gibran memilih v4.)

## v5 (19 Nov ~17:47 WIB) — tiga koreksi Gibran 17:41 (crop v4)
- entry-final-v5.png sha 8509e90c…, 402.837 byte, 1024×1024. v1–v4 utuh (hash terverifikasi).
- (1) BIRU — highlighter swipe ACCENT 0.25 di belakang dek DIHAPUS total; dek kini di kertas krem polos (verifier: 0 polygon swipe).
- (2) ORANYE — celah angka→label chip stat, terukur dari piksel: v4 2/6/6/7/5/3px → v5 10/14/14/15/13/11px (offset label +6→+14; terburuk "17M GTA COPIES" 2→10px; label tersempit "$1.65BN PRE-SOLD" muat, tepi kanan 345/352).
- (3) HIJAU — celah headline→chip kicker: v4 0,25px (menempel) → v5 3,25px (chip y+7..y+22, teks y+18; 11/11 kicker di dalam chip). Dana: baris grid naik 2px (704); celah antar baris 9,2→6,2px (pitch TETAP 39 — redistribusi, bukan tambah padat); celah chip terakhir→judul tail 5,2→4,2px; celah label→grid 8,2→6,2px. Margin 32/32 TETAP, bottom 992.
- Semua gate lulus (determinisme, truncasi 0, overlap 0, kontras, 31 cerita, 8 dot utuh, 10 Layout Mistakes — lihat verify-final-v5.mjs). Catatan verifier: dua FAIL awal adalah bug rumus cek saya sendiri (pairing chip-baris + wayfinding slot ikut terhitung), bukan cacat render — diperbaiki, semua PASS setelahnya.
- Vonis: v5 > v4, kandidat submit. MENUNGGU: pilihan Gibran + approval submit → prep submit harus pakai v5.
