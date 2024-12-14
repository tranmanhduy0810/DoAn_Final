const { getdataHoiVien } = require("../services/getdatacustomerHV");
const { getdataVangLai } = require("../services/getdatacustomerVL");
const moment = require('moment-timezone');

const customerPage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const dataHoiVien = await getdataHoiVien(page, pageSize);
    const dataVangLai = await getdataVangLai(page, pageSize);

    res.render("customer.ejs", {
      dataVangLai,
      dataHoiVien,
      moment,
      currentPage: page,
      pageSize
    });
  } catch (err) {
    console.error("Error in customerPage controller:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  customerPage,
};
