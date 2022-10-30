let data = [
    { id: 0, name: 'AUDI', active: true, parentId: '1' },
    { id: 2, name: 'FIAT', active: true, parentId: '1' },
    { id: 3, name: 'RENAULT', active: false, parentId: '1' },
    { id: 11, name: 'BMW', active: true, parentId: '1' }
  ] 
  
data = data.sort((a, b) => {
    if (a.Title < b.Title) {
        return -1;
    }
});

console.log(data);



//   let books2;
//   books2 = books.sort((x, y) => {
//     if (x.Title < y.Title) {
//         //console.log(a.Title + " is less than " + b.Title)
//         return -1;
//     }
// });
let sortedBooks;
sortedBooks = await sortBooks(books);
console.log(sortedBooks);
async function sortBooks(data) {
    console.log("Function Call");
    //console.log(data);
    return await data.sort((a, b) => {
        if (a.Title < b.Title) {
            console.log(a.Title + " is less than " + b.Title);
            return -1;
        }
    });
}

console.log(sortedBooks);
