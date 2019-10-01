$("#navbar ul.navbar-right").append('<li> \
    <a data-toggle="dropdown"> \
        <img src="https://d2.alternativeto.net/dist/icons/greasemonkey_96788.png?width=128&amp;height=128&amp;mode=crop&amp;upscale=false" height="20" width="20"> \
    </a> \
    <div class="GM dropdown-menu"> \
        <a class="GM dropdown-item" data-toggle="modal" data-target="#modal-odeslat-filtr">Odeslat filtr</a> \
    </div>\
</li>');

$("body").append('\
    <div style="margin-top: 30px" class="modal fade" id="modal-odeslat-filtr" tabindex="-1" role="dialog">\
        <div class="modal-dialog" role="document">\
            <div class="GM modal-content">\
            <div class="GM modal-header">\
                <h5 class="GM modal-title" id="exampleModalLongTitle">Odeslat filtr</h5>\
                <button type="button" class="close"  data-dismiss="modal">\
                <span>&times;</span>\
                </button>\
            </div>\
            <div class="GM modal-body">\
                <form>\
                <div class="form-group">\
                    <label for="recipient-name" class="col-form-label">Příjemce:</label>\
                    <input type="text" class="form-control" id="sendFilter-email">\
                </div>\
                </form>\
                <div class="text-center GM spinner" style="display: none">\
                    <div class="GM spinner-border" role="status"></div>\
                    <br>\
                    <strong>Odesílám e-mail</strong>\
                </div>\
                <div class="text-center GM done" style="display: none">\
                    <div class="GM check" role="status"></div>\
                    <br>\
                    <strong>Úspěšně odesláno</strong>\
                </div>\
            </div>\
            <div class="GM modal-footer">\
                <div class="GM progress">\
                    <div class="GM progress-bar progress-bar-stripped progress-bar-animated bg-success" role="progressbar"></div>\
                </div>\
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Zavřít</button>\
                <button type="button" id="sendFilter" class="btn btn-primary" onclick="window.AdolTools.sendFilter.submit()">Odeslat filtr</button>\
            </div>\
            </div>\
        </div>\
    </div>\
');