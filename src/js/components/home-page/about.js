import { createHomePageBaseSection } from ".";

export function createHomePageAbout(about) {

    return createHomePageBaseSection()
        .addClass('page__section_about')
        .append(
            about.map(createItem),
            $('<div class="about__item-links">').append(
                $('<a class="item-link" href="https://rickandmortyapi.com/">').text('Main'),
                $('<a class="item-link" href="https://rickandmortyapi.com/documentation/">').text('Docs')
            )
        );
}

function createItem(tour) {
    const { header, text } = tour;
    return (
        $('<article class="about__item">').append(
            $('<h1 class="about__item-header">').text(header),
            $('<div class="about__item-text">').text(text)
        )
    );
}