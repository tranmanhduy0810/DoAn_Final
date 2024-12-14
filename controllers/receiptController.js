const { getdataReceipt } = require('../services/getdataReceipt');

const receiptPage = async (req, res) => {
  const ReceiptData = await getdataReceipt(req, res);
  const combinedData = ReceiptData.idHoaDon.map((id, index) => {
    return {
      idHoaDon: id,
      TienThanhToan: ReceiptData.TienThanhToan[index],
      MgayThanhToan: ReceiptData.MgayThanhToan[index],
      statusThanhToan: ReceiptData.statusThanhToan[index]
    };
  });

  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 5;  
  const skip = (page - 1) * itemsPerPage; 
  const paginatedData = combinedData.slice(skip, skip + itemsPerPage);

  const totalPages = Math.ceil(combinedData.length / itemsPerPage);

  res.render('receipt.ejs', {
    ReceiptData: paginatedData,
    currentPage: page,
    totalPages: totalPages
  });
};

module.exports = {
  receiptPage,
};
