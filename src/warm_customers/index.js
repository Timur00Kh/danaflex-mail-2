import template from './index.hbs'
import scss from './index.scss'
import juice from 'juice'


const neededVar = {bgImg, danaflexLogo, li1, li2, li3, li4, li5};

const data = {
    styleString: scss.toString(),
    name: 'World',
    images: {
        danaflexLogo: `https://timur00kh.github.io/danaflex-mail-1/images/danaflex.png`,
        bg: `https://timur00kh.github.io/danaflex-mail-1/images/bg.png`,
        li: {
            li1: `https://timur00kh.github.io/danaflex-mail-1/images/li/1.png`,
            li2: `https://timur00kh.github.io/danaflex-mail-1/images/li/2.png`,
            li3: `https://timur00kh.github.io/danaflex-mail-1/images/li/3.png`,
            li4: `https://timur00kh.github.io/danaflex-mail-1/images/li/4.png`,
            li5: `https://timur00kh.github.io/danaflex-mail-1/images/li/5.png`
        }
    },
    links: {
        signup: 'https://event-danaflex.com/'
    },
    neededVar
}

function getText () {
    const hbsResult = template({
        ...data,
        links: {
            ...data.links,
            signup: document.getElementById("signup").value
        }
    });
    return juice(hbsResult);
}



document.getElementById('download').addEventListener("click", (e) => {
    e.preventDefault();
    download('danaflex-email.html', getText());
})

document.getElementById('copy').addEventListener("click", (e) => {
    e.preventDefault();
    copyTextToClipboard(getText());
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
    const hbsResult = template(data)
    const cssInlined = juice(hbsResult)
    document.documentElement.innerHTML = cssInlined
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
