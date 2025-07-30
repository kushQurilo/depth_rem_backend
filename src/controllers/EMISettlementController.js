const stripe = require("../config/stripe/stripe");
const EmiModel = require("../models/EMIModel");

exports.EMISettlement = async (req, res) => {
    try {
        const { principle, intrestRate, rateType, numberOfEMI, duedate, loantype,loanId,user_id } = req.body;
         
        if( !principle || !intrestRate || !rateType || !numberOfEMI || !duedate || !loantype || !loanId || !user_id ){
            return res.status(400).json({ message: "Please fill all the fields" });
        }
       
        const P = parseFloat(principle);
        const r = rateType === 'yearly'
            ? parseFloat(intrestRate) / (12 * 100)
            : parseFloat(intrestRate) / 100;

        const n = parseInt(numberOfEMI);

        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        const paylod = {
            principle: P,
            NumberOFEmi: n,
            EmiAmount: parseFloat(Math.round(emi.toFixed(2))),
            duedate,
            loantype,
            userId:user_id,
            loanId
        };
        const isEMIexist = await EmiModel.findOne({ userId: user_id, loanId:loanId });
        if(isEMIexist){
            if(isEMIexist.paidEmis != isEMIexist.numberOfEmI){
                return res.status(400).json({success:false, message: "EMI alredy exist but have'nt paid all the emi" });
            }
            return res.status(400).json({success:false, message: "EMI already exist for this loan" });
        }
        const insert = await EmiModel.create(paylod);
        if (insert) {
            return res.status(200).json({success:true, message: "EMI Settlement Successfull" });
        }
        else {
            return res.status(400).json({ message: "EMI Settlement Failed" , success:false});
        }

    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};


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