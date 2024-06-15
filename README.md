## Aby uruchomić projekt:

1. W folderze projektu utwórz plik .env

2. Pobierz darmowy klucz API ze srony https://www.omdbapi.com/apikey.aspx

3. w pliku `.env` do zmiennej `REACT_APP_OMDB_API_KEY` przypisz swój klucz
   (w głównym folderze znajdziesz plik .env.template ze wzorem jak dokładnie powinno to wyglądać),

4. w folderze projektu wykonaj polecenie

### `npm install`

5.  w folderze projektu wykonaj polecenie:

### `npm start`

## O Projekcie

Enjoystick to Twoja kolekcja gier, które są dla Ciebie ważne.

### Co możesz:

- wyszukiwać gry z bazy OMDB,
- dodawać do swojej kolekcji,
- oceniać gry za pomocą przycisków "likes" i "downs" (aktualny rezultat ocen jest na bieżąco aktualizowany i wyświetlany),
- dodawać do list: ulubione, ograne, ukończone,
- usuwać gry z własnej kolekcji,
- po kliknięciu w obrazek gry w Twojej kolekcji jest wyświetlany szczegółowy widok gry w którym możesz znaleźć szczegółowe informacje o niej,
- jesteś informowany za pomocą okienka o swoich poczynaniach np dodawniu gry do listy ulubionych,
- dodatkowa informacja w postaci wyświetlania badga NEW gdy na liście pojawi się nowa gra,
- przy każdej liście gier jest informacja o ilość gier jaką zawiera,

* startujesz z grami ważnymi dla autora :)

### Spodziewane poprawki przed ukończeniem studiów:

- stylowanie,
- ewetualne poprawki zgłoszone po code review.

### Wykorzystane biblioteki i technologie:

- wykorzystanie API bazy OMDB do wyszukiwania gier,
- użycie biblioteki `reselect` do memoizywoania selektorów,

### Poprzednio zgłoszone poprawki i sposób rozwiązania problemu:

- komponent <Buttons /> usunięty, nie wykorzystuje go, był napisany an wyrost ale zrezygnowałem z niego,
- nazwa info.js z małej litery, nie wiedziałem że ze zmianą nazwy mogą być takie problematyczne i nie zauważyłem że na GH pozostała mała litera.Zmieniona nazwa komponentu na bardziej trafną,
- sugestia dot. zmiennej "fire fetch" - pobieranie danych całkowicie przepisane na nowo,
- API KEY - przepraszam, nie doczytałem że zmienne środowiskowe przy pobieraniu GH z nie przeżyją (jak mają przeżyć skoro są w gitignore), wiedziałem że przy buildzie przeżyją. Problem poprawiony, opisany w punkcie `Aby uruchomić projekt`
- zakomentowany kod usunięty,
- zmienne utworzone zgodnie z sugestią i przeniesionen do foldera `constants`, przy okazji dodałem jeszcze kilka,
- projekt dancyh zmieniony zgodnie z sugestią co zaowocowało poznaniem biblioteki `reselect` ponieważ jeden z selektorów wykorzystujący .filter rzucał uwagami, z reselectem działa pysznie,
- warunki HOT/LAME są poprawione, a moje założenie jest takie że rezultat >= 5 to lista HOT, rezultat < 0 to lista LAME,
- zgodnie z sugestią funkcja przyporządkowująca gry do poszczególnych list hot/lame/favourite/played/finished jest uruchamiana przed wyświetleniem komponentów

### Dalszy, planowany rozwój aplikacji (po studiach):

- wyłapanie i poprawa "warninga", który pojawia się bardzo rzadko (o ile po użycie biblioteki reselcta w ogóle jeszcze występuje) a mówi o nie możliwości jednoczesnego pownego renderu dwóch komponentów (prawdopodobnie dotyczy Lists kiedy pojawiają się na niej badge)
- poprawa wyświetlania badgy NEW, sytuacja w tej chwili wygląda tak że jeśli 2 gry trafią na listę HOT, a potem jedna z nich wypadnie z tej listy badge znika mimo że pozstała na niej jedna "nowa" gra, prawdopodbnie trzeba dodawać do badga informacje o id gry jakie "generują" badge i przy wypadaniu gier z listy usuwać to id, wyświetlenie danej listy wyczyśći wszystkei id'ki z danej listy i usunie wszystkie badge,
- możliwość tworzenia customowych list przez użytkownika np atari, kolekcja Uncharted, bijatyki itp.,
- przepisanie store z użyciem configureStore i slice'ów,
- dodanie zakładki o autorze z którtkim opisem i linkami do GH, LI i mailem,
- zapisywanie rezultatu ocen gry (likes, downs) w ogólnym stanie tak aby ocenianie było aktualizowane globalnie dla wszystkich uruchomionych instancji aplikacji,
- ograniczenie like/down do jednego głosu dla danej gry,
- zapisywanie gier do localStorage lub bazy danych,
- dodawanie informacji lub obrazków do gier w Twojej kolekcji,
- wyświetlanie więcej niż 10 wyników z zapytania do bazy OMDB.
