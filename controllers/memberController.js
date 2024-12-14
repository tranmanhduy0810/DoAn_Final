const { getdataMember } = require('../services/getdataMember');
const { getdataWorking } = require('../services/getdataWorking');

const memberPage = async (req, res) => {
  try {
    const totalImages = 4;
    const dataMember = await getdataMember(); 
    const dataWorking = await getdataWorking();
    // console.log('>>> Data:', dataWorking);
    res.render('member.ejs', { dataMember, totalImages, dataWorking });
  } catch (err) {
    console.error('Error rendering member page:', err);
    res.status(500).send('Error loading page');
  }
};

module.exports = {
  memberPage,
};
