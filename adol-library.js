var that = window.AdolTools;

// save the original function object
var _superModal = $.fn.modal;

// add locked as a new option
$.extend( _superModal.Constructor.DEFAULTS, {
    locked: false
});

// capture the original hide
var _hide = _superModal.Constructor.prototype.hide;
// console.log('HIDE:', _hide);

// add the lock, unlock and override the hide of modal
$.extend(_superModal.Constructor.prototype, {
    // locks the dialog so that it cannot be hidden
    lock: function() {
        // console.log('lock called');
        // console.log('OPTIONS',this.options);
        this.options.locked = true;
    }
    // unlocks the dialog so that it can be hidden by 'esc' or clicking on the backdrop (if not static)
    ,unlock: function() {
        // console.log('unlock called');
        this.options.locked = false;
    }
    // override the original hide so that the original is only called if the modal is unlocked
    ,hide: function() {
        // console.log('hide called');
        if (this.options.locked) return;

        _hide.apply(this, arguments);
    }
});

/* SmtpJS.com - v3.0.0 */
var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };