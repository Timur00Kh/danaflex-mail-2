import template from './index.hbs'
import scss from './index.scss'
import juice from 'juice'

import keepInTouch from '../../images/eng/keep-in-touch.jpeg'
import fewWordsAboutMe from '../../images/eng/few-words-about-me.jpeg'
import revealMysteries from '../../images/eng/reveal-mysteries.jpeg'
import seeYou from '../../images/eng/see-you.jpeg'
import seeYouSoon from '../../images/eng/see-you-soon.jpeg'
import switchSustainable from '../../images/eng/switch-sustainable.jpeg'
import haveYouHead from '../../images/eng/have-you-heard.png'
import appStore from '../../images/ico/app-store.png'
import googlePlay from '../../images/ico/google-play.png'

import fb from '../../images/ico/fb.png'
import inst from '../../images/ico/inst.png'
import linked from '../../images/ico/linked.png'
import logo from '../../images/logo.png'

const neededVar = {
    keepInTouch,
    fewWordsAboutMe,
    revealMysteries,
    seeYou,
    seeYouSoon,
    switchSustainable,
    haveYouHead,

    fb,
    inst,
    linked,
    appStore,
    googlePlay,
    logo,
};

const data = {
    styleString: scss.toString(),
    images: {
        keepInTouch: `https://timur00kh.github.io/danaflex-mail-2/images/eng/keep-in-touch.jpeg`,
        fewWordsAboutMe: `https://timur00kh.github.io/danaflex-mail-2/images/eng/few-words-about-me.jpeg`,
        revealMysteries: `https://timur00kh.github.io/danaflex-mail-2/images/eng/reveal-mysteries.jpeg`,
        seeYou: `https://timur00kh.github.io/danaflex-mail-2/images/eng/see-you.jpeg`,
        seeYouSoon: `https://timur00kh.github.io/danaflex-mail-2/images/eng/see-you-soon.jpeg`,
        switchSustainable: `https://timur00kh.github.io/danaflex-mail-2/images/eng/switch-sustainable.jpeg`,
        haveYouHead: `https://timur00kh.github.io/danaflex-mail-2/images/eng/have-you-heard.png`,
        logo: `https://timur00kh.github.io/danaflex-mail-2/images/logo.png`,

        fb: `https://timur00kh.github.io/danaflex-mail-2/images/ico/fb.png`,
        inst: `https://timur00kh.github.io/danaflex-mail-2/images/ico/inst.png`,
        linked: `https://timur00kh.github.io/danaflex-mail-2/images/ico/linked.png`,
        appStore: `https://timur00kh.github.io/danaflex-mail-2/images/ico/app-store.png`,
        googlePlay: `https://timur00kh.github.io/danaflex-mail-2/images/ico/google-play.png`,
    },
    links: {
        unsubscribe: "#",
    },
    neededVar
}

function getText () {
    const hbsResult = template({
        ...data,
        links: {
            ...data.links,
            unsubscribe: document.getElementById("unsubscribe")?.value,
        }
    });
    return juice(hbsResult);
}



document.getElementById('download').addEventListener("click", (e) => {
    e.preventDefault();
    download('speaking_package.html', getText());
})

document.getElementById('preview').addEventListener("click", (e) => {
    e.preventDefault();
    preview();
    window.location.hash = 'preview';
})

function download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

if (window.location.href.indexOf('preview') > -1) {
    preview();
}

function preview() {
    document.documentElement.innerHTML = getText();
}

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}
