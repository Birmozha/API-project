import { landing } from '../../constants/landing'; 
import { createHomePageHero } from './header';
import { createHomePageMain } from './main';
import { createHomePageAbout } from './about';

export async function createHomePage() {
    const { header, about } = landing;

    return $('<div class="page page_home">').append(
        createHomePageHero(header),
        await createHomePageMain(),
        createHomePageAbout(about)
    );
}

export function createHomePageBaseSection() {
    return $('<section class="page__section" data-aos="fade-up">');
}