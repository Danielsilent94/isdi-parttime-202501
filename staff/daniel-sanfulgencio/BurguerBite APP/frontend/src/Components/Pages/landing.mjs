import header from '../components/header.mjs';
import { createContainer, createLogo, createTextContainer } from '../lib.mjs'
import navigate from '../navigate.mjs';

const landing = {
    mount: (body) => {
        console.info('landing mounted')
        const landingContainer = createContainer('landing');
        landingContainer.id = 'landing'
        const contentContainer = createContainer('landing__content')
        const landingTitle = createTextContainer('h1', 'PET APP', 'landing__title');
        const landingSubtitle = createTextContainer('h2', 'A social app for pets', 'landing__subtitle');

        header.mount(landingContainer, 'landing')

        const logo = createLogo('20rem');

        contentContainer.append(landingTitle, logo, landingSubtitle)

        landingContainer.append(contentContainer)

        body.appendChild(landingContainer)
    },
    dismount: () => {
        console.info('landing dismounted')
        const landing = document.getElementById('landing');
        landing.remove()
    },
    update: (body) => {
        landing.dismount();
        landing.mount(body);
    }
}

export default landing