jQuery(document).ready(function ($) {

	if ($('#interface').length > 0) {
		// Mi trovo nella pagina di interfaccia modifica/inserimento

		// Controllo se è presente un campo get nel url
		let queryString = window.location.search;
		if (queryString) {
			$('#updateBook').show();
			// Sto modificando un libro
			let id = queryString.split('=')[1];
			readBook(id);
			$('#updateBook').click(function () {
				updateBookTitle(id, $('#title').val());
				updateBookAuthor(id, $('#author').val());
				updateBookPage(id, $('#page').val());
				updateBookYear(id, $('#year').val());
			});
		}
		else {
			// Sto aggiungendo un libro
			$('#addBook').show();
			$('#addBook').click(function () {
				addBook();
			});
		}
	}

	if ($('#archive').length > 0) {
		// Mi trovo nel archivio
		getAllBooks();
	}

	$('.reset').click(function () {
		if ((confirm('Sei sicuro di voler cancellare la memoria locale?'))) {
			clearLocalStorage();
			getAllBooks();
		}
	});

	function addBook() {
		let author = $('#author').val();
		let title = $('#title').val();
		let page = $('#page').val();
		let year = $('#year').val();

		var d = new Date();
		var maxYear = d.getFullYear();

		// Controllo che l'year non sia vuoto e non sia maggiore di quello attuale
		if (!year || parseInt(year) > maxYear) {
			alert(
				"L'anno di pubblicazione non deve essere più grande dell'anno attuale"
			);
			return false;
		}

		// Controllo che le page non siano vuote e siano almeno 1
		if (!page || page < 1) {
			alert('Il numero di page non può essere inferiore ad 1');
			return false;
		}

		// Controllo che l'author non sia vuoto
		if (!author) {
			return false;
		}

		// Controllo che il title non sia vuoto
		if (!title) {
			return false;
		}

		// Tutti i campi sono validi, procedo con l'inserimento 

		let book = {
			author: author,
			title: title,
			page: page,
			year: year,
			status: false,
		};
		let id = Date.now();

		localStorage.setItem('book_' + id, JSON.stringify(book));

		$('#id').val(id);
		alert('Libro aggiunto');
		window.location.href = 'index.html';

	}
	function readBook(id) {
		let book = localStorage.getItem(id);
		book = JSON.parse(book);

		$('#author').val(book.author);
		$('#title').val(book.title);
		$('#page').val(book.page);
		$('#year').val(book.year);
		$('#id').val(id);

		return book;
	}

	// Cancella il libro
	function deleteBook(id) {
		if ((confirm('Sei sicuro di voler cancellare il libro?'))) {
			localStorage.removeItem(id);
		}
		getAllBooks();
	}

	function updateBookStatus(index, value) {
		if (localStorage[index]) {
			let book = JSON.parse(localStorage[index]);
			book['status'] = value;
			localStorage[index] = JSON.stringify(book);
			if (value) {
				alert('Complimenti hai letto il libro ' + book.title + '!');
			}
		}

		getAllBooks();
	}
	function updateBookTitle(index, value) {

		if (localStorage[index]) {
			let book = JSON.parse(localStorage[index]);
			book['title'] = value;
			console.log(book)
			localStorage[index] = JSON.stringify(book);
		}

		getAllBooks();
	}
	function updateBookAuthor(index, value) {

		if (localStorage[index]) {
			let book = JSON.parse(localStorage[index]);
			book['author'] = value;
			localStorage[index] = JSON.stringify(book);
		}

		getAllBooks();
	}
	function updateBookPage(index, value) {

		if (localStorage[index]) {
			let book = JSON.parse(localStorage[index]);
			book['page'] = value;
			localStorage[index] = JSON.stringify(book);
		}

		getAllBooks();
	}
	function updateBookYear(index, value) {

		if (localStorage[index]) {
			let book = JSON.parse(localStorage[index]);
			book['year'] = value;
			localStorage[index] = JSON.stringify(book);
		}

		getAllBooks();
	}


	function getAllBooks() {
		let books = [];

		$('tbody').html('');

		for (let index in localStorage) {
			if (index.includes('book_')) {
				let book = JSON.parse(localStorage[index]);

				let tr = $('<tr>');
				let td_id = $('<td>');
				let td_title = $('<td>');
				let td_author = $('<td>');
				let td_page = $('<td>');
				let td_year = $('<td>');
				let td_checkbox = $('<td>');
				let td_deleteBook = $('<td>');
				let td_editBook = $('<td>');

				// Campi testuali 

				td_id.html(index);
				td_title.html(book.author);
				td_author.html(book.title);
				td_page.html(book.page);
				td_year.html(book.year);

				// Letto?
				let checkbox = $('<input>');
				checkbox.attr('type', 'checkbox');
				checkbox.attr('checked', book.status);

				checkbox.click(function () {
					updateBookStatus(index, !book.status);
				});
				td_checkbox.append(checkbox);

				// Cancella libro
				let aDelete = $('<a>');
				aDelete.attr('href', '#');
				aDelete.html('X');
				aDelete.click(function () {
					deleteBook(index);
				});
				td_deleteBook.append(aDelete);

				// Modifica libro
				let editBook = $('<a>');
				editBook.attr('href', 'interface.html?id=' + index);
				editBook.html('Edit');
				td_editBook.append(editBook);

				tr.append(td_id);
				tr.append(td_title);
				tr.append(td_author);
				tr.append(td_page);
				tr.append(td_year);
				tr.append(td_checkbox);
				tr.append(td_deleteBook);
				tr.append(td_editBook);

				$('tbody').append(tr);
			}
		}
		return books;
	}
	function clearLocalStorage() {
		let storage = localStorage;
		for (let index in storage) {
			localStorage.removeItem(index);
		}
	}
});
