function defDict(type) {
    var dict = {};
    return {
        get: function (key) {
            if (!dict[key]) {
                dict[key] = type.constructor();
            }
            return dict[key];
        },
        dict: dict
    };
}

function Py2blockConfig (){
    this.initIgnoreS();
    this.initModuleAttrD();
    this.initKnownModuleS();
}

var pbc = Py2blockConfig.prototype;
pbc.ESP32 = "MicroPython[ESP32]";
pbc.board = pbc.ESP32;
pbc.objectFunctionD = defDict({});
pbc.moduleFunctionD = defDict({});
pbc.moduleAttrD = defDict({});
pbc.objectAttrD = defDict({});
pbc.globalFunctionD = {};
pbc.assignD = defDict({});
pbc.ifStatementD= defDict({});
pbc.whileStatementD= defDict({});
pbc.forStatementD= defDict({});
pbc.reservedNameD= {};
pbc.knownModuleS = new Set();
pbc.objectTypeD = {}; //key：变量名，value：变量类型，如{'a':'List'}
pbc.ignoreS = new Set();
pbc.pinType = null;
pbc.inScope = null;

//忽略某些方法、类、赋值
pbc.initIgnoreS = function(){
    var pythonIgnoreL = [
        //math.js
        'mixly_mapping',
        //lists.js
        'lists_sort', 'math_mean', 'math_median', 'math_modes', 'math_standard_deviation',
    ];
    var boardIgnoreL = [
    ];

    var ignoreL = pythonIgnoreL.concat(boardIgnoreL);
    for (var i = 0; i < ignoreL.length; i++) {
        this.ignoreS.add(ignoreL[i]);
    }
}

pbc.initModuleAttrD = function(){
    for (var i = 0; i < profile.default.builtinimg.length; i++) {
        pbc.moduleAttrD.get('matrix.Image')[profile.default.builtinimg[i][0]] = function (node, module, attr) {
            return block("pins_builtinimg", node.lineno, {
                "PIN": module + "." + attr
            });
        }
    }
    for (var i = 0; i < profile.default.imglist.length; i++) {
        pbc.moduleAttrD.get('Image')[profile.default.imglist[i][0]] = function (node, module, attr) {
            return block("pins_imglist", node.lineno, {
                "PIN": module + "." + attr
            });
        }
    }    
}

pbc.initKnownModuleS = function(){
    var pythonModuleL = [
        'math', 'random'
    ];
    var boardModuleL = [];

    var moduleL = pythonModuleL.concat(boardModuleL);
    for (var i = 0; i < moduleL.length; i++) {
        this.knownModuleS.add(moduleL[i]);
    }
}

pbc.reset = function(){
    this.objectTypeD = {};
}

var py2block_config = new Py2blockConfig();

