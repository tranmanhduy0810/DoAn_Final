const {getWareHouse} = require('../services/getdataWareHouse')
const warehousePage = async (req, res) => {
    try{
        const dataWareHouse = await getWareHouse();
        console.log(dataWareHouse)
        res.render('warehouse.ejs',{dataWareHouse});
    }
    catch (error) {
        console.error('Error fetching salary data:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    warehousePage,
  };
  