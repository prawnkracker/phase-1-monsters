const URL_PREFIX = 'http://localhost:3000/';
let page = 1;

function getMonsters(a){
    fetch(URL_PREFIX+`monsters/?_limit=50&_page=${a}`)
    .then(resp => resp.json())
    .then(data => {
            document.querySelector('#monster-container').innerHTML='';
            for (let i=0; i < data.length; i++)
            createMonsterCard(data[i])
        });
    }

function createMonsterCard(monster){
    let div = document.createElement('div'),
    h2 = document.createElement('h2'),
    h4 = document.createElement('h4'),
    p = document.createElement('p');
    h2.innerHTML = `${monster.name}`;
    h4.innerHTML = `Age: ${monster.age}`;
    p.innerHTML = `Description: ${monster.description}`;
    div.appendChild(h2);
    div.appendChild(h4);
    div.appendChild(p);
    document.querySelector('#monster-container').appendChild(div)
}

function createMonsterForm(){
    let form = document.createElement('form'),
    name = document.createElement('input'),
    age = document.createElement('input'),
    description = document.createElement('input'),
    submitButton = document.createElement('button');
    form.id = 'monster-form';
    name.id = 'name';
    age.id = 'age';
    description.id = 'description';
    name.placeholder = 'name...';
    age.placeholder = 'age...';
    description.placeholder = 'description...';
    submitButton.innerHTML = 'Create Monster';
    form.appendChild(name);
    form.appendChild(age);
    form.appendChild(description);
    form.appendChild(submitButton);
    document.getElementById('create-monster').appendChild(form);
    addSubmitEventListener()
}

function addSubmitEventListener(){
    document.querySelector('#monster-form').addEventListener('submit', (e)=> {
        e.preventDefault();
        postNewMonster(getFormData());
        clearForm();
    })
}

function getFormData(){
    let a = document.querySelector('#name'),
    b = document.querySelector('#age'),
    c = document.querySelector('#description');
    return {
        name: a.value,
        age: parseFloat(b.value),
        description: c.value
    }
}

function postNewMonster(a){
    fetch(URL_PREFIX+`monsters`, {
    method: 'POST',
    headers: {
        'Content-type':'application/json',
        Accept:'application/json'
    },
    body:JSON.stringify(a)
    })
    .then(resp => resp.json())
}

function clearForm(){
    document.querySelector('#monster-form').reset()
}

function addNavListeners(){
    let a = document.querySelector('#back'),
    b = document.querySelector('#forward');
    a.addEventListener('click', ()=>pageDown());
    b.addEventListener('click', ()=>pageUp())
}

function pageDown(){
    if(page>1){
        page--
        return getMonsters(page)
    } else{
        alert('No more monsters')
    }
}

function pageUp(){
    page++
    return getMonsters(page)
}

function init(){
    getMonsters(), createMonsterForm(), addNavListeners()
};

init()