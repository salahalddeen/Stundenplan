/* Zugang zum Online-Speicher (Firebase). Werte aus: Firebase-Konsole → Projekteinstellungen → Allgemein → Meine Apps → Web-App.
   Diese Werte sind für Web-Apps öffentlich gedacht; geschützt werden die Daten durch die Firestore-Regeln (firestore.rules).
   Leer lassen = App läuft nur lokal (Einrichtung auch in der App unter „Konto“ möglich). */
window.SPO_CONFIG = {
  firebase: {
    apiKey: 'AIzaSyAgcASMhu8DuZ_8MDXX_z-ez8-0xaIssdE',
    projectId: 'stundenplan-27942'
  }
};
