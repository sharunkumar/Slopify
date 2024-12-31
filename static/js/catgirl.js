function anotherCatgirl() {
    const catgirl = document.getElementById("catgirl");
    catgirl.src = "#";
    catgirl.alt = "loading!! be patient etc uwu meow nyaaaa";
    try {
        console.log("trying")
        fetch('https://nekos.best/api/v2/neko')
          .then(response => response.json())
          .then(json => catgirl.src = json.results[0].url)
        catgirl.alt = "catgirl";
    } catch(e) {
        catgirl.alt = `shit happened: ${e}`;
        console.error(e);
    }
}
console.log("i exist!");
anotherCatgirl();

