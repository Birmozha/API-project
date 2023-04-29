import { createHomePageBaseSection } from "."

const URL = "https://rickandmortyapi.com/api"

export async function createHomePageMain() {
    const character = getCharacter()
    return createHomePageBaseSection()
        .addClass('page__section_main')
        .append(
            await getCharacter(),
            await getCharacter(),
            await getCharacter(),
            await getCharacter(),
            await getCharacter(),
            await getCharacter(),
            await getCharacter(),
            await getCharacter()
        )
}

async function getCharacter() {
    let random = await getRandom();
    let response = await fetch((URL + `/character/${random}`));
    let json = await response.json();
    return (
        $(`<article class="main__item ${json.status}">`).append(
            $(`<img class="main__item-image" src="${json.image}" alt="">`),
            $('<div class="main__item-properties">').append(
                $('<div class="property-name">').append(
                    $(`<button class="property-button_name" type="button" id="${json.name}")>`).text(json.name)
                ),
                $('<div class="property-status">').text(json.status),
                $('<div class="property-location">').append(
                    $(`<button class="property-button_location" type="button" id="${json.location.name}")>`).text(json.location.name)
                )
            )
        )
    )
}

async function getRandom() {
    let response = await fetch((URL + '/character/'));
    let json = await response.json();
    let count = json.info.count
    return Math.floor(Math.random() * count)
}

export async function findData(id, className) {
    if (className == 'property-button_name') {
        let response = await fetch((URL + `/character/?name=${id}`));
        let json = await response.json();
        console.log(json.results[0])
        alert(`Origin: ${json.results[0].origin.name}\nType: ${json.results[0].type}`)
    }

    else if (className == 'property-button_location') {
        let response = await fetch((URL + `/location/?name=${id}`));
        let json = await response.json();
        console.log(json.results[0])
        alert(`Type: ${json.results[0].type}\nDimension: ${json.results[0].dimension}`)
    }
}