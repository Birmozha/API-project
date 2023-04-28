import '../css/index.scss';

import AOS from 'aos';
import 'aos/dist/aos.css';
import $ from 'jquery';
import { createHomePage } from './components/home-page';
import { findData } from './components/home-page/main';

document.addEventListener('DOMContentLoaded', async () => {
    window.$ = $;
    AOS.init({ offset: 100 });
    $('main').append(
        await createHomePage()
    );
    document.querySelectorAll('button').forEach(function(button) {
        button.addEventListener('click', async function() {
            await findData(this.id, this.className)
        });
      });
});

