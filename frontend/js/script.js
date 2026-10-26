const API_URL = "http://localhost:3000";

const moviesGrid = document.getElementById("moviesGrid");
const pagination = document.getElementById("pagination");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const emptyMessage = document.getElementById("emptyMessage");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const genreSelect = document.getElementById("genreSelect");

const sectionTitle = document.getElementById("sectionTitle");
const resultInfo = document.getElementById("resultInfo");

const apiStatus = document.getElementById("apiStatus");

const movieModal = document.getElementById("movieModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const movieDetails = document.getElementById("movieDetails");


let paginaAtual = 1;


/* =========================================
   ESTADOS DA INTERFACE
========================================= */

function mostrarLoading() {

    loading.classList.remove("hidden");

    errorMessage.classList.add("hidden");
    emptyMessage.classList.add("hidden");

    moviesGrid.innerHTML = "";
    pagination.innerHTML = "";
}


function esconderLoading() {
    loading.classList.add("hidden");
}


function mostrarErro(mensagem) {

    esconderLoading();

    errorMessage.querySelector("p").textContent = mensagem;

    errorMessage.classList.remove("hidden");

    emptyMessage.classList.add("hidden");

    moviesGrid.innerHTML = "";
    pagination.innerHTML = "";
}


function mostrarVazio() {

    esconderLoading();

    emptyMessage.classList.remove("hidden");

    errorMessage.classList.add("hidden");

    moviesGrid.innerHTML = "";
    pagination.innerHTML = "";
}


/* =========================================
   FORMATAÇÃO
========================================= */

function formatarDuracao(minutos) {

    if (!minutos) {
        return "Duração não informada";
    }

    const horas = Math.floor(minutos / 60);

    const minutosRestantes = minutos % 60;

    if (horas === 0) {
        return `${minutosRestantes} min`;
    }

    if (minutosRestantes === 0) {
        return `${horas}h`;
    }

    return `${horas}h ${minutosRestantes}min`;
}


function escaparHTML(texto) {

    if (texto === null || texto === undefined) {
        return "";
    }

    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================
   CARDS
========================================= */

function criarCardFilme(filme) {

    const card = document.createElement("article");

    card.className = "movie-card";

    const titulo = escaparHTML(filme.titulo);

    const poster =
        filme.poster ||
        "https://via.placeholder.com/500x750?text=Sem+poster";


    card.innerHTML = `

        <div class="poster-wrapper">

            <img
                class="movie-poster"
                src="${poster}"
                alt="Poster do filme ${titulo}"
                loading="lazy"
                onerror="
                    this.onerror=null;
                    this.src='https://via.placeholder.com/500x750?text=Sem+poster';
                "
            >

            <div class="poster-overlay">

                <button
                    class="details-overlay-button"
                    type="button"
                >
                    Ver detalhes
                </button>

            </div>

        </div>


        <div class="movie-info">

            <h3 class="movie-title">
                ${titulo}
            </h3>

            <div class="movie-meta">

                <span>
                    ${filme.ano || "Ano não informado"}
                </span>

                <span class="movie-rating">
                    ★ ${filme.nota ?? "N/A"}
                </span>

            </div>

        </div>
    `;


    const detailsButton =
        card.querySelector(".details-overlay-button");


    detailsButton.addEventListener(
        "click",
        () => buscarDetalhesFilme(filme.id)
    );


    card.addEventListener(
        "click",
        (event) => {

            if (!event.target.closest("button")) {
                buscarDetalhesFilme(filme.id);
            }

        }
    );


    return card;
}


function renderizarFilmes(filmes) {

    esconderLoading();

    errorMessage.classList.add("hidden");
    emptyMessage.classList.add("hidden");

    moviesGrid.innerHTML = "";

    if (!filmes || filmes.length === 0) {

        mostrarVazio();

        return;
    }


    filmes.forEach((filme) => {

        moviesGrid.appendChild(
            criarCardFilme(filme)
        );

    });
}


/* =========================================
   PAGINAÇÃO
========================================= */

function renderizarPaginacao(totalPaginas) {

    pagination.innerHTML = "";

    if (!totalPaginas || totalPaginas <= 1) {
        return;
    }


    for (
        let pagina = 1;
        pagina <= totalPaginas;
        pagina++
    ) {

        const button =
            document.createElement("button");


        button.type = "button";

        button.className = "page-button";


        if (pagina === paginaAtual) {
            button.classList.add("active");
        }


        button.textContent = pagina;


        button.addEventListener(
            "click",
            () => {

                paginaAtual = pagina;

                carregarFilmes();

                window.scrollTo({
                    top:
                        document.querySelector(
                            ".catalog"
                        ).offsetTop - 80,

                    behavior: "smooth"
                });

            }
        );


        pagination.appendChild(button);
    }
}


/* =========================================
   STATUS DA API
========================================= */

async function verificarAPI() {

    const statusTexto =
        apiStatus.querySelector("span:last-child");


    try {

        const resposta =
            await fetch(`${API_URL}/`);


        if (!resposta.ok) {
            throw new Error();
        }


        statusTexto.textContent =
            "API online";


    } catch {

        statusTexto.textContent =
            "API offline";

        apiStatus.style.color =
            "#ff6b8a";

    }
}


/* =========================================
   CARREGAR FILMES
========================================= */

async function carregarFilmes() {

    mostrarLoading();

    sectionTitle.textContent =
        "Filmes";

    resultInfo.textContent =
        "Explore nosso catálogo.";


    try {

        const resposta =
            await fetch(
                `${API_URL}/filmes/${paginaAtual}`
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            throw new Error(
                dados.message ||
                "Não foi possível carregar os filmes."
            );

        }


        resultInfo.textContent =
            `${dados.totalFilmes} filmes encontrados`;


        renderizarFilmes(
            dados.filmes
        );


        renderizarPaginacao(
            dados.totalPaginas
        );


    } catch (error) {

        mostrarErro(
            error.message ||
            "Erro ao conectar com a API."
        );

    }

}


/* =========================================
   BUSCA POR TÍTULO
========================================= */

async function buscarFilmes(event) {

    event.preventDefault();


    const palavra =
        searchInput.value.trim();


    if (!palavra) {

        paginaAtual = 1;

        carregarFilmes();

        return;
    }


    mostrarLoading();


    sectionTitle.textContent =
        `Resultados para "${palavra}"`;


    try {

        const resposta =
            await fetch(
                `${API_URL}/filmes/busca/${encodeURIComponent(palavra)}`
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            throw new Error(
                dados.message ||
                "Nenhum filme encontrado."
            );

        }


        resultInfo.textContent =
            `${dados.totalResultados} resultado(s) encontrado(s)`;


        renderizarFilmes(
            dados.filmes
        );


        pagination.innerHTML = "";


    } catch (error) {

        mostrarErro(
            error.message ||
            "Erro ao realizar a busca."
        );

    }

}


/* =========================================
   BUSCA POR GÊNERO
========================================= */

async function buscarPorGenero(genero) {

    if (!genero) {

        paginaAtual = 1;

        carregarFilmes();

        return;
    }


    mostrarLoading();


    sectionTitle.textContent =
        genero;


    try {

        const resposta =
            await fetch(
                `${API_URL}/generos/${encodeURIComponent(genero)}`
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            throw new Error(
                dados.message ||
                "Nenhum filme encontrado."
            );

        }


        resultInfo.textContent =
            `${dados.totalResultados} filme(s) encontrados`;


        renderizarFilmes(
            dados.filmes
        );


        pagination.innerHTML = "";


    } catch (error) {

        mostrarErro(
            error.message ||
            "Erro ao buscar filmes por gênero."
        );

    }

}


/* =========================================
   DETALHES
========================================= */

async function buscarDetalhesFilme(id) {

    try {

        const resposta =
            await fetch(
                `${API_URL}/filme/${id}`
            );


        const filme =
            await resposta.json();


        if (!resposta.ok) {

            throw new Error(
                filme.message ||
                "Filme não encontrado."
            );

        }


        abrirModal(filme);


    } catch (error) {

        alert(
            error.message ||
            "Erro ao carregar detalhes do filme."
        );

    }

}


/* =========================================
   MODAL
========================================= */

function abrirModal(filme) {

    const poster =
        filme.poster ||
        "https://via.placeholder.com/500x750?text=Sem+poster";


    const titulo =
        escaparHTML(filme.titulo);


    const sinopse =
        escaparHTML(
            filme.sinopse ||
            "Sinopse não disponível."
        );


    movieDetails.innerHTML = `

        <div class="details">

            <div>

                <img
                    src="${poster}"
                    alt="Poster do filme ${titulo}"
                    onerror="
                        this.onerror=null;
                        this.src='https://via.placeholder.com/500x750?text=Sem+poster';
                    "
                >

            </div>


            <div>

                <h2>
                    ${titulo}
                </h2>


                <div class="details-meta">

                    <span>
                        ${filme.ano || "Ano não informado"}
                    </span>

                    <span>
                        ${formatarDuracao(filme.duracao)}
                    </span>

                    <span class="details-rating">
                        ★ ${filme.nota ?? "N/A"}
                    </span>

                    <span>
                        ${filme.votos ?? 0} votos
                    </span>

                </div>


                <p class="details-synopsis">
                    ${sinopse}
                </p>

            </div>

        </div>
    `;


    movieModal.classList.remove(
        "hidden"
    );


    document.body.style.overflow =
        "hidden";

}


function fecharModal() {

    movieModal.classList.add(
        "hidden"
    );

    document.body.style.overflow =
        "";

}


/* =========================================
   EVENTOS
========================================= */

searchForm.addEventListener(
    "submit",
    buscarFilmes
);


genreSelect.addEventListener(
    "change",
    (event) => {

        buscarPorGenero(
            event.target.value
        );

    }
);


modalClose.addEventListener(
    "click",
    fecharModal
);


modalOverlay.addEventListener(
    "click",
    fecharModal
);


document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {
            fecharModal();
        }

    }
);


/* =========================================
   INICIALIZAÇÃO
========================================= */

verificarAPI();

carregarFilmes();