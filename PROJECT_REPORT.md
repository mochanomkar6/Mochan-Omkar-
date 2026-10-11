# Smart Classroom AI — Project Report

**Project:** Smart Classroom AI: Edge-Based Facial Recognition & Student Behavior Monitoring Portal
**Type:** Academic / personal project (team: Mochan & Team)
**Stack:** Python, OpenCV (Haar Cascades + LBPH), NumPy, Tkinter, threading, requests (Telegram Bot API), python-pptx
**Code size:** ~571 lines of Python across 4 modules
**Repository:** local (`D:\attendancesystem`) — not under version control yet

---

## 1. One-line summary

A lightweight, CPU-only (no GPU) classroom monitoring system that recognises enrolled
students in a live camera feed, marks attendance automatically, detects inattentive
behaviour (sleeping / phone use), and pushes real-time text + photo alerts to a
supervisor's phone via the Telegram Bot API.

---

## 2. Problem it solves

- Manual roll-calls waste lecture time and are error-prone.
- Paper signature sheets are vulnerable to proxy attendance.
- Faculty cannot continuously monitor every student's attention/fatigue.
- There is rarely any structured, timestamped record of classroom behaviour.

The system shifts classroom tracking from simple **presence validation** to **engagement intelligence**.

---

## 3. Architecture & modules

| File | Lines | Role |
|------|-------|------|
| `register.py` | 53 | Enrollment pipeline — captures 30 grayscale face samples per student into `student_images/<id>_<name>/` |
| `main.py` | 104 | Baseline attendance loop — Haar face detect + LBPH recognition, writes `attendance.csv` |
| `app.py` | 246 | Full faculty portal — Tkinter GUI, live monitoring, behaviour engine, Telegram alerts, CSV logging |
| `make_presentation.py` | 228 | Programmatically generates an 11-slide technical deck with `python-pptx` |

### Processing pipeline (app.py)

1. Load Haar cascade classifiers (`haarcascade_frontalface_default.xml`, `haarcascade_eye_tree_eyeglasses.xml`) and an LBPH face recognizer.
2. Train the recognizer from the local `student_images/` database.
3. Live loop: convert frame to grayscale → detect faces → predict identity (LBPH confidence distance).
4. On a confident match, log attendance once per session (in-memory dedup set).
5. Run two heuristic behaviour checks per recognised face.
6. Overlay bounding box + status text, write anomaly logs, save evidence photos, fire notifications.
7. Stop on `Esc`, release camera, reset the UI.

---

## 4. Key features

### 4.1 Face recognition & automated attendance
- **Haar Cascade** frontal-face detection + **LBPH** (Local Binary Patterns Histograms) recognition.
- Chosen deliberately so inference runs on a normal CPU (no neural network / GPU dependency).
- Confidence distance threshold tuned to **< 110** in the portal (relaxed for real classroom lighting); baseline script uses **< 70**.
- Attendance written to `attendance_records.csv` as `Date, Lecture, Student Name, Timestamp, Status`.
- **Per-session de-duplication** via a `marked_attendance_today` set prevents duplicate rows.

### 4.2 Behaviour anomaly engine
- **Drowsiness / sleeping:** scans the upper face region for the eye cascade. If no eyes are detected for **10 consecutive frames (~1.5 s)**, the box turns red and a `SLEEPING` alert fires.
- **Distraction / phone use:** tracks the face bounding-box Y position. If the face drops below **45 % of frame height** for **15 consecutive frames**, a `PHONE USE` alert fires.
- **10-second cooldown** per alert type prevents notification spam.
- Each triggered incident is logged to `behavior_log.csv` and saved as a timestamped evidence photo.

### 4.3 Real-time mobile alerting
- **Telegram Bot API** sends an HTML-formatted text alert **and** the evidence photo to a configured chat.
- Network calls are dispatched on a **daemon thread**, so slow/failed requests never block the camera loop.

### 4.4 Multithreaded design
- **Main thread:** Tkinter UI (dropdown, buttons, status), stays responsive.
- **Worker thread:** camera capture + OpenCV processing + recognition.
- **Network daemon thread:** Telegram HTTP requests.
- Solves the classic problem of heavy video loops freezing a GUI.

### 4.5 Privacy-first / edge design
- All face data, CSVs and photos stay **local** — no cloud processing cluster, no GPU, no paid infrastructure.
- Only alert messages/photos leave the machine (Telegram).

---

## 5. Data & observed results

- **3 students enrolled**, **90 training images** (30 samples each): `2_vasu1`, `3_manya`, `4_ashuu`.
- `attendance_records.csv` contains real captured PRESENT entries with dates, lecture and timestamp.
- `behavior_log.csv` contains **4 logged incidents** (all `SLEEPING`) across two sessions.
- `evidence_photos/` holds **4 timestamped incident JPEGs** (e.g. `ashuu_sleeping_12_12_46.jpg`).
- An 11-slide evaluation deck (`AI_Classroom_Attendance_System.pptx`) was generated for project defense.

---

## 6. Challenges solved

- **GUI freezing during video/network work** → thread isolation (UI / vision / network).
- **Eye detection failing on closed eyes** → switched to the `eye_tree_eyeglasses` cascade, which still tracks facial architecture when eyes close.
- **Camera source variability** → auto-fallback between virtual webcam (index 1, Iriun) and default camera (index 0).
- **False-positive alerts** → consecutive-frame thresholds plus per-alert cooldowns.
- **No GPU available** → LBPH + Haar chosen for CPU-only real-time performance.

---

## 7. Honest limitations / technical debt

- **Hard-coded Telegram token & chat ID in `app.py`** — must be moved to environment
  variables / a config file before any public release. (Security issue.)
- **Global counters** (`sleep_counter`, `distraction_counter`) are not per-face, so multiple
  students in frame can interfere with each other's counts.
- **No `requirements.txt`** and no declared dependency versions.
- **Not under version control** (no Git repo).
- `main.py` uses a legacy `cv2.createLBPHFaceRecognizer()` fallback that is obsolete in modern OpenCV.
- Attendance dedup is **in-memory**, so restarting the app can re-log a student.
- Behaviour heuristics are approximate (no true head-pose/gaze estimation).

---

## 8. Future scope

- Move to cloud/database backends (central attendance store, dashboards).
- Multi-camera arrays for large lecture halls.
- Optional deep-learning recognition (e.g. face embeddings) behind a pluggable interface.
- Config-driven thresholds, per-face counters, and proper session persistence.
- Web dashboard for faculty analytics (attendance trends, engagement over time).

---

## 9. Resume-ready content

### 9.1 Short version (one or two lines)

> **Smart Classroom AI — Facial Recognition & Behavior Monitoring** — Python, OpenCV, LBPH, Tkinter, Multithreading, Telegram API.
> Built a CPU-only real-time system that auto-marks attendance via facial recognition and alerts faculty to sleeping/phone-use behaviour with photo evidence pushed to their phone.

### 9.2 Project entry (copy-paste)

**Smart Classroom AI — Facial Recognition & Behavior Monitoring System**
*Python, OpenCV (Haar + LBPH), NumPy, Tkinter, Multithreading, Telegram Bot API, python-pptx*

- Built an edge-based, **GPU-free** classroom monitor that detects and recognises enrolled faces in a live feed using **OpenCV Haar Cascades + LBPH**, automatically logging attendance to CSV with per-session de-duplication.
- Engineered a **behaviour anomaly engine** that flags drowsiness (10 consecutive frames with no detected eyes) and distraction/phone use (sustained head drop below 45% of frame height), with a 10-second cooldown to suppress alert spam.
- Designed a **3-tier multithreaded architecture** (UI thread / vision worker / network daemon) that decouples the Tkinter interface from heavy frame processing and network I/O, keeping the UI responsive during live monitoring.
- Integrated the **Telegram Bot API** to push real-time text **and photographic evidence** alerts to faculty devices, plus local timestamped evidence capture for audit.
- Built a **30-sample-per-student enrollment pipeline** (90 samples across 3 profiles) producing a privacy-first local face database, and authored a **python-pptx generator** to produce the 11-slide technical defense deck programmatically.
- Delivered a working prototype with real captured data: logged attendance records, 4 behaviour incidents, and matching evidence photos.

### 9.3 Backend / CV-focused variant (if targeting ML/CV roles)

- Implemented a real-time **face-recognition pipeline** (Haar Cascade detection + LBPH
  texture-histogram matching) achieving CPU-only inference with confidence-threshold tuning
  for noisy classroom lighting.
- Designed **heuristic computer-vision analytics** for drowsiness and head-pose distraction
  detection using eye-cascade hit-rate and bounding-box geometry.
- Architected asynchronous processing to run **concurrent vision + network workloads**
  without blocking the UI.

### 9.4 Skills this project demonstrates (for a Skills section)

`Python` · `OpenCV` · `Computer Vision` · `Facial Recognition` · `Haar Cascades` ·
`LBPH` · `NumPy` · `Tkinter (GUI)` · `Multithreading` · `REST APIs` · `Telegram Bot API` ·
`CSV data logging` · `python-pptx` · `Edge / CPU-only inference` · `Privacy-conscious design`

---

## 10. Quick-glance fact sheet (if asked in an interview)

- **Enrollment:** 30 grayscale samples per student, folder `student_images/<id>_<name>/`.
- **Recognition threshold:** LBPH distance < 110 (portal), < 70 (baseline).
- **Sleep rule:** 0 eyes detected for 10 consecutive frames.
- **Distraction rule:** face Y > 45% frame height for 15 consecutive frames.
- **Alert cooldown:** 10 s per alert type.
- **Outputs:** `attendance_records.csv`, `behavior_log.csv`, `evidence_photos/*.jpg`, Telegram push.
- **Hardware requirement:** any webcam / phone (Iriun virtual webcam) + ordinary CPU.
