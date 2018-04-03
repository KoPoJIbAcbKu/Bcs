(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
			factory(global, true) :
			function (w) {
			    if (!w.document) {
			        throw new Error("Supernova need backup");
			    }
			    return factory(w);
			};
    } else {
        factory(global);
    }
}(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    var strundefined = "undefined";
    var Supernova = function () {
        return new Supernova.fn.init();
    }
    Supernova.fn = Supernova.prototype = {
        SupershWebsocketServerLocation: 'serviceip',
        socket: null,
        socketRequests: [],
        socketReconnectRequest: [],
        dlls: [],
        constructor: Supernova,
        init: function (obj) {
            var self = this;
        },
        create: function (ips) {
            var self = this;
            if (ips != '' && ips != undefined) {
                self.SupershWebsocketServerLocation = ips;
            }
            if (self.socket === null) {
                self.openedSocket();
            }
            else {
                if (self.socket.readyState !== 1 && self.socket.readyState !== 0) {
                    self.openedSocket()
                }
            }
        },
        openedSocket: function () {
            var self = this;
            self.connect();
            if (self.socket != null) {
                self.socket.onopen = function (event) { self.onOpenSocket(event); };
                self.socket.onmessage = function (event) { self.onMessageSocket(event); };
                self.socket.onclose = function (event) {
                    self.onCloseSocket();
                    setTimeout(function () { self.init(); }, 5000);
                };
            }
        },
        connect: function () {
            try {
                if (typeof (WebSocket) !== 'undefined') {
                    this.socket = new WebSocket(this.SupershWebsocketServerLocation);
                } else {
                    this.socket = new MozWebSocket(this.SupershWebsocketServerLocation);
                }
            } catch (e) {
            }
        },
        onOpenSocket: function () {
            var self = this;
            if (window.timerID) {
                window.clearInterval(window.timerID);
                window.timerID = 0;
            }
            if (self.socketReconnectRequest.length > 0) {
                self.socketReconnectRequest.forEach(function (item, i, arr) {
                    self.send(item);
                });
            }
            if (self.socketRequests.length > 0) {
                self.socketRequests.forEach(function (item, i, arr) {
                    self.send(item);
                });
                self.socketRequests = [];
            }
            self.onStartSocket();
        },
        onMessageSocket: function (msg) {
            var self = this;
            response = String(msg.data);
            var envelop = JSON.parse(response);
            self.socketMessage(envelop);
        },
        socketMessage: function (msg) { console.log(msg); },
        appendDll: function (element) {
            var self = this;
            self.dlls.push(element);
            return element;
        },
        onCloseSocket: function () { console.log('crash socket connection'); },
        onStartSocket: function () { console.log('start socket connection'); },
        send: function (command) {
            var request = command;
            if (this.socket != null && this.socket.readyState == 1) {
                if (command.responses != undefined) {
                    for (var i = 0; i < command.responses.length; i++) {
                        if (command.responses[i].data != undefined && typeof (command.responses[i].data) != "string") {
                            command.responses[i].data = JSON.stringify(command.responses[i].data).replace(new RegExp('"', 'g'), '\\"');
                        }
                    }
                }
                console.log(JSON.stringify(request));
                this.socket.send(JSON.stringify(request) + '|')
            }
            else
                this.socketRequests.push(command)
        }
    };
    Supernova.setStartCommand = function (commands) {
        if (commands.length > 0) {
            commands.forEach(function (item, i, arr) {
                Supernova.fn.send(item);
            });
        }
        Supernova.fn.socketReconnectRequest = commands;
    }
    Supernova.setSocketCloseEvent = function (event) {
        Supernova.fn.onCloseSocket = event;
    }
    Supernova.setSocketStartEvent = function (event) {
        Supernova.fn.onStartSocket = event;
    }
    Supernova.setMessageEvent = function (event) {
        Supernova.fn.socketMessage = event;
    }
    Supernova.send = function (command) {
        Supernova.fn.send(command);
    }
    Supernova.connect = function (connectstring) {
        Supernova.fn.create(connectstring);
    }
    if (typeof noGlobal === strundefined) {
        window.Supernova = window.$S = Supernova;
        window.Supernova.fn.init();
    }
    return Supernova;
}));