that.sendFilter = {
    beforeSend: function() {
        that.getActualProgress = function (){
            return $(".items .record-item").length;
        }
        that.getMaximumProgress = function (){
            return parseInt($(".controls .counter").text().replace("Nalezeno", "").replace("výsledků", "").replace(" ", "").replace(" ",""));
        }

        if( $('#modal-odeslat-filtr form').is(':hidden') ) {
            that.sendFilter.email = undefined;
            that.modalReset();
        }

        that.progressSelector = '.GM.progress-bar';
        $(that.progressSelector).addClass('progress-bar-animated');

        that.sendFilter.listNode = document.querySelector(".items .nano-content > div:nth-child(2)");
        that.sendFilter.listNodeObserver = new MutationObserver(that.sendFilter.listNodeObserverCallback);
        that.sendFilter.listNodeObserver.observe(that.sendFilter.listNode, {'childList': true});
        that.sendFilter.listNodeObserverCallback();
    
        that.sendFilter.buttonNode = document.querySelector(".btn.btn-primary.col-xs-12.ladda-button");
        that.sendFilter.buttonNodeObserver = new MutationObserver(that.sendFilter.buttonNodeObserverCallback);
        that.sendFilter.buttonNodeObserver.observe(that.sendFilter.buttonNode, {'attributes': true, 'attributeFilter': ['disabled']});
        that.sendFilter.buttonNodeObserverCallback();
    },

    listNodeObserverCallback: function() {
        that.progressUpdate();
        if( that.isFinished() ) {
            $(that.progressSelector).removeClass('progress-bar-animated');
            that.sendFilter.exportData();
            if(typeof that.sendFilter.email != 'undefined') {
                that.sendFilter.submit();
            }
        }
    },

    disconnectObservers: function (){
        that.sendFilter.listNodeObserver.disconnect();
        that.sendFilter.buttonNodeObserver.disconnect();
    },

    buttonNodeObserverCallback: function() {
        if($(that.sendFilter.buttonNode).attr('disabled') != 'disabled') {
            $(that.sendFilter.buttonNode).trigger('click');
        }
    },

    exportData: function() {
        var $items = $($(".items").html());
        $.each( $items.find('img, a'), function(key, val) {
            var attribute = $(this).prop('tagName') == 'A' ? 'href':'src';
            var attributeValue = $(this).attr(attribute);
            if(typeof attributeValue != 'undefined' && !/^https?/.test(attributeValue) ) {
                $(this).attr(attribute, 'https://app.adol.cz/app/'+attributeValue);
            }
        });

        $items.find('.ng-hide').remove();
        $items.find('.button-scroll-top.ng-isolate-scope').remove();
        $items.find('.btn.btn-primary.col-xs-12.ladda-button').remove();
        $items.find('.top-header.visible-xs.visible-sm').remove();
        that.sendFilter.message = '<link rel="stylesheet" type="text/css" href="https://app.adol.cz/app/compress/style.min.css">';
        that.sendFilter.message += $items.html();
    },

    submit: function() {
        that.disableInputs();
        that.sendFilter.email = $('#sendFilter-email').val();
        that.sendFilter.subject = 'Uložený ADOL filtr';
        if(that.progress >= 1) {
            that.sendFilter.disconnectObservers();
            that.sendFilter.exportData();
            that.sendEmail(that.sendFilter.email, that.sendFilter.subject, that.sendFilter.message);
        }
    }
}

that.isFinished = function() {
    return that.progress == 1;
}

that.sendEmail = function(email, subject, message) {
    var $modal = $('.modal');
    $modal.find('.modal-body form').hide();
    $modal.find('.modal-body .spinner').show();
    $modal.find('.modal-footer').hide();
    Email.send({
        Host : that.email.Host,
        Username : that.email.Username,
        Password : that.email.Password,
        From : that.email.From,
        To : email,
        Subject : subject,
        Body : message
    }).then( function(message) {
        if(message == "OK") {
            $('.GM.spinner').hide();
            $('.GM.done').show();
            that.enableInputs();
        } else {
            alert("Došlo k chybě: " + message);
            that.modalReset();
            that.enableInputs();
        }
    });
}

that.disableInputs = function() {
    var $modal = $('.modal');
    $modal.modal('lock');
    $input = $(".GM.modal-body input");
    $input.prop('readonly', true);
    $(".GM.modal-footer button").prop('disabled', true);
}

that.enableInputs = function() {
    var $modal = $('.modal');
    $modal.modal('unlock');
    $(".GM.modal-body input").removeAttr('readonly');
    $(".GM.modal-footer button").removeAttr('disabled');
}

that.getActualProgress = function() {
    console.log("Set this function to return actual progress");
}

that.getMaximumProgress = function() {
    console.log("Set this function to return maximum progress");
}

that.progressUpdate = function() {
    that.progress = that.getActualProgress()/that.getMaximumProgress();
    if(that.progress >= 1) {
        that.progress = 1;
    }
    $(that.progressSelector).css('width', Math.floor(that.progress*100)+'%');
}

that.modalReset = function() {
    var $modal = $('.modal');
    $modal.find('form').show();
    $modal.find('.modal-body .spinner').hide();
    $modal.find('.modal-body .done').hide();
    $modal.find('.modal-footer').show();
    that.enableInputs();
}

$("body").on("show.bs.modal", '#modal-odeslat-filtr', that.sendFilter.beforeSend);
$("body").on("hidden.bs.modal", '#modal-odeslat-filtr', that.sendFilter.disconnectObservers);