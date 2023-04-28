import { createHomePageBaseSection } from "."

export function createHomePageHero(header) {
    const {
        backgroundImage, title, aboutAuthor
    } = header;

    const $hero = (
        $(`<article class="page__hero" style="--background-image: url(${backgroundImage})" data-aos="fade-up">`).append(
            $('<h1 class="page-title">').text(title),
            $('<h4 class="page-text">').text(aboutAuthor)
        )
    );
    
    return createHomePageBaseSection()
        .addClass('page__section_hero')
        .append(
            $hero
        );
}
