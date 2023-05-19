"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const consultasFuncts_1 = require("../mismodulos/consultasFuncts");
const prodsRouter = express_1.default.Router();
prodsRouter.get('/prods', (req, res) => {
    res.status(200).send('pagina de productos principal');
});
prodsRouter.get('/prods/defecto', (req, res) => {
    (0, consultasFuncts_1.prodsPorDefecto)()
        .then(prods => res.status(200).send(prods))
        .catch(err => res.status(404).send(err));
});
prodsRouter.get('/prods/nombre/:criterio', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let prods;
    try {
        if (req.params.criterio === 'asc')
            prods = yield (0, consultasFuncts_1.prodsPorNombreAsc)();
        else if (req.params.criterio === 'desc')
            prods = yield (0, consultasFuncts_1.prodsPorNombreDesc)();
        else
            throw new Error('Bad request params');
        res.status(200).send(prods);
    }
    catch (err) {
        res.status(404).send(err);
    }
})));
prodsRouter.get('/prods/precio/:criterio', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let prods;
    try {
        if (req.params.criterio === 'asc')
            prods = yield (0, consultasFuncts_1.prodsPorPrecioAsc)();
        else if (req.params.criterio === 'desc')
            prods = yield (0, consultasFuncts_1.prodsPorPrecioDesc)();
        else
            throw new Error('Bad request params');
        res.status(200).send(prods);
    }
    catch (err) {
        res.status(404).send(err);
    }
})));
prodsRouter.get('/prods/categoria/:criterio', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let prods;
    try {
        if (req.params.criterio === 'asc')
            prods = yield (0, consultasFuncts_1.prodsPorCatAsc)();
        else if (req.params.criterio === 'desc')
            prods = yield (0, consultasFuncts_1.prodsPorCatDesc)();
        else
            throw new Error('Bad request params');
        res.status(200).send(prods);
    }
    catch (err) {
        res.status(404).send(err);
    }
})));
prodsRouter.post('/prods/resena/:criterio', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let datos = req.body;
    let prods;
    try {
        if (req.params.criterio === 'asc')
            prods = yield (0, consultasFuncts_1.reseñasAsc)(datos.ProductoID);
        else if (req.params.criterio === 'desc')
            prods = yield (0, consultasFuncts_1.reseñasDesc)(datos.ProductoID);
        else
            throw new Error('Bad Request params');
        res.status(200).send(prods);
    }
    catch (err) {
        res.status(404).send(err);
    }
})));
exports.default = prodsRouter;
