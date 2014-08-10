/**
 * Contains Google Analytics code
 */

if (document.location.hostname.search("chinhodado.github.io") !== -1) { // we don't want this to run when developing locally
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-38672868-6', 'chinhodado.github.io');
    ga('send', 'pageview');
}