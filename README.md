# Stundenplan-Optimierer

Optimierte Stundenpläne aus den offiziellen Hochschul-PDFs (HAW Hamburg), mit persönlichen Terminen,
PDF- und Kalender-Export. Läuft als installierbare App auf Handy und Laptop, auch offline.
Mit Konto werden die Daten zwischen den Geräten abgeglichen.

## Inhalt dieses Ordners

| Datei | Zweck |
|---|---|
| `index.html` | die App |
| `config.js` | Zugang zum Online-Speicher (Firebase): `apiKey` und `projectId` |
| `sw.js` | macht die App offline-fähig und lädt Updates im Hintergrund |
| `manifest.webmanifest`, `icons/` | App-Name und App-Symbol für den Home-Bildschirm |
| `firestore.rules` | Zugriffsregeln für die Datenbank: jedes Konto sieht nur seine eigenen Daten |
| `.nojekyll` | sorgt dafür, dass GitHub Pages alle Dateien unverändert ausliefert |

## Einrichtung (einmalig)

### 1. Firebase (Online-Speicher)
Ein **eigenes** Projekt für den Stundenplan anlegen (nicht das Budget-Projekt), damit sich die Apps nicht gegenseitig stören.
1. [console.firebase.google.com](https://console.firebase.google.com) → **Projekt hinzufügen** → Name z. B. `stundenplan` (Google Analytics wird nicht gebraucht).
2. **Build → Authentication → Jetzt starten → Sign-in method → E-Mail/Passwort** aktivieren → Speichern.
3. **Build → Firestore Database → Datenbank erstellen** → Standort **europe-west3 (Frankfurt)** → im **Produktionsmodus** starten.
4. **Firestore Database → Regeln**: alles durch den Inhalt von `firestore.rules` ersetzen → **Veröffentlichen**.
5. **Projekteinstellungen (Zahnrad) → Allgemein → Meine Apps → Web-App (`</>`)** hinzufügen (Hosting nicht nötig).
   Aus dem angezeigten `firebaseConfig` die Werte `apiKey` und `projectId` in `config.js` eintragen.
   Diese Werte sind für Web-Apps öffentlich gedacht – geschützt werden die Daten durch die Regeln aus Schritt 4.

### 2. GitHub Pages (Adresse der App)
1. Alle Dateien dieses Ordners ins Repository hochladen (Hauptebene, inkl. `icons/` und `.nojekyll`).
2. Repository → **Settings → Pages** → *Source*: „Deploy from a branch“, Branch `main`, Ordner `/ (root)` → **Save**.
3. Nach ca. 1 Minute ist die App unter `https://DEINNAME.github.io/REPOSITORY/` erreichbar.

### 3. Installieren
- **iPhone/iPad**: Adresse in **Safari** öffnen → Teilen → **Zum Home-Bildschirm**.
- **Android**: Adresse in **Chrome** öffnen → Menü → **App installieren**.
- **Laptop**: in **Chrome** oder **Edge** das Installieren-Symbol rechts in der Adressleiste.

Danach in der App unter **Konto** ein Konto erstellen (Laptop) bzw. anmelden (Handy).

### Daten aus der Claude-Version übernehmen
In der Claude-Version im Reiter **Daten** → *Sicherung herunterladen*. In der App unter **Konto** → *Sicherung einlesen*.

## Updates
Neue Versionen werden einfach ins Repository hochgeladen. Die App merkt das beim nächsten Öffnen und zeigt
„Neue Version verfügbar – Jetzt aktualisieren“. Deine Daten bleiben dabei erhalten.

## Gut zu wissen
- Gespeichert wird immer zuerst auf dem Gerät; der Abgleich läuft im Hintergrund (beim Öffnen, nach Änderungen,
  wenn das Internet wieder da ist). Ohne Anmeldung funktioniert die App auch – dann nur auf dem jeweiligen Gerät.
- Ändern zwei Geräte gleichzeitig dasselbe, gilt die zuletzt bearbeitete Fassung; die andere wird unter
  **Konto → Gesicherte ältere Fassungen** aufbewahrt und kann wiederhergestellt werden.
- Passwort vergessen: in der App „Passwort vergessen?“ → Firebase schickt eine Mail mit Link zum Festlegen eines neuen Passworts.
- Die App hat keinen Zugriff auf Google-, Outlook- oder Apple-Kalender. Kalenderdaten werden nur als Datei exportiert,
  die du selbst importierst.


npm install firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgcASMhu8DuZ_8MDXX_z-ez8-0xaIssdE",
  authDomain: "stundenplan-27942.firebaseapp.com",
  projectId: "stundenplan-27942",
  storageBucket: "stundenplan-27942.firebasestorage.app",
  messagingSenderId: "570181010908",
  appId: "1:570181010908:web:6e9432754070e39e8fbb19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
