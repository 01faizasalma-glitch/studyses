# SPEC.md — ALPRO 7: Website Produktivitas (Kalender, To-Do, Timer, Stopwatch)

> File ini adalah sumber kebenaran proyek. Baca seluruhnya sebelum menulis kode.

## 1. Tujuan

Website produktivitas dengan empat tools yang saling terintegrasi:
kalender, to-do list, timer, dan stopwatch.

- Multi-user. Akun **wajib untuk menyimpan data**.
- **Guest** boleh memakai semua fitur tanpa akun, tetapi data **tidak disimpan di server**.
- Data user yang login **sinkron antar perangkat**.

## 2. Tech Stack (jangan tambah library tanpa izin)

| Kebutuhan | Pilihan |
|---|---|
| Framework | Next.js (App Router) + TypeScript strict |
| Styling | Tailwind CSS + shadcn/ui |
| Auth + DB | Supabase (Auth + PostgreSQL + Realtime) |
| Kalender | FullCalendar (`@fullcalendar/react`) |
| State | Zustand |
| Data fetching | TanStack Query |
| Validasi | Zod |
| Tes | Vitest (logika), Playwright (alur utama) |
| Deploy | Vercel (dari GitHub, branch `main`) |

## 3. Struktur Folder

```
src/
  app/                  # route Next.js
  components/
    stopwatch/
    timer/
    todo/
    calendar/
    ui/                 # shadcn
  lib/
    storage/
      types.ts          # interface TaskStorage, EventStorage, TimeEntryStorage
      local.ts          # implementasi guest (localStorage/IndexedDB)
      supabase.ts       # implementasi user login
      index.ts          # memilih implementasi berdasarkan status login
    time.ts             # helper waktu (UTC, format durasi)
    supabase/           # client browser & server
  stores/               # Zustand
  types/
supabase/
  schema.sql
```

## 4. Aturan Arsitektur

1. **UI tidak boleh tahu sumber data.** Semua akses data lewat interface di
   `lib/storage/types.ts`. Ada dua implementasi: `local` (guest) dan
   `supabase` (login).
2. **Waktu disimpan dalam UTC** (`timestamptz`), ditampilkan sesuai zona waktu
   browser pengguna.
3. **Timer & stopwatch tidak boleh mengandalkan hitungan `setInterval`.**
   Simpan timestamp (`startedAt`, `targetAt`) lalu hitung dari
   `Date.now()` / `performance.now()` di setiap tick, agar akurat saat tab di
   latar belakang. State timer yang berjalan juga disimpan agar bertahan saat
   halaman di-refresh.
4. **Hapus bersifat soft delete** (`deleted_at`) agar sinkronisasi antar
   perangkat tidak kehilangan jejak.
5. **Konflik sinkronisasi: last-write-wins** berdasarkan `updated_at`.
6. **Secret tidak boleh ada di kode frontend.** Gunakan environment variables.
   Hanya `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` yang
   boleh publik.
7. Semua input divalidasi dengan Zod sebelum dikirim ke storage.
8. Komponen kecil (idealnya < 150 baris), tanpa `any`.

## 5. Fitur

### 5.1 Stopwatch
- Start / Pause / Resume / Reset / Lap.
- Daftar lap (waktu lap dan total).
- Presisi tampilan: 1/100 detik.

### 5.2 Timer
- Input durasi (jam/menit/detik) dan preset (mis. 5, 15, 25 menit).
- Start / Pause / Reset.
- Saat selesai: bunyi alarm + Web Notification (minta izin dengan sopan).

### 5.3 To-Do List
- Field: judul, deskripsi, status (`todo` | `doing` | `done`), prioritas
  (`low` | `medium` | `high`), tenggat (opsional), kategori/tag.
- Filter berdasarkan status, prioritas, tenggat. Pencarian teks.
- Task dengan tenggat otomatis tampil di kalender.

### 5.4 Kalender
- Tampilan bulan / minggu / hari.
- Tambah, edit, hapus, drag-and-drop event.
- Menampilkan event dan tenggat task, serta blok waktu dari time entries.
- **Event berulang: di luar MVP.**

### 5.5 Integrasi antar-tools
- Tombol "Mulai timer/stopwatch" dari sebuah task.
- Saat sesi selesai, durasi tercatat sebagai `time_entry` pada task tersebut
  dan muncul di kalender.

## 6. Mode Guest vs Akun

| | Guest | Login |
|---|---|---|
| Semua fitur | Ya | Ya |
| Penyimpanan | Browser saja | Supabase |
| Sinkron antar perangkat | Tidak | Ya |
| Banner | "Data tidak tersimpan jika browser ditutup. Masuk untuk menyimpan." | - |

Saat guest login/daftar dan masih punya data lokal, tampilkan dialog:
"Impor data sementara ke akun Anda?" (Impor / Lewati / Hapus data lokal).

> Keputusan: data guest disimpan di localStorage sampai user menghapusnya atau mengimpornya ke akun setelah login

## 7. Keamanan

- Row Level Security (RLS) aktif di semua tabel; user hanya bisa mengakses
  baris miliknya (`user_id = auth.uid()`).
- Jangan pernah memakai `service_role` key di client.
- Sanitasi semua teks yang ditampilkan (React sudah escape secara default;
  jangan gunakan `dangerouslySetInnerHTML`).

## 8. Roadmap (kerjakan berurutan, commit di setiap akhir tahap)

1. [ ] Setup Next.js + Tailwind + shadcn, deploy kosong ke Vercel
2. [ ] Stopwatch (+ tes logika waktu)
3. [ ] Timer (+ notifikasi)
4. [ ] To-Do list versi guest (`local` storage)
5. [ ] Kalender versi guest
6. [ ] Integrasi antar-tools (task ↔ timer ↔ kalender)
7. [ ] Supabase: jalankan `schema.sql`, auth (email + Google), implementasi `supabase.ts`
8. [ ] Sinkronisasi antar perangkat (Realtime) + impor data guest
9. [ ] Polesan: dark mode, responsif, PWA, aksesibilitas, tes E2E

## 9. Definisi "Selesai" untuk Setiap Tahap

- Berjalan tanpa error di browser (cek konsol).
- `npm run lint` dan `npm run build` lolos.
- Logika kritis punya tes.
- Sudah di-commit dengan pesan yang jelas.

## 10. Cara Bekerja dengan AI

- Kerjakan **satu tahap per sesi**; jangan loncat ke tahap berikutnya.
- Sebelum mengubah banyak file, jelaskan rencana singkat dan tunggu persetujuan.
- Jangan menambah dependency baru tanpa izin.
- Setelah selesai, ringkas apa yang diubah dan apa yang perlu dites manual.
