
function Miner() {}
Miner.get_TextFromSelectOption = function (_value) {

    var indice = _value.indexOf(":")
    var text = _value.substr(indice+1)

    if (typeof(text) != "undefined") {
        return text.trim()
    }
    else {
        return ""
    }
}
