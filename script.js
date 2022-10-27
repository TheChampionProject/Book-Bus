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
