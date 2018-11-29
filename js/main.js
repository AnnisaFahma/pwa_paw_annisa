var idbApp = (function() {
	'use strict';

	var dbPromises = idb.open('products',	1,	function(upgradeDB)	{
		var	store	=	upgradeDB.createObjectStore('clothing',	{keyPath:	'id'});
		store.put({id: 123, name: 'sneaker', price: 200000, quantity: 20, description: 'kece '});
		store.put({id: 987,	name: 'heels', price: 125000, quantity: 10, description: 'syantik'});
		store.put({id: 456,	name: 'flatshoes', price: 100000, quantity: 15, description:'simple'});
	});

	function showProducts() {
		var s = '';
		dbPromises.then(function(db) {
		  var tx = db.transaction('clothing', 'readonly');
		  var store = tx.objectStore('clothing');
		  return store.openCursor();
		}).then(function showRange(cursor) {
		  if (!cursor) {return;}
		  console.log('Cursored at:', cursor.value.name);

		  s += '<h2>' + cursor.value.name + '</h2><br>';
		  s += '<img src="images/' + cursor.value.name + '.jpg"><p>';
		  s += 'Harga :'+'Rp ' + cursor.value.price + '<br/>';
		  s += '<h2>' + 'qty :' + cursor.value.quantity + '</h2><br>';
		  s += 'Description :' + cursor.value.description + '<br/>';
		  s += '</p><hr>';

		  return cursor.continue().then(showRange);
		}).then(function() {
		  if (s === '') {s = '<p>No results.</p>';}
		  document.getElementById('results').innerHTML = s;
		});
	}
  
	return {
		showProducts: (showProducts)
	};
})();
