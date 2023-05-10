export async function getAllCardsFetch(categoryId) {
  const res = await fetch(`/get-items/${categoryId}`,
   {
    credentials: "include"
   }
  );

  return res.json();
}





// export async function fetchRequest(itemAndCategoryId) {
//   const splitItem = itemAndCategoryId.split('-');
//   const itemName = splitItem[0];
//   const categoryId = splitItem[1];

//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': 'ee1ce809e1msh50af60dd35dd5a6p15bdd0jsnb22ba520ac55',
//       'X-RapidAPI-Host': 'magic-aliexpress1.p.rapidapi.com',
//     },
//   };
//   const res = await fetch(
//     `https://magic-aliexpress1.p.rapidapi.com/api/category/${categoryId}/products?search?name=${itemName}`,
//     options
//   );
//   return res.json();
// }
