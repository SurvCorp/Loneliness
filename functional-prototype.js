// Torna todos frames arrastáveis
$( function() {
    $( ".frame" ).draggable();
} );

// Faz os seletores de cor se comportarem como radio-buttons
$('#colors .icons').click( function() {
    $('#colors .icons.selected').removeClass('selected')
    $(this).addClass('selected')
} );

// Ativa os dropwons
$('.ui.dropdown')
    .dropdown()
;

// Ativa os checkboxes
$('.ui.radio.checkbox')
    .checkbox()
;

var paginas = {};
paginas["Home"] = {
    nome : "Home",
    descrição : "Home, sweet home.",
    tipo : "Público",
    layout : "Livre",
    background : {
        tipo : "Imagem",
        imagem : "cyberpunk-wallpaper.jpg"
    },
    frames : [
        document.getElementById("frame0"),
        document.getElementById("frame1"),
        document.getElementById("frame2"),
        document.getElementById("frame3"),
        document.getElementById("frame4"),
        document.getElementById("frame5"),
        document.getElementById("frame6"),
        document.getElementById("frame7"),
        document.getElementById("frame8")
    ]
}

paginas["Poetry"] = {
    nome : "Poetry",
    descrição : "Poesias que me tocaram durante a vida",
    tipo : "Privado",
    layout : "Livre",
    background : {
        tipo : "Cor",
        cor : "teal"
    },
    frames : []
}

paginas["Cubes"] = {
    nome : "Cubes",
    descrição : "Just Cubes",
    tipo : "Amigos",
    layout : "Livre",
    background : {
        tipo : "Cor",
        cor : "black"
    },
    frames : []
}

paginas["Travel Book"] = {
    nome : "Travel Book",
    descrição : "Lugares, Comidas, Hospedarias, Pessoas",
    tipo : "Privado",
    layout : "Livre",
    background : {
        tipo : "Imagem",
        imagem : "DSCN4567.jpg"
    },
    frames : []
}

paginas["Gallery"] = {
    nome : "Gallery",
    descrição : "Fotos",
    tipo : "Privado",
    layout : "Grid",
    background : {
        tipo : "Cor",
        cor : "white"
    },
    frames : []
}

var pagina_atual = "Home";

var n_id = 9;

function newFrame() {

    var this_n_id = n_id++;

    var frame = document.createElement("div");
    frame.classList.add("frame");
    frame.classList.add("normal");
    frame.id = "frame" + this_n_id;
    frame.style.top = "350px";
    frame.style.left = "500px";

    var content = document.createElement("div");
    content.classList.add("ui");
    content.classList.add("segment");
    content.id = "content" + this_n_id;

    var initialtext = document.createTextNode("What are you thinking, Dominus?");
    content.appendChild(initialtext);

    frame.appendChild(content);

    var editButton = document.createElement("i");
    editButton.classList.add("large");
    editButton.classList.add("edit");
    editButton.classList.add("outline");
    editButton.classList.add("icon");
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", function() { edit( this_n_id.toString() ) });

    frame.appendChild(editButton);

    var saveButton = document.createElement("i");
    saveButton.classList.add("large");
    saveButton.classList.add("save");
    saveButton.classList.add("icon");
    saveButton.classList.add("save-button");
    saveButton.addEventListener("click", function() { save( this_n_id.toString() ) });

    frame.appendChild(saveButton);

    paginas[pagina_atual].frames.push(frame);

    document.getElementById("root").appendChild(frame);
    $( function () {
        $(".frame").draggable(); // fix it later.
    } );
}


let editor = {};

function edit( frame ) {

    console.log( frame );

    $( "#frame" + frame ).draggable({disabled: true});

    console.log( "tchunum" );

    BalloonEditor
        .create( document.querySelector( "#content" + frame ))
        .then ( newEditor => {
            editor[frame] = newEditor;
        } )
        .catch( error => {
            console.error( error );
        } );
        
    document.getElementById("frame" + frame).classList.replace("normal", "editing");
}

function deleteFrame( frame ) {
    document.getElementById("root").removeChild( document.getElementById( frame ) );
}

function save( frame ) {
    editor[frame].destroy()
        .catch ( error => {
            console.log( error );
        } );

    $( "#frame" + frame ).draggable({disabled: false});

    document.getElementById( "frame" + frame).classList.replace("editing", "normal");
}


function configuracoes() {
    $( '#configuracoes').modal( 'show' );
}

function closeBar() {
    $( '.ui.sidebar' ).sidebar( 'toggle');
}

function newPage() {
    $( '.ui.mini.modal').modal( 'show' );
}

function selecionarCor() {
    document.getElementById("pictures").style.display = "none";
    document.getElementById("colors").style.display = "block";
    console.log("pew");
}

function selecionarImagem() {
    document.getElementById("colors").style.display = "none";
    document.getElementById("pictures").style.display = "block";
    console.log("pow");
}

function goTo( pg ) {
    document.getElementById("root").innerHTML = "";
    var pagina = paginas[pg];
    document.title = "Artium Dominus › " + pagina.nome + " :: Loneliness";
    document.getElementById("nome").value = pagina.nome;
    pagina_atual = pagina.nome;
    document.getElementById("descricao").value = pagina.descrição;

    // -> Mexer no dropdown de tipo

    // -> Mexer no dropdown de layout

    if (pagina.background.tipo == "Cor") {
        $("#root").css('background-image', 'none');
        $("#root").css('background-color', pagina.background.cor);
        document.getElementById("cor radio button").click();
    } else if (pagina.background.tipo == "Imagem") {
        $("#root").css('background-image', 'url(' + pagina.background.imagem + ')');
        document.getElementById("preview").src = pagina.background.imagem;
        document.getElementById("imagem radio button").click();
    }

    var frames = pagina.frames;
    console.log(frames);
    for(var i = 0; i < frames.length; ++i) {
        document.getElementById("root").appendChild(frames[i]);
    }

}

function createPage() {
    var nome = document.getElementById("page name input").value;
    paginas[nome] = {
        nome : nome,
        descrição : "",
        tipo : "Privado",
        layout : "Livre",
        background : {
            tipo : "Cor",
            cor : "white"
        },
        frames : []
    }

    var link = document.createElement("a");
    link.classList.add("item");
    link.addEventListener("click", function() { goTo(nome)});
    var texto = document.createTextNode("› " + nome);
    link.appendChild(texto);

    document.getElementById("paginas").appendChild(link);
}