/*-----------------------------------------------*\
            GLOBAL VARIABLES
\*-----------------------------------------------*/

// OBJS


/*-----------------------------------------------*\
            LOAD
\*-----------------------------------------------*/

$(document).ready(function () {

    $grupos = $('#id_groups')

    $grupos.multiSelect({
        selectableHeader: "<div class='own-select-header'>Grupos disponibles</div>",
        selectionHeader: "<div class='own-select-header'>Grupos Asignados</div>",
    })



    // $portada.filestyle({
    //     buttonText: " Explorar"
    // })

})



/*-----------------------------------------------*\
            OBJETO: PostThree
\*-----------------------------------------------*/

// function PostThree() {

//     this.id = $('#myTree')

//     this.init_Components()
// }
// PostThree.prototype.init_Components = function () {

//     // dataSource = function(parentData, callback){
//     //   //...
//     // };

//     this.id.tree()

// }
