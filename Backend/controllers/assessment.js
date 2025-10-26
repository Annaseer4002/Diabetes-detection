const Assessment = require("../models/assessment")

// const createAssessment = async (req, res) => {
//   try {
//     const { patientId, symptoms } = req.body;

//     if (!patientId || !symptoms || !symptoms.length) {
//       return res.status(400).json({ success: false, message: "Patient ID and symptoms are required." });
//     }

//     // Convert all symptom names to lowercase for comparison

//     // const tt = symptoms.map((each)=>{
//     //     each.toLowerCase()
//     // })
//     const normalizedSymptoms = symptoms.map(s => s.toLowerCase());

//     // 💡 Simple rule-based logic
//     let riskLevel = "Low";
//     let treatments = [];

//     if (
//       normalizedSymptoms.includes("excessive thirst") &&
//       normalizedSymptoms.includes("sudden weight loss") &&
//       normalizedSymptoms.includes("extreme tiredness") &&
//       normalizedSymptoms.includes("blurred vision")
//     ) {
//       riskLevel = "Type 1 Diabetes";
//       treatments = [
//         "Insulin therapy: Insulin injection; Adult; 500 units of insulin per ml(U-500)",
//         "Glucose monitoring",
//         "Diet",
//         "Exercise"
//       ];
//     } 
//     else if (
//       normalizedSymptoms.includes("lack of energy") ||
//       normalizedSymptoms.includes("weight loss") ||
//       normalizedSymptoms.includes("frequent urination")
//     ) {
//       riskLevel = "Type 2 Diabetes";
//       treatments = [
//         "Metaformin: Adult; 850mg orally once a day while children; 10 years or older; 500mg orally once a day",
//         "Management of the body blood glucose"
//       ];
//     } 
//     else {
//       riskLevel = "Gestational Diabetes";
//       treatments = [
//         "Complete medical evaluation" ,
//         "Good glycemic (body blood glucose) control before and during pregnancy"
//          ];
//     }

//     // Save the assessment
//     const newAssessment = new Assessment({
//       patientId,
//       symptoms: normalizedSymptoms,
//       riskLevel,
//       treatments
//     });

//     await newAssessment.save();

//     res.status(201).json({
//       success: true,
//       message: "Assessment created successfully",
//       data: newAssessment
//     });

//   } catch (error) {
//     console.error("Assessment creation error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };


const createAssessment = async (req, res) => {
  try {
    const { patientId, symptoms } = req.body;

    if (!patientId || !symptoms || !symptoms.length) {
      return res.status(400).json({ success: false, message: "Patient ID and symptoms are required." });
    }

    // Convert all symptom names to lowercase for comparison

    // const tt = symptoms.map((each)=>{
    //     each.toLowerCase()
    // })
    const normalizedSymptoms = symptoms.map(s => s.toLowerCase());

    // 💡 Simple rule-based logic
    let riskLevel = "Low";
    let treatments = [];

    if (
        normalizedSymptoms.includes("more skin and/or yeast infection")
    ) {
      riskLevel = "Gestational Diabetes";
      treatments = [
        "Complete medical evaluation" ,
        "Good glycemic (body blood glucose) control before and during pregnancy"
         ];
    } 
    else if (
      normalizedSymptoms.includes("lack of energy") ||
      normalizedSymptoms.includes("weight loss") ||
      normalizedSymptoms.includes("frequent urination")
    ) {
      riskLevel = "Type 2 Diabetes";
      treatments = [
        "Metaformin: Adult; 850mg orally once a day while children; 10 years or older; 500mg orally once a day",
        "Management of the body blood glucose"
      ];
    } 
    else {
      riskLevel = "Type 1 Diabetes";
        treatments = [
        "Insulin therapy: Insulin injection; Adult; 500 units of insulin per ml(U-500)",
        "Glucose monitoring",
        "Diet",
        "Exercise"
      ];
    }

    // Save the assessment
    const newAssessment = new Assessment({
      patientId,
      symptoms: normalizedSymptoms,
      riskLevel,
      treatments
    });

    await newAssessment.save();

    res.status(201).json({
      success: true,
      message: "Assessment created successfully",
      data: newAssessment
    });

  } catch (error) {
    console.error("Assessment creation error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const findAssessments = async (req, res) => {
  try {
             
      const assessments = await Assessment.find().populate('patientId');
      res.status(200).json({success: true, data: assessments});

  } catch(error) {
    res.status(500).json({success: false, message: "Server error", error: error.message})
  }
}



module.exports = {
    createAssessment,
    findAssessments
}
