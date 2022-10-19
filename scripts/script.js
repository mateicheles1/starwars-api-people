

const url = 'https://swapi.dev/api/people/';
const container = document.querySelector('#container');

class Person {
    constructor(data) {
        this.name = data.name;
        this.hairColor = data.hair_color;
        this.height = data.height;
        this.birthYear = data.birth_year;
        this.eyeColor = data.eye_color;
        this.gender = data.gender;
        this.url = data.url;
    }
}

class PersonCard {
    constructor(person) {
        this.person = person;
    }

    mount(parentElement) {
        const el = this.createElement();
        parentElement.appendChild(el);
    }

    createElement() {
        const el = document.createElement('div');
        el.innerHTML = `
        <div class="box"> <h3 class="box--heading">${this.person.name} </h3>
            <span class="box--text">Hair color: ${this.person.hairColor}. </span> <br>
            <span class="box--text">Height: ${this.person.height}. </span> <br>
            Birth year: ${this.person.birthYear}
            <br>
            Eye Color: ${this.person.eyeColor}
            <br>
            Gender: ${this.person.gender}
            <br>
            URL: ${this.person.url}
            </div>
        `
        return el;
    }
}

class PeopleList {
    people;

    constructor(container) {
        this.container = container;
    }

    async print() {
        this.people = await getData();
        const childContainer = this.createChildContainer();
        this.container.appendChild(childContainer);
        this.mountPeopleCard();
    }

    createChildContainer() {
        const el = document.createElement('div');
        return el;
    }

    mountPeopleCard() {
       this.people.forEach(person => {
        const personCard = new PersonCard(person);
        personCard.mount(container);
       });
    }
}

async function getData () {
    const response = await fetch(url);
    const data = await response.json();
    return data.results.map(person => new Person(person))
}

async function main () {
    const peopleList = new PeopleList(container);
    peopleList.print();
}

document.addEventListener('DOMContentLoaded', main);