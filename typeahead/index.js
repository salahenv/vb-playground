var inputBoxElm = document.getElementById('input-box');

inputBoxElm.addEventListener('change', async function(event) {
    console.log(event.target.value);
    let results = await fetch(`https://api.github.com/search/users?per_page=5&q=${event.target.value}`);
    results = await results.json();
    console.log(results);
});
