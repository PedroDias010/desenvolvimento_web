$(document).ready(function() {
    let products = [];
    let isSortedAscending = true;

    // Carregar produtos da API
    $.getJSON('https://fakestoreapi.com/products', function(data) {
        products = data;
        displayProducts(products);
        updateTotalProducts(products.length);
    }).fail(function() {
        $('#catalogo').html('<div class="col-12"><p class="text-danger">Erro ao carregar produtos.</p></div>');
    });

    // Função para exibir produtos
    function displayProducts(productsToShow) {
        const $fragment = $(document.createDocumentFragment());
        if (productsToShow.length === 0) {
            $fragment.append('<div class="col-12"><p class="text-warning">Produto inexistente</p></div>');
            $('img[alt="Banner do catálogo de produtos"]').hide();
        } else {
            $.each(productsToShow, function(index, product) {
                const card = `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <img src="${product.image}" class="card-img-top" alt="${product.title}">
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">R$${product.price.toFixed(2).replace('.', ',')}</p>
                            </div>
                        </div>
                    </div>`;
                $fragment.append(card);
            });
            $('img[alt="Banner do catálogo de produtos"]').show();
        }
        $('#catalogo').empty().append($fragment);
    }

    // Atualizar contagem de produtos
    function updateTotalProducts(count) {
        $('#total-produtos').text(count);
    }

    // Função de busca com debounce
    let searchTimeout;
    $('#searchInput').on('input', function() {
        clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = $(this).val().toLowerCase().trim();
                if (!products.length) {
                    $('#catalogo').html('<div class="col-12"><p class="text-warning">Aguarde, carregando produtos...</p></div>');
                    $('img[alt="Banner do catálogo de produtos"]').hide();
                    return;
                }
                const filteredProducts = products.filter(product => 
                    product.title && product.title.toLowerCase().includes(searchTerm)
                );
                displayProducts(filteredProducts);
                updateTotalProducts(filteredProducts.length);
            }, 300); // Debounce de 300ms
    });

    // Ordenação por preço
    $('#sortPriceBtn').on('click', function() {
        const sortedProducts = [...products].sort((a, b) => 
            isSortedAscending ? a.price - b.price : b.price - a.price
        );
        isSortedAscending = !isSortedAscending;
        $(this).text(isSortedAscending ? 'Ordenar por Preço (Crescente)' : 'Ordenar por Preço (Decrescente)');
        displayProducts(sortedProducts);
        updateTotalProducts(sortedProducts.length);
    });
});