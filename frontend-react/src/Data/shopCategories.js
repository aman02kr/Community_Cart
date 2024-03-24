
const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  };
  
  const images = importAll(require.context('./shopCategoriesImages', false, /\.(png|jpe?g|svg)$/));

export const shopCategories=[
    {
        image:images['grocery.jpg'],
        title:"Grocery"
    },
    {
        image:images['bakery.jpg'],
        title:"Backery"
    },
    {
        image:images['Medicine.jpg'],
        title:"Medicine"
    },
    {
        image:images['clothing.jpg'],
        title:"Clothing"
    },
    {
        image:images['drinks.jpg'],
        title:"Drinks"
    },
    {
        image:images['dryfruit.jpg'],
        title:"Dryfruits"
    },
    {
        image:images['electronic.jpg'],
        title:"Electronics"
    },
    {
        image:images['fruits.jpg'],
        title:"Fruits"
    },
    {
        image:images['meat.jpg'],
        title:"Meat & Fish"
    },
    {
        image:images['petfood.jpg'],
        title:"Pet Care"
    },
    {
        image:images['stationary.jpg'],
        title:"Stationary"
    },
]