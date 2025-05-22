/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
	// find different categories
	let categories = new Set();
	for (let transaction of transactions) {
		categories.add(transaction.category);
	}
	const categoriesArray = Array.from(categories);
    // [food, clothing, electronics]
    let answer = []

    for(let i=0; i<categoriesArray.length; i++){
        answer.push({
            category : categoriesArray[i],
            totalSpent : 0
        })
    }

    for(let i=0; i<categoriesArray.length; i++){
        for(let j=0; j<transactions.length; j++){
            if(categoriesArray[i]==transactions[j].category){
                answer[i].totalSpent += transactions[j].price
            }
        }
    }
    return answer;
}

module.exports = calculateTotalSpentByCategory;
