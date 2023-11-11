const excel = require("excel4node");
const moment = require("moment");

const generateExcelReport = (totalSales) => {
  const fieldNamesObj = {};

  let AllValues = [];

  totalSales.forEach((document) => {
    let fieldValues = [];
    const keys = Object.keys(document.toObject());

    keys.forEach((key) => {
      fieldNamesObj[key] = key[0].toUpperCase() + key.slice(1);
    });
    let {
      customerName,
      customerEmail,
      customerPhone,
      street,
      city,
      state,
      pincode,
      totalAmount,
      paymentMethod,
      createdAt,
      deliveredAt,
    } = document;
    createdAt = moment(createdAt).format("DD/MM/YYYY");
    deliveredAt = moment(deliveredAt).format("DD/MM/YYYY");

    fieldValues = [
      customerName,
      customerEmail,
      customerPhone,
      street,
      city,
      state,
      pincode,
      totalAmount,
      paymentMethod,
      createdAt,
      deliveredAt,
    ];
    AllValues.push(fieldValues);
  });
  const {
    customerName,
    customerEmail,
    customerPhone,
    street,
    city,
    state,
    pincode,
    totalAmount,
    paymentMethod,
    createdAt,
    deliveredAt,
  } = fieldNamesObj;

  const fieldNames = [
    customerName,
    customerEmail,
    customerPhone,
    street,
    city,
    state,
    pincode,
    totalAmount,
    paymentMethod,
    createdAt,
    deliveredAt,
  ];

  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet("Sales Report");

  const myStyle = workbook.createStyle({
    font: {
      bold: true,
    },
    alignment: {
      wrapText: true,
      horizontal: "center",
    },
  });

  for (let i = 1; i <= fieldNames.length; i++) {
    worksheet.column(i).setWidth(35);
    worksheet
      .cell(1, i)
      .string(fieldNames[i - 1])
      .style(myStyle);
  }

  AllValues.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      worksheet.cell(rowIndex + 2, colIndex + 1).string(value.toString());
    });
  });

  return workbook.writeToBuffer();
};

module.exports = {
  generateExcelReport,
};
