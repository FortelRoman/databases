"use strict";
exports.__esModule = true;
var react_1 = require("react");
var client_1 = require("react-dom/client");
require("./index.less");
var ru_RU_1 = require("antd/lib/locale/ru_RU");
var antd_1 = require("antd");
var routing_1 = require("./routing");
var root = client_1["default"].createRoot(document.getElementById('root'));
root.render(react_1["default"].createElement(antd_1.ConfigProvider, { locale: ru_RU_1["default"] },
    react_1["default"].createElement(routing_1["default"], null)));
