$(function() {
  $.getJSON('https://jsonplaceholder.typicode.com/users', function(users) { 
    $('#total-usuarios').text(users.length);

    users.forEach(function(user) {
      const card = `
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${user.name}</h5>
              <p class="card-text mb-1"><strong>Email:</strong> ${user.email}</p>
              <p class="card-text mb-1"><strong>Telefone:</strong> ${user.phone}</p>
              <p class="card-text"><strong>Cidade:</strong> ${user.address.city}</p>
            </div>
          </div>
        </div>
      `;
      $('#lista-usuarios').append(card);
    });
  });
});