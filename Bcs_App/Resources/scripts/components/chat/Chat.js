(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) { // jshint ignore:line
        // AMD. Register as an anonymous module.
        define(['jquery'], factory); // jshint ignore:line
    } else { // noinspection JSUnresolvedVariable
        if (typeof module === 'object' && module.exports) { // jshint ignore:line
            // Node/CommonJS
            // noinspection JSUnresolvedVariable
            module.exports = factory(require('jquery')); // jshint ignore:line
        } else {
            // Browser globals
            factory(window.jQuery);
        }
    }
}(function ($) {
    "use strict";

    var NAMESPACE, tHeader, tMain, tArea, tAdminPanel, tAdmin, tSelectAdmin, tZone, tText, tBottom, tChat, handler, defaultLayoutTemplates, Chat, tMessageleft, tMessageright;
    NAMESPACE = '.chat';


    handler = function ($el, event, callback, skipNS) {
        var ev = skipNS ? event : event.split(' ').join(NAMESPACE + ' ') + NAMESPACE;
        $el.off(ev).on(ev, callback);
    };

    tMain =
        '<div id="chat_area" class="ui-draggable" style="display: block;"></div>\n';

    tHeader =
        '<span id="chat-header"><a href="#" id="headlabel">Задать вопрос</a></span>\n';

    tArea =
        '<div id="toggble-area"></div>\n';

    tAdminPanel =
        '<div id="admins-list">';

    tAdmin =
        '<div class="admin-item" id="vhelper{number}" tag="{number}">\n' +
            '<img src="{resources}" class="avatar" height="50">\n' +
            '<span class="vh-name">{name}</span>\n' +
            '<span class="direction">{title}</span>\n' +
        '</div>\n';

    tSelectAdmin =
        '<div class="admin-item" id="vh-current">\n' +
            '<img class="avatar" id="avatar" src="" height="50">\n' +
            '<span class="vh-name" id="cur-name"></span>\n' +
            '<span class="direction" id="cur-direct"></span>\n' +
        '</div>\n'

    tChat = '<div id="chat-container" style="display: none;"></div>\n';

    tZone = '<div id="chat_zone" class="ps-container"><div id="messages_form"></div></div>\n';

    tText = 
        '<div class="input-group no-border">\n' +
            '<textarea type="text" class="form-control" id="mess_input" placeholder="Текс сообщения"></textarea>\n' +
            '<span class="input-group-addon btn_send"><span class="fa fa-paper-plane"></span></span>\n' +
        '</div>\n';

    tBottom = '<div class="bottom"><span>Сервис предоставлен<a href="http://xn----7sba2bgi3agqk.xn--p1ai/"> SuperSH.ru</a></span></div>\n';
    
    tMessageright =
        '<div class="msg-right-block">\n' +
            '<div class="timeblock-r">{time}</div>\n' +
            '<div class="arrow-l"></div>\n' +
            '<div class="message_incoming">{message}</div>\n' +
        '</div>\n';

    tMessageleft =
        '<div class="msg-left-block">\n' +
            '<div class="timeblock-l">{time}</div>\n' +
            '<div class="arrow-r"></div>\n' +
            '<div class="message_outcoming">{message}</div>\n' +
        '</div>\n';

    defaultLayoutTemplates = {
        main: tMain
    };

    Chat = function (element, username, hotelname, uid) {
        var self = this;
        self.$element = $(element);
        self._init(username, hotelname, uid);
    }

    Chat.prototype = {
        constructor: Chat,
        _init: function (username, hotelname, uid, e) {
            var self = this, $el = self.$element, t;
            self.count = 0;
            self.$connect = {};
            self.$connect.$channel = 0;
            self.$connect.$user = username;
            self.$connect.$hotel = hotelname;
            self.$connect.$uid = uid;
            self.$connect.$is = false;

            self.$element.append(tArea);
            self.$element.$area = self.$element.find("#toggble-area");

            self.$element.$area.append(tAdminPanel);
            self.$element.$apanel = self.$element.find("#admins-list");
            
            self.$element.$area.append(tChat);
            self.$element.$chat = self.$element.find("#chat-container");

            self.$element.$chat.append(tSelectAdmin);
            self.$connect.$admin = self.$element.$chat.find("#vh-current");           

            handler(self.$connect.$admin, 'click', function (e) {
                self.$element.$apanel.show();
                self.$element.$chat.hide();
            });

            self.$element.$chat.append(tZone);

            self.$element.$messages = self.$element.$chat.find("#messages_form");

            self.$element.$chat.append(tText);
            self.$element.$input = self.$element.$chat.find("#mess_input");

            self.$element.$area.append(tBottom);

            self._startSocket("wss://chat.supersh.ru/ChatHandler.ashx");
            
            handler(self.$element.$input.parent().find('span'), 'click', function (e) {
                self.sendMessage();
            });
            handler(self.$element, 'click', function (e) {
                e.stopPropagation();
                return false;
            });
        },
        _addAdmin: function (id, name, discript, pict) {
            var self = this;
            self.$element.$apanel.append(tAdmin
                .replace(new RegExp('{number}', 'g'), (id))
                .replace(new RegExp('{name}', 'g'), (name))
                .replace(new RegExp('{title}', 'g'), (discript))
                .replace(new RegExp('{resources}', 'g'), (pict)));
            
            handler(self.$element.$apanel.children('#vhelper' + id), 'click', function (e) {
                self.$connect.$admin.find('#avatar').attr('src', $(this).find('img').attr('src'));
                self.$connect.$admin.find('#cur-name').text($(this).find('.vh-name').text());
                self.$connect.$admin.find('#cur-direct').text($(this).find('.direction').text());
                self._changeChannel($(this).attr('tag'));
            });
        },
        _startSocket: function (websocketServerLocation) {
            var self = this;            
            self.$socket = self.connect(websocketServerLocation);
            self.$socket.onopen = function (event) { self._onOpenSocket(event); };
            self.$socket.onmessage = function (event) { self._onMessageSocket(event); };
            self.$socket.onclose = function (event) {
                self._onCloseSocket();
                setTimeout(function () { self._startSocket(websocketServerLocation) }, 5000);
            };
        },
        _onOpenSocket: function () {
            var self = this;
            if (window.timerID) {
                window.clearInterval(window.timerID);
                window.timerID = 0;
            }
            var domain = window.document.URL;
            var dmname = "";
            var mch = domain.match(/\/([a-z0-9.-]+)[:]*([0-9]*)\//);
            if (mch !== null) {
                if (mch.length > 1) {
                    dmname = domain.match(/\/([a-z0-9.-]+)[:]*([0-9]*)\//)[1];
                    //console.log(dmname);
                }
            }
            else {
                dmname = window.document.domain;
            }
            self.$socket.send("9.9.9#" + dmname + "|");
            //console.log("Query: " + dmname);
        },
        connect: function (webUrl) {
            var socket;
            if (typeof (WebSocket) !== 'undefined') {
                socket = new WebSocket(webUrl);
            } else {
                socket = new MozWebSocket(webUrl);
            }
            return socket;
        },
        _onMessageSocket: function (msg) {
            var self = this;
            var envelop = JSON.parse(msg.data);
            //console.log(envelop);
            var envType = envelop.type;
            //console.log(envType);
            switch (envType) {
                case 'Connection': {
                    //console.log(envelop.body);
                    if (envelop.body.Type === "on") {
                        self.$connect.$is = true;
                        AuthMutas.send({ "password": envelop.body.Id, "type": 2, "login": envelop.body.chat.Fio });
                        ChangeChatMutas.send({ "chat": envelop.body.Id});
                        $('#mess_input').keyup(function () { 
                              SendTextMutas.send({ 'text': $(this).val() }); 
                        });
                    }
                    break;
                }
                case 'Param': {
                    //console.log(envelop.body);
                    envelop.body.channels.channels.forEach(function (elem, i) {
                        self._addAdmin(elem.Id_chanel, elem.Name, elem.Spectext, elem.Pict);
                    });
                    self._authorize();
                    //console.log("Подключено");
                    break;
                }
                case "Message": {
                    //console.log(envelop.body);
                    if (envelop.body.ChannelId == self.$connect.$channel) {
                        if (envelop.body.Mattis === null) return;
                        envelop.body.Mattis.forEach(function (elem) {
                            switch (elem.TypeId) {
                                case 0: { self.addmessageOut(elem.Text, self.DateCut(elem.Date)); break; }
                                case 1: { self.addmessageIn(elem.Text, self.DateCut(elem.Date)); break; }
                            }
                        });
                        self.$element.$apanel.hide();
                        self.$element.$chat.show();
                        self.$element.$messages.parent().scrollTop(self.$element.$messages.parent().height())
                    }
                    break;
                }
            }
        },
        _authorize: function () {
            var self = this;
            var tosend = '1.1.2' + '#' + self.$connect.$user + ";;" + self.$connect.$hotel + ";" + ";;;;" + '|';
            self.$socket.send(tosend);
            //console.log(tosend);
        },
        _onCloseSocket: function () {

        },
        _changeChannel: function (id) {
            var self = this;
            if (self.$connect.$is === false) return;
            self.clearChat();
            self.$connect.$channel = id;
            var request = "1.4.2#" + id + '|';
            //console.log("Смена канала:" + request);
            self.$socket.send(request);
            ChangeChannelMutas.send({ "channel": id});
        },
        addmessageIn: function (msg, time) {
            var self = this;
            if (time === null || time === '') time = self.DateCut(new Date());
            self.$element.$messages.append(tMessageright
                .replace(new RegExp('{time}', 'g'), (time))
                .replace(new RegExp('{message}', 'g'), (msg)));
        },
        addmessageOut: function (msg, time) {
            var self = this;
            if (time === null || time === '') time = self.DateCut(new Date());
            self.$element.$messages.append(tMessageleft
                .replace(new RegExp('{time}', 'g'), (time))
                .replace(new RegExp('{message}', 'g'), (msg)));
        },
        clearChat: function () {
            var self = this;
            self.$element.$messages.empty();
        },
        DateCut: function (date) {
            var offset = new Date().getTimezoneOffset();
            var hOff = parseInt(offset / 60) + 4;

            var pattern = /(\d+)\.(\d+)\.(\d{4}) (\d+):(\d+):(\d+)/;
            var str = date.match(pattern);
            return parseInt(str[4]) - hOff + ":" + str[5];
        },
        sendMessage: function () {
            var self = this;
            var text = self.$element.$input.val();
            if (text !== null && text !== "") {
                self.$socket.send('1.2.2#' + text + '|');
                self.$element.$input.val('');
                SendTextMutas.send({ 'text': '' });
            }
        },
        destroy: function () {
            var self = this, $cont = self.$container;
            $cont.find('.file-drop-zone').off();
            self.$element.insertBefore($cont).off(NAMESPACE).removeData();
            $cont.off().remove();
            return self.$element;
        }
    }

    $.fn.chat = function (username, hotelname, uid) {
        this.each(function () {
            var self = $(this), data = self.data('chat');
            self.empty();
            data = new Chat(this, username, hotelname, uid);
            self.data('chat', data);
            return this;
        });
    };

    $.fn.chat.Constructor = Chat;

}));