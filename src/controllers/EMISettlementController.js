const stripe = require("../config/stripe/stripe");
const EmiModel = require("../models/EMIModel");
const fs = require('fs');
const excelModel = require("../models/excelModel");
exports.EMISettlement = async (req, res) => {
  try {
  //   const fileBuffer = fs.readFileSync(req.file.path);
  //   const pdfData = new Uint8Array(fileBuffer);

  //   const doc = await pdfjsLib.getDocument({ data: pdfData }).promise;

  //   let allText = '';

  //   for (let i = 1; i <= doc.numPages; i++) {
  //     const page = await doc.getPage(i);
  //     const content = await page.getTextContent();
  //     const pageText = content.items.map(item => item.str).join(' ');
  //     allText += pageText + '\n';
  //   }

  //   // Convert text to object
  //   const lines = allText.split('\n');
  //   const extractedObject = {};

  //   lines.forEach(line => {
  //     const match = line.match(/^([\w\s]+)[\s:]+(.+)$/);
  //     if (match) {
  //       const key = match[1].trim();
  //       const value = match[2].trim();
  //       extractedObject[key] = value;
  //     }
  //   });

  //   if (Object.keys(extractedObject).length === 0) {
  //     return res.status(400).json({ message: 'No data extracted from PDF' });
  //   }

  //   // ✅ Save to MongoDB
  //   const savedData = await excelModel.create(extractedObject);

  //   res.status(200).json({
  //     message: 'PDF data extracted and saved successfully',
  //     data: savedData
  //   });

  } catch (err) {
    console.error('Error reading PDF:', err);
    res.status(500).send('Failed to extract or store PDF data');
  }
}



exports.EMIPayment = async (req , res, next) => {
    try{

        const {user_id , loanId , emiId } = req.body;
        if(!user_id || !loanId || !emiId ){
            return res.status(400).json({ message: "Requirement Missing" });
        }
        const isEMIexist = await EmiModel.findOne({ userId: user_id, loanId:loan});
        if(isEMIexist.paidEmis === isEMIexist.numberOfEmI){
           return res.status(200)
           .json({success:true, message:'No EMI to pay' });
        }
        isEMIexist.paidEmis+1;
        await isEMIexist.save();
    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}


// delete emi's if no emi's
exports.deleteEmis = async (req, res, next) => {
    
    try{   
        const {user_id , emiId } = req.body;
        if(!user_id || !emiId ){
            return res.status(400).json({ message: "Requirement Missing" });
            }
            const isEMIexist = await EmiModel.findOne({ userId: user_id, _id:emiId});
            if(!isEMIexist){
                return res.status(400).json({ message: "EMI not found" });
                }
                await isEMIexist.deleteOne();
                return res.status(200).json({success:true, message: "EMI deleted successfully"})

    }catch(err){
        return res.status(500).json({ message: "Something went wrong.", error: err.message });
    }

}