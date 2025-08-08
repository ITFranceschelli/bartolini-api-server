const axios = require("axios");

async function inviaSpedizione(data) {
  if (!data.password || !data.userID) {
    throw new Error("Missing credentials: password or userID");
  }

  const payload = {
    account: {
      userID: data.userID,
      password: data.password
    },
    createData: {
      network: " ",
      departureDepot: data.departureDepot,
      senderCustomerCode: data.senderCustomerCode,
      deliveryFreightTypeCode: data.deliveryFreightTypeCode,
      pricingConditionCode: data.pricingConditionCode,
      numericSenderReference: data.numericSenderReference,
      alphanumericSenderReference: data.alphanumericSenderReference,
      numberOfParcels: data.numberOfParcels,
      weightKG: data.weightKG,
      volumeM3: data.volumeM3,
      consigneeCompanyName: data.consignee.companyName,
      consigneeAddress: data.consignee.address,
      consigneeZIPCode: data.consignee.zip,
      consigneeCity: data.consignee.city,
      consigneeProvinceAbbreviation: data.consignee.province,
      consigneeCountryAbbreviationISOAlpha2: data.consignee.country,
      consigneeContactName: data.consignee.contactName,
      consigneeTelephone: data.consignee.telephone,
      isAlertRequired: "0"
    },
    isLabelRequired: data.label?.isLabelRequired || 0,
    labelParameters: data.label?.isLabelRequired ? {
      outputType: data.label.outputType || "PDF",
      offsetX: "0",
      offsetY: "0",
      isBorderRequired: "0",
      isLogoRequired: "0",
      isBarcodeControlRowRequired: "0"
    } : undefined
  };

  const response = await axios.post(
    "https://api.brt.it/rest/api/shipment/create",
    payload,
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data;
}

module.exports = { inviaSpedizione };
