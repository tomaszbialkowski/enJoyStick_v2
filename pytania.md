\*2. done

\*3. done

4. zamiast zmiennej stanowej "fire fetch" można by po prostu robić fetch'a w handleSubmit:
   tu mam zagwostkę bo jeśli fetch to powinien być w useEffectie zgodnie z zasadą czystych funkcji, a useEffecta nie mogę przenieść do funkcji handleSubmit bo Effect nie może być wewnątrz innej funkcji... chyba że przeniosę go do hooka... Prośba o wskazanie właściwego rozwiązania.

5. nie mam jak zbadać searcha bo potrzebny jest API key - warto dodać informację w ReadMe w projekcie co trzeba zrobić, aby w pełni uruchomić projekt (np. zaloguj się tu i tu, wygeneruj sobie apiKey itp itd)
   ODP: problem wynikał z chęci ukrycia mojego klucza, zapisałem go w zmiennej środowiskowej .env a plik dodałem do gitignore, miało działać w przypadku build ale nie wziąłem pod uwagę że przy downoladzie repo to jest inny przypadek i się wywali. Przepraszam za zamieszanie. Teraz klucz jest jawny w kodzie i powinno działać.

\*6. done

\*7. done

---

\*8. zmieniłbym trochę projekt danych - dodałbym do każdej gry unikalne ID - wtedy by można to stosować jako "key",

\*a dodatkowo np.do <Game> można przekazywać tylko id gry i w useSelection.js napisać selector do wyciągania gry po ID:
Wydaje mi się, że projekt nabrałby dodatkowej przejrzystości, gdyby jako przekazywane dane były id, a nie całe obiekty.

\*9. i kolejna sugestia do architektury która pewnie trochę uprości całość: zamiast osobnych list w REDUX, trzymałbym jedną listę gier, ale do każdej gry dodałbym pola boolean isFavourite, isHot itp. i za pomocą tego filtrował

10. musisz przerobić warunki na dodawanie do HOT/LAME, bo teraz jest dziwna sytuacja, gdzie trzeba mieć równo o 4 like więcej niż dislike by wpaść do HOT (a na przykład jak któraś gra startuje z większa liczbą to tam nie wpada). Wg mnie wystarczy np. poniżej zmienić "===" na ">":

- nie o 4 tylko o 5, uruchamianie dodawanie do list na początku - trzeba dodać

11. dodatkowo trzeba napisać jakąś funkcję, która już na początku dodawałaby część gier do HOT/LAME, bo taką sytuację mamy chociażby z River Raid, które powinno być w HOT od początku.

12. przepisać reduxa z createStore na configureStore

---

moje:
globalReducer.js 277-278
// case "ADD_TO_SEARCH":
// return addToListReducer(state, action, "Search", "", false);
chyba nie musi być, bez tego też działa

---

pytania do wiktora
GameList.js
//!@Wiktor: usuwanie badga tylko jeśli isBadge jest true - nie powoduje wielokrotnego re-renderingu (co mi się zdażyło) za to wyświetla ostrzeżenie Cannot update a component (`Lists`) while rendering a different component (`GamesList`). To locate the bad setState() call inside `GamesList`

game.js obsługa błędu ładowania obrazka nie działa, przykład wyszukaj uncharted
w wynikach wyszukiwania dla gry "Uncharted: The Nathan Drake Collection
" obrazek jest rozwalony, concole log jest uruchomiony z funckji handleImageError, co ciekawe jeśli dodam grę do mojej kolekcji wyświetla się placeholder tak jak bym tego oczekiwał. czegoś tu nie rozumiem prawdopodobnie z cyklem życia komponentu. obsługa obrazka linie 26-35.
