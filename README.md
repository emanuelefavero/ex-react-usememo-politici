# EX - React useMemo Politici

<img src="public/favicon.svg" alt="React Context API icon" width="48" />

Esercizio di React su useMemo e React.memo, dal mio corso web dev (specializzazione Frontend).

## Sviluppo locale

Per avviare l'applicazione in locale, clonare il repository ed eseguire i seguenti comandi:

```bash
npm install
npm run dev
```

## Consegna

Crea una pagina per visualizzare una lista di politici e ottimizzala progressivamente, evitando calcoli e rendering inutili.

Per le chiamate API, usa il server locale con URL base `http://localhost:3333` al posto di `https://freetestapi.com/api/v1`.

### Milestone 1 — Recuperare e visualizzare i dati

Effettua una chiamata API a `http://localhost:3333/politicians` e salva la risposta in uno stato React con `useState`.

Mostra i politici in una lista di card, visualizzando almeno queste proprietà:

- Nome (`name`).
- Immagine (`image`).
- Posizione (`position`).
- Breve biografia (`biography`).

Organizza le card in un’interfaccia chiara e leggibile.

### Milestone 2 — Implementare la ricerca ottimizzata

Aggiungi un campo di ricerca (`<input type="text">`) sopra la lista. Permetti all’utente di filtrare i politici in base al nome o alla biografia, verificando se contengono il testo cercato.

Crea un array derivato filtrato con `useMemo`, ricalcolandolo solo quando cambia la lista dei politici o il valore della ricerca. Non usare `useEffect` per aggiornare l’array filtrato.

### Milestone 3 — Ottimizzare il rendering delle card con React.memo

Usa `React.memo()` sul componente della card per evitare che venga renderizzato nuovamente quando le sue props non cambiano.

Aggiungi un `console.log()` dentro il componente per verificare quando viene renderizzato. Quando cambia la lista filtrata, le card che rimangono presenti con le stesse props non devono essere renderizzate di nuovo; quelle appena aggiunte alla lista devono essere renderizzate.

### Bonus — Filtrare anche per posizione politica

Crea un array derivato con tutte le posizioni politiche (`position`) disponibili, senza duplicati.

Aggiungi un `<select>` sopra la lista per filtrare i politici anche in base alla posizione. Aggiorna l’array filtrato affinché tenga conto sia del testo cercato sia della posizione selezionata.

## License

- [MIT](LICENSE.md)
