import './style.css'

//! Знайомство з TS

// скалярний тип значень: всі примітиви
let a: number = 5;
// тут тип автоматично визначається - виведенням типів (type inference)
a = true;
console.log(a);


//! Типізація об`єктів 
// тут після user - я вказую тип тобто сам об єкт стає конкретним типом 
const user: { name: string; age: number } = {
  name: "Alice",
  age: 25
};

// Використання інтерфейсів

//Якщо є декілька об’єктів з однаковим типом, незручно дублювати їх опис перед кожним оголошенням.
// для цього використовуємо interface 

//оголошуємо інтерфейс
interface User {
  name: string;
  age: number;
}

// викокирстовуємо інтерфейс 
const poly: User = {
  name: "poly",
  age: 25,
};

const jacob: User = {
  name: "jacob",
  age: 12,
};
// Тут User – це власний тип , створений для представлення об'єкта користувача.

// Опціональні (?) та readonly поля

// опціональні - тобто такі, які можуть 

interface SomeUser {
  name: string;
  age?: number;
}

const ben: SomeUser = {
  name: 'Ben'
}

// readonly - це ті поля які доступні тільки для зчитування інформації 

interface Books {
  readonly id: number;
  bookName: string;
}

const book: Books = {
  id: 35,
  bookName: "буквар",
}

book.id = 234 // помилка

// типізація мисивів 

// Існує два основних способи оголошення масивів:

// використання тип[]
// використання Array<тип>

const numbers: number[] = [1, 23, 4, 5, 6,];
const strings: string[] = ['d', 'd', 'f'];

// альтернатива

const altnumbers: Array<number> = [1, 2, 3, 4, 5];
const altstrings: Array<string> = ['a', 'b', 'c'];

numbers.push('a') // помилка, тому що масив типізований конкретно під number

// Типізація масиву об'єктів

interface UserArr {
  name: string;
  age: number;
}

const users: UserArr[] = [       // або Array<UserArr>
  { name: "Alice", age: 25 },
  { name: "Jacob", age: 30 }
];

//!=============
//Власні типи

//TypeScript дозволяє комбінувати типи за допомогою операторів Union Type (|) та Intersection Type (&).

let userId: string | number = 123;
userId = 'jrfj2n4';

// тут немає помилки бо ми комбінуємо за допомогою Union type;

//За допомогою об'єднання можна не тільки вказувати типи, а й задавати набір можливих значень для змінної.

let status: "pending" | "shipped" | "delivered" = "pending";

status = "shipped";

//Об'єднання також можна використовувати для типізації властивостей об'єкта:

interface UserTest  {
  id: number;
  role: "admin" | "user";
}

const obj: UserTest = {
  id: 123,
  role: "user",
}


// Власні та літеральні типи
// Для зручності та повторного використання можна створювати власні типи за допомогою type.

type id = string | number // тут ми задаємо власний тип

let productId: id = "kek"
productId = 123           // помилки нем, бо є власний тип 

// Літеральні типи дозволяють обмежити можливі значення змінної конкретними значеннями.

//? ось це літеральний тип запису -> 
type OrderStatus = "pending" | "shipped" | "delivered" | "canceled";

//! Intersection (&)

//Intersection дозволяє створювати новий тип, який поєднує властивості двох або більше існуючих типів.

type FirstType = string;
type SecondType = number;



type UnionType = FirstType | SecondType;

// Базова структура HTTP-відповіді
interface HttpResponse {
  status: number;
  message: string;
}

// Специфічна відповідь для користувача
interface UserData {
  id: number;
  name: string;
  email: string;
}

// Поєднання базової відповіді з даними користувача
type UserResponse = HttpResponse & { data: UserData };

const response: UserResponse = {
  status: 200,
  message: "Success",
  data: {
    id: 1,
    name: "Alice",
    email: "alice@example.com"
  }
};

console.log(response.data.name); // Alice

//Що таке Union Type ? Механізм для об'єднання кількох типів в один.

//Типізація функцій
//Аргументи функції можна типізувати так само, як і звичайні змінні:

function foo(a: number, b: number): void{
  return console.log(a + b);
}

foo(3, 4) 

//Тип значення, яке повертає функція

function sum(a: number, b: number): number{
  return a + b;
}

const result = sum(4, 3);

//

//Розглянемо задачу, де необхідно написати функцію, що отримує список користувачів та повертає імена цих користувачів у вигляді масиву рядків

interface User1 {
  id: number;
  name: string;
}

const userList: User1[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

function showName(arr: User1[]): string[]{
  return arr.map((user: User1):string => {
    return user.name
  });
}

console.log(showName(userList));

//Опціональні параметри

function greet(name: string, age?: number) {
  if (age !== undefined) {
    console.log(`Hello, my name is ${name} and I am ${age} years old.`);
  } else {
    console.log(`Hello, my name is ${name}.`);
  }
}

greet("Alice", 30); // ✅
greet("Bob"); // ✅
greet("Jacob", true); // ❌

//Function Type (Тип функції)

type AddFunction = (a: number, b: number) => number;

const add: AddFunction = (x, y) => x + y;

console.log(add(2, 3)); // 5
// Function Type визначає, які аргументи приймає функція та яке значення повертає. Для цього використовують type.


//Generics (узагальнені типи) у TypeScript дозволяють створювати гнучкі функції та структури, 
// що можуть працювати з будь-якими типами даних.

function myFumction<T>(a: T): T{
  return a;
}

myFumction<number>(4);
myFumction<string>("s");

//Generics корисні для роботи з масивами. Наприклад, напишемо функцію, яка приймає масив та повертає його перший елемент.

function returnFirstElem<T>(a: T[]): T{
  return a[0];
};

const someArr: number[] = [1, 2, 3, 4, 5];

returnFirstElem<number>(someArr);

const getData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Hello, TypeScript!"), 1000);
  });
};

getData().then((result) => console.log(result)); // "Hello, TypeScript!"
