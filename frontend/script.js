axios.get('http://localhost:5000/obras').then(response => {
    const obras = response.data
    const listObras = document.getElementById('tabela-dados')
    obras.forEach(obra => {
        let item = document.createElement("tr")
        item.setAttribute("data-id", obra._id)
        item.setAttribute("data-titulo", obra.titulo)
        item.setAttribute("data-ano", obra.ano)
        item.setAttribute("data-autor", obra.autor)

        item.innerHTML = `
                            <td>${obra._id}</td>
                            <td>${obra.titulo}</td>
                            <td>${obra.ano}</td>
                            <td>${obra.autor}</td>
        `
        var edit = document.createElement('td')
        var editBtn = document.createElement('button')
        editBtn.innerHTML = "Editar"
        editBtn.classList.add('btn')
        editBtn.setAttribute("id", "btnEditar")
        editBtn.addEventListener("click", () => {
            modalEdit(item)
        })
        edit.appendChild(editBtn)

        var deleta = document.createElement('td')
        var deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = "Excluir"
        deleteBtn.classList.add('btn')
        deleteBtn.setAttribute("id", "btnExcluir")
        deleteBtn.addEventListener("click", () => {
            deleteObra(item)
        })
        deleta.appendChild(deleteBtn)

        item.appendChild(edit)
        item.appendChild(deleta)
        listObras.appendChild(item)
    })
})

btnNovo = document.getElementById('btnNovo')
btnNovo.addEventListener('click', modalCadastro)

function modalCadastro(){
    parent = document.getElementById('wrapper')
    modal = document.createElement('div')
    modal.classList.add('modal')
    modal.setAttribute("id", "modal")
    modal.innerHTML = `
        <form id="formCadastro" method="POST">
            <div class="input">
                <label for="tituloInput">Titulo</label>
                <input type="text" id="tituloInput">
            </div>
            <div class="input">
                <label for="anoInput">Ano</label>
                <input type="text" id="anoInput">
            </div>
            <div class="input">
                <label for="autorInput">Autor</label>
                <input type="text" id="autorInput">
            </div>
            <button type="button" class="btn" id="btnCadastro">Cadastrar</button>
            <button type="button" class="btn" id="btnCancelar">Cancelar</button>
        </form>
    `
    parent.appendChild(modal)
    btnCancelar = document.getElementById('btnCancelar')
    btnCancelar.addEventListener('click', deletarModal)
    btnCadastro = document.getElementById('btnCadastro')
    btnCadastro.addEventListener('click', cadastrar)

}


function cadastrar(){
    formCadastro = document.getElementById('formCadastro')
    tituloInput = document.getElementById('tituloInput')
    anoInput = document.getElementById('anoInput')
    autorInput = document.getElementById('autorInput')

    formCadastro.addEventListener("submit", (event)=>{
        event.preventDefault()
    })
    
    const obra = {
        titulo: tituloInput.value,
        ano: anoInput.value,
        autor: autorInput.value
    }

    axios.post("http://localhost:5000/obras", obra).then(response => {
        if(response.status == 201){
            location.reload()
        }
    }).catch(error=>{
        console.log(error)
    })
}

function deleteObra(listItem){
    const id = listItem.getAttribute("data-id")
    axios.delete(`http:/localhost:5000/obras/${id}`).then(response => {
        location.reload()
    }).catch(err => {
        console.log(err)
    })
}

function modalEdit(listItem){
    const id = listItem.getAttribute("data-id")
    const titulo = listItem.getAttribute("data-titulo")
    const ano = listItem.getAttribute("data-ano")
    const autor = listItem.getAttribute("data-autor")

    parent = document.getElementById('wrapper')
    modal = document.createElement('div')
    modal.classList.add('modal')
    modal.setAttribute("id", "modal")
    modal.innerHTML = `
        <form id="formEditar" method="POST">
            <div class="input">
                <label for="idInput">Id</label>
                <input type="text" id="idInput" value="${id}" read-only>
            </div>
            <div class="input">
                <label for="tituloInput">Titulo</label>
                <input type="text" id="tituloInput" value="${titulo}">
            </div>
            <div class="input">
                <label for="anoInput">Ano</label>
                <input type="text" id="anoInput" value="${ano}">
            </div>
            <div class="input">
                <label for="autorInput">Autor</label>
                <input type="text" id="autorInput" value="${autor}">
            </div>
            <button type="button" class="btn" id="btnAlterar">Alterar</button>
            <button type="button" class="btn" id="btnCancelar">Cancelar</button>
        </form>
    `
    parent.appendChild(modal)
    btnCancelar = document.getElementById('btnCancelar')
    btnCancelar.addEventListener('click', deletarModal)
    btnEdit = document.getElementById('btnAlterar')
    btnEdit.addEventListener('click', alterar)
}

function alterar(){
    const form = document.getElementById('formEditar')
    form.addEventListener("submit", function(event){
        event.preventDefault()//Evita o envio padrão do formulário
    })
    tituloInput = document.getElementById('tituloInput')
    anoInput = document.getElementById('anoInput')
    autorInput = document.getElementById('autorInput')

    var id = idInput.value

    const obra = {
        titulo: tituloInput.value,
        ano: anoInput.value,
        autor: autorInput.value
    }

    axios.put(`http://localhost:5000/obras/${id}`, obra).then(response => {
        location.reload()
    }).catch(error => {
        console.log(error)
    })
}

function deletarModal(){
    modal = document.getElementById('modal')
    modal.remove()
}


